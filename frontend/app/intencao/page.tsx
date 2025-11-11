'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/src/lib/api';
import Input from '@/src/components/ui/Input';
import Button from '@/src/components/ui/Button';
import Card from '@/src/components/ui/Card';

export default function IntencaoPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    reason: '',
  });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/api/intentions', formData);
      setSuccess(true);
    } catch (error) {
      alert('Erro ao enviar intenção');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md text-center">
          <div className="text-6xl mb-4">✓</div>
          <h1 className="text-2xl font-bold text-primary mb-4">
            Intenção enviada com sucesso!
          </h1>
          <p className="text-gray-600 mb-6">
            Você receberá um retorno em breve através do email cadastrado.
          </p>
          <Button onClick={() => router.push('/')}>Voltar para início</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-center mb-2">
          Manifeste sua Intenção de Participar
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Preencha o formulário abaixo para solicitar sua entrada no grupo.
        </p>

        <form onSubmit={handleSubmit}>
          <Input
            label="Nome Completo"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <Input
            label="Empresa"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            required
          />
          <Input
            label="Telefone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="(00) 00000-0000"
            required
          />
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Por que você quer participar? <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Enviando...' : 'Enviar Intenção'}
          </Button>
        </form>
      </Card>
    </div>
  );
}
