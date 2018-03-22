import {
  Controller,
  Get,
  Res,
  Post,
  Body,
  UseGuards,
  ReflectMetadata,
  UseInterceptors,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateCatDto } from '../dto/create-cat.dto';
import { CatsService } from '../services/cats.service';
import { Cat } from '../interfaces/cat.interface';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { LoggingInterceptor } from '../../common/interceptors/logging.interceptor';
import { TransformInterceptor } from '../../common/interceptors/transform.interceptor';
import { ParseIntPipe } from '../../common/pipes/parse-int.pipe';
import { HttpException } from '@nestjs/core';
import {
  ApiUseTags,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
  ApiImplicitParam,
} from '@nestjs/swagger';

@ApiUseTags('catsexample')
@Controller('example')
export class CatsController {
  constructor(private readonly catsService: CatsService) { }

  @ApiOperation({ title: 'Create cat' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @Post("/createcat")
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
    return JSON.stringify({ status: 'Cat record created successfully' });
  }

  @ApiOperation({ title: 'Get all the cat details' })
  @ApiResponse({
    status: 200,
    description: 'All Cats are retrieved successfully',
  })
  @Get("cats")
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @ApiOperation({ title: 'Get cat details' })
  @ApiResponse({
    status: 200,
    description: 'Cat retrieved successfully',
  })
  @ApiImplicitParam({ name: 'name', description: 'Get the particular cat using name', type: String })
  @Get('cats/:name')
  findOne(@Param() params): any {
    return this.catsService.findOne(params.name);
  }
}
