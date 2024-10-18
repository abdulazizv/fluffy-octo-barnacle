import { Module } from "@nestjs/common";
import { databaseProvider } from "./providers/database.service";
import { JwtModule, JwtService } from "@nestjs/jwt";

@Module({
    imports: [JwtModule.register({})],
    providers: [databaseProvider,JwtService],
    exports: [databaseProvider,JwtService]
})
export class SharedModule {}