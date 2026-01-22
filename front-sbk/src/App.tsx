import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProcessosListPage } from './pages/processos-list';
import { ProcessoDetailPage } from './pages/processo-detail';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
        <header className="bg-white border-b sticky top-0 z-10">
          <div className="container mx-auto px-4 h-16 flex items-center">
            <span className="text-xl font-bold text-blue-800 tracking-tight">Desafio SBK</span>
          </div>
        </header>
        
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/processos" replace />} />
            <Route path="/processos" element={<ProcessosListPage />} />
            <Route path="/processos/:numeroProcesso" element={<ProcessoDetailPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
