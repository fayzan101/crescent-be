import { DocumentBuilder } from '@nestjs/swagger';

export const JWT_AUTH_BEARER = 'JWT-auth';

/**
 * Tag order in Swagger UI (unknown tags sort after these, alphabetically).
 * Keep in sync with `@ApiTags(...)` on controllers.
 */
export const SWAGGER_TAG_ORDER: readonly string[] = [
  'Auth',
  'Users',
  'Sales',
  'Inventory setup',
  'Inventory items',
  'Inventory purchase requests',
  'Inventory purchase orders',
  'Inventory grn',
  'Inventory movements',
  'Inventory reports',
  'Inventory utility',
  'Inventory dashboard',
  'Permissions',
  'Role permissions',
  'Roles',
  'User roles',
  'Employees',
  'Devices',
  'SIMs',
  'Device combos',
  'Accessories',
  'Offices',
  'Zones',
  'Zone employees',
  'Products',
  'Packages',
  'Client categories',
  'Banks',
  'Bank accounts',
  'Cities',
  'Vendors',
];

function buildDescription(): string {
  return [
    
    'This is the API documentation for the Crescent inventory and sales management system.',
  ].join('\n');
}

export function buildOpenApiDocument() {
  const builder = new DocumentBuilder()
    .setTitle('Crescent API')
    .setDescription(buildDescription())
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description:
          'Paste the **accessToken** from login or register. Prefix `Bearer ` if your client does not add it automatically.',
      },
      JWT_AUTH_BEARER,
    );

  const publicApiUrl = process.env.API_PUBLIC_URL?.trim();
  if (publicApiUrl) {
    builder.addServer(publicApiUrl.replace(/\/$/, ''), 'Configured API (API_PUBLIC_URL)');
  }
  builder.addServer('/', 'Current host (e.g. http://localhost:5000)');

  for (const tag of SWAGGER_TAG_ORDER) {
    const descriptions: Record<string, string> = {
      Auth: 'Login, register, refresh, logout — no JWT on these operations',
      Users: 'Application users (`AppUser`); JWT required',
      Sales: 'Sale lifecycle, stage progression, and audit — JWT + permission codes',
      'Inventory setup': 'Stores, categories, groups, and inventory vendors',
      'Inventory items': 'Inventory item master, SKU lookups, and search',
      'Inventory purchase requests': 'Internal demand generation and approval/rejection',
      'Inventory purchase orders': 'Vendor order commitments and approvals',
      'Inventory grn': 'Goods receiving notes and confirmation into stock',
      'Inventory movements': 'Issuance, returns, and inter-store transfers',
      'Inventory reports': 'Inventory card and movement/purchase report endpoints',
      'Inventory utility': 'Dropdown and compatibility utility endpoints',
      'Inventory dashboard': 'Stats, low stock, out-of-stock, and bulk operations',
      Permissions: 'Permission catalog (`permissionCode` strings used by RBAC)',
      'Role permissions': 'Links roles to permissions',
      Roles: 'Named roles; combine with Role permissions for access control',
      'User roles': 'Assign roles to application users',
      Employees: 'HR records; optional `userId` links to `AppUser`',
      Devices: 'Operations catalog: physical device types',
      SIMs: 'Operations catalog: SIM / data products',
      'Device combos': 'Operations catalog: bundled device offerings',
      Accessories: 'Operations catalog: add-on accessories',
      Offices: 'Company offices',
      Zones: 'Zones under an office',
      'Zone employees': 'Which employees belong to which zone',
      Products: 'Sellable / service products',
      Packages: 'Pricing packages (decimal charges)',
      'Client categories': 'Client segmentation for sale client details',
      Banks: 'Bank master data',
      'Bank accounts': 'Bank account records',
      Cities: 'City master',
      Vendors: 'Vendor / supplier records',
    };
    builder.addTag(tag, descriptions[tag] ?? '');
  }

  return builder.build();
}
