import { IsNotEmpty, IsString } from 'class-validator';

export class UserInfoDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  profile: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}
