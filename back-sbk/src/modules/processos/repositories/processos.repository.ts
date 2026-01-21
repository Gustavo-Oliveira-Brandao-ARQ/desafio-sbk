import { Injectable, OnModuleInit } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { ProcessoRaw } from '../entities/processo.entity';

interface JsonData {
  content: ProcessoRaw[];
}

@Injectable()
export class ProcessosRepository implements OnModuleInit {
  private processos: ProcessoRaw[] = [];

  onModuleInit() {
    const filePath = path.resolve(process.cwd(), 'src/data/itau.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContent) as JsonData;
    this.processos = data.content;
  }

  findAll(): ProcessoRaw[] {
    return this.processos;
  }

  findByNumero(numero: string): ProcessoRaw | undefined {
    return this.processos.find((p) => p.numeroProcesso === numero);
  }

  findUniqueTribunais(): string[] {
    const tribunais = this.processos.map((p) => p.siglaTribunal);
    return [...new Set(tribunais)].sort();
  }
}
