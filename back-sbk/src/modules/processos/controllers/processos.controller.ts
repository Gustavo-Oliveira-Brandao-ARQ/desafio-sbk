import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProcessosService } from '../services/processos.service';
import { GetProcessosDto } from '../dtos/get-processos.dto';
import {
  ProcessoSummaryDto,
  ProcessoDetailDto,
} from '../dtos/processos-response.dto';

@ApiTags('Processos')
@Controller('processos')
export class ProcessosController {
  constructor(private readonly service: ProcessosService) {}

  @Get()
  @ApiOperation({ summary: 'Listar processos com filtros e paginação' })
  @ApiResponse({
    status: 200,
    description: 'Lista de processos encontrada',
    type: [ProcessoSummaryDto],
  })
  findAll(@Query() query: GetProcessosDto) {
    return this.service.findAll(query);
  }

  @Get('tribunais')
  @ApiOperation({ summary: 'Listar tribunais disponíveis' })
  @ApiResponse({
    status: 200,
    description: 'Lista de siglas de tribunais',
    type: [String],
  })
  getTribunais() {
    return this.service.getTribunais();
  }

  @Get(':numeroProcesso')
  @ApiOperation({ summary: 'Obter detalhes de um processo' })
  @ApiResponse({
    status: 200,
    description: 'Detalhes do processo',
    type: ProcessoDetailDto,
  })
  @ApiResponse({ status: 404, description: 'Processo não encontrado' })
  findOne(@Param('numeroProcesso') numeroProcesso: string) {
    return this.service.findOne(numeroProcesso);
  }
}
