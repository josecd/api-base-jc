import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Incidencias } from 'src/domains/entities/incidencias/incidencias.entity';

@Injectable()
export class IncidenciasService {

    constructor(
        @InjectRepository(Incidencias) private incidenciasRepositorio: Repository<Incidencias>,
    ) { }

    async createIncidencias(incidencias: Incidencias) {
        try {
            const newIncidencias = await this.incidenciasRepositorio.create({
                ...incidencias
            });
            const save = await this.incidenciasRepositorio.save(newIncidencias);
            return save;
        } catch (error) {
            throw error
        }
    }

    async updateIncidencias(incidencias: Incidencias) {
        try {
            const found = await this.incidenciasRepositorio.findOne({
                where: {
                    id: incidencias.id
                }
            });
            if (!found) {
                throw 'No se encontró el registro';
            }
            const updateIncidencias = Object.assign(found, incidencias);
            const incidecia = await this.incidenciasRepositorio.save(updateIncidencias);
            return incidecia;
        } catch (error) {
            throw error
        }
    }

    async deleteIncidencias(id: number) {
        try {
            const found = await this.incidenciasRepositorio.findOne({
                where: {
                    id: id
                }
            });
            if (!found) {
                throw 'No se encontró el registro';
            }
            const deleteIncidencias = Object.assign(found, { is_active: '0' });
            const incidecia = await this.incidenciasRepositorio.save(deleteIncidencias);
            return incidecia;
        } catch (error) {
            throw error
        }
    }

    async searchTableIncidencias(
        limit: number = 1,
        offset: number = 0,
    ): Promise<any> {

        const queryBuilder = this.incidenciasRepositorio.createQueryBuilder('table');
        const elements = await queryBuilder
            .select('*')
            .where('table.is_active = :isActive', { isActive: '1' })
            .orderBy('table.update_at', 'ASC')
            .limit(limit)
            .offset(offset)
            .getRawMany()

        if (!elements || elements.length === 0) {
            throw 'No se encontraron datos';
        }

        const countQueryBuilder = this.incidenciasRepositorio.createQueryBuilder('table');

        const totalCountResult = await countQueryBuilder
            .select('COUNT(*)', 'total_count')
            .where('table.is_active = :isActive', { isActive: '1' })
            .getRawOne();

        const totalCount = totalCountResult.total_count;

        const paginatedResponse = {
            data: elements,
            total: totalCount,
            limit: limit,
            offset: offset,
        };
        return paginatedResponse;
    }

    async getIncidenciasById(id: number) {
        try {
            const found = await this.incidenciasRepositorio.findOne({
                where: {
                    id: id,
                    is_active: '1'
                }
            });
            if (!found) {
                throw 'No se encontró el registro';
            }
            return found;
        } catch (error) {
            throw error
        }
    }

    async getIncidencias() {
        try {
            const found = await this.incidenciasRepositorio.find({
                where: {
                    is_active: '1'
                }
            });
            if (!found) {
                throw 'No se encontraron datos';
            }
            return found;
        } catch (error) {
            throw error
        }
    }
}
