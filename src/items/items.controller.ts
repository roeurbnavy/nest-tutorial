import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './../item';
import { Items } from './../items';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  async findAll(): Promise<Items> {
    return this.itemsService.findAll();
  }

  @Get(':id')
  async find(@Param('id') id: number): Promise<Item> {
    return this.itemsService.find(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async crate(@Body('item') item: Item): Promise<void> {
    console.log('crate', item);
    this.itemsService.create(item);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put()
  async update(@Body('item') item: Item): Promise<void> {
    console.log('item', item);
    this.itemsService.update(item);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete()
  async delete(@Param('id') id: number): Promise<void> {
    this.itemsService.delete(id);
  }
}
