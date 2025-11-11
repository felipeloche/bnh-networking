import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed w-full top-0 bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
              B
            </div>
            <span className="text-2xl font-bold text-primary">BNH</span>
          </div>
          <nav className="flex gap-8 items-center">
            <Link href="/" className="text-gray-700 hover:text-primary">Início</Link>
            <Link href="/sobre" className="text-gray-700 hover:text-primary">Sobre</Link>
            <Link href="/intencao" className="text-gray-700 hover:text-primary">Intenção</Link>
            <Link href="/login" className="px-6 py-2 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition">
              Login
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mt-20 py-20 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-sm text-secondary uppercase tracking-wide mb-4">
              SISTEMAS QUE FACILITAM A GESTÃO DA SUA EMPRESA
            </h2>
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              Tecnologia para
            </h1>
            <p className="text-4xl font-bold text-primary mb-8">
              uma gestão mais eficiente
            </p>
            <Link href="/intencao">
              <button className="px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition shadow-lg">
                Seja nosso parceiro
              </button>
            </Link>
          </div>
          <div className="relative">
            <div className="w-full h-96 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center">
              <span className="text-8xl">💼</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-8 bg-gradient-to-b from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            O que entregamos para seu negócio
          </h2>
          <div className="grid grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
                💰
              </div>
              <h3 className="text-xl font-bold text-secondary mb-4">Redução de custo</h3>
              <p className="text-gray-600">
                Minimize despesas e maximize lucros com soluções eficientes.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
                ⏱️
              </div>
              <h3 className="text-xl font-bold text-secondary mb-4">Economia de tempo</h3>
              <p className="text-gray-600">
                Ganhe horas valiosas automatizando tarefas repetitivas.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
                📋
              </div>
              <h3 className="text-xl font-bold text-secondary mb-4">Melhor organização</h3>
              <p className="text-gray-600">
                Estruture informações de forma intuitiva e eficiente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-primary text-xl font-bold mb-2">BNH - Business Network Hub</h3>
          <p className="text-gray-400">© 2025 Todos os direitos reservados</p>
        </div>
      </footer>
    </div>
  );
}
