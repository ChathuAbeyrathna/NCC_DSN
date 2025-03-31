import { Controller, Get, Post, Body } from '@nestjs/common';
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
}
