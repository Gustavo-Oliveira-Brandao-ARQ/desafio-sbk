import { TramitacaoRule } from './tramitacao.rule';
import { ProcessoRaw, TramitacaoRaw } from '../entities/processo.entity';

describe('TramitacaoRule', () => {
  const mockProcesso = (tramitacoes: Partial<TramitacaoRaw>[]): ProcessoRaw => ({
    numeroProcesso: '123',
    nivelSigilo: 0,
    idCodexTribunal: 1,
    siglaTribunal: 'TJSP',
    tramitacoes: tramitacoes as TramitacaoRaw[],
  });

  it('deve retornar undefined se a lista de tramitações estiver vazia', () => {
    const processo = mockProcesso([]);
    expect(TramitacaoRule.getAtual(processo)).toBeUndefined();
  });

  it('deve priorizar a tramitação ativa', () => {
    const processo = mockProcesso([
      { ativo: false, dataHoraUltimaDistribuicao: '2023-01-01', grau: { numero: 1 } } as any,
      { ativo: true, dataHoraUltimaDistribuicao: '2022-01-01', grau: { numero: 1 } } as any,
    ]);

    const result = TramitacaoRule.getAtual(processo);
    expect(result?.ativo).toBe(true);
    expect(result?.dataHoraUltimaDistribuicao).toBe('2022-01-01');
  });

  it('deve priorizar a data mais recente caso o status ativo seja igual', () => {
    const processo = mockProcesso([
      { ativo: true, dataHoraUltimaDistribuicao: '2023-01-01', grau: { numero: 1 } } as any,
      { ativo: true, dataHoraUltimaDistribuicao: '2024-01-01', grau: { numero: 1 } } as any,
    ]);

    const result = TramitacaoRule.getAtual(processo);
    expect(result?.dataHoraUltimaDistribuicao).toBe('2024-01-01');
  });

  it('deve priorizar o maior grau caso a data seja igual', () => {
    const data = '2023-01-01';
    const processo = mockProcesso([
      { ativo: true, dataHoraUltimaDistribuicao: data, grau: { numero: 1 } } as any,
      { ativo: true, dataHoraUltimaDistribuicao: data, grau: { numero: 2 } } as any,
    ]);

    const result = TramitacaoRule.getAtual(processo);
    expect(result?.grau.numero).toBe(2);
  });
});
