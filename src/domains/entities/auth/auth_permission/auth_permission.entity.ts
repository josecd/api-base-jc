
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable
} from "typeorm";
import { User } from "../user/user.entity";
import { AuthGroup } from "../auth_roles/auth_group.entity";
import { ContentType } from "../content_type/content_type.entity";

@Entity({ name: "auth_permission" })
export class AuthPermission {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  codename: string;
  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;
  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  update_at: Date;
  @Column({ default: "1" })
  is_active: string;
  @ManyToMany(() => User, (user: User) => user.permissions)
  public user: User[];
  @ManyToOne(() => ContentType, (cont) => cont.permissions)
  content: ContentType;
  @ManyToMany(() => AuthGroup, (auth: AuthGroup) => auth.autpermission)
  @JoinTable()
  public autgroup: AuthGroup[];
}
