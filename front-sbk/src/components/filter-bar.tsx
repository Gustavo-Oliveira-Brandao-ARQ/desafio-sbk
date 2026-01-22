import { useEffect, useState } from 'react';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search } from 'lucide-react';
import type { ProcessoFilters } from '../api/types';
import { ProcessosService } from '../api/processos.service';

interface Props {
  filters: ProcessoFilters;
  onChange: (filters: Partial<ProcessoFilters>) => void;
}

export function FilterBar({ filters, onChange }: Props) {
  const [tribunais, setTribunais] = useState<string[]>([]);

  useEffect(() => {
    ProcessosService.getTribunais().then(setTribunais).catch(console.error);
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 bg-white p-4 rounded-lg shadow-sm border">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Buscar por número, parte ou assunto..."
          className="pl-9"
          value={filters.q || ''}
          onChange={(e) => onChange({ q: e.target.value })}
        />
      </div>
      
      <div className="w-full md:w-48">
        <Select 
          value={filters.tribunal || 'ALL'} 
          onValueChange={(val) => onChange({ tribunal: val === 'ALL' ? undefined : val })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Tribunal" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Todos os Tribunais</SelectItem>
            {tribunais.map(t => (
              <SelectItem key={t} value={t}>{t}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="w-full md:w-48">
        <Select 
          value={filters.grau || 'ALL'} 
          onValueChange={(val) => onChange({ grau: val === 'ALL' ? undefined : val })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Grau" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Todos os Graus</SelectItem>
            <SelectItem value="G1">1º Grau</SelectItem>
            <SelectItem value="G2">2º Grau</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
