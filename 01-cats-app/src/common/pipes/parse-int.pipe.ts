import { HttpException } from '@nestjs/common';
import {
  PipeTransform,
  Pipe,
  ArgumentMetadata,
  HttpStatus,
} from '@nestjs/common';

@Pipe()
export class ParseIntPipe implements PipeTransform<string> {
  async transform(value: string, metadata: ArgumentMetadata) {
    console.log(metadata.data);
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new HttpException('Validation failed', HttpStatus.BAD_REQUEST);
    }
    return val;
  }
}
