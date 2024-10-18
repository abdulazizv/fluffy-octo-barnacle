import { applyDecorators } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";

export const IsPagination = () =>
    applyDecorators(ApiProperty({ required: true }), IsNumberString());