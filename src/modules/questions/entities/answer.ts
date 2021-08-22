import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, UpdateDateColumn } from 'typeorm';
import { Question } from './question';
import { Primary } from '../../../decorators/typeorm/primary';

@Entity('answers')
export class Answer {
  @Primary()
  id: number;

  @Column({ name: 'question_id', type: 'int', unsigned: true })
  questionId: number;

  @Column({ name: 'content', type: 'varchar' })
  content: string;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;

  // This will create question_id column if not exist
  // This will add foreign key reference to id column in questions table
  @ManyToOne(() => Question)
  @JoinColumn({ name: 'question_id' })
  question: Question;
}
