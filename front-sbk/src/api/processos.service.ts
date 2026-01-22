import type { PaginatedResponse, ProcessoDetail, ProcessoFilters, ProcessoSummary } from './types';

const API_URL = 'http://localhost:3000';

export const ProcessosService = {
  async getAll(filters: ProcessoFilters = {}, signal?: AbortSignal): Promise<PaginatedResponse<ProcessoSummary>> {
    const params = new URLSearchParams();
    if (filters.q) params.append('q', filters.q);
    if (filters.tribunal && filters.tribunal !== 'ALL') params.append('tribunal', filters.tribunal);
    if (filters.grau && filters.grau !== 'ALL') params.append('grau', filters.grau);
    if (filters.cursor) params.append('cursor', filters.cursor);
    if (filters.limit) params.append('limit', filters.limit.toString());

    const response = await fetch(`${API_URL}/processos?${params.toString()}`, { signal });
    if (!response.ok) {
      throw new Error('Erro ao buscar processos');
    }
    return response.json();
  },

  async getOne(numeroProcesso: string): Promise<ProcessoDetail> {
    const response = await fetch(`${API_URL}/processos/${numeroProcesso}`);
    if (!response.ok) {
      throw new Error('Processo não encontrado');
    }
    return response.json();
  },

  async getTribunais(): Promise<string[]> {
    const response = await fetch(`${API_URL}/processos/tribunais`);
    if (!response.ok) {
      throw new Error('Erro ao buscar tribunais');
    }
    return response.json();
  },
};
