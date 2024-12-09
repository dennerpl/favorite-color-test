import { IsHexColor, IsNotEmpty, IsString } from 'class-validator';

export class CreateColorDto {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsHexColor({ message: 'HexCode must be a valid hex color' })
  hexCode: string;
}
