/**
 * ============================================================================
 *  PROJECTS CONFIG â€” The single source of truth for all docs.
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
 *    icon:        'Any emoji â€” used on home cards & project header',
 *    repo:        'GitHub repo URL (optional â€” powers "Edit this page" link)',
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
    name: 'CM Werkz',
    description: 'Field-service operations platform with customer, site, service, inventory, finance, and transformer-oil workflows.',
    icon: 'CM',
    sections: {
      'getting-started': {
        title: 'Getting Started',
        pages: [
          { slug: 'introduction', title: 'Introduction', contentSegments: ['getting-started', 'introduction'] },
          { slug: 'local-development', title: 'Local Development & Operations', contentSegments: ['getting-started', 'local-development'] },
          { slug: 'troubleshooting', title: 'Troubleshooting', contentSegments: ['getting-started', 'troubleshooting'] },
          { slug: 'developer-quick-reference', title: 'Developer Quick Reference', contentSegments: ['getting-started', 'developer-quick-reference'] },
        ],
      },
      'architecture': {
        title: 'Architecture & Data',
        pages: [
          { slug: 'system-architecture', title: 'System Architecture', contentSegments: ['architecture', 'system-architecture'] },
          { slug: 'core-data-model', title: 'Core Data Model', contentSegments: ['architecture', 'core-data-model'] },
          { slug: 'routes-and-api', title: 'Frontend Routes & API Surface', contentSegments: ['architecture', 'routes-and-api'] },
          { slug: 'complete-api-route-inventory', title: 'Complete API Route Inventory', contentSegments: ['architecture', 'complete-api-route-inventory'] },
          { slug: 'controller-method-inventory', title: 'Controller Method Inventory', contentSegments: ['architecture', 'controller-method-inventory'] },
          { slug: 'model-relationship-inventory', title: 'Model Relationship Inventory', contentSegments: ['architecture', 'model-relationship-inventory'] },
          { slug: 'pdf-print-excel-data-flow', title: 'PDF, Print, Excel & Export Data Flow', contentSegments: ['architecture', 'pdf-print-excel-data-flow'] },
        ],
      },
      'modules': {
        title: 'Product Modules',
        pages: [
          { slug: 'customer', title: 'Customer', children: [
            { slug: 'overview', title: 'Customer Overview', contentSegments: ['modules', 'customer', 'overview'] },
            { slug: 'contacts-and-addresses', title: 'Contacts & Addresses', contentSegments: ['modules', 'customer', 'contacts-and-addresses'] },
            { slug: 'listing-and-item-actions', title: 'Listing & Item Page Features', contentSegments: ['modules', 'customer', 'listing-and-item-actions'] },
          ] },
          { slug: 'site', title: 'Site / Property', children: [
            { slug: 'overview', title: 'Site Overview', contentSegments: ['modules', 'site', 'overview'] },
            { slug: 'listing-and-item-actions', title: 'Listing & Item Page Features', contentSegments: ['modules', 'site', 'listing-and-item-actions'] },
          ] },
          { slug: 'supplier', title: 'Supplier', children: [
            { slug: 'overview', title: 'Supplier Overview', contentSegments: ['modules', 'supplier', 'overview'] },
            { slug: 'listing-and-item-actions', title: 'Listing & Item Page Features', contentSegments: ['modules', 'supplier', 'listing-and-item-actions'] },
          ] },
          { slug: 'engineer', title: 'Engineer & Teams', children: [
            { slug: 'overview', title: 'Engineer Overview', contentSegments: ['modules', 'engineer', 'overview'] },
            { slug: 'teams-and-permissions', title: 'Teams & Permissions', contentSegments: ['modules', 'engineer', 'teams-and-permissions'] },
            { slug: 'listing-and-item-actions', title: 'Listing & Item Page Features', contentSegments: ['modules', 'engineer', 'listing-and-item-actions'] },
          ] },
          { slug: 'products-parts', title: 'Products & Parts', children: [
            { slug: 'overview', title: 'Products & Parts Overview', contentSegments: ['modules', 'products-parts', 'overview'] },
            { slug: 'stock-and-batches', title: 'Stock & Batches', contentSegments: ['modules', 'products-parts', 'stock-and-batches'] },
            { slug: 'listing-and-item-actions', title: 'Listing & Item Page Features', contentSegments: ['modules', 'products-parts', 'listing-and-item-actions'] },
          ] },
          { slug: 'equipment-assets', title: 'Equipment & Assets', children: [
            { slug: 'overview', title: 'Equipment Overview', contentSegments: ['modules', 'equipment-assets', 'overview'] },
            { slug: 'rentals-and-warranty', title: 'Rentals & Warranty', contentSegments: ['modules', 'equipment-assets', 'rentals-and-warranty'] },
            { slug: 'listing-and-item-actions', title: 'Listing & Item Page Features', contentSegments: ['modules', 'equipment-assets', 'listing-and-item-actions'] },
          ] },
          { slug: 'jobs-visits', title: 'Jobs, Visits & Service', children: [
            { slug: 'overview', title: 'Jobs & Visits Overview', contentSegments: ['modules', 'jobs-visits', 'overview'] },
            { slug: 'visits-and-scheduling', title: 'Visits & Scheduling', contentSegments: ['modules', 'jobs-visits', 'visits-and-scheduling'] },
            { slug: 'service-forms-and-line-items', title: 'Service Forms & Line Items', contentSegments: ['modules', 'jobs-visits', 'service-forms-and-line-items'] },
            { slug: 'listing-and-item-actions', title: 'Listing & Item Page Features', contentSegments: ['modules', 'jobs-visits', 'listing-and-item-actions'] },
          ] },
          { slug: 'quotation-contract', title: 'Quotations & Contracts', children: [
            { slug: 'overview', title: 'Quotation & Contract Overview', contentSegments: ['modules', 'quotation-contract', 'overview'] },
            { slug: 'quotation', title: 'Quotation', contentSegments: ['modules', 'quotation-contract', 'quotation'] },
            { slug: 'contract', title: 'Contract', contentSegments: ['modules', 'quotation-contract', 'contract'] },
            { slug: 'pdf-and-signature', title: 'PDF & Signature', contentSegments: ['modules', 'quotation-contract', 'pdf-and-signature'] },
            { slug: 'listing-and-item-actions', title: 'Listing & Item Page Features', contentSegments: ['modules', 'quotation-contract', 'listing-and-item-actions'] },
          ] },
          { slug: 'purchase-orders', title: 'Purchase Orders', children: [
            { slug: 'overview', title: 'Purchase Order Overview', contentSegments: ['modules', 'purchase-orders', 'overview'] },
            { slug: 'receiving-and-stock', title: 'Receiving & Stock', contentSegments: ['modules', 'purchase-orders', 'receiving-and-stock'] },
            { slug: 'listing-and-item-actions', title: 'Listing & Item Page Features', contentSegments: ['modules', 'purchase-orders', 'listing-and-item-actions'] },
          ] },
          { slug: 'invoice-payment', title: 'Invoices, Payments & Credit Notes', children: [
            { slug: 'overview', title: 'Invoice & Payment Overview', contentSegments: ['modules', 'invoice-payment', 'overview'] },
            { slug: 'invoices', title: 'Invoices', contentSegments: ['modules', 'invoice-payment', 'invoices'] },
            { slug: 'payments-and-credit-notes', title: 'Payments & Credit Notes', contentSegments: ['modules', 'invoice-payment', 'payments-and-credit-notes'] },
            { slug: 'recurring-and-overdue', title: 'Recurring & Overdue', contentSegments: ['modules', 'invoice-payment', 'recurring-and-overdue'] },
            { slug: 'listing-and-item-actions', title: 'Listing & Item Page Features', contentSegments: ['modules', 'invoice-payment', 'listing-and-item-actions'] },
          ] },
          { slug: 'projects-tasks-expenses', title: 'Projects, Tasks & Expenses', children: [
            { slug: 'overview', title: 'Projects Overview', contentSegments: ['modules', 'projects-tasks-expenses', 'overview'] },
            { slug: 'listing-and-item-actions', title: 'Listing & Item Page Features', contentSegments: ['modules', 'projects-tasks-expenses', 'listing-and-item-actions'] },
          ] },
          { slug: 'preventive-maintenance', title: 'Preventive Maintenance', children: [
            { slug: 'overview', title: 'Preventive Maintenance Overview', contentSegments: ['modules', 'preventive-maintenance', 'overview'] },
            { slug: 'listing-and-item-actions', title: 'Listing & Item Page Features', contentSegments: ['modules', 'preventive-maintenance', 'listing-and-item-actions'] },
          ] },
          { slug: 'oil-batch', title: 'Oil Batch', children: [
            { slug: 'overview', title: 'Oil Batch Overview', contentSegments: ['modules', 'oil-batch', 'overview'] },
            { slug: 'listing-and-item-actions', title: 'Listing & Item Page Features', contentSegments: ['modules', 'oil-batch', 'listing-and-item-actions'] },
          ] },
          { slug: 'oil-sample', title: 'Oil Sample', children: [
            { slug: 'overview', title: 'Oil Sample Overview', contentSegments: ['modules', 'oil-sample', 'overview'] },
            { slug: 'listing-and-item-actions', title: 'Listing & Item Page Features', contentSegments: ['modules', 'oil-sample', 'listing-and-item-actions'] },
          ] },
          { slug: 'oil-report', title: 'Oil Reports', children: [
            { slug: 'overview', title: 'Oil Report Overview', contentSegments: ['modules', 'oil-report', 'overview'] },
            { slug: 'pdf-and-results', title: 'PDF & Results', contentSegments: ['modules', 'oil-report', 'pdf-and-results'] },
            { slug: 'listing-and-item-actions', title: 'Listing & Item Page Features', contentSegments: ['modules', 'oil-report', 'listing-and-item-actions'] },
          ] },
          { slug: 'calendar-tracking', title: 'Calendar & Tracking', children: [
            { slug: 'overview', title: 'Calendar & Tracking Overview', contentSegments: ['modules', 'calendar-tracking', 'overview'] },
            { slug: 'listing-and-item-actions', title: 'Listing & Item Page Features', contentSegments: ['modules', 'calendar-tracking', 'listing-and-item-actions'] },
          ] },
          { slug: 'reports-import-export', title: 'Reports, Import & Export', children: [
            { slug: 'overview', title: 'Reports & Import/Export Overview', contentSegments: ['modules', 'reports-import-export', 'overview'] },
            { slug: 'listing-and-item-actions', title: 'Listing & Item Page Features', contentSegments: ['modules', 'reports-import-export', 'listing-and-item-actions'] },
          ] },
          { slug: 'admin-settings', title: 'Administration & Settings', children: [
            { slug: 'overview', title: 'Administration Overview', contentSegments: ['modules', 'admin-settings', 'overview'] },
            { slug: 'listing-and-item-actions', title: 'Listing & Item Page Features', contentSegments: ['modules', 'admin-settings', 'listing-and-item-actions'] },
          ] },
        ],
      },
    },
  },  // â”€â”€ Plasma FSM â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  'plasma': {
    name: 'Plasma FSM',
    description: 'A Powerful FSM Tool for Plasma.',
    icon: 'ðŸ› ï¸',
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
  // â”€â”€ Econpile â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  'econpile': {
    name: 'Econpile',
    description: 'FSM platform â€” the QR-scan Public Service Portal that lets anyone on site report a fault or fill an asset inspection checklist from a phone, with no login.',
    icon: 'ðŸ“±',
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
        title: 'QR Scan â†’ Public Portal',
        pages: [
          { slug: 'portal', title: 'QR Scan â†’ Public Portal', children: [
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

  // â”€â”€ ROKKO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  'rokko': {
    name: 'ROKKO',
    description: 'A powerful FSM Tool.',
    icon: 'ðŸš€',
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






