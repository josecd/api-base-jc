import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CatalogType } from 'src/domains/entities/catalogs/catalog-type/catalog-type.entity';
import { Catalog } from 'src/domains/entities/catalogs/catalog/catalog.entity';
import { Repository } from 'typeorm';
import { Like } from 'typeorm';

@Injectable()
export class CatalogsService {
  constructor(
    @InjectRepository(Catalog) private catalogRepositorio: Repository<Catalog>,
    @InjectRepository(CatalogType) private catalogTypeRepositorio: Repository<CatalogType>,

  ) { }

  public async createCatalog(catalog: Catalog) {
    try {
      const newCatalog = await this.catalogRepositorio.create({
        ...catalog
      });
      const save = await this.catalogRepositorio.save(newCatalog);
      return save;
    } catch (error) {
      throw error
    }
  }

  public async createCatalogType(catalog: Catalog) {
    try {
      const newCatalog = await this.catalogTypeRepositorio.create({
        ...catalog
      });
      const save = await this.catalogTypeRepositorio.save(newCatalog);
      return save;
    } catch (error) {
      throw error
    }
  }

  public async getCatalogTypes() {
    try {
      const catalogs = await this.catalogTypeRepositorio.find({
        where: {
          is_active: "1"
        }
      });
      return catalogs;
    } catch (error) {
      throw error
    }
  }

  public async getCatalogs(type = "", mes, anio) {
    try {
      console.log("type", type);
      console.log("mes", mes);
      console.log("anio", anio);
      const catalogs = await this.catalogRepositorio.find({
        where: {
          is_active: "1",
          type: Like(`%${type}%`)
        }
      });
      return catalogs;
    } catch (error) {
      throw error
    }
  }

  async searchTableCatalogs(
    limit: number = 1,
    offset: number = 0,
    type: string = ""
  ): Promise<any> {

    const queryBuilder = this.catalogRepositorio.createQueryBuilder('table');
    const elements = await queryBuilder
      .select('*')
      .where('table.is_active = :isActive', { isActive: '1' })
      .andWhere('table.type LIKE :type', { type: `%${type}%` })
      .orderBy('table.update_at', 'ASC')
      .limit(limit)
      .offset(offset)
      .getRawMany()

    if (!elements || elements.length === 0) {
      throw 'No se encontraron datos';
    }

    const countQueryBuilder = this.catalogRepositorio.createQueryBuilder('table');

    const totalCountResult = await countQueryBuilder
      .select('COUNT(*)', 'total_count')
      .where('table.is_active = :isActive', { isActive: '1' })
      .andWhere('table.type LIKE :type', { type: `%${type}%` })
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

  async searchTableCatalogsType(
    limit: number = 1,
    offset: number = 0,
  ): Promise<any> {

    const queryBuilder = this.catalogTypeRepositorio.createQueryBuilder('table');
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

    const countQueryBuilder = this.catalogTypeRepositorio.createQueryBuilder('table');

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
}
