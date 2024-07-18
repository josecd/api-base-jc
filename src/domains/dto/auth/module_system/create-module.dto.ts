export class CreateModuleDto {
  name: string;
  idStr: string;
  title: string;
  subtitle: string;
  type?: string;
  icon?: string;
  link?: string;
  parent?: number;
  codename?: string;
}
