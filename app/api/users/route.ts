import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  const users = await prisma.user.findMany()
  return NextResponse.json(users)
}

export async function POST(request: NextRequest) {
  const { name, email } = await request.json()

  if (!name || !email) {
    return NextResponse.json({ error: 'Faltando name ou email' }, { status: 400 })
  }

  try {
    const user = await prisma.user.create({
      data: { name, email }
    })
    return NextResponse.json(user)
  } catch {
    return NextResponse.json({ error: 'Erro ao criar usuário' }, { status: 500 })
  }
}
