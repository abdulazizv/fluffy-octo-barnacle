import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { SharedModule } from "src/shared/shared.module";
import { ProjectsController } from "./projects.controller";
import { ProjectsService } from "./projects.service";

@Module({
    imports: [SharedModule],
    controllers: [ProjectsController],
    providers: [ProjectsService],
    exports: [ProjectsService]
})
export class ProjectsModule { }