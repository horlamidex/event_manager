import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login-auth.dto';
import { UsersRepository } from '../users/users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async register(payload: RegisterDto): Promise<{ message: string }> {
    const user = await this.usersRepository.findOne({
      where: { email: payload.email },
    });
    if (user) throw new ConflictException({ message: 'Email already exists' });
    const newUser = this.usersRepository.create(payload);
    await this.usersRepository.save(newUser);
    return { message: 'User created successfully' };
  }

  async login(payload: any) {
    const user = { email: payload.email, sub: payload.id };
    const data = await this.usersRepository.findOneBy({ email: payload.email });
    if (!user) throw new NotFoundException();
    data.last_login = new Date();
    await this.usersRepository.save(data);
    return {
      accessToken: this.jwtService.sign(user),
    };
  }

  async validate(payload: LoginDto) {
    const user = await this.usersRepository.findOne({
      where: { email: payload.email },
      select: [
        'id',
        'email',
        'password',
        'firstName',
        'lastName',
        'createdAt',
        'updatedAt',
        'last_login',
      ],
    });
    const password = await bcrypt.compare(payload.password, user.password);
    if (user && password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
