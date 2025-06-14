import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserInfoDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  profile: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}
