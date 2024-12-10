// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      name: user.fullName,
      sub: user.id,
      role: user.role,
      id: user.id,
    };
    return {
      id: user.id,
      token: this.jwtService.sign(payload),
      email: user.email,
      name: user.fullName,
      image: `https://i.pravatar.cc/300?img=${Math.floor(Math.random() * 70) + 1}`,
    };
  }
}
