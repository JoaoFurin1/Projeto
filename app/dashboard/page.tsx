"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  Users,
  BarChart3,
  Calendar,
  Award,
  Clock,
  TrendingUp,
  Star,
  Target,
  Zap,
  Shield,
  Plus,
  ArrowRight,
} from "lucide-react"
import BarraNavegacao from "@/components/barra-navegacao"

export default function Dashboard() {
  const [usuario, setUsuario] = useState<any>(null)
  const [estatisticas, setEstatisticas] = useState({
    totalAlunos: 45,
    presencaMedia: 87,
    notaMedia: 7.8,
    aulasHoje: 4,
  })
  const router = useRouter()

  useEffect(() => {
    const usuarioLogado = localStorage.getItem("educare_usuario")
    if (!usuarioLogado) {
      router.push("/")
      return
    }
    setUsuario(JSON.parse(usuarioLogado))
  }, [router])

  if (!usuario) {
    return (
      <div className="min-h-screen bg-main flex items-center justify-center">
        <div className="text-center">
          <div className="loading-modern mx-auto mb-6"></div>
          <p className="text-xl font-semibold text-white">Carregando dashboard...</p>
          <p className="text-slate-400 text-sm mt-2">Preparando seu ambiente educacional</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-main bg-grid">
      {/* Elementos decorativos */}
      <div className="decoration-circle w-96 h-96 top-10 -left-48 delay-100"></div>
      <div className="decoration-circle w-80 h-80 bottom-10 -right-40 delay-300"></div>
      <div className="decoration-square w-32 h-32 top-1/4 right-20 delay-500"></div>

      <BarraNavegacao />

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-12 animate-slide-up">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-6">
              <div className="icon-wrapper w-20 h-20 animate-float">
                <Target className="h-10 w-10 text-blue-400" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  Olá, <span className="text-gradient">{usuario.nome}</span>! 👋
                </h1>
                <p className="text-xl text-slate-400">
                  {usuario.escola} • {usuario.disciplina}
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-slate-400">Sistema online</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-blue-400" />
                    <span className="text-sm text-slate-400">Conexão segura</span>
                  </div>
                </div>
              </div>
            </div>
            <Button className="btn-modern">
              <Plus className="h-5 w-5 mr-2" />
              Nova atividade
            </Button>
          </div>
        </div>

        {/* Grid de estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="stat-card animate-slide-up delay-100">
            <div className="flex items-center justify-between mb-4">
              <div className="icon-wrapper w-12 h-12">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
              <div className="badge-modern">+8 este mês</div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{estatisticas.totalAlunos}</div>
            <div className="text-sm text-slate-400">Total de alunos</div>
            <div className="flex items-center gap-1 mt-2 text-green-400 text-sm">
              <TrendingUp className="h-3 w-3" />
              <span>12% de crescimento</span>
            </div>
          </div>

          <div className="stat-card animate-slide-up delay-200">
            <div className="flex items-center justify-between mb-4">
              <div className="icon-wrapper w-12 h-12">
                <Calendar className="h-6 w-6 text-green-400" />
              </div>
              <div className="badge-success">Excelente</div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{estatisticas.presencaMedia}%</div>
            <div className="text-sm text-slate-400">Presença média</div>
            <div className="flex items-center gap-1 mt-2 text-green-400 text-sm">
              <Star className="h-3 w-3" />
              <span>Acima da meta</span>
            </div>
          </div>

          <div className="stat-card animate-slide-up delay-300">
            <div className="flex items-center justify-between mb-4">
              <div className="icon-wrapper w-12 h-12">
                <Award className="h-6 w-6 text-purple-400" />
              </div>
              <div className="badge-modern">Top 10%</div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{estatisticas.notaMedia}</div>
            <div className="text-sm text-slate-400">Nota média</div>
            <div className="flex items-center gap-1 mt-2 text-purple-400 text-sm">
              <Award className="h-3 w-3" />
              <span>Acima da média nacional</span>
            </div>
          </div>

          <div className="stat-card animate-slide-up delay-400">
            <div className="flex items-center justify-between mb-4">
              <div className="icon-wrapper w-12 h-12">
                <Clock className="h-6 w-6 text-orange-400" />
              </div>
              <div className="badge-warning">Hoje</div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{estatisticas.aulasHoje}</div>
            <div className="text-sm text-slate-400">Aulas programadas</div>
            <div className="flex items-center gap-1 mt-2 text-orange-400 text-sm">
              <Zap className="h-3 w-3" />
              <span>Próxima às 14h30</span>
            </div>
          </div>
        </div>

        {/* Grid principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ações rápidas */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6 animate-slide-up delay-500">Ações Rápidas</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card-modern p-6 animate-slide-up delay-600">
                <div className="icon-wrapper w-16 h-16 mb-6">
                  <BookOpen className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Gestão de Notas</h3>
                <p className="text-slate-400 mb-6">Registre e acompanhe o desempenho dos seus alunos</p>
                <Button className="btn-modern w-full" onClick={() => router.push("/dashboard/notas")}>
                  Acessar notas
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>

              <div className="card-modern p-6 animate-slide-up delay-700">
                <div className="icon-wrapper w-16 h-16 mb-6">
                  <Users className="h-8 w-8 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Controle de Presença</h3>
                <p className="text-slate-400 mb-6">Registre a presença dos alunos em tempo real</p>
                <Button className="btn-secondary w-full" onClick={() => router.push("/dashboard/presenca")}>
                  Registrar presença
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>

              <div className="card-modern p-6 animate-slide-up delay-800">
                <div className="icon-wrapper w-16 h-16 mb-6">
                  <BarChart3 className="h-8 w-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Relatórios</h3>
                <p className="text-slate-400 mb-6">Visualize analytics e relatórios detalhados</p>
                <Button className="btn-accent w-full" onClick={() => router.push("/dashboard/relatorios")}>
                  Ver relatórios
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>

              <div className="card-modern p-6 animate-slide-up delay-900">
                <div className="icon-wrapper w-16 h-16 mb-6">
                  <Calendar className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Agenda</h3>
                <p className="text-slate-400 mb-6">Gerencie suas aulas e compromissos</p>
                <Button className="btn-modern w-full">
                  Ver agenda
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar direita */}
          <div className="space-y-6">
            {/* Atividades recentes */}
            <div className="card-modern p-6 animate-slide-up delay-1000">
              <h3 className="text-lg font-bold text-white mb-4">Atividades Recentes</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-white">Prova de Matemática - 9A</p>
                    <p className="text-xs text-slate-400">Há 2 horas</p>
                  </div>
                  <div className="badge-modern">8.5</div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-white">Presença registrada - 9B</p>
                    <p className="text-xs text-slate-400">Há 1 hora</p>
                  </div>
                  <div className="badge-success">95%</div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-white">Relatório gerado</p>
                    <p className="text-xs text-slate-400">Há 30 min</p>
                  </div>
                  <div className="badge-modern">PDF</div>
                </div>
              </div>
            </div>

            {/* Próximas aulas */}
            <div className="card-modern p-6 animate-slide-up delay-1100">
              <h3 className="text-lg font-bold text-white mb-4">Próximas Aulas</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                  <div>
                    <p className="text-sm text-white font-medium">Matemática - 9A</p>
                    <p className="text-xs text-slate-400">14:30 - 15:20</p>
                  </div>
                  <div className="badge-warning">Em 2h</div>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                  <div>
                    <p className="text-sm text-white font-medium">Matemática - 9B</p>
                    <p className="text-xs text-slate-400">15:30 - 16:20</p>
                  </div>
                  <div className="badge-modern">Em 3h</div>
                </div>
              </div>
            </div>

            {/* Performance do sistema */}
            <div className="card-modern p-6 animate-slide-up delay-1200">
              <h3 className="text-lg font-bold text-white mb-4">Sistema</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Uptime</span>
                  <span className="text-sm font-medium text-green-400">99.9%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Resposta</span>
                  <span className="text-sm font-medium text-blue-400">1.2s</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Segurança</span>
                  <span className="text-sm font-medium text-purple-400">256-bit</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
