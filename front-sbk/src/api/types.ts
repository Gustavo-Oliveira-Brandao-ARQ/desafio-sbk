export interface ProcessoSummary {
  numeroProcesso: string;
  siglaTribunal: string;
  grauAtual: string;
  classePrincipal: string;
  assuntoPrincipal: string;
  ultimoMovimento: {
    dataHora: string;
    descricao: string;
    orgaoJulgador: string;
  };
  partesResumo: {
    ativo: string[];
    passivo: string[];
  };
}

export interface ProcessoDetail {
  cabecalho: {
    numeroProcesso: string;
    siglaTribunal: string;
    nivelSigilo: number;
    tramitacaoAtual: string;
    grau: string;
    orgaoJulgador: string;
    classes: string[];
    assuntos: string[];
    datasRelevantes: {
      ajuizamento: string;
      ultimaDistribuicao: string;
    };
  };
  partes: {
    nome: string;
    tipo: string;
    polo: string;
    representantes: string[];
  }[];
  ultimoMovimento: {
    data: string;
    descricao: string;
    orgaoJulgador: string;
    codigo?: number;
  };
}

export interface PaginatedResponse<T> {
  items: T[];
  nextCursor: string | null;
}

export interface ProcessoFilters {
  q?: string;
  tribunal?: string;
  grau?: string;
  cursor?: string;
  limit?: number;
}
