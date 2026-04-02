import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateClientDto } from './dto/create-client.dto';
@Injectable()
export class ClientsService {
  private prisma = new PrismaClient();
  async createClient(createClientDto: CreateClientDto) {
    return this.prisma.client.create({
      data: createClientDto,
    });
  }
}
