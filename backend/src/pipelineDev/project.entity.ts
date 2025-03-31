import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  projectTitle: string;

  @Column('text')
  projectDescription: string;

  @Column()
  accreditedEntity: string;

  @Column()
  implementingAgencies: string;

  @Column()
  projectDuration: string;

  @Column()
  projectLocation: string;

  @Column()
  sector: string;

  @Column()
  focus: string;

  @Column()
  gcfResultAreas: string;

  @Column('decimal')
  gcfFinancing: number;

  @Column('decimal')
  coFinancing: number;

  @Column('decimal')
  overallFinancing: number;

  @Column()
  financingInstruments: string;

  @Column()
  status: string;

  @Column()
  contactInfo: string;

  @Column('decimal')
  stage1Score: number;

  @Column('decimal')
  stage2Score: number;
}
