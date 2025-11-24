const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync('leads/architects/architects_200_list.json', 'utf8'));

// Tagline templates
const taglines = [
  "Designing Spaces That Inspire",
  "Architecture Beyond Imagination",
  "Building Tomorrow's Landmarks",
  "Where Vision Meets Structure",
  "Crafting Architectural Excellence",
  "Transforming Ideas Into Reality",
  "Design That Defines Living",
  "Creating Timeless Spaces",
  "Innovation In Every Detail",
  "Architecture With Purpose",
  "Shaping Spaces, Shaping Lives",
  "Excellence In Every Blueprint",
  "Where Form Meets Function",
  "Designing Your Dreams",
  "Building With Passion",
  "Architectural Visionaries",
  "Spaces That Tell Stories",
  "Modern Design, Timeless Value",
  "Your Vision, Our Expertise",
  "Redefining Urban Landscapes"
];

// Service descriptions
const serviceDescriptions = {
  'Residential Design': 'Transform your living spaces with thoughtful residential architecture that balances aesthetics, functionality, and your unique lifestyle needs.',
  'Commercial Buildings': 'Create impactful commercial spaces that enhance productivity, reflect brand identity, and deliver exceptional ROI.',
  'Interior Design': 'Elevate interiors with cohesive design solutions that optimize space, light, and materials for stunning results.',
  'Sustainable Architecture': 'Build responsibly with green design principles that reduce environmental impact while maximizing efficiency.',
  'Urban Planning': 'Shape communities through strategic urban design that promotes livability, connectivity, and sustainable growth.',
  'Heritage Conservation': 'Preserve architectural heritage while adapting historic structures for contemporary use and relevance.',
  'Landscape Architecture': 'Design outdoor spaces that harmonize with architecture and enhance the natural environment.',
  'Industrial Design': 'Engineer functional industrial facilities optimized for operations, safety, and scalability.',
  'Hospitality Design': 'Create memorable hospitality experiences through architecture that delights guests and drives business.',
  'Healthcare Facilities': 'Design healing environments that support patient wellbeing and operational excellence.',
  'Educational Institutions': 'Build inspiring learning spaces that foster creativity, collaboration, and academic success.',
  'Retail Spaces': 'Design retail environments that enhance customer experience and drive sales.',
  'Commercial Spaces': 'Create dynamic commercial environments that inspire productivity and reflect corporate values.'
};

