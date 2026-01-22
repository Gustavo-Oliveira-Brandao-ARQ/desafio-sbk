import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProcessosService } from '../api/processos.service';
import type { ProcessoDetail } from '../api/types';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, Loader2, Calendar, Scale, MapPin } from 'lucide-react';

export function ProcessoDetailPage() {
  const { numeroProcesso } = useParams<{ numeroProcesso: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<ProcessoDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (numeroProcesso) {
      ProcessosService.getOne(numeroProcesso)
        .then(setData)
        .catch(() => setError('Não foi possível carregar os detalhes do processo.'))
        .finally(() => setLoading(false));
    }
  }, [numeroProcesso]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h2 className="text-xl text-red-600 mb-4">{error}</h2>
        <Button onClick={() => navigate('/')}>Voltar</Button>
      </div>
    );
  }

  const { cabecalho, partes, ultimoMovimento } = data;

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <Button variant="ghost" onClick={() => navigate('/')} className="mb-4 pl-0 hover:bg-transparent hover:text-blue-600">
        <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para lista
      </Button>

      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{cabecalho.numeroProcesso}</h1>
          <div className="flex gap-2 mt-2">
            <Badge className="bg-blue-600">{cabecalho.siglaTribunal}</Badge>
            <Badge variant="outline">{cabecalho.grau}</Badge>
            {cabecalho.nivelSigilo > 0 && <Badge variant="destructive">Sigiloso</Badge>}
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        <Card className="border-l-4 border-l-blue-600 bg-blue-50/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Scale className="h-5 w-5 text-blue-600" />
              Último Movimento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-semibold text-lg">{ultimoMovimento.descricao}</p>
            <p className="text-gray-600 mt-1">{ultimoMovimento.orgaoJulgador}</p>
            <p className="text-sm text-gray-400 mt-2 flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {new Date(ultimoMovimento.data).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dados do Processo</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Classe Principal</p>
              <p className="font-medium">{cabecalho.classes[0]}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Assunto Principal</p>
              <p className="font-medium">{cabecalho.assuntos[0]}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Órgão Julgador</p>
              <p className="font-medium flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {cabecalho.orgaoJulgador}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Data de Ajuizamento</p>
              <p className="font-medium">{new Date(cabecalho.datasRelevantes.ajuizamento).toLocaleDateString()}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Partes Envolvidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {['ATIVO', 'PASSIVO', 'OUTROS_PARTICIPANTES'].map((polo) => {
              const partesDoPolo = partes.filter(p => p.polo === polo);
              if (partesDoPolo.length === 0) return null;

              return (
                <div key={polo}>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                    {polo.replace('_', ' ')}
                  </h3>
                  <div className="space-y-3">
                    {partesDoPolo.map((parte, idx) => (
                      <div key={idx} className="bg-gray-50 p-3 rounded-md">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">{parte.nome}</span>
                          <Badge variant="secondary" className="text-[10px] h-5">{parte.tipo}</Badge>
                        </div>
                        {parte.representantes.length > 0 && (
                          <div className="mt-2 text-sm text-gray-600 pl-4 border-l-2 border-gray-200">
                            <span className="text-xs text-gray-400 block mb-1">Representantes:</span>
                            {parte.representantes.map((rep, rIdx) => (
                              <div key={rIdx}>{rep}</div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
