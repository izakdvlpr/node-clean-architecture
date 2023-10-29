import { User } from '@/domain/entities/User'
import { UserRepository } from '@/application/repositories/UserRepository'

import { prisma } from '../client'
import { UserMapper } from '../mappers/UserMapper'

export class PrismaUserRepository implements UserRepository {
  async create(user: User): Promise<void> {
    const data = UserMapper.toPrismaCreate(user)

    await prisma.user.create({
      data,
    })
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: { id },
    })

    if (!user) {
      return null
    }

    return UserMapper.toDomain(user)
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: { email },
    })

    if (!user) {
      return null
    }

    return UserMapper.toDomain(user)
  }
}
