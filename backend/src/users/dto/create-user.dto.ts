import { Role } from '@prisma/client';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message:
      'Password must be at least 8 characters long and contain at least one letter and one number',
  })
  password: string;

  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  fullName: string;

  @IsString({ message: 'CPF must be a string' })
  @IsNotEmpty({ message: 'CPF is required' })
  @Matches(/^[0-9]{11}$/, { message: 'CPF must be a valid CPF number' })
  cpf: string;

  @IsOptional()
  favoriteColorId: string;

  role: Role = Role.USER;
}
