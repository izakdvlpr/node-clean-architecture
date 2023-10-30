import { User } from '@/domain/entities/User'

export interface UserRepository {
  findById(id: string): Promise<User | null>
  findByUsername(username: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(user: User): Promise<void>
}