// Generate content for each architect
data.forEach((arch, index) => {
  const firmName = arch.firm_name;
  const location = arch.location;
  const experience = arch.professional_details?.years_experience || 10;
  const specs = arch.professional_details?.specialization || ['Architecture'];
  const philosophy = arch.professional_details?.design_philosophy || 'Excellence in design';
  const founder = arch.professional_details?.founder || 'Principal Architect';
  const designation = arch.professional_details?.designation || 'Design Director';
  const style = arch.portfolio?.signature_style || 'Contemporary';

  const totalProjects = arch.portfolio?.total_projects || 50;
  const residential = arch.portfolio?.residential || 20;
  const commercial = arch.portfolio?.commercial || 15;
  const institutional = arch.portfolio?.institutional || 10;
  const areaDesigned = arch.portfolio?.total_area_designed || '50,000 sq.ft';

  const teamSize = arch.team?.total_size || 5;
  const architects = arch.team?.architects || 3;
  const keyMembers = arch.team?.key_members || [];

  const awards = arch.awards?.awards || [];
  const totalAwards = arch.awards?.total_awards || 0;

  const memberships = arch.registration?.professional_memberships || [];
  const coaReg = arch.registration?.council_of_architecture?.registration_number || '';

  const phone = arch.contact?.phone?.[0] || '+91-11-XXXXXXXX';
  const mobile = arch.contact?.mobile?.[0] || '+91-98XXXXXXXX';
  const email = arch.contact?.email || `info@${firmName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`;

  const tagline = taglines[index % taglines.length];

  // Generate sitemap
  const sitemap = `# Website Sitemap: ${firmName}

## Site Structure

\`\`\`
${firmName.toLowerCase().replace(/[^a-z0-9]/g, '-')}.com/
│
├── index.html                    [Homepage]
│
├── about/
│   └── index.html               [About Us]
│
├── services/
│   ├── index.html               [Services Overview]
${specs.map(s => `│   ├── ${s.toLowerCase().replace(/[^a-z0-9]/g, '-')}/    [${s}]`).join('\n')}
│
├── portfolio/
│   ├── index.html               [All Projects]
│   ├── residential/             [Residential Projects]
│   ├── commercial/              [Commercial Projects]
│   ├── institutional/           [Institutional Projects]
│   └── [project-name]/          [Individual Project Pages]
│
├── team/
│   └── index.html               [Our Team]
│
├── contact/
│   └── index.html               [Contact Us]
│
├── privacy-policy/
│   └── index.html               [Privacy Policy]
│
└── terms/
    └── index.html               [Terms of Service]
\`\`\`

## Page Count
- **Total Pages**: ${8 + specs.length + Math.ceil(totalProjects * 0.3)}
- **Core Pages**: 8
- **Service Pages**: ${specs.length}
- **Portfolio Pages**: ~${Math.ceil(totalProjects * 0.3)} (featured projects)

## Navigation Structure

### Primary Navigation
1. Home
2. About
3. Services (dropdown)
4. Portfolio
5. Team
6. Contact

### Footer Navigation
- Privacy Policy
- Terms of Service
- Sitemap
- Social Media Links

## URL Structure
- Clean, descriptive URLs
- Lowercase with hyphens
- No file extensions visible
- Location-based for local SEO
`;

  // Generate homepage content
  const homepage = `# Homepage Content: ${firmName}

## Hero Section

### Headline
${firmName}

### Tagline
${tagline}

### Introduction
With ${experience} years of architectural excellence in ${location}, ${firmName} transforms visions into iconic structures. Specializing in ${specs.slice(0, 3).join(', ')}, we create spaces that inspire, function flawlessly, and stand the test of time.

### Primary CTA
**Start Your Project** → /contact

### Secondary CTA
**View Portfolio** → /portfolio

---

## Featured Projects Section

### Section Title
Our Latest Work

### Section Subtitle
Explore our recent projects showcasing innovation and excellence

**Display**: 4 featured project cards with:
- Project image
- Project name
- Category
- Location
- "View Project" link

---

## Services Overview

### Section Title
What We Do

### Section Subtitle
Comprehensive architectural services tailored to your needs

${specs.slice(0, 4).map(s => `
**${s}**
${serviceDescriptions[s] || `Professional ${s.toLowerCase()} services delivered with expertise and attention to detail.`}
`).join('\n')}

**CTA**: Explore All Services → /services

---

## Why Choose Us

### Section Title
Why ${firmName}?

### Differentiators

**${experience}+ Years Experience**
Proven track record with ${totalProjects}+ successful projects across ${location} and beyond.

**Award-Winning Design**
${totalAwards > 0 ? `Recognized with ${totalAwards} industry awards for design excellence and innovation.` : 'Committed to design excellence that exceeds industry standards.'}

**Expert Team**
${teamSize} dedicated professionals including ${architects} licensed architects working on your project.

**Client-Centric Approach**
${philosophy}

---

## Testimonial Section

### Section Title
What Our Clients Say

**Testimonial Quote**
"Working with ${firmName} was an exceptional experience. Their attention to detail and understanding of our vision resulted in a space that exceeded our expectations."

**Client**: Satisfied Client
**Project**: Residential Project, ${location}

---

## Call-to-Action Banner

### Headline
Ready to Start Your Project?

### Subtext
Let's discuss your vision and bring it to life with exceptional architecture.

### CTA Button
**Schedule a Consultation** → /contact

---

## Footer Content

### Contact Info
- **Address**: ${location}, Delhi NCR
- **Phone**: ${phone}
- **Mobile**: ${mobile}
- **Email**: ${email}

### Quick Links
- About Us
- Services
- Portfolio
- Contact

### Professional Affiliations
${memberships.length > 0 ? memberships.map(m => `- ${m.organization}`).join('\n') : '- Council of Architecture\n- IIA Member'}

---

## SEO Meta Tags

**Title**: ${firmName} | ${specs[0]} in ${location} | Architecture Firm

**Description**: ${firmName} is a ${experience}-year-old architecture firm in ${location} specializing in ${specs.slice(0, 2).join(' and ')}. ${totalProjects}+ projects completed. Contact for free consultation.

**Keywords**: ${location} architects, ${specs.join(', ').toLowerCase()}, architecture firm delhi, ${firmName.toLowerCase()}
`;

  // Generate about page content
  const about = `# About Page Content: ${firmName}

## Page Title
About ${firmName}

## Hero Section
**Headline**: Our Story
**Subtext**: ${experience} years of architectural excellence in ${location}

---

## Our Story

${firmName} was founded with a singular vision: to create architecture that transcends the ordinary and enriches lives. Based in ${location}, we have spent ${experience} years transforming this vision into reality through thoughtful design and meticulous execution.

What began as a passion for creating meaningful spaces has evolved into a comprehensive architectural practice serving clients across Delhi NCR and beyond. Today, with ${totalProjects}+ completed projects spanning ${areaDesigned}, we continue to push boundaries while honoring the fundamental principles of good design.

Our journey has been marked by continuous learning, innovation, and an unwavering commitment to excellence. Each project we undertake is an opportunity to create something unique—a space that tells a story, serves a purpose, and stands the test of time.

---

## Design Philosophy

### ${philosophy}

At ${firmName}, we believe that great architecture emerges from a deep understanding of context, client needs, and the interplay between form and function. Our ${style} approach ensures that every project we deliver is:

- **Contextually Responsive**: Designed to harmonize with its surroundings
- **Functionally Excellent**: Optimized for how spaces are actually used
- **Aesthetically Refined**: Beautiful in its simplicity and detail
- **Sustainably Conscious**: Mindful of environmental impact
- **Technologically Current**: Leveraging latest tools and methods

---

## Our Mission

To deliver architectural solutions that exceed expectations, enhance lives, and contribute positively to the built environment through innovative design, technical expertise, and unwavering commitment to quality.

## Our Vision

To be the most trusted architecture firm in ${location}, known for design excellence, client satisfaction, and meaningful contribution to urban development.

---

## Milestones

**${2024 - experience}** - Firm established in ${location}
**${2024 - experience + 5}** - Completed 25th project milestone
**${2024 - experience + 10}** - Expanded team to ${teamSize} professionals
${totalAwards > 0 ? `**${2024 - 3}** - Won ${awards[0]?.title || 'industry award'}` : ''}
**Present** - ${totalProjects}+ projects completed across ${areaDesigned}

---

## Credentials & Affiliations

### Council of Architecture
${coaReg ? `Registration Number: ${coaReg}` : 'Registered Member'}

### Professional Memberships
${memberships.length > 0 ? memberships.map(m => `- **${m.organization}**: ${m.membership} Member since ${m.since}`).join('\n') : '- Indian Institute of Architects (IIA)\n- Institute of Indian Interior Designers (IIID)'}

${totalAwards > 0 ? `
---

## Awards & Recognition

${awards.slice(0, 3).map(a => `### ${a.title}
**Year**: ${a.year}
${a.project ? `**Project**: ${a.project}` : ''}
`).join('\n')}
` : ''}

---

## CTA Section

**Headline**: Let's Create Something Remarkable

**Text**: Ready to transform your vision into reality? We'd love to hear about your project.

**Button**: Contact Us → /contact

---

## SEO Meta Tags

**Title**: About Us | ${firmName} - ${location} Architects

**Description**: Learn about ${firmName}'s ${experience} years of architectural excellence in ${location}. ${teamSize} professionals, ${totalProjects}+ projects. ${memberships[0]?.organization || 'IIA'} member.

**Keywords**: about ${firmName.toLowerCase()}, ${location} architecture firm, architects in delhi
`;

  // Generate services page content
  const services = `# Services Page Content: ${firmName}

## Page Title
Our Services

## Hero Section
**Headline**: Comprehensive Architectural Services
**Subtext**: From concept to completion, we deliver excellence at every stage

---

## Services Overview

At ${firmName}, we offer a complete range of architectural services tailored to meet diverse project requirements. With ${experience} years of experience and ${totalProjects}+ successful projects, our team delivers solutions that balance creativity, functionality, and sustainability.

---

## Our Services

${specs.map((service, i) => `
### ${service}

${serviceDescriptions[service] || `Professional ${service.toLowerCase()} services delivered with expertise, innovation, and attention to detail that defines ${firmName}.`}

#### What We Deliver
- Comprehensive design documentation
- 3D visualizations and renderings
- Technical drawings and specifications
- Project coordination and supervision
- Post-completion support

#### Our Process
1. **Consultation**: Understand your requirements, budget, and timeline
2. **Concept Development**: Create initial designs and options
3. **Design Development**: Refine selected concept with details
4. **Documentation**: Prepare construction drawings and specs
5. **Execution Support**: Coordinate with contractors and supervise

#### Ideal For
${service.includes('Residential') ? 'Homeowners, developers, and investors looking for bespoke living spaces' :
  service.includes('Commercial') ? 'Businesses seeking functional, brand-aligned workspaces' :
  service.includes('Interior') ? 'Clients wanting cohesive interior solutions for any space type' :
  service.includes('Sustainable') ? 'Organizations committed to environmental responsibility' :
  service.includes('Urban') ? 'Government bodies, developers, and communities' :
  service.includes('Heritage') ? 'Property owners of historic buildings and conservation bodies' :
  `Clients seeking professional ${service.toLowerCase()} solutions`}

**CTA**: Discuss Your ${service} Project → /contact
`).join('\n\n---\n')}

---

## Our Approach

### Client-Centric Design
Every project begins with listening. We invest time understanding your needs, preferences, and constraints to deliver solutions that truly work for you.

### Technical Excellence
Our team combines creative vision with technical rigor, ensuring designs that are both inspiring and buildable within budget and timeline.

### Collaborative Process
We believe in transparent communication and collaborative decision-making throughout the project lifecycle.

### Quality Assurance
Rigorous quality checks at every stage ensure the final outcome matches our exacting standards and your expectations.

---

## Project Statistics

- **Total Projects**: ${totalProjects}+
- **Residential**: ${residential} projects
- **Commercial**: ${commercial} projects
- **Institutional**: ${institutional} projects
- **Total Area**: ${areaDesigned}

---

## CTA Section

**Headline**: Ready to Begin?

**Text**: Tell us about your project and let's explore how we can help bring your vision to life.

**Button**: Get a Free Consultation → /contact

---

## SEO Meta Tags

**Title**: Architectural Services | ${firmName} - ${location}

**Description**: ${firmName} offers ${specs.slice(0, 3).join(', ')} services in ${location}. ${experience} years experience, ${totalProjects}+ projects. Free consultation available.

**Keywords**: ${specs.map(s => s.toLowerCase()).join(', ')}, architecture services ${location.toLowerCase()}, ${firmName.toLowerCase()} services
`;

  // Generate contact page content
  const contact = `# Contact Page Content: ${firmName}

## Page Title
Contact Us

## Hero Section
**Headline**: Let's Start a Conversation
**Subtext**: We'd love to hear about your project

---

## Contact Information

### Office Address
${firmName}
${location}
Delhi NCR, India

### Phone
**Office**: ${phone}
**Mobile**: ${mobile}

### Email
**General Inquiries**: ${email}
**Projects**: projects@${firmName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com

### Business Hours
Monday - Friday: 10:00 AM - 6:00 PM
Saturday: 10:00 AM - 2:00 PM
Sunday: Closed

---

## Contact Form

### Form Fields
1. **Name** (Required) - Text field
2. **Email** (Required) - Email field
3. **Phone** (Required) - Phone field
4. **Project Type** (Required) - Dropdown
   - Residential
   - Commercial
   - Institutional
   - Interior Design
   - Other
5. **Project Location** - Text field
6. **Budget Range** - Dropdown
   - Under ₹25 Lakhs
   - ₹25 - 50 Lakhs
   - ₹50 Lakhs - 1 Crore
   - ₹1 - 5 Crores
   - Above ₹5 Crores
7. **Message** (Required) - Textarea

### Submit Button
**Send Message**

### Form Success Message
Thank you for reaching out! We've received your message and will contact you within 24 hours.

---

## Map Section

**Embed**: Google Maps showing office location in ${location}, Delhi NCR

---

## FAQ Section

### How do I start a project with ${firmName}?
Simply fill out the contact form or call us to schedule an initial consultation. We'll discuss your requirements, timeline, and budget to understand how we can help.

### Do you offer free consultations?
Yes, we offer a complimentary initial consultation to understand your project needs and explain our process and approach.

### What areas do you serve?
We primarily serve Delhi NCR including ${location}, but also take on projects across India based on scope and requirements.

### How long does a typical project take?
Project timelines vary based on scope and complexity. A residential project typically takes 8-12 months from design to completion, while larger commercial projects may take 18-24 months.

### What information should I prepare for the first meeting?
It's helpful to have your site details, approximate budget, timeline expectations, and any reference images or ideas you'd like to share.

---

## CTA Section

**Headline**: Prefer to Talk?

**Text**: Call us directly for immediate assistance

**Phone Display**: ${mobile}

---

## Social Media Links

- LinkedIn: linkedin.com/company/${firmName.toLowerCase().replace(/[^a-z0-9]/g, '-')}
- Instagram: @${firmName.toLowerCase().replace(/[^a-z0-9]/g, '')}
- Facebook: facebook.com/${firmName.toLowerCase().replace(/[^a-z0-9]/g, '')}

---

## SEO Meta Tags

**Title**: Contact ${firmName} | ${location} Architecture Firm

**Description**: Contact ${firmName} for your architecture project in ${location}. Call ${mobile} or email ${email}. Free consultation available. ${experience}+ years experience.

**Keywords**: contact ${firmName.toLowerCase()}, ${location} architects contact, architecture firm delhi phone, ${firmName.toLowerCase()} email
`;

  // Generate meta tags file
  const metaTags = `# SEO Meta Tags: ${firmName}

## Homepage
\`\`\`html
<title>${firmName} | ${specs[0]} in ${location} | Architecture Firm</title>
<meta name="description" content="${firmName} is a ${experience}-year-old architecture firm in ${location} specializing in ${specs.slice(0, 2).join(' and ')}. ${totalProjects}+ projects completed. Contact for free consultation.">
<meta name="keywords" content="${location} architects, ${specs.join(', ').toLowerCase()}, architecture firm delhi, ${firmName.toLowerCase()}">
<link rel="canonical" href="https://${firmName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com/">

<!-- Open Graph -->
<meta property="og:title" content="${firmName} | Architecture Firm in ${location}">
<meta property="og:description" content="${experience} years of architectural excellence. ${totalProjects}+ projects completed.">
<meta property="og:type" content="website">
<meta property="og:url" content="https://${firmName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com/">

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${firmName} | Architecture Firm">
<meta name="twitter:description" content="${specs.slice(0, 2).join(' and ')} in ${location}">
\`\`\`

## About Page
\`\`\`html
<title>About Us | ${firmName} - ${location} Architects</title>
<meta name="description" content="Learn about ${firmName}'s ${experience} years of architectural excellence in ${location}. ${teamSize} professionals, ${totalProjects}+ projects. ${memberships[0]?.organization || 'IIA'} member.">
<meta name="keywords" content="about ${firmName.toLowerCase()}, ${location} architecture firm history, architects team delhi">
<link rel="canonical" href="https://${firmName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com/about/">
\`\`\`

## Services Page
\`\`\`html
<title>Architectural Services | ${firmName} - ${location}</title>
<meta name="description" content="${firmName} offers ${specs.slice(0, 3).join(', ')} services in ${location}. ${experience} years experience, ${totalProjects}+ projects. Free consultation available.">
<meta name="keywords" content="${specs.map(s => s.toLowerCase()).join(', ')}, architecture services delhi, ${firmName.toLowerCase()} services">
<link rel="canonical" href="https://${firmName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com/services/">
\`\`\`

## Portfolio Page
\`\`\`html
<title>Portfolio | ${firmName} - Architecture Projects ${location}</title>
<meta name="description" content="Explore ${firmName}'s portfolio of ${totalProjects}+ projects including residential, commercial, and institutional architecture in ${location} and Delhi NCR.">
<meta name="keywords" content="${firmName.toLowerCase()} projects, architecture portfolio delhi, ${location} building designs">
<link rel="canonical" href="https://${firmName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com/portfolio/">
\`\`\`

## Team Page
\`\`\`html
<title>Our Team | ${firmName} - ${location} Architects</title>
<meta name="description" content="Meet ${firmName}'s team of ${teamSize} professionals including ${architects} licensed architects. Led by ${founder}, ${designation}.">
<meta name="keywords" content="${firmName.toLowerCase()} team, ${location} architects, ${founder.toLowerCase()}">
<link rel="canonical" href="https://${firmName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com/team/">
\`\`\`

## Contact Page
\`\`\`html
<title>Contact ${firmName} | ${location} Architecture Firm</title>
<meta name="description" content="Contact ${firmName} for your architecture project in ${location}. Call ${mobile} or email ${email}. Free consultation available.">
<meta name="keywords" content="contact ${firmName.toLowerCase()}, ${location} architects phone, architecture firm delhi contact">
<link rel="canonical" href="https://${firmName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com/contact/">
\`\`\`

## Schema Markup (JSON-LD)
\`\`\`json
{
  "@context": "https://schema.org",
  "@type": "ArchitecturalFirm",
  "name": "${firmName}",
  "description": "${philosophy}",
  "url": "https://${firmName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com",
  "telephone": "${mobile}",
  "email": "${email}",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "${location}",
    "addressRegion": "Delhi NCR",
    "addressCountry": "IN"
  },
  "founder": {
    "@type": "Person",
    "name": "${founder}"
  },
  "foundingDate": "${2024 - experience}",
  "numberOfEmployees": "${teamSize}",
  "areaServed": "Delhi NCR",
  "serviceType": ${JSON.stringify(specs)}
}
\`\`\`
`;

  // Create content folder and write files
  const folderPath = path.join('leads/architects/no-site', firmName);
  const contentPath = path.join(folderPath, 'content');

  try {
    // Create content directory
    fs.mkdirSync(contentPath, { recursive: true });

    // Write all files
    fs.writeFileSync(path.join(folderPath, 'sitemap.md'), sitemap);
    fs.writeFileSync(path.join(contentPath, 'homepage.md'), homepage);
    fs.writeFileSync(path.join(contentPath, 'about.md'), about);
    fs.writeFileSync(path.join(contentPath, 'services.md'), services);
    fs.writeFileSync(path.join(contentPath, 'contact.md'), contact);
    fs.writeFileSync(path.join(folderPath, 'meta-tags.md'), metaTags);

    console.log(`[${index + 1}/200] Created content for: ${firmName}`);
  } catch (err) {
    console.error(`Error writing ${firmName}: ${err.message}`);
  }
});

console.log('\nCompleted generating website content for 200 architects!');
