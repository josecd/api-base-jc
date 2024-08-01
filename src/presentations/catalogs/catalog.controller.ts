import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { CreateCatalogTypeUseCase } from 'src/applications/use-cases/catalogs/catalog-type/create-catalog-type.use-case';
import { GetCatalogsTypeTableUseCase } from 'src/applications/use-cases/catalogs/catalog-type/get-catalog-type-table.use-case';
import { GetCatalogsTypeUseCase } from 'src/applications/use-cases/catalogs/catalog-type/get-catalog-type.use-case';
import { CreateCatalogUseCase } from 'src/applications/use-cases/catalogs/catalog/create-catalog.use-case';
import { GetCatalogTableUseCase } from 'src/applications/use-cases/catalogs/catalog/get-catalog-table.use-case';
import { GetCatalogsUseCase } from 'src/applications/use-cases/catalogs/catalog/get-catalog.use-case';
import { CreateCatalogDto } from 'src/domains/dto/catalog/catalog-create.dto';
import { CreateCatalogTypeDto } from 'src/domains/dto/catalog/catalog-type-create.dto';

@Controller("catalog")
export class CatalogController {

    constructor(
        private readonly CreateCatalogUseCase: CreateCatalogUseCase,
        private readonly GetCatalogTableUseCase: GetCatalogTableUseCase,
        private readonly CreateCatalogTypeUseCase: CreateCatalogTypeUseCase,
        private readonly GetCatalogsTypeTableUseCase: GetCatalogsTypeTableUseCase,
        private readonly GetCatalogsTypeUseCase: GetCatalogsTypeUseCase,
        private readonly GetCatalogsUseCase: GetCatalogsUseCase
      ) {}

    @Get("all")
    findAllTable(
      @Req() req,
      @Query('limit') limit?: string, 
      @Query('offset') offset?: string,
      @Query('type') type?: string,
    ){
      return this.GetCatalogTableUseCase.execute(req.user,  parseInt(limit), parseInt(offset), type);
    }

    @Get("all-types")
    findAllTableType(
      @Req() req,
      @Query('limit') limit?: string, 
      @Query('offset') offset?: string,
      @Query('type') type?: string,
    ){
      return this.GetCatalogsTypeTableUseCase.execute(req.user,  parseInt(limit), parseInt(offset));
    }

    @Post("create")
    createCatalog(
      @Req() req,
      @Body() catalog:CreateCatalogDto
    ){
        return this.CreateCatalogUseCase.execute(req.user, catalog);
    }

    @Post("create-types")
    createCatalogType(
      @Req() req,
      @Body() catalog:CreateCatalogTypeDto
    ){
        return this.CreateCatalogTypeUseCase.execute(req.user, catalog);
    }

    @Get("list-types")
    findAllType(
      @Req() req,
    ){
        console.log("req.user", req.user);
      return this.GetCatalogsTypeUseCase.execute(req.user);
    }

    @Get("list-catalogs")
    findLikeType(
      @Req() req,
      @Query('type') type?: string,
      @Query('mes') mes?: string,
      @Query('anio') anio?: string,
    ){
      return this.GetCatalogsUseCase.execute(req.user, type, mes, anio);
    }
}
