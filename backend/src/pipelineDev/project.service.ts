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

  async updateProject(id: number, projectData: Partial<Project>): Promise<Project | undefined> {
    await this.projectRepository.update(id, projectData);
    const updatedProject = await this.projectRepository.findOne({ where: { id } });
    if (!updatedProject) {
      throw new Error(`Project with ID ${id} not found after update`);
    }
    return updatedProject;
  }

  async deleteProject(id: number): Promise<void> {
    await this.projectRepository.delete(id);
  }
}
