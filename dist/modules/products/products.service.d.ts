import { PrismaService } from '../../database/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateProductDto): import("@prisma/client").Prisma.Prisma__ProductClient<{
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        productId: number;
        productName: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        productId: number;
        productName: string;
    }[]>;
    findOne(productId: number): Promise<{
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        productId: number;
        productName: string;
    }>;
    update(productId: number, dto: UpdateProductDto): Promise<{
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        productId: number;
        productName: string;
    }>;
    remove(productId: number): Promise<{
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        productId: number;
        productName: string;
    }>;
}
