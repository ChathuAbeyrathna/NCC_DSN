import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ProjectsService } from './project.service';
import { Project } from './project.entity';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async createProject(@Body() projectData: Project): Promise<Project> {
    return this.projectsService.createProject(projectData);
  }

  @Get()
  async getAllProjects(): Promise<Project[]> {
    return this.projectsService.getAllProjects();
  }

  @Put(':id')
  async updateProject(
    @Param('id') id: number,
    @Body() projectData: Partial<Project>,
  ): Promise<Project> {
    const result = await this.projectsService.updateProject(id, projectData);
    if (!result) {
      throw new Error('Project not found');
    }
    return result;
  }

  @Delete(':id')
  async deleteProject(@Param('id') id: number): Promise<void> {
    return this.projectsService.deleteProject(id);
  }
}
