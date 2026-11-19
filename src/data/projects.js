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
  'cmworkz': {
    name: 'CM Werkz (Tnine)',
    description: 'Field-service operations platform with transformer oil sampling, analysis, and PDF reporting.',
    icon: '⚡',
    sections: {
      'getting-started': {
        title: 'Getting Started',
        pages: [
          { slug: 'overview', title: 'Overview', contentSegments: ['getting-started', 'introduction'], children: [
            { slug: 'introduction', title: 'Introduction', contentSegments: ['getting-started', 'introduction'] },
            { slug: 'local-development', title: 'Local Development & Operations', contentSegments: ['getting-started', 'local-development'] },
          ] },
        ],
      },
      'architecture': {
        title: 'Architecture & Data',
        pages: [
          { slug: 'overview', title: 'Overview', contentSegments: ['architecture', 'system-architecture'], children: [
            { slug: 'system-architecture', title: 'System Architecture', contentSegments: ['architecture', 'system-architecture'] },
            { slug: 'core-data-model', title: 'Core Data Model', contentSegments: ['architecture', 'core-data-model'] },
            { slug: 'routes-and-api', title: 'Frontend Routes & API Surface', contentSegments: ['architecture', 'routes-and-api'] },
          ] },
        ],
      },
      'oil-analysis': {
        title: 'Transformer Oil Analysis',
        pages: [
          { slug: 'overview', title: 'Overview', contentSegments: ['oil-analysis', 'workflow'], children: [
            { slug: 'workflow', title: 'End-to-End Workflow', contentSegments: ['oil-analysis', 'workflow'] },
            { slug: 'batches-and-samples', title: 'Oil Batches & Samples', contentSegments: ['oil-analysis', 'batches-and-samples'] },
            { slug: 'reports-and-pdf', title: 'Reports, Charts & PDF Generation', contentSegments: ['oil-analysis', 'reports-and-pdf'] },
            { slug: 'troubleshooting', title: 'Troubleshooting & Safe Changes', contentSegments: ['oil-analysis', 'troubleshooting'] },
          ] },
        ],
      },
      'field-service': {
        title: 'Field Service',
        pages: [
          { slug: 'overview', title: 'Overview', contentSegments: ['field-service', 'jobs-visits-line-items'], children: [
            { slug: 'jobs-visits-line-items', title: 'Jobs, Visits & Line Items', contentSegments: ['field-service', 'jobs-visits-line-items'] },
            { slug: 'active-modules', title: 'Active Modules & Menu Seed', contentSegments: ['field-service', 'active-modules'] },
          ] },
        ],
      },
    },
  },


  

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
          { slug: 'overview', title: 'Overview', contentSegments: ['getting-started', 'introduction'] },
          { slug: 'introduction', title: 'Introduction', contentSegments: ['getting-started', 'introduction'] },
        ],
      },
      'product-stock-management': {
        title: 'Product Stock Management',
        pages: [
          { slug: 'overview', title: 'Overview', contentSegments: ['product-stock-management', 'overview'] },
          { slug: 'stock-columns', title: 'Stock Columns', contentSegments: ['product-stock-management', 'stock-columns'] },
          { slug: 'stock-helpers', title: 'Stock Helper Methods', contentSegments: ['product-stock-management', 'stock-helpers'] },
          { slug: 'visit-job-lifecycle', title: 'Visit / Job Lifecycle', contentSegments: ['product-stock-management', 'visit-job-lifecycle'] },
          { slug: 'serialized-products', title: 'Serialized Products', contentSegments: ['product-stock-management', 'serialized-products'] },
          { slug: 'stock-adjustments', title: 'Stock Adjustments', contentSegments: ['product-stock-management', 'stock-adjustments'] },
          { slug: 'audit-trail', title: 'Audit Trail', contentSegments: ['product-stock-management', 'audit-trail'] },
          { slug: 'rules-for-developers', title: 'Rules for Developers', contentSegments: ['product-stock-management', 'rules-for-developers'] },
        ],
      },
      'rental': {
        title: 'Rental',
        pages: [
          { slug: 'overview', title: 'Overview' },
          { slug: 'architecture-and-dependencies', title: 'Architecture & Dependencies' },
          { slug: 'buttons-and-statuses', title: 'Buttons & Statuses' },
          { slug: 'return-process', title: 'Return Process' },
          { slug: 'api-reference', title: 'API Reference' },
          { slug: 'jobs-and-troubleshooting', title: 'Jobs & Troubleshooting' },
        ],
      },
      'customer-owned-assets': {
        title: 'Customer-Owned Assets',
        pages: [
          { slug: 'overview', title: 'Overview' },
          { slug: 'item-list-and-detail', title: 'Item List & Detail' },
          { slug: 'rental-history', title: 'Asset Rental History' },
          { slug: 'status-and-return-conditions', title: 'Status & Return Conditions' },
          { slug: 'database-and-debugging', title: 'Database & Debugging' },
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
      'modules': {
        title: 'Product Modules',
        pages: [
          { slug: 'dashboard', title: 'Dashboard' },
          { slug: 'calendar', title: 'Calendar', children: [
            { slug: 'job-calendar', title: 'Job Calendar' },
            { slug: 'resource-calendar', title: 'Resource Calendar' },
          ] },
          { slug: 'crm', title: 'CRM', children: [
            { slug: 'customers', title: 'Customers' },
            { slug: 'suppliers', title: 'Suppliers' },
            { slug: 'sites', title: 'Sites' },
          ] },
          { slug: 'technicians', title: 'Technicians' },
          { slug: 'project', title: 'Project' },
          { slug: 'visit', title: 'Visit', children: [
            { slug: 'adhoc-job', title: 'Adhoc Job' },
            { slug: 'recurring-job', title: 'Recurring Job' },
          ] },
          { slug: 'rental', title: 'Rental', children: [
            { slug: 'rentals-contracts', title: 'Rentals Contracts' },
            { slug: 'rentals-items', title: 'Rentals Items' },
          ] },
          { slug: 'products-parts', title: 'Products & Parts', children: [
            { slug: 'products', title: 'Products' },
            { slug: 'parts', title: 'Parts' },
          ] },
          { slug: 'service', title: 'Service' },
          { slug: 'tools', title: 'Tools' },
          { slug: 'asset', title: 'Asset', children: [
            { slug: 'own-asset', title: 'Own Asset' },
            { slug: 'sub-asset', title: 'Sub Asset' },
          ] },
          { slug: 'warranty', title: 'Warranty' },
          { slug: 'delivery', title: 'Delivery', children: [
            {
              slug: 'delivery-module-rental-conversion',
              title: 'Overview & Rental Conversion',
              contentSegments: ['delivery-module', 'delivery'],
            },
            { slug: 'incoming', title: 'Incoming' },
            { slug: 'outgoing', title: 'Outgoing' },
            { slug: 'transfer', title: 'Transfer' },
          ] },
          { slug: 'reports', title: 'Reports', children: [
            { slug: 'technicians-attendance', title: 'Technicians Attendance' },
            { slug: 'technicians-visit-timesheet', title: 'Technicians Visit Timesheet' },
            { slug: 'visit-service-form', title: 'Visit Service Form' },
            { slug: 'asset-daily-report', title: 'Asset Daily Report' },
          ] },
          { slug: 'enquiry', title: 'Enquiry' },
        ],
      },
      'qr-scan-portal': {
        title: 'QR Scan → Public Portal',
        pages: [
          { slug: 'portal', title: 'QR Scan → Public Portal', children: [
            { slug: 'qr-codes', title: 'QR Codes & URLs', contentPath: 'qr-codes' },
            { slug: 'overview', title: 'Overview', contentPath: 'overview' },
            { slug: 'public-portal', title: 'Public Portal (Frontend)', contentPath: 'public-portal' },
            { slug: 'checklist-definitions', title: 'Checklist Definitions & JSON Seeder', contentPath: 'checklist-definitions' },
            { slug: 'settings', title: 'Settings (Admin)', contentPath: 'settings' },
            { slug: 'submissions', title: 'Submissions & Database', contentPath: 'submissions' },
            { slug: 'api-reference', title: 'API Reference', contentPath: 'api-reference' },
            { slug: 'reports', title: 'Reports', contentPath: 'reports' },
            { slug: 'security-and-rate-limits', title: 'Security & Rate Limits', contentPath: 'security-and-rate-limits' },
            { slug: 'troubleshooting', title: 'Troubleshooting', contentPath: 'troubleshooting' },
          ] },
        ],
      },
      'maintenance-cost': {
        title: 'Asset Maintenance Cost',
        pages: [
          { slug: 'asset-maintenance-cost', title: 'Asset Maintenance Cost', children: [
            { slug: 'overview', title: 'Overview', contentPath: 'overview' },
            { slug: 'calculation', title: 'How the Numbers Are Calculated', contentPath: 'calculation' },
            { slug: 'worked-examples', title: 'Worked Examples', contentPath: 'worked-examples' },
            { slug: 'api-and-integration', title: 'API & Integration', contentPath: 'api-and-integration' },
          ] },
        ],
      },
      'engineering-standards': {
        title: 'Engineering Standards',
        pages: [
          { slug: 'input-validation', title: 'Input Validation & Data Quality' },
          { slug: 'cross-module-impact', title: 'Cross-Module Impact' },
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

