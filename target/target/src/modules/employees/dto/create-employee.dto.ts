import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DesignationType as PrismaDesignationTypeEnum } from '@prisma/client';
import type { DesignationType as PrismaDesignationType } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsBoolean, IsEmail, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

const DesignationTypeEnum = PrismaDesignationTypeEnum ?? {
  GM: 'GM',
  Manager: 'Manager',
  Staff: 'Staff',
  Technician: 'Technician',
};

type DesignationType = PrismaDesignationType;

export class CreateEmployeeDto {
  @ApiPropertyOptional({ description: 'Optional link to AppUser for login ↔ HR identity' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  userId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  emailId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  primaryMobileNo?: string;

  @ApiProperty({ example: '35202-1234567-1' })
  @IsNotEmpty()
  @IsString()
  cnic: string;

  @ApiProperty({ enum: DesignationTypeEnum })
  @IsEnum(DesignationTypeEnum)
  designation: DesignationType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  nextOfKin?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  nextOfKinContact?: string;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
