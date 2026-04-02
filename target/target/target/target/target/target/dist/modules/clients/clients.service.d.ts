import { CreateClientDto } from './dto/create-client.dto';
export declare class ClientsService {
    private prisma;
    createClient(createClientDto: CreateClientDto): Promise<{
        name: string;
        id: number;
        email: string;
        cnic: string;
        irNo: string;
        phone: string;
    }>;
}
