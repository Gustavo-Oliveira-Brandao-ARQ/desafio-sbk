import { useState, useEffect, useCallback, useRef } from 'react';
import { ProcessosService } from '../api/processos.service';
import type { ProcessoFilters, ProcessoSummary } from '../api/types';

export function useProcessos(initialFilters: ProcessoFilters = {}) {
  const [data, setData] = useState<ProcessoSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [filters, setFilters] = useState<ProcessoFilters>(initialFilters);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchProcessos = useCallback(async (reset = false, cursorOverride?: string | null) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);
    try {
      const currentCursor = reset ? undefined : (cursorOverride || undefined);
      
      const response = await ProcessosService.getAll({ ...filters, cursor: currentCursor }, controller.signal);
      
      setData(prev => reset ? response.items : [...prev, ...response.items]);
      setNextCursor(response.nextCursor);
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return;
      setError('Falha ao carregar processos. Tente novamente.');
      console.error(err);
    } finally {
      if (abortControllerRef.current === controller) {
        setLoading(false);
      }
    }
  }, [filters]);

  useEffect(() => {
    setNextCursor(null);
    fetchProcessos(true);
  }, [filters.q, filters.tribunal, filters.grau, fetchProcessos]);

  const loadMore = () => {
    if (nextCursor && !loading) {
      fetchProcessos(false, nextCursor);
    }
  };

  const updateFilters = (newFilters: Partial<ProcessoFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return {
    data,
    loading,
    error,
    hasMore: !!nextCursor,
    loadMore,
    filters,
    updateFilters,
  };
}
