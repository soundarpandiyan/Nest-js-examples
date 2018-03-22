import { Module } from '@nestjs/common';
import { CatsController } from './controller/cats.controller';
import { CatsService } from './services/cats.service';

@Module({
  controllers: [CatsController],
  components: [CatsService],
})
export class CatsModule { }
