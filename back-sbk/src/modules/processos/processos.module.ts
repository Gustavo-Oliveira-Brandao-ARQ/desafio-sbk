import { Module } from '@nestjs/common';
import { ProcessosController } from './controllers/processos.controller';
import { ProcessosService } from './services/processos.service';
import { ProcessosRepository } from './repositories/processos.repository';

@Module({
  controllers: [ProcessosController],
  providers: [ProcessosService, ProcessosRepository],
})
export class ProcessosModule {}
