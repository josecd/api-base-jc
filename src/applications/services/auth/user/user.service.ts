import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { returnId } from 'src/applications/utils/returns-id';
import { CreateUserDto } from 'src/domains/dto/auth/user/user-create.dto';
import { User } from 'src/domains/entities/auth/user/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepositorio: Repository<User>
    ) { }

    async create(userData: CreateUserDto) {
        try {
            const newUser = await this.userRepositorio.create({
                ...userData,
                password: userData.password
            });
            newUser.autgroup = userData.roles_id;
            newUser.company = userData.companies_id;
            const save = await this.userRepositorio.save({
                ...newUser,
                autgroup: returnId(userData.roles_id),
                company: returnId(userData.companies_id)
            });
            return save;
        } catch (error) {
            throw error
        }
    }

    async findOne(id: number) {
        try {
            const userFound = await this.userRepositorio.findOne({
                where: {
                    id: id
                },
                relations: [
                    "permissions",
                    "permissions.content.module",
                    "company",
                    "autgroup",
                    "autgroup.autpermission.content.module"
                ]
            });
            if (!userFound) {
                throw "Usuario no encontrado";
            }

            const permissionsAll: any = userFound.autgroup;
            const combinedAuthGroup = permissionsAll.reduce(
                (accumulator: any, currentGroup: any) => {
                    // Crear un conjunto de IDs para evitar duplicados
                    const idSet = new Set(
                        accumulator.autpermission.map((permission: any) => permission.id)
                    );

                    // Filtrar los permisos del grupo actual para evitar duplicados
                    const uniquePermissions = currentGroup.autpermission.filter(
                        (permission: any) => !idSet.has(permission.id)
                    );
                    // Combinar los elementos del arreglo autpermission de cada objeto
                    const autpermission = [
                        ...accumulator.autpermission,
                        ...uniquePermissions
                    ];
                    // Retornar un nuevo objeto con los valores combinados
                    return uniquePermissions;
                }
            );

            ///Traer los permisos y asignarlos para que puedan hacer la funcion de userFound.permissions

            //--------------Bloque para extraer los modulos
            const uniqueModules = new Set();
            const dataModules = {};
            const permision: any = [];

            // Iteramos a través de los permisos y agregamos los módulos al conjunto
            combinedAuthGroup["autpermission"].forEach((permission) => {
                if (!(permission.content.id in dataModules)) {
                    dataModules[permission.content.id] = [];
                }
                const modules = permission.content.module;
                modules.forEach((module) => {
                    uniqueModules.add(JSON.stringify(module));
                });
                permision.push(permission.codename);
                dataModules[permission.content.id].push(permission.codename);
            });
            // Para obtener los módulos únicos como un array nuevamente
            const uniqueModulesArray = Array.from(uniqueModules).map((strModule: any) =>
                JSON.parse(strModule)
            );
            userFound["modules"] = uniqueModulesArray;

            if (!userFound) {
                throw "Usuario no encontrado";
            } else {
                const dataF = {
                    id: userFound.id,
                    email: userFound.email,
                    name: userFound.name,
                    roles: userFound.autgroup,
                    modules: uniqueModulesArray,
                    permissions: permision,
                    companies: userFound.company,
                    url: userFound.autgroup[0].url
                };
                return dataF;
            }
        } catch (error) {
            console.log("errors", error);

            throw new Error(error);
        }
    }

    
  async searchTable(
    limit: number= 1, 
    offset: number = 0, 
  ): Promise<any> {
    
    const queryBuilder = this.userRepositorio.createQueryBuilder('table');
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
  
    const countQueryBuilder = this.userRepositorio.createQueryBuilder('table');
  
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
