import { IncidenciasService } from 'src/applications/services/incidencias/incidencias.service';
import { IncidentesController } from './incidentes.controller';
import { Module } from '@nestjs/common';
import { CreateIncidenciaUseCase } from 'src/applications/use-cases/incidencias/create-incidencia.use-case';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Incidencias } from 'src/domains/entities/incidencias/incidencias.entity';
import { GetIncideciasTableUseCase } from 'src/applications/use-cases/incidencias/get-incidentes-table.use-case';
import { UpdateIncidenciaUseCase } from 'src/applications/use-cases/incidencias/update-incidencia.use-case';
import { DeleteIncidenciaUseCase } from 'src/applications/use-cases/incidencias/delete-incidencia.use-case';
import { GetIncidenciaUseCase } from 'src/applications/use-cases/incidencias/get-incidencia.use-case';
import { GetIdIncidenciaUseCase } from 'src/applications/use-cases/incidencias/get-id-incidencia.use-case';

@Module({
    imports: [TypeOrmModule.forFeature([Incidencias])],
    controllers: [
        IncidentesController,
    ],
    providers: [
        IncidenciasService,
        CreateIncidenciaUseCase,
        UpdateIncidenciaUseCase,
        DeleteIncidenciaUseCase,
        GetIncideciasTableUseCase,
        GetIncidenciaUseCase,
        GetIdIncidenciaUseCase
    ],
})
export class IncidentesModule { }
