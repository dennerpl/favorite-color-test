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
import { ColorsService } from './colors.service';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from '@prisma/client';
import { AuthJwtAuthGuardGuard } from 'src/auth-jwt-auth-guard/auth-jwt-auth-guard.guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';

@Controller('colors')
export class ColorsController implements OnModuleInit {
  constructor(
    private readonly colorsService: ColorsService,
    private prismaService: PrismaService,
  ) {}
  async onModuleInit() {
    const rainbowColors = [
      { name: 'Vermelho', hexCode: '#ff0000' },
      { name: 'Laranja', hexCode: '#ff7f00' },
      { name: 'Amarelo', hexCode: '#ffff00' },
      { name: 'Verde', hexCode: '#00ff00' },
      { name: 'Azul', hexCode: '#0000ff' },
      { name: 'Indigo', hexCode: '#4b0082' },
      { name: 'Violeta', hexCode: '#8a2be2' },
    ];

    for (const color of rainbowColors) {
      const existingColor = await this.prismaService.color.findUnique({
        where: { name: color.name },
      });
      if (existingColor) {
        continue;
      }
      await this.prismaService.color.create({
        data: {
          name: color.name,
          hexCode: color.hexCode,
        },
      });
    }
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthJwtAuthGuardGuard, RolesGuard)
  @Post()
  create(@Body() createColorDto: CreateColorDto) {
    return this.colorsService.create(createColorDto);
  }

  @Get()
  findAll() {
    return this.colorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.colorsService.findOne(id);
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthJwtAuthGuardGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateColorDto: UpdateColorDto) {
    return this.colorsService.update(id, updateColorDto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthJwtAuthGuardGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.colorsService.remove(id);
  }
}
