import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Registrar } from './registrar.entity';
import { RegistrarController } from './registrar.controller';
import { RegistrarService } from './registrar.service';

@Module({
  imports: [TypeOrmModule.forFeature([Registrar])],
  controllers: [RegistrarController],
  providers: [RegistrarService]
})
export class RegistrarModule {}
