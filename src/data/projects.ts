export type Project = {
  number: string;
  slug: string;
  title: string;
  category: string;
  status: 'In Progress' | 'Planned';
  summary: string;
  tags: string[];
  overview: string;
  current: string[];
  next: string[];
  repository?: string;
  liveUrl?: string;
};

// Update statuses and evidence as work is completed. Omit links until verified.
export const projects: Project[] = [
  {
    number: '001', slug: 'portfolio-as-code', title: 'Portfolio-as-Code',
    category: 'Web engineering / infrastructure', status: 'In Progress',
    summary: 'A personal engineering portfolio, built in code. Starting with Astro locally, with an Azure delivery workflow planned next.',
    tags: ['Astro', 'TypeScript', 'Azure · planned'],
    overview: 'This portfolio is Project 001: a practical starting point for connecting application development with cloud delivery. The initial scope is a responsive, static Astro website with reusable components and editable project content.',
    current: ['Astro and TypeScript website implementation.', 'Responsive layouts, project detail pages, and a professional profile.', 'Local development and production build workflow.'],
    next: ['Review content and add a verified résumé PDF.', 'Plan Azure Static Web Apps hosting.', 'Introduce GitHub Actions and Azure Bicep after approval.'],
  },
  {
    number: '002', slug: 'azure-engineering', title: 'Azure engineering project',
    category: 'Cloud / DevOps', status: 'Planned',
    summary: 'A dedicated space for hands-on Azure engineering, infrastructure automation, and delivery practices as the scope takes shape.',
    tags: ['Azure · planned', 'Bicep · planned', 'GitHub Actions · planned'],
    overview: 'A planned project to develop practical cloud and DevOps engineering skills on top of an established software development background. The architecture and implementation scope have not yet been finalized.',
    current: ['Project entry reserved; implementation has not been documented.'],
    next: ['Define a focused engineering problem and architecture.', 'Document infrastructure, delivery decisions, and learning outcomes.', 'Add verified implementation evidence as work progresses.'],
  },
  {
    number: '003', slug: 'home-networking-lab', title: 'Home networking lab',
    category: 'Networking / systems', status: 'In Progress',
    summary: 'Hands-on home networking with a Cisco SG300 managed switch, VLAN segmentation, a UniFi gateway, DHCP, and network configuration.',
    tags: ['Cisco SG300', 'VLANs', 'UniFi', 'DHCP'],
    overview: 'An active home networking lab connecting practical networking work with my broader engineering development. Work so far includes a Cisco SG300 managed switch, VLAN segmentation, a UniFi gateway, DHCP, and network configuration.',
    current: ['Hands-on work with a Cisco SG300 managed switch and VLAN segmentation.', 'Hands-on work with a UniFi gateway, DHCP, and network configuration.'],
    next: ['Document the network topology and configuration decisions.', 'Record future testing and troubleshooting as it is performed.', 'Add supporting configuration examples and engineering notes.'],
  },
  {
    number: '004', slug: 'family-website', title: 'A website for my son',
    category: 'Web development / personal', status: 'Planned',
    summary: 'A personal web project for my son, with room to explore thoughtful design and build something meaningful together.',
    tags: ['Web development', 'Design', 'Personal project'],
    overview: 'A planned personal website for my son. Content, technology, and design decisions are still to be defined. Personal details are intentionally kept private.',
    current: ['Project entry reserved; development is not yet documented.'],
    next: ['Agree on the purpose and content.', 'Choose a suitable design and implementation.', 'Share the engineering work without exposing private family information.'],
  },
];
