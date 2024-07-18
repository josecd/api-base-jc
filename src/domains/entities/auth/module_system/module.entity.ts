import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ContentType } from "../content_type/content_type.entity";

@Entity({ name: "modules_system" })
export class Modules {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ unique: true })
  idStr: string;
  @Column({ unique: true })
  title: string;
  @Column({ nullable: true })
  subtitle: string;
  @Column()
  type: string;
  @Column({ nullable: true })
  icon: string;
  @Column({ unique: true, nullable: true })
  link: string;
  @Column({ nullable: true })
  parent: number;
  @Column({ nullable: true })
  codename: string;
  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;
  @Column({ default: "1" })
  is_active: string;
  @ManyToOne(() => ContentType, (cont) => cont.module)
  content: ContentType;
}
