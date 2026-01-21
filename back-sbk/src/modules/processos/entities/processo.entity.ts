export interface ProcessoRaw {
  numeroProcesso: string;
  nivelSigilo: number;
  idCodexTribunal: number;
  siglaTribunal: string;
  tramitacoes: TramitacaoRaw[];
}

export interface TramitacaoRaw {
  idCodex: number;
  dataHoraAjuizamento: string;
  tribunal: {
    sigla: string;
    nome: string;
    segmento: string;
    jtr: string;
  };
  grau: {
    sigla: string;
    nome: string;
    numero: number;
  };
  liminar: boolean;
  nivelSigilo: number;
  valorAcao: number;
  dataHoraUltimaDistribuicao: string;
  classe: {
    codigo: number;
    descricao: string;
  }[];
  assunto: {
    codigo: number;
    descricao: string;
    hierarquia: string;
  }[];
  ultimoMovimento: MovimentoRaw;
  partes: ParteRaw[];
  ativo: boolean;
  orgaoJulgador: {
    id: number;
    nome: string;
  };
}

export interface MovimentoRaw {
  sequencia: number;
  dataHora: string;
  codigo: number;
  descricao: string;
  idCodex: number;
  idMovimentoOrigem: string;
  idDistribuicaoCodex: number;
  classe: {
    codigo: number;
    descricao: string;
  };
  orgaoJulgador: {
    id: number;
    nome: string;
  }[];
}

export interface ParteRaw {
  polo: 'ATIVO' | 'PASSIVO' | 'OUTROS_PARTICIPANTES';
  tipoParte: string;
  nome: string;
  outrosNomes?: {
    nome: string;
    tipo: string;
  }[];
  representantes?: {
    nome: string;
    tipo: string;
    situacao?: string;
    tipoRepresentacao?: string;
  }[];
}
