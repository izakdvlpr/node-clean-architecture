import { UserRepository } from '@/application/repositories/UserRepository'
import { User } from '@/domain/entities/User'

export class InMemoryUserRepository implements UserRepository {
  items: User[] = []

  async findById(id: string): Promise<User | null> {
    return this.items.find((user) => user.id === id) ?? null
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.items.find((user) => user.email === email) ?? null
  }

  async create(user: User): Promise<void> {
    this.items.push(user)
  }
}
