"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home, BookOpen, Users, BarChart3, LogOut, Menu, X, GraduationCap, Bell, Settings, User } from "lucide-react"

export default function BarraNavegacao() {
  const [menuAberto, setMenuAberto] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = () => {
    localStorage.removeItem("educare_usuario")
    router.push("/")
  }

  const itensMenu = [
    {
      nome: "Dashboard",
      icone: Home,
      caminho: "/dashboard",
      ativo: pathname === "/dashboard",
    },
    {
      nome: "Notas",
      icone: BookOpen,
      caminho: "/dashboard/notas",
      ativo: pathname === "/dashboard/notas",
    },
    {
      nome: "Presença",
      icone: Users,
      caminho: "/dashboard/presenca",
      ativo: pathname === "/dashboard/presenca",
    },
    {
      nome: "Relatórios",
      icone: BarChart3,
      caminho: "/dashboard/relatorios",
      ativo: pathname === "/dashboard/relatorios",
    },
  ]

  return (
    <>
      {/* Navegação principal */}
      <nav className="nav-modern sticky top-0 z-50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <div className="icon-wrapper w-10 h-10">
                <GraduationCap className="h-6 w-6 text-blue-400" />
              </div>
              <span className="text-2xl font-bold text-gradient">Educare</span>
            </div>

            {/* Menu desktop */}
            <div className="hidden md:flex items-center space-x-2">
              {itensMenu.map((item) => {
                const IconeItem = item.icone
                return (
                  <button
                    key={item.caminho}
                    onClick={() => router.push(item.caminho)}
                    className={`nav-item-modern flex items-center gap-2 ${item.ativo ? "active" : ""}`}
                  >
                    <IconeItem className="h-4 w-4" />
                    {item.nome}
                  </button>
                )
              })}
            </div>

            {/* Ações do usuário */}
            <div className="flex items-center gap-3">
              <button className="nav-item-modern p-2 relative">
                <Bell className="h-5 w-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              </button>

              <button className="nav-item-modern p-2">
                <Settings className="h-5 w-5" />
              </button>

              <button className="nav-item-modern p-2">
                <User className="h-5 w-5" />
              </button>

              <Button
                onClick={handleLogout}
                variant="outline"
                className="hidden md:flex items-center gap-2 border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-400"
              >
                <LogOut className="h-4 w-4" />
                Sair
              </Button>

              {/* Menu mobile toggle */}
              <button onClick={() => setMenuAberto(!menuAberto)} className="md:hidden nav-item-modern p-2">
                {menuAberto ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Menu mobile */}
      {menuAberto && (
        <div className="md:hidden card-modern mx-4 mt-2 p-4 animate-slide-up">
          <div className="space-y-2">
            {itensMenu.map((item, index) => {
              const IconeItem = item.icone
              return (
                <button
                  key={item.caminho}
                  onClick={() => {
                    router.push(item.caminho)
                    setMenuAberto(false)
                  }}
                  className={`nav-item-modern w-full justify-start gap-3 ${item.ativo ? "active" : ""}`}
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  <IconeItem className="h-5 w-5" />
                  {item.nome}
                </button>
              )
            })}

            <div className="pt-4 border-t border-slate-700">
              <button onClick={handleLogout} className="nav-item-modern w-full justify-start gap-3 text-red-400">
                <LogOut className="h-5 w-5" />
                Sair do Sistema
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
