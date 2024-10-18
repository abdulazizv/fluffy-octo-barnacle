import { HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Knex } from 'knex';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { getMicroResponse } from 'src/common/responses/response-type';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(@Inject('KnexConnection') private knex: Knex,) {}

    async createUser(createUserDto: CreateUserDto, createdBy: number) {
        const { name, role_id, login, token } = createUserDto;
    
        const newUser = await this.knex('users').insert({
          name,
          role_id,
          login,
          token,
          created_by: createdBy,
        }).returning('*');
    
        return getMicroResponse(null, true, 'User created successfully', newUser[0]);
      }

    async login(name: string, password: string) {
        const user = await this.knex('users').where({ name: name }).first();

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        if (password !== user.login) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const token = jwt.sign({ id: user.id, role: user.role_id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE_IN,
        });

        return getMicroResponse(HttpStatus.OK,true,'Success', token);
    }
}
