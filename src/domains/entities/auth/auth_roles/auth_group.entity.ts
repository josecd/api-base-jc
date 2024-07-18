
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
  @ManyToMany(() => User, (user: User) => user.autgroup)
  public user: User[];
  @ManyToMany(() => AuthPermission, (auth: AuthPermission) => auth.autgroup)
  public autpermission: AuthPermission[];
}
