import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UserInfoDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  proflie: string;

  @IsString()
  @IsNotEmpty()
  school_name: string;

  @IsInt()
  grade: number;

  @IsInt()
  class: number;

  @IsString()
  message: string;
}
