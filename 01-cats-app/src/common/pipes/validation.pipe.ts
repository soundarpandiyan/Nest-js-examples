import { PipeTransform, Pipe, ArgumentMetadata, BadRequestException, Param } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
var util = require('util');

@Pipe()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value, metadata: ArgumentMetadata) {
    const { metatype } = metadata;

    if (!metatype)
      return value;

    if (!this.checkInstanceType(metatype)) {
      this.validatePrimitiveTypes(metatype, value);
    }
    else {
      await this.validateInstanceType(metatype, value);
    }

    return value;
  }

  private async validateInstanceType(metatype: new (...args: any[]) => any, value: any) {
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      let errDetail = util.inspect(errors, { showHidden: true, depth: null });
      console.log(`Validation failed: ${errDetail}`);
      throw new BadRequestException(`Validation failed: ${errDetail}`);
    }
  }

  private validatePrimitiveTypes(metatype: new (...args: any[]) => any, value: any) {
    let err;
    switch (metatype) {
      case Object:
        Object.keys(value).forEach(item => {
          if (this.checkValue(value[item]))
            err = `${item} is not defined`;
        });
        break;
      case Array:
        if (value.length > 0)
          err = 'array length is zero';
        break;
      case String:
        if (this.checkValue(value))
          err = 'value is not defined';
        break;
      case Number:
        if (!isNaN(value))
          err = 'value is not a number';
        break;
      case Boolean:
        if (value.toLowerCase() == true || value.toLowerCase() == false)
          err = 'value is expected to be True/False';
        break;
    }
    if (err)
      throw new BadRequestException(`Validation failed: ${err}`);
  }

  private checkInstanceType(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find(type => metatype === type);
  }

  private checkValue(value): boolean {
    return (value === undefined || value === null);
  }
}