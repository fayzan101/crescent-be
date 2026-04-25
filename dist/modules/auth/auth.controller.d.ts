import { Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { LogoutDto } from './dto/logout.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    private getRequestMeta;
    login(dto: LoginDto, req: Request): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            createdAt: Date;
            updatedAt: Date;
            email: string;
            address: string;
            userId: number;
            dob: Date;
            cnic: string;
            contactNo: string;
        };
    }>;
    register(dto: RegisterDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            createdAt: Date;
            updatedAt: Date;
            email: string;
            address: string;
            userId: number;
            dob: Date;
            cnic: string;
            contactNo: string;
        };
    }>;
    refresh(dto: RefreshTokenDto, req: Request): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(dto: LogoutDto): Promise<{
        revoked: boolean;
    }>;
}
