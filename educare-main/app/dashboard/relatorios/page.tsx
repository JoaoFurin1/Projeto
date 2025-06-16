"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { BarChart3, TrendingUp, Users, Award, Download, RefreshCw } from "lucide-react"
import BarraNavegacao from "@/components/barra-navegacao"

export default function PaginaRelatorios() {
  const [filtroTurma, setFiltroTurma] = useState("todas")
  const [filtroPeriodo, setFiltroPeriodo] = useState("bimestre-atual")
  const [carregando, setCarregando] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const usuarioLogado = localStorage.getItem("educare_usuario")
    if (!usuarioLogado) {
      router.push("/")
      return
    }
  }, [router])

  // Função para obter dados reais do localStorage
  const obterDadosReais = () => {
    const dadosNotas = localStorage.getItem("educare_notas")
    const dadosPresenca = localStorage.getItem("educare_presencas")

    let alunos = []

    if (dadosNotas) {
      const notasData = JSON.parse(dadosNotas)
      alunos = notasData.map((aluno: any) => ({
        nome: aluno.nome,
        turma: aluno.turma,
        notas: [
          aluno.notas.bimestre1 || 0,
          aluno.notas.bimestre2 || 0,
          aluno.notas.bimestre3 || 0,
          aluno.notas.bimestre4 || 0,
        ],
        presencas: [85, 88, 92, 87], // Dados padrão de presença (pode ser melhorado)
      }))
    }

    // Se não há dados salvos, usar dados padrão
    if (alunos.length === 0) {
      alunos = [
        // Turma 9A
        { nome: "Ana Silva", turma: "9A", notas: [8.5, 9.0, 8.8, 9.2], presencas: [95, 92, 98, 90] },
        { nome: "Bruno Santos", turma: "9A", notas: [7.2, 7.8, 8.0, 8.5], presencas: [88, 85, 90, 92] },
        { nome: "Carla Oliveira", turma: "9A", notas: [9.5, 9.8, 9.2, 9.6], presencas: [100, 98, 95, 97] },
        { nome: "Diego Costa", turma: "9A", notas: [6.8, 7.2, 7.5, 7.8], presencas: [82, 78, 85, 88] },
        { nome: "Elena Rodrigues", turma: "9A", notas: [8.8, 9.1, 8.9, 9.3], presencas: [96, 94, 92, 95] },
        { nome: "Felipe Lima", turma: "9A", notas: [7.5, 8.0, 7.8, 8.2], presencas: [90, 88, 85, 87] },
        { nome: "Gabriela Souza", turma: "9A", notas: [9.0, 9.3, 9.1, 9.4], presencas: [98, 96, 100, 94] },
        { nome: "Henrique Alves", turma: "9A", notas: [6.5, 7.0, 7.2, 7.6], presencas: [80, 82, 78, 85] },
        { nome: "Isabela Ferreira", turma: "9A", notas: [8.2, 8.6, 8.4, 8.8], presencas: [92, 90, 94, 88] },
        { nome: "João Pereira", turma: "9A", notas: [7.8, 8.2, 8.0, 8.4], presencas: [86, 88, 90, 92] },
        { nome: "Larissa Martins", turma: "9A", notas: [9.2, 9.5, 9.0, 9.7], presencas: [97, 95, 98, 96] },
        { nome: "Mateus Barbosa", turma: "9A", notas: [7.0, 7.4, 7.6, 8.0], presencas: [84, 86, 82, 88] },

        // Turma 9B
        { nome: "Natália Gomes", turma: "9B", notas: [8.0, 8.4, 8.2, 8.6], presencas: [90, 88, 92, 85] },
        { nome: "Otávio Silva", turma: "9B", notas: [7.6, 8.0, 7.8, 8.2], presencas: [85, 87, 83, 89] },
        { nome: "Patrícia Costa", turma: "9B", notas: [9.1, 9.4, 9.0, 9.3], presencas: [95, 93, 97, 91] },
        { nome: "Rafael Santos", turma: "9B", notas: [6.9, 7.3, 7.1, 7.5], presencas: [78, 80, 82, 84] },
        { nome: "Sofia Oliveira", turma: "9B", notas: [8.7, 9.0, 8.5, 8.9], presencas: [93, 91, 95, 88] },
        { nome: "Thiago Lima", turma: "9B", notas: [7.3, 7.7, 7.5, 7.9], presencas: [81, 83, 85, 87] },
        { nome: "Valentina Souza", turma: "9B", notas: [8.9, 9.2, 8.8, 9.1], presencas: [96, 94, 98, 92] },
        { nome: "William Alves", turma: "9B", notas: [6.7, 7.1, 6.9, 7.3], presencas: [76, 78, 80, 82] },
        { nome: "Yasmin Ferreira", turma: "9B", notas: [8.3, 8.7, 8.1, 8.5], presencas: [89, 91, 87, 93] },
        { nome: "Zeca Pereira", turma: "9B", notas: [7.1, 7.5, 7.3, 7.7], presencas: [83, 85, 81, 87] },
        { nome: "Amanda Martins", turma: "9B", notas: [8.6, 8.9, 8.4, 8.8], presencas: [92, 90, 94, 88] },
        { nome: "Bernardo Barbosa", turma: "9B", notas: [7.4, 7.8, 7.6, 8.0], presencas: [86, 84, 88, 90] },

        // Turma 9C
        { nome: "Camila Gomes", turma: "9C", notas: [7.8, 8.2, 8.0, 8.4], presencas: [88, 86, 90, 84] },
        { nome: "Daniel Silva", turma: "9C", notas: [6.5, 6.9, 7.1, 7.4], presencas: [75, 77, 79, 81] },
        { nome: "Eduarda Costa", turma: "9C", notas: [8.4, 8.8, 8.6, 9.0], presencas: [91, 89, 93, 87] },
        { nome: "Fábio Santos", turma: "9C", notas: [7.2, 7.6, 7.4, 7.8], presencas: [82, 84, 80, 86] },
        { nome: "Giovanna Oliveira", turma: "9C", notas: [8.1, 8.5, 8.3, 8.7], presencas: [87, 85, 89, 83] },
        { nome: "Hugo Lima", turma: "9C", notas: [6.8, 7.2, 7.0, 7.4], presencas: [79, 81, 77, 83] },
        { nome: "Ingrid Souza", turma: "9C", notas: [8.8, 9.1, 8.9, 9.2], presencas: [94, 92, 96, 90] },
        { nome: "Júlio Alves", turma: "9C", notas: [7.0, 7.4, 7.2, 7.6], presencas: [80, 82, 78, 84] },
        { nome: "Kelly Ferreira", turma: "9C", notas: [8.5, 8.9, 8.7, 9.1], presencas: [93, 91, 95, 89] },
        { nome: "Lucas Pereira", turma: "9C", notas: [6.6, 7.0, 6.8, 7.2], presencas: [74, 76, 78, 80] },
        { nome: "Mariana Martins", turma: "9C", notas: [7.9, 8.3, 8.1, 8.5], presencas: [86, 88, 84, 90] },
        { nome: "Nicolas Barbosa", turma: "9C", notas: [7.7, 8.1, 7.9, 8.3], presencas: [85, 83, 87, 81] },
      ]
    }

    return alunos
  }

  // Função para filtrar dados por turma - usando useMemo para otimização
  const dadosFiltrados = useMemo(() => {
    const dadosReais = obterDadosReais()
    if (filtroTurma === "todas") {
      return dadosReais
    }
    return dadosReais.filter((aluno) => aluno.turma === filtroTurma)
  }, [filtroTurma])

  // Cálculos automáticos baseados nos dados filtrados - usando useMemo
  const estatisticas = useMemo(() => {
    if (dadosFiltrados.length === 0) {
      return {
        mediaGeral: 0,
        taxaAprovacao: 0,
        presencaMedia: 0,
        totalAlunos: 0,
      }
    }

    // Calcular média geral (média das 4 notas de cada aluno)
    const mediasAlunos = dadosFiltrados.map((aluno) => {
      const somaNotas = aluno.notas.reduce((acc, nota) => acc + nota, 0)
      return somaNotas / aluno.notas.length
    })
    const mediaGeral = mediasAlunos.reduce((acc, media) => acc + media, 0) / mediasAlunos.length

    // Calcular taxa de aprovação (média >= 7.0)
    const aprovados = mediasAlunos.filter((media) => media >= 7.0).length
    const taxaAprovacao = (aprovados / dadosFiltrados.length) * 100

    // Calcular presença média
    const presencasAlunos = dadosFiltrados.map((aluno) => {
      const somaPresencas = aluno.presencas.reduce((acc, presenca) => acc + presenca, 0)
      return somaPresencas / aluno.presencas.length
    })
    const presencaMedia = presencasAlunos.reduce((acc, presenca) => acc + presenca, 0) / presencasAlunos.length

    return {
      mediaGeral: Number(mediaGeral.toFixed(1)),
      taxaAprovacao: Number(taxaAprovacao.toFixed(0)),
      presencaMedia: Number(presencaMedia.toFixed(0)),
      totalAlunos: dadosFiltrados.length,
    }
  }, [dadosFiltrados])

  // Gerar dados para gráficos baseados nos dados reais - usando useMemo
  const dadosGraficos = useMemo(() => {
    // Dados por bimestre
    const dadosNotasPorBimestre = [
      { bimestre: "1º Bim", media: 0, aprovados: 0, reprovados: 0 },
      { bimestre: "2º Bim", media: 0, aprovados: 0, reprovados: 0 },
      { bimestre: "3º Bim", media: 0, aprovados: 0, reprovados: 0 },
      { bimestre: "4º Bim", media: 0, aprovados: 0, reprovados: 0 },
    ]

    for (let i = 0; i < 4; i++) {
      const notasBimestre = dadosFiltrados.map((aluno) => aluno.notas[i])
      if (notasBimestre.length > 0) {
        const media = notasBimestre.reduce((acc, nota) => acc + nota, 0) / notasBimestre.length
        const aprovados = notasBimestre.filter((nota) => nota >= 7.0).length
        const reprovados = notasBimestre.length - aprovados

        dadosNotasPorBimestre[i] = {
          ...dadosNotasPorBimestre[i],
          media: Number(media.toFixed(1)),
          aprovados,
          reprovados,
        }
      }
    }

    // Dados de presença por bimestre
    const dadosPresencaPorMes = [
      { mes: "1º Bim", presenca: 0 },
      { mes: "2º Bim", presenca: 0 },
      { mes: "3º Bim", presenca: 0 },
      { mes: "4º Bim", presenca: 0 },
    ]

    for (let i = 0; i < 4; i++) {
      const presencasBimestre = dadosFiltrados.map((aluno) => aluno.presencas[i])
      if (presencasBimestre.length > 0) {
        const presencaMedia = presencasBimestre.reduce((acc, presenca) => acc + presenca, 0) / presencasBimestre.length
        dadosPresencaPorMes[i].presenca = Number(presencaMedia.toFixed(0))
      }
    }

    // Distribuição de notas baseada na média final de cada aluno
    const mediasFinais = dadosFiltrados.map((aluno) => {
      const soma = aluno.notas.reduce((acc, nota) => acc + nota, 0)
      return soma / aluno.notas.length
    })

    const distribuicao = {
      "9.0 - 10.0": mediasFinais.filter((media) => media >= 9.0).length,
      "8.0 - 8.9": mediasFinais.filter((media) => media >= 8.0 && media < 9.0).length,
      "7.0 - 7.9": mediasFinais.filter((media) => media >= 7.0 && media < 8.0).length,
      "6.0 - 6.9": mediasFinais.filter((media) => media >= 6.0 && media < 7.0).length,
      "< 6.0": mediasFinais.filter((media) => media < 6.0).length,
    }

    const dadosDistribuicaoNotas = [
      { faixa: "9.0 - 10.0", quantidade: distribuicao["9.0 - 10.0"], cor: "#10B981" },
      { faixa: "8.0 - 8.9", quantidade: distribuicao["8.0 - 8.9"], cor: "#3B82F6" },
      { faixa: "7.0 - 7.9", quantidade: distribuicao["7.0 - 7.9"], cor: "#F59E0B" },
      { faixa: "6.0 - 6.9", quantidade: distribuicao["6.0 - 6.9"], cor: "#EF4444" },
      { faixa: "< 6.0", quantidade: distribuicao["< 6.0"], cor: "#DC2626" },
    ]

    // Desempenho por turma (só quando filtro = "todas")
    let dadosDesempenhoTurmas = []
    if (filtroTurma === "todas") {
      const dadosCompletos = obterDadosReais()
      const turmas = ["9A", "9B", "9C"]
      dadosDesempenhoTurmas = turmas.map((turma) => {
        const alunosTurma = dadosCompletos.filter((aluno) => aluno.turma === turma)

        const mediasAlunos = alunosTurma.map((aluno) => {
          const somaNotas = aluno.notas.reduce((acc, nota) => acc + nota, 0)
          return somaNotas / aluno.notas.length
        })
        const mediaTurma = mediasAlunos.reduce((acc, media) => acc + media, 0) / mediasAlunos.length

        const presencasAlunos = alunosTurma.map((aluno) => {
          const somaPresencas = aluno.presencas.reduce((acc, presenca) => acc + presenca, 0)
          return somaPresencas / aluno.presencas.length
        })
        const presencaTurma = presencasAlunos.reduce((acc, presenca) => acc + presenca, 0) / presencasAlunos.length

        return {
          turma,
          media: Number(mediaTurma.toFixed(1)),
          presenca: Number(presencaTurma.toFixed(0)),
        }
      })
    }

    return {
      dadosNotasPorBimestre,
      dadosPresencaPorMes,
      dadosDistribuicaoNotas,
      dadosDesempenhoTurmas,
    }
  }, [dadosFiltrados, filtroTurma])

  // Effect para simular carregamento quando muda a turma
  useEffect(() => {
    setCarregando(true)
    const timer = setTimeout(() => {
      setCarregando(false)
    }, 300) // Simula um pequeno delay para mostrar que está atualizando

    return () => clearTimeout(timer)
  }, [filtroTurma])

  // Função para exportar dados
  const exportarRelatorio = () => {
    const relatorio = {
      filtros: {
        turma: filtroTurma,
        periodo: filtroPeriodo,
        dataGeracao: new Date().toLocaleString("pt-BR"),
      },
      estatisticas,
      dadosAlunos: dadosFiltrados,
      graficos: dadosGraficos,
    }

    const blob = new Blob([JSON.stringify(relatorio, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `relatorio-${filtroTurma}-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const dadosCompletos = obterDadosReais()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <BarraNavegacao />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-full">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Relatórios e Análises</h1>
              <p className="text-gray-600">
                Visualize o desempenho dos seus alunos -{" "}
                {filtroTurma === "todas" ? "Todas as turmas" : `Turma ${filtroTurma}`}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            {carregando && (
              <div className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg">
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span className="text-sm">Atualizando...</span>
              </div>
            )}
            <Button
              onClick={exportarRelatorio}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
              disabled={carregando}
            >
              <Download className="h-4 w-4 mr-2" />
              Salvar Relatório
            </Button>
          </div>
        </div>

        {/* Filtros */}
        <Card className="mb-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg text-gray-800">Filtros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-700 mb-2 block">Turma</label>
                <Select value={filtroTurma} onValueChange={setFiltroTurma}>
                  <SelectTrigger className="h-11 border-gray-200 focus:border-purple-500 focus:ring-purple-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas as Turmas ({dadosCompletos.length} alunos)</SelectItem>
                    <SelectItem value="9A">
                      Turma 9A ({dadosCompletos.filter((a) => a.turma === "9A").length} alunos)
                    </SelectItem>
                    <SelectItem value="9B">
                      Turma 9B ({dadosCompletos.filter((a) => a.turma === "9B").length} alunos)
                    </SelectItem>
                    <SelectItem value="9C">
                      Turma 9C ({dadosCompletos.filter((a) => a.turma === "9C").length} alunos)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-700 mb-2 block">Período</label>
                <Select value={filtroPeriodo} onValueChange={setFiltroPeriodo}>
                  <SelectTrigger className="h-11 border-gray-200 focus:border-purple-500 focus:ring-purple-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bimestre-atual">Bimestre Atual</SelectItem>
                    <SelectItem value="semestre">Semestre</SelectItem>
                    <SelectItem value="ano-letivo">Ano Letivo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cards de Resumo - Atualizados automaticamente */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card
            className={`bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg transition-all duration-300 ${carregando ? "opacity-70" : ""}`}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Média Geral</p>
                  <p className="text-3xl font-bold">{estatisticas.mediaGeral}</p>
                </div>
                <Award className="h-8 w-8 opacity-90" />
              </div>
            </CardContent>
          </Card>

          <Card
            className={`bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg transition-all duration-300 ${carregando ? "opacity-70" : ""}`}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Taxa de Aprovação</p>
                  <p className="text-3xl font-bold">{estatisticas.taxaAprovacao}%</p>
                </div>
                <TrendingUp className="h-8 w-8 opacity-90" />
              </div>
            </CardContent>
          </Card>

          <Card
            className={`bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg transition-all duration-300 ${carregando ? "opacity-70" : ""}`}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Presença Média</p>
                  <p className="text-3xl font-bold">{estatisticas.presencaMedia}%</p>
                </div>
                <Users className="h-8 w-8 opacity-90" />
              </div>
            </CardContent>
          </Card>

          <Card
            className={`bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg transition-all duration-300 ${carregando ? "opacity-70" : ""}`}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Total de Alunos</p>
                  <p className="text-3xl font-bold">{estatisticas.totalAlunos}</p>
                </div>
                <BarChart3 className="h-8 w-8 opacity-90" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Gráfico de Notas por Bimestre */}
          <Card
            className={`bg-white/80 backdrop-blur-sm border-0 shadow-lg transition-all duration-300 ${carregando ? "opacity-70" : ""}`}
          >
            <CardHeader>
              <CardTitle className="text-lg text-gray-800">Evolução das Notas</CardTitle>
              <CardDescription>
                Média por bimestre - {filtroTurma === "todas" ? "Todas as turmas" : `Turma ${filtroTurma}`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dadosGraficos.dadosNotasPorBimestre}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="bimestre" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Bar dataKey="media" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Gráfico de Presença */}
          <Card
            className={`bg-white/80 backdrop-blur-sm border-0 shadow-lg transition-all duration-300 ${carregando ? "opacity-70" : ""}`}
          >
            <CardHeader>
              <CardTitle className="text-lg text-gray-800">Taxa de Presença</CardTitle>
              <CardDescription>
                Percentual por bimestre - {filtroTurma === "todas" ? "Todas as turmas" : `Turma ${filtroTurma}`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dadosGraficos.dadosPresencaPorMes}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="mes" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="presenca"
                    stroke="#10B981"
                    strokeWidth={3}
                    dot={{ fill: "#10B981", strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Distribuição de Notas */}
          <Card
            className={`bg-white/80 backdrop-blur-sm border-0 shadow-lg transition-all duration-300 ${carregando ? "opacity-70" : ""}`}
          >
            <CardHeader>
              <CardTitle className="text-lg text-gray-800">Distribuição de Notas</CardTitle>
              <CardDescription>
                Quantidade de alunos por faixa - {filtroTurma === "todas" ? "Todas as turmas" : `Turma ${filtroTurma}`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={dadosGraficos.dadosDistribuicaoNotas.filter((item) => item.quantidade > 0)}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="quantidade"
                    label={({ faixa, quantidade }) => `${faixa}: ${quantidade}`}
                  >
                    {dadosGraficos.dadosDistribuicaoNotas.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.cor} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Desempenho por Turma - só aparece quando filtro = "todas" */}
          {filtroTurma === "todas" && (
            <Card
              className={`bg-white/80 backdrop-blur-sm border-0 shadow-lg transition-all duration-300 ${carregando ? "opacity-70" : ""}`}
            >
              <CardHeader>
                <CardTitle className="text-lg text-gray-800">Desempenho por Turma</CardTitle>
                <CardDescription>Média de notas e presença por turma</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dadosGraficos.dadosDesempenhoTurmas}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="turma" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Bar dataKey="media" fill="#8B5CF6" radius={[4, 4, 0, 0]} name="Média" />
                    <Bar dataKey="presenca" fill="#06B6D4" radius={[4, 4, 0, 0]} name="Presença %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}

          {/* Quando uma turma específica é selecionada, mostra detalhes dos alunos */}
          {filtroTurma !== "todas" && (
            <Card
              className={`bg-white/80 backdrop-blur-sm border-0 shadow-lg transition-all duration-300 ${carregando ? "opacity-70" : ""}`}
            >
              <CardHeader>
                <CardTitle className="text-lg text-gray-800">Detalhes da Turma {filtroTurma}</CardTitle>
                <CardDescription>Informações individuais dos alunos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-[300px] overflow-y-auto">
                  {dadosFiltrados.map((aluno, index) => {
                    const mediaAluno = aluno.notas.reduce((acc, nota) => acc + nota, 0) / aluno.notas.length
                    const presencaAluno =
                      aluno.presencas.reduce((acc, presenca) => acc + presenca, 0) / aluno.presencas.length

                    return (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium text-gray-800">{aluno.nome}</span>
                        <div className="flex gap-4 text-sm">
                          <span
                            className={`px-2 py-1 rounded ${mediaAluno >= 7.0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                          >
                            Média: {mediaAluno.toFixed(1)}
                          </span>
                          <span className="px-2 py-1 rounded bg-blue-100 text-blue-800">
                            Presença: {presencaAluno.toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
