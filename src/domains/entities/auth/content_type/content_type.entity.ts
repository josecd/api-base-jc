
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { AuthPermission } from "../auth_permission/auth_permission.entity";
import { Modules } from "../module_system/module.entity";

@Entity({ name: "content_type" })
export class ContentType {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  app_label: string;
  @Column()
  model: string;
  @Column({ default: "0" })
  type_main: number;
  @OneToMany(() => AuthPermission, (permission) => permission.content)
  permissions: AuthPermission[];
  @OneToMany(() => Modules, (mod) => mod.content)
  module: Modules[];
}
