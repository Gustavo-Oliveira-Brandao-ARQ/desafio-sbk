import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class GetProcessosDto {
  @ApiPropertyOptional({ description: 'Termo de busca textual' })
  @IsOptional()
  @IsString()
  q?: string;

  @ApiPropertyOptional({ description: 'Sigla do tribunal (ex: TJSP)' })
  @IsOptional()
  @IsString()
  tribunal?: string;

  @ApiPropertyOptional({ description: 'Grau do processo (ex: G1, G2)' })
  @IsOptional()
  @IsString()
  grau?: string;

  @ApiPropertyOptional({
    description: 'Quantidade de registros por página',
    default: 20,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number;

  @ApiPropertyOptional({ description: 'Cursor para paginação' })
  @IsOptional()
  @IsString()
  cursor?: string;
}
