import { useNavigate } from 'react-router-dom';
import type { ProcessoSummary } from '../api/types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { CalendarDays, Gavel, FileText } from 'lucide-react';

interface Props {
  processo: ProcessoSummary;
}

export function ProcessoCard({ processo }: Props) {
  const navigate = useNavigate();

  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow mb-4"
      onClick={() => navigate(`/processos/${processo.numeroProcesso}`)}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-bold text-blue-700">
              {processo.numeroProcesso}
            </CardTitle>
            <div className="flex gap-2 mt-2">
              <Badge variant="secondary">{processo.siglaTribunal}</Badge>
              <Badge variant="outline">{processo.grauAtual}</Badge>
            </div>
          </div>
          <span className="text-xs text-gray-500 flex items-center gap-1">
            <CalendarDays size={14} />
            {new Date(processo.ultimoMovimento.dataHora).toLocaleDateString()}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <FileText size={16} className="text-gray-400" />
            <span className="font-medium">{processo.classePrincipal}</span>
            <span className="text-gray-400">|</span>
            <span className="truncate">{processo.assuntoPrincipal}</span>
          </div>
          
          <div className="flex items-start gap-2 mt-2 bg-gray-50 p-3 rounded-md">
            <Gavel size={16} className="text-gray-400 mt-1 min-w-4" />
            <div>
              <p className="font-semibold text-gray-900">Último Movimento:</p>
              <p className="text-gray-600 line-clamp-2">{processo.ultimoMovimento.descricao}</p>
              <p className="text-xs text-gray-400 mt-1">{processo.ultimoMovimento.orgaoJulgador}</p>
            </div>
          </div>

          <div className="mt-2 text-xs text-gray-500">
            <p>
              <span className="font-semibold">Partes:</span> {processo.partesResumo.ativo.join(', ')} x {processo.partesResumo.passivo.join(', ')}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
