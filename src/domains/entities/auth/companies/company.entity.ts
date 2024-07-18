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
  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;
  @Column({ default: "1" })
  is_active: string;
  @Column()
  theme: string;
  @ManyToMany(() => User, (user: User) => user.company)
  public user: User[];
}
