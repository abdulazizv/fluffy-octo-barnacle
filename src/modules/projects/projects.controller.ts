import { Controller, Get, Post, Body, Param, Delete, Put, Request, UseGuards, Query } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/custom/guards/jwt-auth.guard';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { StaffGuardAuth } from 'src/common/custom/guards/auth-guard.staff';

@ApiTags('Projects')
@ApiBearerAuth()
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createProjectDto: CreateProjectDto, @Request() req) {
    const userId = req.user.id; 
    return this.projectsService.create(createProjectDto, userId);
  }

  @UseGuards(StaffGuardAuth)
  @Get()
  findAll(@Query() params: PaginationDto) {
    return this.projectsService.findAll(+params.page,+params.size);
  }

  @UseGuards(StaffGuardAuth)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id);
  }

  @UseGuards(StaffGuardAuth)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(+id, updateProjectDto);
  }

  @UseGuards(StaffGuardAuth)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }
}
