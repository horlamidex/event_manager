import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 256 })
  name: string;

  @Column({ nullable: false, length: 256 })
  description: string;

  @Column({ nullable: false, length: 256 })
  location: string;

  @Column({ nullable: false, length: 256 })
  date: string;

  @Column({ nullable: false, length: 256 })
  time: string;

  @Column({ nullable: false, length: 256 })
  image: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.events)
  user: User;
}
