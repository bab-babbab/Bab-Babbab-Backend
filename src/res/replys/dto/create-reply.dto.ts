import { IsString, Length } from 'class-validator';

export class CreateReplyDto {
  @IsString()
  user_id: string;

  @IsString()
  @Length(1, 100)
  reply: string;

}
