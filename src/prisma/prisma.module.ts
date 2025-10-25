import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// @Global() // optional: makes PrismaService available everywhere
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // <-- this is required if you don't use @Global
})
export class PrismaModule {}
