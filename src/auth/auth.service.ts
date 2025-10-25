import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async validateUser(email: string) {
    console.log('Validating User:', email);
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (user) return user;
    const newUser = await this.prisma.user.create({
      data: { email },
    });
    return newUser;
  }

  async findUser(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    return user;
  }
}
