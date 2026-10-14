/**
 * ============================================================================
 *  PROJECTS CONFIG — The single source of truth for all docs.
 * ============================================================================
 *
 *  TO ADD A NEW PROJECT:
 *    1. Add a new entry below following the same structure.
 *    2. Create matching folders under public/content/{your-project-slug}/
 *    3. Place .md files inside: public/content/{slug}/{section}/{page}.md
 *
 *  The site auto-generates: sidebar nav, breadcrumbs, landing cards, routes.
 *  No other files need to be touched.
 *
 *  STRUCTURE per project:
 *  {
 *    name:        'Human-readable name shown everywhere',
 *    description: 'Short summary shown on home card & project landing',
 *    icon:        'Any emoji — used on home cards & project header',
 *    repo:        'GitHub repo URL (optional — powers "Edit this page" link)',
 *    sections: {
 *      'section-slug': {
 *        title: 'Section label in sidebar & landing cards',
 *        pages: [
 *          { slug: 'page-slug', title: 'Page title in sidebar' },
 *          ...
 *        ]
 *      },
 *      ...
 *    }
 *  }
 * ============================================================================
 */

export const projects = {


  

  // ── Plasma FSM ──────────────────────────────────────────────────────────────
  'plasma': {
    name: 'Plasma FSM',
    description: 'A Powerful FSM Tool for Plasma.',
    icon: '🛠️',
    repo: 'https://github.com/your-org/project-two',
    sections: {
      'getting-started': {
        title: 'Getting Started',
        pages: [
          { slug: 'introduction', title: 'Introduction' },
        ],
      },
      'product-stock-management': {
        title: 'Product Stock Management',
        pages: [
          { slug: 'overview', title: 'Overview' },
          { slug: 'stock-columns', title: 'Stock Columns' },
          { slug: 'stock-helpers', title: 'Stock Helper Methods' },
          { slug: 'visit-job-lifecycle', title: 'Visit / Job Lifecycle' },
          { slug: 'serialized-products', title: 'Serialized Products' },
          { slug: 'stock-adjustments', title: 'Stock Adjustments' },
          { slug: 'audit-trail', title: 'Audit Trail' },
          { slug: 'rules-for-developers', title: 'Rules for Developers' },
        ],
      },
    },
  },
  // ── Econpile ──────────────────────────────────────────────────────────────
  'econpile': {
    name: 'Econpile',
    description: 'FSM platform — the QR-scan Public Service Portal that lets anyone on site report a fault or fill an asset inspection checklist from a phone, with no login.',
    icon: '📱',
    sections: {
      'getting-started': {
        title: 'Getting Started',
        pages: [
          { slug: 'introduction', title: 'Introduction' },
        ],
      },
      'qr-scan-portal': {
        title: 'QR Scan → Public Portal',
        pages: [
          { slug: 'overview', title: 'Overview' },
          { slug: 'qr-codes', title: 'QR Codes & URLs' },
          { slug: 'public-portal', title: 'Public Portal (Frontend)' },
          { slug: 'checklist-definitions', title: 'Checklist Definitions & JSON Seeder' },
          { slug: 'settings', title: 'Settings (Admin)' },
          { slug: 'submissions', title: 'Submissions & Database' },
          { slug: 'api-reference', title: 'API Reference' },
          { slug: 'reports', title: 'Reports' },
          { slug: 'security-and-rate-limits', title: 'Security & Rate Limits' },
          { slug: 'troubleshooting', title: 'Troubleshooting' },
        ],
      },
    },
  },

  // ── ROKKO ─────────────────────────────────────────────────────────────────
  'rokko': {
    name: 'ROKKO',
    description: 'A powerful FSM Tool.',
    icon: '🚀',
    repo: 'https://github.com/your-org/project-one',
    sections: {
      'getting-started': {
        title: 'Modules',
        pages: [
          {
            slug: 'bom-product',
            title: 'Products & Parts',
            children: [
              
              { slug: 'components', title: 'Parts' },
              {
                slug: 'assembly',
                title: 'Products',
                // children: [
                //   { slug: 'electronics', title: 'Electronics' },
                //   { slug: 'mechanical', title: 'Mechanical' },
                // ],
              },
              { slug: 'overview', title: 'BOM Product',
                children: [
                  { slug: 'bom-intro', title: 'Overview' },
                  { slug: 'bom-flow', title: 'BOM Flow' },
                  { slug: 'finished-unit', title: 'Finished Unit Component Management' },
                ],
               },
            ],
          },
          {
            slug: 'customer-assets',
            title: 'Customer Assets',
            children: [
              { slug: 'overview', title: 'Overview' },
              { slug: 'flow', title: 'End-to-End Flow' },
              { slug: 'identical-bom-flow', title: 'Identical BOM Flow' },
              { slug: 'backend-architecture', title: 'Backend Architecture' },
              { slug: 'database-tables', title: 'Database Tables' },
              { slug: 'frontend-components', title: 'Frontend & Components' },
              {
                slug: 'cross-module-impact',
                title: 'Cross-Module Impact & Inventory',
              },
            ],
          },
          // { slug: 'installation', title: 'Installation' },
          // { slug: 'quick-start', title: 'Quick Start' },
        ],
      },
      // 'guides': {
      //   title: 'Guides',
      //   pages: [
      //     { slug: 'authentication', title: 'Authentication' },
      //     { slug: 'data-models', title: 'Data Models' },
      //     { slug: 'error-handling', title: 'Error Handling' },
      //   ],
      // },
      // 'api': {
      //   title: 'API Reference',
      //   pages: [
      //     { slug: 'overview', title: 'Overview' },
      //     // { slug: 'rest-endpoints', title: 'REST Endpoints' },
      //     // { slug: 'webhooks', title: 'Webhooks' },
      //   ],
      // },
    },
  },

  

}

