import { Module } from "@nestjs/common";
import { SharedModule } from "src/shared/shared.module";
import { OrganizationsController } from "./organizations.controller";
import { OrganizationsService } from "./organizations.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [SharedModule],
    controllers: [OrganizationsController],
    providers:[OrganizationsService],
    exports: [OrganizationsService]  
})

export class OrganizationsModule { }