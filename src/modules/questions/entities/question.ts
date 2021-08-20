import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Answer } from './answer';

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: bigint;

  @Column({ name: 'content', type: 'varchar' })
  content: string;

  // When we call questions.find({ relations: ['answers'] })
  // Nest have no information about question foreign key in answers table
  // Then (answer: Answer) => answer.question
  // will talk to Nest the method that contains the information about foreign key
  @OneToMany(() => Answer, (answer: Answer) => answer.question)
  answers: Answer[];
}
