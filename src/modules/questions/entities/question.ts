import { Column, CreateDateColumn, Entity, OneToMany, UpdateDateColumn } from 'typeorm';
import { Answer } from './answer';
import { Primary } from '../../../decorators/typeorm/primary';
import { QuizQuestion } from '../../quiz-question/entities/quiz-question';

@Entity('questions')
export class Question {
  @Primary()
  id: number;

  @Column({ name: 'content', type: 'varchar' })
  content: string;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;

  // When we call questions.find({ relations: ['answers'] })
  // Nest have no information about question foreign key in answers table
  // Then (answer: Answer) => answer.question
  // will talk to Nest the method that contains the information about foreign key
  @OneToMany(() => Answer, (answer: Answer) => answer.question)
  answers: Answer[];

  // https://github.com/typeorm/typeorm/issues/1224#issuecomment-348426495
  @OneToMany(() => QuizQuestion, (quizQuestion) => quizQuestion.question)
  quizQuestions: QuizQuestion[];
}
