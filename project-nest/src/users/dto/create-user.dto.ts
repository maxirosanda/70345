import { IsString, IsNotEmpty,IsEmail, MinLength,MaxLength } from "class-validator";

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    first_name: string;

    @IsString()
    @IsNotEmpty()
    last_name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(32)
    password: string;
}
