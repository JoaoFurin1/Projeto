"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GraduationCap, ArrowLeft } from "lucide-react"

export default function TelaCadastro() {
  const [dadosFormulario, setDadosFormulario] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    escola: "",
    disciplina: "",
  })
  const [carregando, setCarregando] = useState(false)
  const router = useRouter()

  const handleInputChange = (campo: string, valor: string) => {
    setDadosFormulario((prev) => ({
      ...prev,
      [campo]: valor,
    }))
  }

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault()
    setCarregando(true)

    // Validações básicas
    if (!dadosFormulario.nome.trim()) {
      alert("Nome é obrigatório!")
      setCarregando(false)
      return
    }

    if (!dadosFormulario.email.trim() || !dadosFormulario.email.includes("@")) {
      alert("Email inválido!")
      setCarregando(false)
      return
    }

    if (dadosFormulario.senha.length < 6) {
      alert("A senha deve ter pelo menos 6 caracteres!")
      setCarregando(false)
      return
    }

    if (dadosFormulario.senha !== dadosFormulario.confirmarSenha) {
      alert("As senhas não coincidem!")
      setCarregando(false)
      return
    }

    if (!dadosFormulario.escola.trim()) {
      alert("Nome da escola é obrigatório!")
      setCarregando(false)
      return
    }

    if (!dadosFormulario.disciplina) {
      alert("Selecione uma disciplina!")
      setCarregando(false)
      return
    }

    // Verificar se o email já está cadastrado
    const contasCadastradas = JSON.parse(localStorage.getItem("educare_contas") || "[]")
    const emailJaExiste = contasCadastradas.find((conta: any) => conta.email === dadosFormulario.email)

    if (emailJaExiste) {
      alert("Este email já está cadastrado!")
      setCarregando(false)
      return
    }

    // Simular cadastro
    setTimeout(() => {
      const novaConta = {
        id: Date.now(),
        nome: dadosFormulario.nome,
        email: dadosFormulario.email,
        senha: dadosFormulario.senha,
        escola: dadosFormulario.escola,
        disciplina: dadosFormulario.disciplina,
        tipo: "professor",
        dataCadastro: new Date().toISOString(),
      }

      // Salvar a conta na lista de contas cadastradas
      const contasAtualizadas = [...contasCadastradas, novaConta]
      localStorage.setItem("educare_contas", JSON.stringify(contasAtualizadas))

      // Fazer login automático após cadastro
      const dadosUsuario = {
        id: novaConta.id,
        nome: novaConta.nome,
        email: novaConta.email,
        escola: novaConta.escola,
        disciplina: novaConta.disciplina,
        tipo: "professor",
      }
      localStorage.setItem("educare_usuario", JSON.stringify(dadosUsuario))

      alert("Conta criada com sucesso!")
      router.push("/dashboard")
      setCarregando(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-dots bg-[#0f172a] bg-gradient-to-br from-[#0f172a] via-[#1e3a5f] to-[#134e4a] flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-2 mb-4">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 p-3 rounded-full neon-green">
              <GraduationCap className="h-8 w-8 text-white animate-pulse-slow" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent text-shadow">
              Educare
            </h1>
          </div>
          <p className="text-green-200">Criar Nova Conta</p>
        </div>

        <Card className="glass-card border-0 shadow-xl">
          <CardHeader className="space-y-1 pb-6">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/")}
                className="p-1 h-8 w-8 text-white hover:bg-slate-800/50"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <CardTitle className="text-2xl font-bold text-white text-shadow">Cadastro de Professor</CardTitle>
            </div>
            <CardDescription className="text-green-200">Preencha os dados para criar sua conta</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCadastro} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nome" className="text-sm font-medium text-green-200">
                  Nome Completo
                </Label>
                <Input
                  id="nome"
                  type="text"
                  placeholder="Seu nome completo"
                  value={dadosFormulario.nome}
                  onChange={(e) => handleInputChange("nome", e.target.value)}
                  required
                  className="h-11 bg-slate-800/50 border-slate-700 focus:border-green-500 focus:ring-green-500 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-green-200">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="professor@escola.com"
                  value={dadosFormulario.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  className="h-11 bg-slate-800/50 border-slate-700 focus:border-green-500 focus:ring-green-500 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="escola" className="text-sm font-medium text-green-200">
                  Escola
                </Label>
                <Input
                  id="escola"
                  type="text"
                  placeholder="Nome da escola"
                  value={dadosFormulario.escola}
                  onChange={(e) => handleInputChange("escola", e.target.value)}
                  required
                  className="h-11 bg-slate-800/50 border-slate-700 focus:border-green-500 focus:ring-green-500 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="disciplina" className="text-sm font-medium text-green-200">
                  Disciplina Principal
                </Label>
                <Select onValueChange={(value) => handleInputChange("disciplina", value)}>
                  <SelectTrigger className="h-11 bg-slate-800/50 border-slate-700 focus:border-green-500 focus:ring-green-500 text-white">
                    <SelectValue placeholder="Selecione a disciplina" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-white">
                    <SelectItem value="matematica">Matemática</SelectItem>
                    <SelectItem value="portugues">Português</SelectItem>
                    <SelectItem value="historia">História</SelectItem>
                    <SelectItem value="geografia">Geografia</SelectItem>
                    <SelectItem value="ciencias">Ciências</SelectItem>
                    <SelectItem value="fisica">Física</SelectItem>
                    <SelectItem value="quimica">Química</SelectItem>
                    <SelectItem value="biologia">Biologia</SelectItem>
                    <SelectItem value="ingles">Inglês</SelectItem>
                    <SelectItem value="educacao-fisica">Educação Física</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="senha" className="text-sm font-medium text-green-200">
                  Senha
                </Label>
                <Input
                  id="senha"
                  type="password"
                  placeholder="Digite sua senha"
                  value={dadosFormulario.senha}
                  onChange={(e) => handleInputChange("senha", e.target.value)}
                  required
                  className="h-11 bg-slate-800/50 border-slate-700 focus:border-green-500 focus:ring-green-500 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmarSenha" className="text-sm font-medium text-green-200">
                  Confirmar Senha
                </Label>
                <Input
                  id="confirmarSenha"
                  type="password"
                  placeholder="Confirme sua senha"
                  value={dadosFormulario.confirmarSenha}
                  onChange={(e) => handleInputChange("confirmarSenha", e.target.value)}
                  required
                  className="h-11 bg-slate-800/50 border-slate-700 focus:border-green-500 focus:ring-green-500 text-white"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-11 btn-gradient-green text-white font-medium transition-all duration-200 transform hover:scale-[1.02]"
                disabled={carregando}
              >
                {carregando ? "Criando conta..." : "Criar Conta"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
