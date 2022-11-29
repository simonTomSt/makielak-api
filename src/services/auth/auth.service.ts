import env from '@config/env';
import { injectable } from 'inversify';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { IAuthService } from './auth.interface';
import { JwtTokenPayload } from '@utils/types';
import { TokenPayloadDto } from './dto';
import { instanceToPlain } from 'class-transformer';

@injectable()
export class AuthService implements IAuthService {
  async signJwt(tokenPayloadDto: TokenPayloadDto): Promise<string> {
    const payload = instanceToPlain(tokenPayloadDto);
    return jwt.sign({ payload }, env.AUTH_SECRET, {
      expiresIn: env.TOKEN_EXPIRATION,
    });
  }

  async verifyJwt(token: string): Promise<JwtTokenPayload> {
    return jwt.verify(token, env.AUTH_SECRET) as JwtTokenPayload;
  }

  async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async comparePasswords(incomePassword: string, storedPassword: string) {
    return bcrypt.compare(incomePassword, storedPassword);
  }
}
