import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogController } from './catalog.controller';
import { Module } from '@nestjs/common';
import { Catalog } from 'src/domains/entities/catalogs/catalog/catalog.entity';
import { CatalogType } from 'src/domains/entities/catalogs/catalog-type/catalog-type.entity';
import { CatalogsService } from 'src/applications/services/catalogs/catalogs.service';
import { GetUserTableUseCase } from 'src/applications/use-cases/auth/user/get-user-table.use-case';
import { CreateCatalogUseCase } from 'src/applications/use-cases/catalogs/catalog/create-catalog.use-case';
import { GetCatalogsTypeUseCase } from 'src/applications/use-cases/catalogs/catalog-type/get-catalog-type.use-case';
import { GetCatalogsTypeTableUseCase } from 'src/applications/use-cases/catalogs/catalog-type/get-catalog-type-table.use-case';
import { CreateCatalogTypeUseCase } from 'src/applications/use-cases/catalogs/catalog-type/create-catalog-type.use-case';
import { GetCatalogTableUseCase } from 'src/applications/use-cases/catalogs/catalog/get-catalog-table.use-case';
import { GetCatalogsUseCase } from 'src/applications/use-cases/catalogs/catalog/get-catalog.use-case';

@Module({
    imports: [TypeOrmModule.forFeature([Catalog, CatalogType])],
    controllers: [
        CatalogController],
    providers: [
        CatalogsService,
        CreateCatalogUseCase,
        GetCatalogTableUseCase,
        CreateCatalogTypeUseCase,
        GetCatalogsTypeTableUseCase,
        GetCatalogsTypeUseCase,
        GetCatalogsUseCase
    ],
})
export class CatalogModule { }
