import { ApiProperty } from '@nestjs/swagger';

class UltimoMovimentoSummaryDto {
  @ApiProperty()
  dataHora: string;
  @ApiProperty()
  descricao: string;
  @ApiProperty()
  orgaoJulgador: string;
}

class PartesResumoDto {
  @ApiProperty({ type: [String] })
  ativo: string[];
  @ApiProperty({ type: [String] })
  passivo: string[];
}

export class ProcessoSummaryDto {
  @ApiProperty()
  numeroProcesso: string;
  @ApiProperty()
  siglaTribunal: string;
  @ApiProperty()
  grauAtual: string;
  @ApiProperty()
  classePrincipal: string;
  @ApiProperty()
  assuntoPrincipal: string;
  @ApiProperty({ type: UltimoMovimentoSummaryDto })
  ultimoMovimento: UltimoMovimentoSummaryDto;
  @ApiProperty({ type: PartesResumoDto })
  partesResumo: PartesResumoDto;
}

class DatasRelevantesDto {
  @ApiProperty()
  ajuizamento: string;
  @ApiProperty()
  ultimaDistribuicao: string;
}

class CabecalhoDetailDto {
  @ApiProperty()
  numeroProcesso: string;
  @ApiProperty()
  siglaTribunal: string;
  @ApiProperty()
  nivelSigilo: number;
  @ApiProperty()
  tramitacaoAtual: string;
  @ApiProperty()
  grau: string;
  @ApiProperty()
  orgaoJulgador: string;
  @ApiProperty({ type: [String] })
  classes: string[];
  @ApiProperty({ type: [String] })
  assuntos: string[];
  @ApiProperty({ type: DatasRelevantesDto })
  datasRelevantes: DatasRelevantesDto;
}

class ParteDetailDto {
  @ApiProperty()
  nome: string;
  @ApiProperty()
  tipo: string;
  @ApiProperty()
  polo: string;
  @ApiProperty({ type: [String] })
  representantes: string[];
}

class UltimoMovimentoDetailDto {
  @ApiProperty()
  data: string;
  @ApiProperty()
  descricao: string;
  @ApiProperty()
  orgaoJulgador: string;
  @ApiProperty({ required: false })
  codigo?: number;
}

export class ProcessoDetailDto {
  @ApiProperty({ type: CabecalhoDetailDto })
  cabecalho: CabecalhoDetailDto;
  @ApiProperty({ type: [ParteDetailDto] })
  partes: ParteDetailDto[];
  @ApiProperty({ type: UltimoMovimentoDetailDto })
  ultimoMovimento: UltimoMovimentoDetailDto;
}
