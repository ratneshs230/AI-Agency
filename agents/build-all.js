/**
 * Master Orchestrator
 * Coordinates Website Builder and Resource Generator agents
 */

const fs = require('fs');
const path = require('path');

const { buildWebsite } = require('./website-builder');
const { generateResourcesForArchitect } = require('./resource-generator');

async function buildComplete(startIndex = 0, endIndex = null, options = {}) {
  const dataPath = path.join(__dirname, '..', 'leads', 'architects', 'architects_200_list.json');
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  endIndex = endIndex || data.length;

  console.log(`\n${'='.repeat(60)}`);
  console.log(`PREMIUM WEBSITE BUILDER - MASTER ORCHESTRATOR`);
  console.log(`${'='.repeat(60)}`);
  console.log(`\nProcessing architects ${startIndex + 1} to ${endIndex}`);
  console.log(`Total: ${endIndex - startIndex} websites to build\n`);

  const results = {
    success: [],
    failed: [],
    skipped: []
  };

  for (let i = startIndex; i < endIndex; i++) {
    const arch = data[i];
    const baseDir = path.join(__dirname, '..', 'leads', 'architects', 'no-site', arch.firm_name);
    const websiteDir = path.join(baseDir, 'website');

    console.log(`\n[${i + 1}/${endIndex}] Processing: ${arch.firm_name}`);
    console.log(`${'─'.repeat(50)}`);

    if (!fs.existsSync(baseDir)) {
      console.log(`  ✗ Directory not found, skipping`);
      results.skipped.push(arch.firm_name);
      continue;
    }

    try {
      // Step 1: Build website structure
      console.log(`  Step 1: Building website structure...`);
      buildWebsite(arch, baseDir, websiteDir);

      // Step 2: Generate resources (if enabled)
      if (!options.skipResources) {
        console.log(`  Step 2: Generating visual resources...`);
        await generateResourcesForArchitect(arch, websiteDir);
      } else {
        console.log(`  Step 2: Skipped resource generation`);
      }

      results.success.push(arch.firm_name);
      console.log(`  ✓ Complete: ${arch.firm_name}`);

    } catch (error) {
      console.error(`  ✗ Error: ${error.message}`);
      results.failed.push({ name: arch.firm_name, error: error.message });
    }

    // Progress update
    const progress = ((i - startIndex + 1) / (endIndex - startIndex) * 100).toFixed(1);
    console.log(`\n  Progress: ${progress}%`);
  }

  // Summary
  console.log(`\n${'='.repeat(60)}`);
  console.log(`BUILD COMPLETE - SUMMARY`);
  console.log(`${'='.repeat(60)}`);
  console.log(`\n  Success: ${results.success.length}`);
  console.log(`  Failed:  ${results.failed.length}`);
  console.log(`  Skipped: ${results.skipped.length}`);

  if (results.failed.length > 0) {
    console.log(`\n  Failed builds:`);
    results.failed.forEach(f => console.log(`    - ${f.name}: ${f.error}`));
  }

  // Save results log
  const logPath = path.join(__dirname, '..', 'build-results.json');
  fs.writeFileSync(logPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    range: { start: startIndex, end: endIndex },
    results
  }, null, 2));

  console.log(`\n  Results saved to: build-results.json`);
  console.log(`${'='.repeat(60)}\n`);

  return results;
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);
  const startIndex = parseInt(args[0]) || 0;
  const endIndex = args[1] ? parseInt(args[1]) : null;
  const skipResources = args.includes('--skip-resources');

  await buildComplete(startIndex, endIndex, { skipResources });
}

// Export for use as module
module.exports = { buildComplete };

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}
