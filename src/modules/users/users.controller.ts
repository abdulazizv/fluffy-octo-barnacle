import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginDto } from './dto/login.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MicroResponse } from 'src/common/interfaces/response-type.interface';
import { AuthAdminRoleGuard } from 'src/common/custom/guards/admin-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('login')
    @ApiResponse({ status: 200, description: 'User logged in successfully.' })
    @ApiResponse({ status: 401, description: 'Invalid credentials.' })
    async login(@Body() loginDto: LoginDto): Promise<MicroResponse> {
        return this.usersService.login(loginDto.name, loginDto.password);
    }

    @Post()
    @UseGuards(AuthAdminRoleGuard)
    async createUser(@Body() createUserDto: CreateUserDto, @Req() req) {
        const createdBy = req.user.id; 
        return await this.usersService.createUser(createUserDto, createdBy);
    }
}
