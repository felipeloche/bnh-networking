'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token) {
      router.push('/login');
      return;
    }

    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [router]);

  if (!user) return <div>Carregando...</div>;

  if (user.status === 'PENDING') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <h1 className="text-3xl font-bold mb-4">Aguardando Confirmação</h1>
          <p className="text-gray-600 max-w-md">
            Sua solicitação está sendo analisada pelos administradores.
            Você receberá um email assim que for aprovado.
          </p>
        </div>
      </div>
    );
  }

  if (user.status === 'REJECTED') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 text-red-500">✕</div>
          <h1 className="text-3xl font-bold mb-4">Solicitação Não Aprovada</h1>
          <p className="text-gray-600 max-w-md">
            Infelizmente sua solicitação não foi aprovada.
            Entre em contato para mais informações: contato@bnh.com
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">BNH</h1>
          <div className="flex items-center gap-4">
            <span>{user.name}</span>
            <button
              onClick={() => {
                localStorage.clear();
                router.push('/login');
              }}
              className="text-red-500 hover:text-red-700"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-8">
        <h2 className="text-3xl font-bold mb-8">Dashboard</h2>

        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-primary text-3xl mb-2">📤</div>
            <div className="text-3xl font-bold">12</div>
            <div className="text-gray-600">Indicações Enviadas</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-secondary text-3xl mb-2">📥</div>
            <div className="text-3xl font-bold">8</div>
            <div className="text-gray-600">Indicações Recebidas</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-green-500 text-3xl mb-2">✓</div>
            <div className="text-3xl font-bold">5</div>
            <div className="text-gray-600">Negócios Fechados</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-primary text-3xl mb-2">👤</div>
            <div className="text-3xl font-bold">95.5%</div>
            <div className="text-gray-600">Taxa de Presença</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4">Bem-vindo ao BNH!</h3>
          <p className="text-gray-600">
            Sua conta foi aprovada. Em breve mais funcionalidades estarão disponíveis.
          </p>
        </div>
      </main>
    </div>
  );
}
