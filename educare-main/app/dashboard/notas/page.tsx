"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Search, Edit, Save } from "lucide-react"
import BarraNavegacao from "@/components/barra-navegacao"

interface Aluno {
  id: number
  nome: string
  turma: string
  notas: {
    bimestre1: number | null
    bimestre2: number | null
    bimestre3: number | null
    bimestre4: number | null
  }
  media: number
}

export default function PaginaNotas() {
  const [alunos, setAlunos] = useState<Aluno[]>([])
  const [filtroTurma, setFiltroTurma] = useState("todas")
  const [buscaAluno, setBuscaAluno] = useState("")
  const [editandoAluno, setEditandoAluno] = useState<number | null>(null)
  const [notasTemporarias, setNotasTemporarias] = useState<any>({})
  const router = useRouter()

  useEffect(() => {
    const usuarioLogado = localStorage.getItem("educare_usuario")
    if (!usuarioLogado) {
      router.push("/")
      return
    }

    // Carregar dados salvos ou usar dados padrão
    const dadosSalvos = localStorage.getItem("educare_notas")
    let dadosAlunos: Aluno[]

    if (dadosSalvos) {
      dadosAlunos = JSON.parse(dadosSalvos)
    } else {
      // Dados completos dos alunos (36 alunos)
      dadosAlunos = [
        // Turma 9A
        {
          id: 1,
          nome: "Ana Silva",
          turma: "9A",
          notas: { bimestre1: 8.5, bimestre2: 9.0, bimestre3: 8.8, bimestre4: 9.2 },
          media: 8.9,
        },
        {
          id: 2,
          nome: "Bruno Santos",
          turma: "9A",
          notas: { bimestre1: 7.2, bimestre2: 7.8, bimestre3: 8.0, bimestre4: 8.5 },
          media: 7.9,
        },
        {
          id: 3,
          nome: "Carla Oliveira",
          turma: "9A",
          notas: { bimestre1: 9.5, bimestre2: 9.8, bimestre3: 9.2, bimestre4: 9.6 },
          media: 9.5,
        },
        {
          id: 4,
          nome: "Diego Costa",
          turma: "9A",
          notas: { bimestre1: 6.8, bimestre2: 7.2, bimestre3: 7.5, bimestre4: 7.8 },
          media: 7.3,
        },
        {
          id: 5,
          nome: "Elena Rodrigues",
          turma: "9A",
          notas: { bimestre1: 8.8, bimestre2: 9.1, bimestre3: 8.9, bimestre4: 9.3 },
          media: 9.0,
        },
        {
          id: 6,
          nome: "Felipe Lima",
          turma: "9A",
          notas: { bimestre1: 7.5, bimestre2: 8.0, bimestre3: 7.8, bimestre4: 8.2 },
          media: 7.9,
        },
        {
          id: 7,
          nome: "Gabriela Souza",
          turma: "9A",
          notas: { bimestre1: 9.0, bimestre2: 9.3, bimestre3: 9.1, bimestre4: 9.4 },
          media: 9.2,
        },
        {
          id: 8,
          nome: "Henrique Alves",
          turma: "9A",
          notas: { bimestre1: 6.5, bimestre2: 7.0, bimestre3: 7.2, bimestre4: 7.6 },
          media: 7.1,
        },
        {
          id: 9,
          nome: "Isabela Ferreira",
          turma: "9A",
          notas: { bimestre1: 8.2, bimestre2: 8.6, bimestre3: 8.4, bimestre4: 8.8 },
          media: 8.5,
        },
        {
          id: 10,
          nome: "João Pereira",
          turma: "9A",
          notas: { bimestre1: 7.8, bimestre2: 8.2, bimestre3: 8.0, bimestre4: 8.4 },
          media: 8.1,
        },
        {
          id: 11,
          nome: "Larissa Martins",
          turma: "9A",
          notas: { bimestre1: 9.2, bimestre2: 9.5, bimestre3: 9.0, bimestre4: 9.7 },
          media: 9.4,
        },
        {
          id: 12,
          nome: "Mateus Barbosa",
          turma: "9A",
          notas: { bimestre1: 7.0, bimestre2: 7.4, bimestre3: 7.6, bimestre4: 8.0 },
          media: 7.5,
        },

        // Turma 9B
        {
          id: 13,
          nome: "Natália Gomes",
          turma: "9B",
          notas: { bimestre1: 8.0, bimestre2: 8.4, bimestre3: 8.2, bimestre4: 8.6 },
          media: 8.3,
        },
        {
          id: 14,
          nome: "Otávio Silva",
          turma: "9B",
          notas: { bimestre1: 7.6, bimestre2: 8.0, bimestre3: 7.8, bimestre4: 8.2 },
          media: 7.9,
        },
        {
          id: 15,
          nome: "Patrícia Costa",
          turma: "9B",
          notas: { bimestre1: 9.1, bimestre2: 9.4, bimestre3: 9.0, bimestre4: 9.3 },
          media: 9.2,
        },
        {
          id: 16,
          nome: "Rafael Santos",
          turma: "9B",
          notas: { bimestre1: 6.9, bimestre2: 7.3, bimestre3: 7.1, bimestre4: 7.5 },
          media: 7.2,
        },
        {
          id: 17,
          nome: "Sofia Oliveira",
          turma: "9B",
          notas: { bimestre1: 8.7, bimestre2: 9.0, bimestre3: 8.5, bimestre4: 8.9 },
          media: 8.8,
        },
        {
          id: 18,
          nome: "Thiago Lima",
          turma: "9B",
          notas: { bimestre1: 7.3, bimestre2: 7.7, bimestre3: 7.5, bimestre4: 7.9 },
          media: 7.6,
        },
        {
          id: 19,
          nome: "Valentina Souza",
          turma: "9B",
          notas: { bimestre1: 8.9, bimestre2: 9.2, bimestre3: 8.8, bimestre4: 9.1 },
          media: 9.0,
        },
        {
          id: 20,
          nome: "William Alves",
          turma: "9B",
          notas: { bimestre1: 6.7, bimestre2: 7.1, bimestre3: 6.9, bimestre4: 7.3 },
          media: 7.0,
        },
        {
          id: 21,
          nome: "Yasmin Ferreira",
          turma: "9B",
          notas: { bimestre1: 8.3, bimestre2: 8.7, bimestre3: 8.1, bimestre4: 8.5 },
          media: 8.4,
        },
        {
          id: 22,
          nome: "Zeca Pereira",
          turma: "9B",
          notas: { bimestre1: 7.1, bimestre2: 7.5, bimestre3: 7.3, bimestre4: 7.7 },
          media: 7.4,
        },
        {
          id: 23,
          nome: "Amanda Martins",
          turma: "9B",
          notas: { bimestre1: 8.6, bimestre2: 8.9, bimestre3: 8.4, bimestre4: 8.8 },
          media: 8.7,
        },
        {
          id: 24,
          nome: "Bernardo Barbosa",
          turma: "9B",
          notas: { bimestre1: 7.4, bimestre2: 7.8, bimestre3: 7.6, bimestre4: 8.0 },
          media: 7.7,
        },

        // Turma 9C
        {
          id: 25,
          nome: "Camila Gomes",
          turma: "9C",
          notas: { bimestre1: 7.8, bimestre2: 8.2, bimestre3: 8.0, bimestre4: 8.4 },
          media: 8.1,
        },
        {
          id: 26,
          nome: "Daniel Silva",
          turma: "9C",
          notas: { bimestre1: 6.5, bimestre2: 6.9, bimestre3: 7.1, bimestre4: 7.4 },
          media: 6.9,
        },
        {
          id: 27,
          nome: "Eduarda Costa",
          turma: "9C",
          notas: { bimestre1: 8.4, bimestre2: 8.8, bimestre3: 8.6, bimestre4: 9.0 },
          media: 8.7,
        },
        {
          id: 28,
          nome: "Fábio Santos",
          turma: "9C",
          notas: { bimestre1: 7.2, bimestre2: 7.6, bimestre3: 7.4, bimestre4: 7.8 },
          media: 7.5,
        },
        {
          id: 29,
          nome: "Giovanna Oliveira",
          turma: "9C",
          notas: { bimestre1: 8.1, bimestre2: 8.5, bimestre3: 8.3, bimestre4: 8.7 },
          media: 8.4,
        },
        {
          id: 30,
          nome: "Hugo Lima",
          turma: "9C",
          notas: { bimestre1: 6.8, bimestre2: 7.2, bimestre3: 7.0, bimestre4: 7.4 },
          media: 7.1,
        },
        {
          id: 31,
          nome: "Ingrid Souza",
          turma: "9C",
          notas: { bimestre1: 8.8, bimestre2: 9.1, bimestre3: 8.9, bimestre4: 9.2 },
          media: 9.0,
        },
        {
          id: 32,
          nome: "Júlio Alves",
          turma: "9C",
          notas: { bimestre1: 7.0, bimestre2: 7.4, bimestre3: 7.2, bimestre4: 7.6 },
          media: 7.3,
        },
        {
          id: 33,
          nome: "Kelly Ferreira",
          turma: "9C",
          notas: { bimestre1: 8.5, bimestre2: 8.9, bimestre3: 8.7, bimestre4: 9.1 },
          media: 8.8,
        },
        {
          id: 34,
          nome: "Lucas Pereira",
          turma: "9C",
          notas: { bimestre1: 6.6, bimestre2: 7.0, bimestre3: 6.8, bimestre4: 7.2 },
          media: 6.9,
        },
        {
          id: 35,
          nome: "Mariana Martins",
          turma: "9C",
          notas: { bimestre1: 7.9, bimestre2: 8.3, bimestre3: 8.1, bimestre4: 8.5 },
          media: 8.2,
        },
        {
          id: 36,
          nome: "Nicolas Barbosa",
          turma: "9C",
          notas: { bimestre1: 7.7, bimestre2: 8.1, bimestre3: 7.9, bimestre4: 8.3 },
          media: 8.0,
        },
      ]

      // Salvar dados iniciais
      localStorage.setItem("educare_notas", JSON.stringify(dadosAlunos))
    }

    setAlunos(dadosAlunos)
  }, [router])

  const alunosFiltrados = alunos.filter((aluno) => {
    const matchTurma = filtroTurma === "todas" || aluno.turma === filtroTurma
    const matchNome = aluno.nome.toLowerCase().includes(buscaAluno.toLowerCase())
    return matchTurma && matchNome
  })

  const turmasUnicas = [...new Set(alunos.map((aluno) => aluno.turma))]

  const iniciarEdicao = (alunoId: number, aluno: Aluno) => {
    setEditandoAluno(alunoId)
    setNotasTemporarias({
      bimestre1: aluno.notas.bimestre1 || "",
      bimestre2: aluno.notas.bimestre2 || "",
      bimestre3: aluno.notas.bimestre3 || "",
      bimestre4: aluno.notas.bimestre4 || "",
    })
  }

  const salvarNotas = (alunoId: number) => {
    const notasNumericas = {
      bimestre1: Number.parseFloat(notasTemporarias.bimestre1) || null,
      bimestre2: Number.parseFloat(notasTemporarias.bimestre2) || null,
      bimestre3: Number.parseFloat(notasTemporarias.bimestre3) || null,
      bimestre4: Number.parseFloat(notasTemporarias.bimestre4) || null,
    }

    const notasValidas = Object.values(notasNumericas).filter((nota) => nota !== null) as number[]
    const media = notasValidas.length > 0 ? notasValidas.reduce((sum, nota) => sum + nota, 0) / notasValidas.length : 0

    const alunosAtualizados = alunos.map((aluno) =>
      aluno.id === alunoId ? { ...aluno, notas: notasNumericas, media: Number.parseFloat(media.toFixed(1)) } : aluno,
    )

    setAlunos(alunosAtualizados)

    // Salvar no localStorage
    localStorage.setItem("educare_notas", JSON.stringify(alunosAtualizados))

    setEditandoAluno(null)
    setNotasTemporarias({})
  }

  const getCorMedia = (media: number) => {
    if (media >= 8) return "bg-green-900/50 text-green-300 border-green-700"
    if (media >= 6) return "bg-yellow-900/50 text-yellow-300 border-yellow-700"
    return "bg-red-900/50 text-red-300 border-red-700"
  }

  return (
    <div className="min-h-screen bg-dots bg-[#0f172a] bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81]">
      <BarraNavegacao />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8 animate-fade-in">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full neon-blue">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white text-shadow">Gerenciamento de Notas</h1>
            <p className="text-blue-300">Visualize e edite as notas dos seus alunos ({alunos.length} alunos)</p>
          </div>
        </div>

        {/* Filtros */}
        <Card className="mb-6 glass-card border-0 shadow-lg animate-fade-in">
          <CardHeader>
            <CardTitle className="text-lg text-white">Filtros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar aluno..."
                    value={buscaAluno}
                    onChange={(e) => setBuscaAluno(e.target.value)}
                    className="pl-10 h-11 bg-slate-800/50 border-slate-700 focus:border-blue-500 focus:ring-blue-500 text-white"
                  />
                </div>
              </div>
              <div className="w-full md:w-48">
                <Select value={filtroTurma} onValueChange={setFiltroTurma}>
                  <SelectTrigger className="h-11 bg-slate-800/50 border-slate-700 focus:border-blue-500 focus:ring-blue-500 text-white">
                    <SelectValue placeholder="Filtrar por turma" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-white">
                    <SelectItem value="todas">Todas as Turmas ({alunos.length})</SelectItem>
                    {turmasUnicas.map((turma) => (
                      <SelectItem key={turma} value={turma}>
                        Turma {turma} ({alunos.filter((a) => a.turma === turma).length})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Estatísticas Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="glass-card border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{alunosFiltrados.length}</p>
                <p className="text-sm text-blue-300">Total de Alunos</p>
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-400">
                  {alunosFiltrados.filter((a) => a.media >= 7.0).length}
                </p>
                <p className="text-sm text-blue-300">Aprovados</p>
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-red-400">{alunosFiltrados.filter((a) => a.media < 7.0).length}</p>
                <p className="text-sm text-blue-300">Reprovados</p>
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-400">
                  {alunosFiltrados.length > 0
                    ? (alunosFiltrados.reduce((acc, aluno) => acc + aluno.media, 0) / alunosFiltrados.length).toFixed(1)
                    : "0.0"}
                </p>
                <p className="text-sm text-blue-300">Média Geral</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Alunos */}
        <div className="space-y-4">
          {alunosFiltrados.map((aluno, index) => (
            <Card
              key={aluno.id}
              className="glass-card border-0 shadow-lg hover:shadow-xl transition-all duration-200 animate-fade-in"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg text-white">{aluno.nome}</CardTitle>
                    <CardDescription className="text-blue-300">Turma {aluno.turma}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`${getCorMedia(aluno.media)} border`}>Média: {aluno.media.toFixed(1)}</Badge>
                    {editandoAluno === aluno.id ? (
                      <Button size="sm" onClick={() => salvarNotas(aluno.id)} className="btn-gradient-green text-white">
                        <Save className="h-4 w-4 mr-1" />
                        Salvar
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => iniciarEdicao(aluno.id, aluno)}
                        className="border-blue-900 text-blue-400 hover:bg-blue-950"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Editar
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((bimestre) => (
                    <div key={bimestre} className="space-y-2">
                      <label className="text-sm font-medium text-blue-300">{bimestre}º Bimestre</label>
                      {editandoAluno === aluno.id ? (
                        <Input
                          type="number"
                          min="0"
                          max="10"
                          step="0.1"
                          value={notasTemporarias[`bimestre${bimestre}`]}
                          onChange={(e) =>
                            setNotasTemporarias((prev) => ({
                              ...prev,
                              [`bimestre${bimestre}`]: e.target.value,
                            }))
                          }
                          className="h-10 bg-slate-800/50 border-slate-700 focus:border-blue-500 focus:ring-blue-500 text-white"
                          placeholder="0.0"
                        />
                      ) : (
                        <div className="h-10 px-3 py-2 border border-slate-700 rounded-md bg-slate-800/50 flex items-center">
                          <span className="text-white font-medium">
                            {aluno.notas[`bimestre${bimestre}` as keyof typeof aluno.notas] || "-"}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {alunosFiltrados.length === 0 && (
          <Card className="glass-card border-0 shadow-lg animate-fade-in">
            <CardContent className="text-center py-12">
              <BookOpen className="h-12 w-12 text-slate-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">Nenhum aluno encontrado</h3>
              <p className="text-slate-400">Tente ajustar os filtros para encontrar os alunos desejados.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
