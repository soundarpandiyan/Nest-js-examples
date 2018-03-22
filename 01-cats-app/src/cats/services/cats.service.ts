import { Component } from '@nestjs/common';
import { Cat } from '../interfaces/cat.interface';
import { CatsModule } from '../cats.module';
var _ = require('underscore');

@Component()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }

  findOne(name: string): Cat {
    let result: Cat = _.find(this.cats, function (x) {
      return x.name == name;
    });

    return result;
  }
}
