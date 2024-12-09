import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  OnModuleInit,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { AuthJwtAuthGuardGuard } from 'src/auth-jwt-auth-guard/auth-jwt-auth-guard.guard';
import { Roles } from 'src/auth/roles/roles.decorator';

@Controller('users')
export class UsersController implements OnModuleInit {
  constructor(
    private readonly usersService: UsersService,
    private prismaService: PrismaService,
  ) {}

  async onModuleInit() {
    const adminUser = await this.prismaService.user.findFirst({
      where: { role: Role.ADMIN },
    });

    if (adminUser) {
      return;
    }

    await this.prismaService.user.create({
      data: {
        fullName: 'Admin',
        cpf: '12345678901',
        email: 'admin@admin.com',
        password: bcrypt.hashSync(
          process.env.ADMIN_PASSWORD || 'UmaSenhaMuitoSegura2',
          10,
        ),
        role: Role.ADMIN,
      },
    });
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthJwtAuthGuardGuard, RolesGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthJwtAuthGuardGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @UseGuards(AuthJwtAuthGuardGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthJwtAuthGuardGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
