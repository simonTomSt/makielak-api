import { JwtTokenPayload } from '@utils/types';
import { TokenPayloadDto } from './dto';

export interface IAuthService {
  signJwt(tokenPayloadDto: TokenPayloadDto): Promise<string>;
  verifyJwt(token: string): Promise<JwtTokenPayload>;
  comparePasswords(incomePass: string, storedPass: string): Promise<boolean>;
  hashPassword(password: string): Promise<string>;
}
