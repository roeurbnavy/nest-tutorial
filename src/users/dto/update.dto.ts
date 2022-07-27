import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserUpdateDTO {
  @ApiProperty({
    required: false,
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: false })
  @IsEmail()
  email: string;
}
