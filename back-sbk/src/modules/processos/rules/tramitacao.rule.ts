import { ProcessoRaw, TramitacaoRaw } from '../entities/processo.entity';

export class TramitacaoRule {
  static getAtual(processo: ProcessoRaw): TramitacaoRaw | undefined {
    if (!processo.tramitacoes || processo.tramitacoes.length === 0) {
      return undefined;
    }

    return [...processo.tramitacoes].sort((a, b) => {
      if (a.ativo !== b.ativo) {
        return a.ativo ? -1 : 1;
      }
      const dataA = new Date(a.dataHoraUltimaDistribuicao).getTime();
      const dataB = new Date(b.dataHoraUltimaDistribuicao).getTime();
      if (dataA !== dataB) {
        return dataB - dataA;
      }
      return b.grau.numero - a.grau.numero;
    })[0];
  }
}
