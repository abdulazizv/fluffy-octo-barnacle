import { PartialType } from "@nestjs/swagger";
import { CreateOrganizationDto } from "src/modules/organizations/dto/create-organizations.dto";

export class UpdateUserRoleDto extends PartialType(CreateOrganizationDto) {}