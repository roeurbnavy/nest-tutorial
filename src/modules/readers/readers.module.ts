import { Reader } from './entities/reader.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ReadersService } from './readers.service';
import { ReadersResolver } from './readers.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Reader])],
  providers: [ReadersResolver, ReadersService],
})
export class ReadersModule {}
