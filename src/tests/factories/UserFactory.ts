import { User, UserProps } from '@/domain/entities/User'
import { Password } from '@/domain/valueObjects/password'

export async function createUser(
  overrides: Partial<UserProps> = {},
): Promise<User> {
  const user = User.create({
    username: 'jhondoe',
    email: 'johndoe@example.com',
    passwordHash: await Password.generateHash('super-secure-pa$$word'),
    ...overrides,
  })

  return user
}
