import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './utils/GoogleStrategy';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SessionSerializer } from './utils/Serializer';
import { JwtStrategy } from './utils/JwtStrategy';

@Module({
  imports: [PassportModule.register({ session: false }), PrismaModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: 'AUTH_SERVICE',
      useExisting: AuthService,
    },
    GoogleStrategy,
    JwtStrategy,
    SessionSerializer,
  ],
})
export class AuthModule {}
