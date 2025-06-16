"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GraduationCap, BookOpen, Users, Award, Sparkles, Shield, Zap, ArrowRight, Star, Globe } from "lucide-react"

export default function TelaLogin() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState("")
  const router = useRouter()

  useEffect(() => {
    const usuarioLogado = localStorage.getItem("educare_usuario")
    if (usuarioLogado) {
      router.push("/dashboard")
    }
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setCarregando(true)
    setErro("")

    // Validações básicas
    if (!email.trim() || !senha.trim()) {
      setErro("Email e senha são obrigatórios!")
      setCarregando(false)
      return
    }

    if (!email.includes("@")) {
      setErro("Email inválido!")
      setCarregando(false)
      return
    }

    setTimeout(() => {
      // Verificar se existe uma conta cadastrada
      const contasCadastradas = JSON.parse(localStorage.getItem("educare_contas") || "[]")
      const contaEncontrada = contasCadastradas.find((conta: any) => conta.email === email && conta.senha === senha)

      if (contaEncontrada) {
        // Login bem-sucedido
        const dadosUsuario = {
          id: contaEncontrada.id,
          nome: contaEncontrada.nome,
          email: contaEncontrada.email,
          escola: contaEncontrada.escola,
          disciplina: contaEncontrada.disciplina,
          tipo: "professor",
        }
        localStorage.setItem("educare_usuario", JSON.stringify(dadosUsuario))
        router.push("/dashboard")
      } else {
        // Verificar se o email existe mas a senha está errada
        const emailExiste = contasCadastradas.find((conta: any) => conta.email === email)
        if (emailExiste) {
          setErro("Senha incorreta!")
        } else {
          setErro("Conta não encontrada! Você precisa se cadastrar primeiro.")
        }
      }
      setCarregando(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-main bg-grid relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="decoration-circle w-96 h-96 top-10 -left-48 delay-100"></div>
      <div className="decoration-circle w-80 h-80 bottom-10 -right-40 delay-300"></div>
      <div className="decoration-square w-32 h-32 top-1/4 right-20 delay-500"></div>
      <div className="decoration-square w-24 h-24 bottom-1/4 left-20 delay-700"></div>

      <div className="relative z-10 min-h-screen flex">
        {/* Sidebar esquerda - Hero Section */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-12 relative">
          <div className="max-w-lg text-center animate-slide-left">
            {/* Logo principal */}
            <div className="mb-12">
              <div className="icon-wrapper w-24 h-24 mx-auto mb-6 animate-glow">
                <GraduationCap className="h-12 w-12 text-blue-400" />
              </div>
              <h1 className="text-6xl font-bold text-gradient mb-4">Educare</h1>
              <p className="text-xl text-slate-400 font-light">Transformando a educação através da tecnologia</p>
            </div>

            {/* Features grid */}
            <div className="grid grid-cols-2 gap-6 mb-12">
              <div className="text-center">
                <div className="icon-wrapper w-16 h-16 mx-auto mb-4 animate-float delay-100">
                  <Users className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">Gestão Inteligente</h3>
                <p className="text-sm text-slate-400">Controle total dos seus alunos</p>
              </div>
              <div className="text-center">
                <div className="icon-wrapper w-16 h-16 mx-auto mb-4 animate-float delay-200">
                  <Shield className="h-8 w-8 text-cyan-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">Segurança Total</h3>
                <p className="text-sm text-slate-400">Dados protegidos e criptografados</p>
              </div>
              <div className="text-center">
                <div className="icon-wrapper w-16 h-16 mx-auto mb-4 animate-float delay-300">
                  <Zap className="h-8 w-8 text-purple-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">Alta Performance</h3>
                <p className="text-sm text-slate-400">Velocidade e eficiência</p>
              </div>
              <div className="text-center">
                <div className="icon-wrapper w-16 h-16 mx-auto mb-4 animate-float delay-400">
                  <Globe className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">Acesso Global</h3>
                <p className="text-sm text-slate-400">Disponível em qualquer lugar</p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex justify-center gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-gradient-cyan">5K+</div>
                <div className="text-sm text-slate-400">Professores</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gradient">200+</div>
                <div className="text-sm text-slate-400">Escolas</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gradient-cyan">98%</div>
                <div className="text-sm text-slate-400">Satisfação</div>
              </div>
            </div>
          </div>
        </div>

        {/* Área de login */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md animate-slide-right">
            {/* Header mobile */}
            <div className="lg:hidden text-center mb-8">
              <div className="icon-wrapper w-16 h-16 mx-auto mb-4">
                <GraduationCap className="h-8 w-8 text-blue-400" />
              </div>
              <h1 className="text-4xl font-bold text-gradient">Educare</h1>
              <p className="text-slate-400 mt-2">Sistema Educacional Avançado</p>
            </div>

            {/* Card de login */}
            <div className="card-modern p-8 animate-scale-in">
              <div className="text-center mb-8">
                <div className="icon-wrapper w-20 h-20 mx-auto mb-6">
                  <Shield className="h-10 w-10 text-blue-400" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Bem-vindo de volta</h2>
                <p className="text-slate-400">Entre com suas credenciais para continuar</p>
              </div>

              {erro && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-red-400 text-sm text-center">{erro}</p>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <Label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                    Email institucional
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="professor@escola.edu.br"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="input-modern w-full"
                  />
                </div>

                <div>
                  <Label htmlFor="senha" className="block text-sm font-medium text-slate-300 mb-2">
                    Senha
                  </Label>
                  <Input
                    id="senha"
                    type="password"
                    placeholder="Digite sua senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                    className="input-modern w-full"
                  />
                </div>

                <Button type="submit" className="btn-modern w-full" disabled={carregando}>
                  {carregando ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="loading-modern w-5 h-5"></div>
                      Entrando...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <span>Entrar no sistema</span>
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  )}
                </Button>
              </form>

              <div className="mt-8 pt-6 border-t border-slate-700">
                <p className="text-center text-sm text-slate-400 mb-4">Não tem uma conta?</p>
                <Button
                  variant="outline"
                  className="w-full border-slate-600 text-slate-300 hover:bg-slate-800 hover:border-slate-500"
                  onClick={() => router.push("/cadastro")}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Criar conta institucional
                </Button>
              </div>

              {/* Security badges */}
              <div className="mt-6 flex justify-center gap-4">
                <div className="badge-modern">
                  <Shield className="h-3 w-3 mr-1 inline" />
                  SSL
                </div>
                <div className="badge-modern">
                  <Star className="h-3 w-3 mr-1 inline" />
                  LGPD
                </div>
                <div className="badge-modern">
                  <Sparkles className="h-3 w-3 mr-1 inline" />
                  ISO 27001
                </div>
              </div>
            </div>

            {/* Features mobile */}
            <div className="lg:hidden mt-8 grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="icon-wrapper w-12 h-12 mx-auto mb-2">
                  <BookOpen className="h-6 w-6 text-blue-400" />
                </div>
                <p className="text-xs text-slate-400">Gestão Completa</p>
              </div>
              <div className="text-center">
                <div className="icon-wrapper w-12 h-12 mx-auto mb-2">
                  <Award className="h-6 w-6 text-purple-400" />
                </div>
                <p className="text-xs text-slate-400">Relatórios Avançados</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
