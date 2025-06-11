import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class SchoolInfoDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  school_name: string;

  @IsInt()
  grade: number;

  @IsInt()
  class: number;
}
