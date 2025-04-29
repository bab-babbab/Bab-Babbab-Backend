import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  comment: string;

  @IsString()
  @IsOptional()
  photo_b: string;

  @IsString()
  @IsOptional()
  photo_l?: string;

  @IsString()
  @IsOptional()
  photo_d?: string;
}
