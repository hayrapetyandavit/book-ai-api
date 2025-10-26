import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserPreferenceDto } from './dto/create-user-preferences.dto';
import { UpdateUserPreferenceDto } from './dto/update-user-preferences.dto';

@Injectable()
export class UserPreferencesService {
  constructor(private prisma: PrismaService) {}

  create(createUserPreferenceDto: CreateUserPreferenceDto) {
    return this.prisma.userPreferences.create({
      data: createUserPreferenceDto,
    });
  }

  findAll() {
    return this.prisma.userPreferences.findMany();
  }

  findOne(id: number) {
    return this.prisma.userPreferences.findUnique({ where: { id } });
  }

  update(id: number, updateUserPreferenceDto: UpdateUserPreferenceDto) {
    return this.prisma.userPreferences.update({
      where: { id },
      data: updateUserPreferenceDto,
    });
  }

  remove(id: number) {
    return this.prisma.userPreferences.delete({ where: { id } });
  }
}
