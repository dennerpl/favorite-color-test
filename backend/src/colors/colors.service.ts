import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ColorsService {
  constructor(private prismaService: PrismaService) {}
  async create(createColorDto: CreateColorDto) {
    if (!createColorDto.name || !createColorDto.hexCode) {
      throw new UnprocessableEntityException('Name and hexCode are required');
    }

    const existingColor = await this.prismaService.color.findUnique({
      where: {
        name: createColorDto.name,
      },
    });

    if (existingColor) {
      throw new ConflictException('Color already exists');
    }

    return this.prismaService.color.create({
      data: {
        name: createColorDto.name,
        hexCode: createColorDto.hexCode,
      },
    });
  }

  async findAll() {
    return await this.prismaService.color.findMany();
  }

  async findOne(id: string) {
    const color = await this.prismaService.color.findUnique({
      where: {
        id,
      },
    });

    if (!color) {
      throw new NotFoundException('Color not found');
    }

    return color;
  }

  async update(id: string, updateColorDto: UpdateColorDto) {
    const color = await this.prismaService.color.findUnique({
      where: {
        id,
      },
    });

    if (!color) {
      throw new NotFoundException('Color not found');
    }

    return this.prismaService.color.update({
      where: {
        id,
      },
      data: updateColorDto,
    });
  }

  async remove(id: string) {
    const color = await this.prismaService.color.findUnique({
      where: {
        id,
      },
    });

    if (!color) {
      throw new NotFoundException('Color not found');
    }

    return this.prismaService.color.delete({
      where: {
        id,
      },
    });
  }
}
