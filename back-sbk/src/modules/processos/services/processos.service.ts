import { Injectable, NotFoundException } from '@nestjs/common';
import { ProcessosRepository } from '../repositories/processos.repository';
import { ProcessoMapper } from '../mappers/processo.mapper';
import { CursorUtil } from '../../../common/utils/cursor.util';
import { TramitacaoRule } from '../rules/tramitacao.rule';
import { GetProcessosDto } from '../dtos/get-processos.dto';

@Injectable()
export class ProcessosService {
  constructor(private readonly repository: ProcessosRepository) {}

  findAll(query: GetProcessosDto) {
    const { q, tribunal, grau, limit = 20, cursor } = query;
    let processos = this.repository.findAll();

    processos = processos.filter((p) => !!TramitacaoRule.getAtual(p));

    if (q) {
      const termo = q.toLowerCase();
      processos = processos.filter((p) => {
        const tramitacao = TramitacaoRule.getAtual(p)!;
        return (
          p.numeroProcesso.includes(termo) ||
          tramitacao.partes.some((parte) =>
            parte.nome.toLowerCase().includes(termo),
          ) ||
          tramitacao.classe.some((c) =>
            c.descricao.toLowerCase().includes(termo),
          ) ||
          tramitacao.assunto.some((a) =>
            a.descricao.toLowerCase().includes(termo),
          )
        );
      });
    }

    if (tribunal) {
      processos = processos.filter((p) => p.siglaTribunal === tribunal);
    }

    if (grau) {
      processos = processos.filter((p) => {
        const tramitacao = TramitacaoRule.getAtual(p)!;
        return tramitacao.grau.sigla === grau;
      });
    }

    const limitNum = Math.min(limit, 100);
    let startIndex = 0;

    if (cursor) {
      const decoded = CursorUtil.decode(cursor);
      startIndex = parseInt(decoded, 10) + 1;
    }

    const items = processos.slice(startIndex, startIndex + limitNum);

    let nextCursor: string | null = null;
    if (startIndex + limitNum < processos.length) {
      const lastIndex = startIndex + limitNum - 1;
      nextCursor = CursorUtil.encode(lastIndex.toString());
    }

    return {
      items: items.map((p) => ProcessoMapper.toSummary(p)),
      nextCursor,
    };
  }

  findOne(numero: string) {
    const processo = this.repository.findByNumero(numero);
    if (!processo) {
      throw new NotFoundException(`Processo ${numero} não encontrado`);
    }
    if (!TramitacaoRule.getAtual(processo)) {
      throw new NotFoundException(
        `Processo ${numero} não possui tramitações válidas`,
      );
    }

    return ProcessoMapper.toDetail(processo);
  }

  getTribunais() {
    return this.repository.findUniqueTribunais();
  }
}
