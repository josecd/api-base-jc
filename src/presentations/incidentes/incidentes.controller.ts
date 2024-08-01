import { CreateIncidenciasgDto } from './../../domains/dto/incidentes/incidencias-create.dto';
import { Controller, Get, Query, Req, Post, Body, Delete, Param } from '@nestjs/common';
import { CreateIncidenciaUseCase } from 'src/applications/use-cases/incidencias/create-incidencia.use-case';
import { DeleteIncidenciaUseCase } from 'src/applications/use-cases/incidencias/delete-incidencia.use-case';
import { GetIdIncidenciaUseCase } from 'src/applications/use-cases/incidencias/get-id-incidencia.use-case';
import { GetIncidenciaUseCase } from 'src/applications/use-cases/incidencias/get-incidencia.use-case';
import { GetIncideciasTableUseCase } from 'src/applications/use-cases/incidencias/get-incidentes-table.use-case';
import { UpdateIncidenciaUseCase } from 'src/applications/use-cases/incidencias/update-incidencia.use-case';
import { UpdateIncidenciasDto } from 'src/domains/dto/incidentes/incidencias-update.dto';

@Controller("incidencias")
export class IncidentesController {
    constructor(
        private readonly CreateIncidenciaUseCase: CreateIncidenciaUseCase,
        private readonly DeleteIncidenciaUseCase: DeleteIncidenciaUseCase,
        private readonly GetIncideciasTableUseCase: GetIncideciasTableUseCase,
        private readonly UpdateIncidenciaUseCase: UpdateIncidenciaUseCase,
        private readonly GetIdIncidenciaUseCase: GetIdIncidenciaUseCase,
        private readonly GetIncidenciaUseCase: GetIncidenciaUseCase,

      ) {}

      @Get("all-incidencias")
      findAllIncidencias(
        @Req() req,

      ){
        return this.GetIncidenciaUseCase.execute(req.user);
      }

      @Get("all-incidencias-id/:id")
      findAByIdIncidencias(
        @Req() req,
        @Param('id') id: string
      ){
        return this.GetIdIncidenciaUseCase.execute(req.user,id);
      }

      @Get("all")
      findAllTable(
        @Req() req,
        @Query('limit') limit?: string, 
        @Query('offset') offset?: string,
      ){
        return this.GetIncideciasTableUseCase.execute(req.user,  parseInt(limit), parseInt(offset));
      }
  
      @Post("create")
      createIncidencia(
        @Req() req,
        @Body() incidencias:CreateIncidenciasgDto
      ){
          return this.CreateIncidenciaUseCase.execute(req.user, incidencias);
      }

      @Post("update")
      updateIncidencia(
        @Req() req,
        @Body() incidencias:UpdateIncidenciasDto
      ){
          return this.UpdateIncidenciaUseCase.execute(req.user, incidencias);
      }

      @Delete("delete/:id")
      deteleIncidencia(
        @Req() req,
        @Param('id') id: string
      ){
          return this.DeleteIncidenciaUseCase.execute(req.user, id);
      }
}
