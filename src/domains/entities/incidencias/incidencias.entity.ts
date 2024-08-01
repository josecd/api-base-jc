import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, BeforeInsert } from "typeorm";

@Entity({ name: "incidencias" })
export class Incidencias {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({nullable:true})
  item_id: string;
  @BeforeInsert()
  generateItemId() {
    this.item_id = Math.floor(100000 + Math.random() * 900000).toString();
  }
  @Column({nullable:true}) 
  fecha_select: Date
  @Column({nullable:true})
  hora_select: string;
  @Column({nullable:true})
  tema: string;
  @Column({nullable:true})
  equipo: string;
  @Column({nullable:true})
  ubicacion: string;
  @Column({length: 2500,nullable:true})
  descripcion_incidente: string;
  @Column({nullable:true})
  recibe_reporte: string;
  @Column({nullable:true})
  quien_reporta: string;
  @Column({nullable:true})
  quien_realiza: string;

  @Column({nullable:true})
  reporte_inicial: string;
  @Column({nullable:true})
  acciones_realiazadas: string;
  @Column({nullable:true})
  estatus_final: string;
  @Column({nullable:true})
  causa_raiz: string;
  @Column({nullable:true})
  vale: string;
  @Column({length: 2500,nullable:true})
  observaciones: string;


  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;
  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  update_at: Date;
  @Column({ default: "1" })
  is_active: string;
  @Column({ nullable: true })
  created_by: string; 

}
