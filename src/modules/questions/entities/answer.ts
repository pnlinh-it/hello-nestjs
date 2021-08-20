import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Question } from './question';

@Entity('answers')
export class Answer {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: bigint;

  @Column({ name: 'question_id', type: 'bigint' })
  questionId: bigint;

  @Column({ name: 'content', type: 'varchar' })
  content: string;

  // This will create question_id column if not exist
  // This will add foreign key reference to id column in questions table
  @ManyToOne(() => Question)
  @JoinColumn({ name: 'question_id', referencedColumnName: 'id' })
  question: Question;
}
