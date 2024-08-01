import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";

@Entity({ name: "catalog_type" })
export class CatalogType {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;
  @Column({ default: "1" })
  is_active: string;
  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  update_at: Date;
  @Column({ nullable: true })
  created_by: string; 

}
