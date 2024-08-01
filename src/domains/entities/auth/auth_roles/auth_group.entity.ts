
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { User } from "../user/user.entity";
import { AuthPermission } from "../auth_permission/auth_permission.entity";

@Entity({ name: "auth_roles" })
export class AuthGroup {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  url: string;
  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;
  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  update_at: Date;
  @Column({ default: "1" })
  is_active: string;
  @ManyToMany(() => User, (user: User) => user.autgroup)
  public user: User[];
  @ManyToMany(() => AuthPermission, (auth: AuthPermission) => auth.autgroup)
  public autpermission: AuthPermission[];
}
