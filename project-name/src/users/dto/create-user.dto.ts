import { IsEmail, IsNumber, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    id?: string;
    @IsString()
    firstName: string;
    @IsString()
    lastName: string;
    @IsEmail()
    email: string;
    @IsString()
    password: string;
}
