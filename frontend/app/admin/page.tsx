'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/src/lib/api';
import Button from '@/src/components/ui/Button';

export default function AdminPage() {
  const router = useRouter();
  const [intentions, setIntentions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token) {
      router.push('/login');
      return;
    }

    const user = userData ? JSON.parse(userData) : null;
    if (user?.role !== 'ADMIN') {
      router.push('/dashboard');
      return;
    }

    loadIntentions();
  }, [router]);

  const loadIntentions = async () => {
    try {
      const response = await api.get('/api/intentions?status=PENDING');
      setIntentions(response.data);
    } catch (error) {
      console.error('Erro ao carregar intenções', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await api.patch(`/api/intentions/${id}/approve`);
      loadIntentions();
      alert('Intenção aprovada!');
    } catch (error) {
      alert('Erro ao aprovar');
    }
  };

  const handleReject = async (id: string) => {
    try {
      await api.patch(`/api/intentions/${id}/reject`);
      loadIntentions();
      alert('Intenção recusada!');
    } catch (error) {
      alert('Erro ao recusar');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">BNH - Admin</h1>
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
      </header>

      <main className="max-w-7xl mx-auto px-8 py-8">
        <h2 className="text-3xl font-bold mb-8">Gerenciar Intenções</h2>

        {loading ? (
          <div>Carregando...</div>
        ) : intentions.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow text-center text-gray-600">
            Nenhuma intenção pendente
          </div>
        ) : (
          <div className="space-y-4">
            {intentions.map((intention) => (
              <div key={intention.id} className="bg-white p-6 rounded-lg shadow">
                <div className="mb-4">
                  <h3 className="text-xl font-bold">{intention.user.name}</h3>
                  <p className="text-gray-600">{intention.user.email}</p>
                  <p className="text-gray-600">
                    {intention.user.company} | {intention.user.phone}
                  </p>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-600 font-semibold mb-1">Motivo:</p>
                  <p className="text-gray-700">{intention.reason}</p>
                </div>
                <div className="flex gap-4">
                  <Button
                    onClick={() => handleApprove(intention.id)}
                    className="bg-green-500 hover:bg-green-600"
                  >
                    ✓ Aprovar
                  </Button>
                  <Button
                    onClick={() => handleReject(intention.id)}
                    variant="danger"
                  >
                    ✗ Recusar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
