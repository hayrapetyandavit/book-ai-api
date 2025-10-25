import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePreferenceDto } from './dto/create-preference.dto';
import { UpdatePreferenceDto } from './dto/update-preference.dto';

@Injectable()
export class PreferencesService {
  constructor(private prisma: PrismaService) {}

  create(createPreferenceDto: CreatePreferenceDto) {
    return this.prisma.preferences.create({ data: createPreferenceDto });
  }

  findAll() {
    return this.prisma.preferences.findMany();
  }

  findOne(id: number) {
    return this.prisma.preferences.findUnique({ where: { id } });
  }

  update(id: number, updatePreferenceDto: UpdatePreferenceDto) {
    return this.prisma.preferences.update({
      where: { id },
      data: updatePreferenceDto,
    });
  }

  remove(id: number) {
    return this.prisma.preferences.delete({ where: { id } });
  }
}
