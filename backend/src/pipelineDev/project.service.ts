import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async createProject(project: Project): Promise<Project> {
    return await this.projectRepository.save(project);
  }

  async getAllProjects(): Promise<Project[]> {
    return await this.projectRepository.find();
  }
}
