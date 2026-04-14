import { JwtService } from '@nestjs/jwt';
import { AppUser } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';
import { RegisterDto } from './dto/register.dto';
export interface JwtPayload {
    sub: number;
    email: string;
}
type AppUserPublic = Omit<AppUser, 'passwordHash'>;
type RefreshTokenMeta = {
    userAgent?: string | null;
    ipv4?: string | null;
    ipv6?: string | null;
};
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    private toPublic;
    validateUser(email: string, password: string): Promise<AppUserPublic>;
    register(dto: RegisterDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: AppUserPublic;
    }>;
    private createRefreshToken;
    login(email: string, password: string, meta?: RefreshTokenMeta): Promise<{
        accessToken: string;
        refreshToken: string;
        user: AppUserPublic;
    }>;
    refresh(refreshToken: string, meta?: RefreshTokenMeta): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(refreshToken: string): Promise<{
        revoked: boolean;
    }>;
    verifyToken(token: string): Promise<JwtPayload>;
}
export {};
