import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class UserPermissionsService {
  constructor(private readonly prisma: PrismaService) {}
  private static readonly PERMISSIONS_CACHE_TTL_MS = 60_000;
  private readonly permissionsCache = new Map<number, { expiresAt: number; codes: Set<string> }>();

  /** Resolves active permission codes for a user via UserRole → Role → RolePermission → Permission. */
  async getPermissionCodesForUser(userId: number): Promise<Set<string>> {
    const now = Date.now();
    const cached = this.permissionsCache.get(userId);
    if (cached && cached.expiresAt > now) {
      return cached.codes;
    }

    const rows = await this.prisma.userRole.findMany({
      where: { userId },
      select: {
        role: {
          select: {
            isActive: true,
            rolePermissions: {
              select: {
                permission: {
                  select: {
                    isActive: true,
                    permissionCode: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const codes = new Set<string>();
    for (const ur of rows) {
      if (!ur.role.isActive) continue;
      for (const rp of ur.role.rolePermissions) {
        if (rp.permission.isActive) {
          codes.add(rp.permission.permissionCode);
        }
      }
    }

    this.permissionsCache.set(userId, {
      expiresAt: now + UserPermissionsService.PERMISSIONS_CACHE_TTL_MS,
      codes,
    });

    return codes;
  }
}
