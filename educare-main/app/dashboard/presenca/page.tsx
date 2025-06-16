"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, Check, X, Clock } from "lucide-react"
import BarraNavegacao from "@/components/barra-navegacao"

interface RegistroPresenca {
  id: number
  nome: string
  turma: string
  presente: boolean | null
  horarioRegistro?: string
}

export default function PaginaPresenca() {
  const [registros, setRegistros] = useState<RegistroPresenca[]>([])
  const [turmaAtual, setTurmaAtual] = useState("9A")
  const [dataAtual, setDataAtual] = useState(new Date().toISOString().split("T")[0])
  const router = useRouter()

  useEffect(() => {
    const usuarioLogado = localStorage.getItem("educare_usuario")
    if (!usuarioLogado) {
      router.push("/")
      return
    }

    // Dados mock dos alunos para presença - todas as turmas
    const dadosMockPresenca: RegistroPresenca[] = [
      // Turma 9A
      { id: 1, nome: "Ana Silva Santos", turma: "9A", presente: null },
      { id: 2, nome: "Bruno Costa Lima", turma: "9A", presente: null },
      { id: 3, nome: "Eduarda Pereira Rocha", turma: "9A", presente: null },
      { id: 4, nome: "Gabriel Santos Oliveira", turma: "9A", presente: null },
      { id: 5, nome: "Helena Rodrigues Silva", turma: "9A", presente: null },
      { id: 6, nome: "Igor Ferreira Costa", turma: "9A", presente: null },
      { id: 7, nome: "Julia Mendes Alves", turma: "9A", presente: null },
      { id: 8, nome: "Lucas Pereira Santos", turma: "9A", presente: null },
      { id: 9, nome: "Marina Souza Lima", turma: "9A", presente: null },
      { id: 10, nome: "Pedro Henrique Silva", turma: "9A", presente: null },
      { id: 11, nome: "Rafaela Costa Mendes", turma: "9A", presente: null },
      { id: 12, nome: "Thiago Alves Rocha", turma: "9A", presente: null },

      // Turma 9B
      { id: 13, nome: "Amanda Ferreira Lima", turma: "9B", presente: null },
      { id: 14, nome: "Carlos Eduardo Santos", turma: "9B", presente: null },
      { id: 15, nome: "Daniela Oliveira Costa", turma: "9B", presente: null },
      { id: 16, nome: "Felipe Rodrigues Silva", turma: "9B", presente: null },
      { id: 17, nome: "Giovanna Pereira Alves", turma: "9B", presente: null },
      { id: 18, nome: "Henrique Lima Santos", turma: "9B", presente: null },
      { id: 19, nome: "Isabela Mendes Rocha", turma: "9B", presente: null },
      { id: 20, nome: "João Victor Costa", turma: "9B", presente: null },
      { id: 21, nome: "Larissa Silva Oliveira", turma: "9B", presente: null },
      { id: 22, nome: "Mateus Ferreira Lima", turma: "9B", presente: null },
      { id: 23, nome: "Natália Santos Alves", turma: "9B", presente: null },
      { id: 24, nome: "Otávio Pereira Costa", turma: "9B", presente: null },

      // Turma 9C
      { id: 25, nome: "Beatriz Lima Santos", turma: "9C", presente: null },
      { id: 26, nome: "Caio Rodrigues Silva", turma: "9C", presente: null },
      { id: 27, nome: "Débora Costa Mendes", turma: "9C", presente: null },
      { id: 28, nome: "Eduardo Silva Lima", turma: "9C", presente: null },
      { id: 29, nome: "Fernanda Alves Rocha", turma: "9C", presente: null },
      { id: 30, nome: "Gustavo Pereira Santos", turma: "9C", presente: null },
      { id: 31, nome: "Heloísa Ferreira Costa", turma: "9C", presente: null },
      { id: 32, nome: "Ivan Mendes Oliveira", turma: "9C", presente: null },
      { id: 33, nome: "Jéssica Santos Silva", turma: "9C", presente: null },
      { id: 34, nome: "Kevin Lima Alves", turma: "9C", presente: null },
      { id: 35, nome: "Letícia Costa Rocha", turma: "9C", presente: null },
      { id: 36, nome: "Miguel Rodrigues Lima", turma: "9C", presente: null },
    ]

    setRegistros(dadosMockPresenca.filter((aluno) => aluno.turma === turmaAtual))
  }, [router, turmaAtual])

  const marcarPresenca = (alunoId: number, presente: boolean) => {
    const agora = new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })

    setRegistros((prev) =>
      prev.map((registro) => (registro.id === alunoId ? { ...registro, presente, horarioRegistro: agora } : registro)),
    )
  }

  const marcarTodosPresentes = () => {
    const agora = new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })

    setRegistros((prev) =>
      prev.map((registro) => ({
        ...registro,
        presente: true,
        horarioRegistro: agora,
      })),
    )
  }

  const limparRegistros = () => {
    setRegistros((prev) =>
      prev.map((registro) => ({
        ...registro,
        presente: null,
        horarioRegistro: undefined,
      })),
    )
  }

  const salvarPresenca = () => {
    // Simular salvamento
    alert("Presença salva com sucesso!")
  }

  const estatisticas = {
    total: registros.length,
    presentes: registros.filter((r) => r.presente === true).length,
    ausentes: registros.filter((r) => r.presente === false).length,
    pendentes: registros.filter((r) => r.presente === null).length,
  }

  const percentualPresenca =
    estatisticas.total > 0 ? Math.round((estatisticas.presentes / estatisticas.total) * 100) : 0

  return (
    <div className="min-h-screen bg-dots bg-[#0f172a] bg-gradient-to-br from-[#0f172a] via-[#134e4a] to-[#1e3a5f]">
      <BarraNavegacao />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8 animate-fade-in">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 p-3 rounded-full neon-green">
            <Users className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white text-shadow">Controle de Presença</h1>
            <p className="text-green-300">Registre a presença dos alunos</p>
          </div>
        </div>

        {/* Controles */}
        <Card className="mb-6 glass-card border-0 shadow-lg animate-fade-in">
          <CardHeader>
            <CardTitle className="text-lg text-white">Configurações da Aula</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1">
                <label className="text-sm font-medium text-green-300 mb-2 block">Data da Aula</label>
                <input
                  type="date"
                  value={dataAtual}
                  onChange={(e) => setDataAtual(e.target.value)}
                  className="w-full h-11 px-3 bg-slate-800/50 border border-slate-700 rounded-md focus:border-green-500 focus:ring-green-500 text-white"
                />
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium text-green-300 mb-2 block">Turma</label>
                <Select value={turmaAtual} onValueChange={setTurmaAtual}>
                  <SelectTrigger className="h-11 bg-slate-800/50 border-slate-700 focus:border-green-500 focus:ring-green-500 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-white">
                    <SelectItem value="9A">Turma 9A</SelectItem>
                    <SelectItem value="9B">Turma 9B</SelectItem>
                    <SelectItem value="9C">Turma 9C</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button onClick={marcarTodosPresentes} className="bg-green-600 hover:bg-green-700 text-white">
                <Check className="h-4 w-4 mr-2" />
                Marcar Todos Presentes
              </Button>
              <Button
                onClick={limparRegistros}
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <X className="h-4 w-4 mr-2" />
                Limpar Registros
              </Button>
              <Button onClick={salvarPresenca} className="bg-blue-600 hover:bg-blue-700 text-white">
                <Calendar className="h-4 w-4 mr-2" />
                Salvar Presença
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Estatísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{estatisticas.total}</div>
              <p className="text-sm opacity-90">Total de Alunos</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{estatisticas.presentes}</div>
              <p className="text-sm opacity-90">Presentes</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{estatisticas.ausentes}</div>
              <p className="text-sm opacity-90">Ausentes</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{percentualPresenca}%</div>
              <p className="text-sm opacity-90">Presença</p>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Alunos */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg text-gray-800">Lista de Presença - Turma {turmaAtual}</CardTitle>
            <CardDescription>Data: {new Date(dataAtual).toLocaleDateString("pt-BR")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {registros.map((registro) => (
                <div
                  key={registro.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {registro.nome
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .substring(0, 2)}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">{registro.nome}</h3>
                      {registro.horarioRegistro && (
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Registrado às {registro.horarioRegistro}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {registro.presente !== null && (
                      <Badge
                        className={`${
                          registro.presente
                            ? "bg-green-100 text-green-800 border-green-200"
                            : "bg-red-100 text-red-800 border-red-200"
                        } border`}
                      >
                        {registro.presente ? "Presente" : "Ausente"}
                      </Badge>
                    )}

                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        onClick={() => marcarPresenca(registro.id, true)}
                        className={`${
                          registro.presente === true
                            ? "bg-green-600 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-green-100"
                        } transition-colors`}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => marcarPresenca(registro.id, false)}
                        className={`${
                          registro.presente === false
                            ? "bg-red-600 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-red-100"
                        } transition-colors`}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
