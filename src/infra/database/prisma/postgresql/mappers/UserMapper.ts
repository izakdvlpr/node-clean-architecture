import { Prisma, User as RawUser } from '@prisma/client'

import { User } from '@/domain/entities/User'
import { Mapper } from '@/core/infra/database/Mapper'

export class UserMapper extends Mapper {
  static toPrismaCreate(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      password_hash: user.passwordHash,
    }
  }

  static toDomain(raw: RawUser): User {
    const user = new User(
      {
        username: raw.username,
        email: raw.email,
        passwordHash: raw.password_hash,
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
      },
      raw.id,
    )

    return user
  }
}
