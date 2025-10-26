import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'kkkk',
    });
  }

  async validate(payload: any) {
    // This method is called after the JWT is successfully validated
    // You can fetch user details from a database here if needed
    console.log('JWT payload:', payload);
    return { userId: payload.sub, email: payload.email };
  }
}
