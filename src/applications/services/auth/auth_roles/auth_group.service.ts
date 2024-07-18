import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { returnId } from "src/applications/utils/returns-id";
import { CreateAuthGroupDto } from "src/domains/dto/auth/auth_roles/create-auth_group.dto";
import { AuthGroup } from "src/domains/entities/auth/auth_roles/auth_group.entity";
import { In, Repository } from "typeorm";
@Injectable()
export class AuthGroupService {
  constructor(
    @InjectRepository(AuthGroup)
    private rolRepositorio: Repository<AuthGroup>
  ) {}

  async getAllRoles() {
    try {
      const companyFound = await this.rolRepositorio.find();
      return companyFound;
    } catch (error) {
      console.log(error);
      throw error
    }
  }

  async create(createContentTypeDto: CreateAuthGroupDto) {
    try {
      const newContent = await this.rolRepositorio.create(createContentTypeDto);
      const save = await this.rolRepositorio.save({
        ...newContent,
        autpermission: returnId(createContentTypeDto.permissions_id)
      });
      return save;
    } catch (err) {
      throw err;
    }
  }

  async getRolIds(ids) {
    try {
      const companyFound = await this.rolRepositorio.findBy({
        id: In([1, 2, 3])
      });
      return companyFound;
    } catch (error) {
      console.log(error);
      throw error
    }
  }
}
