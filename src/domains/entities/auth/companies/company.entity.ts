import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { User } from "../user/user.entity";

@Entity({ name: "companies" })
export class Company {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  domain: string;
  @Column()
  logo: string;
  @Column()
  css: string;
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;
  @Column({ default: "1" })
  is_active: string;
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  update_at: Date;
  @Column({ nullable: true })
  created_by: string; 
  @Column()
  theme: string;
  @ManyToMany(() => User, (user: User) => user.company)
  public user: User[];
}
