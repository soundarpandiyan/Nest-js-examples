import { IsString, IsInt, IsNumber } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateCatDto {
  @ApiModelProperty({ type: String })
  @IsString() readonly name: string;

  @ApiModelProperty({ type: Number })
  readonly age: number;

  @ApiModelProperty({ type: String })
  @IsString() readonly breed: string;
}
