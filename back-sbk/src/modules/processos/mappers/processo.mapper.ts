import { ProcessoRaw } from '../entities/processo.entity';
import {
  ProcessoSummaryDto,
  ProcessoDetailDto,
} from '../dtos/processos-response.dto';
import { TramitacaoRule } from '../rules/tramitacao.rule';

export class ProcessoMapper {
  static toSummary(processo: ProcessoRaw): ProcessoSummaryDto {
    const tramitacaoAtual = TramitacaoRule.getAtual(processo);

    if (!tramitacaoAtual) {
      throw new Error(
        `Processo ${processo.numeroProcesso} sem tramitação válida`,
      );
    }

    const ultimoMovimento = tramitacaoAtual.ultimoMovimento;

    const orgaoJulgador = ultimoMovimento?.orgaoJulgador?.[0]?.nome || 'N/A';

    return {
      numeroProcesso: processo.numeroProcesso,
      siglaTribunal: processo.siglaTribunal,
      grauAtual: tramitacaoAtual.grau.sigla,
      classePrincipal: tramitacaoAtual.classe?.[0]?.descricao || 'Desconhecida',
      assuntoPrincipal:
        tramitacaoAtual.assunto?.[0]?.descricao || 'Desconhecido',
      ultimoMovimento: {
        dataHora: ultimoMovimento?.dataHora || '',
        descricao: ultimoMovimento?.descricao || 'Sem movimento registrado',
        orgaoJulgador,
      },
      partesResumo: {
        ativo: tramitacaoAtual.partes
          .filter((p) => p.polo === 'ATIVO')
          .map((p) => p.nome),
        passivo: tramitacaoAtual.partes
          .filter((p) => p.polo === 'PASSIVO')
          .map((p) => p.nome),
      },
    };
  }

  static toDetail(processo: ProcessoRaw): ProcessoDetailDto {
    const tramitacaoAtual = TramitacaoRule.getAtual(processo);

    if (!tramitacaoAtual) {
      throw new Error(
        `Processo ${processo.numeroProcesso} sem tramitação válida`,
      );
    }

    const ultimoMov = tramitacaoAtual.ultimoMovimento;
    const orgaoJulgador = ultimoMov?.orgaoJulgador?.[0]?.nome || 'N/A';

    return {
      cabecalho: {
        numeroProcesso: processo.numeroProcesso,
        siglaTribunal: processo.siglaTribunal,
        nivelSigilo: processo.nivelSigilo,
        tramitacaoAtual: `ID ${tramitacaoAtual.idCodex || 'N/A'}`,
        grau: tramitacaoAtual.grau.nome,
        orgaoJulgador: tramitacaoAtual.orgaoJulgador?.nome || orgaoJulgador,
        classes: tramitacaoAtual.classe.map((c) => c.descricao),
        assuntos: tramitacaoAtual.assunto.map((a) => a.descricao),
        datasRelevantes: {
          ajuizamento: tramitacaoAtual.dataHoraAjuizamento,
          ultimaDistribuicao: tramitacaoAtual.dataHoraUltimaDistribuicao,
        },
      },
      partes: tramitacaoAtual.partes.map((p) => ({
        nome: p.nome,
        tipo: p.tipoParte,
        polo: p.polo,
        representantes: p.representantes?.map((r) => r.nome).slice(0, 3) || [],
      })),
      ultimoMovimento: {
        data: ultimoMov?.dataHora || '',
        descricao: ultimoMov?.descricao || 'Sem movimento registrado',
        orgaoJulgador,
        codigo: ultimoMov?.codigo,
      },
    };
  }
}
