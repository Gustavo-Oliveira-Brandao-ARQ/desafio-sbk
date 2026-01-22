import { useProcessos } from "../hooks/use-processos";
import { ProcessoCard } from "../components/processo-card";
import { FilterBar } from "../components/filter-bar";
import { Button } from "../components/ui/button";
import { Loader2 } from "lucide-react";

export function ProcessosListPage() {
  const { data, loading, error, hasMore, loadMore, filters, updateFilters } =
    useProcessos();

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="flex items-center gap-3 mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Consulta de Processos</h1>
        {loading && data.length > 0 && <Loader2 className="h-5 w-5 animate-spin text-blue-600" />}
      </div>
      
      <FilterBar filters={filters} onChange={updateFilters} />

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-4 border border-red-200">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {data.length === 0 && !loading && (
          <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg border border-dashed">
            Nenhum processo encontrado com os filtros atuais.
          </div>
        )}

        {data.map((processo) => (
          <ProcessoCard key={processo.numeroProcesso} processo={processo} />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        {loading && data.length === 0 ? (
          <div className="flex flex-col items-center text-gray-400">
            <Loader2 className="h-8 w-8 animate-spin mb-2" />
            <p>Buscando processos...</p>
          </div>
        ) : hasMore ? (
          <Button
            onClick={loadMore}
            variant="outline"
            className="w-full md:w-auto"
            disabled={loading}
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {loading ? "Carregando..." : "Carregar Mais"}
          </Button>
        ) : data.length > 0 ? (
          <p className="text-sm text-gray-400">
            Todos os processos foram listados.
          </p>
        ) : null}
      </div>
    </div>
  );
}
