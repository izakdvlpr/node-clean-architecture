import { describe, it, expect } from 'bun:test'

import { Username } from './username'

describe('Username', () => {
  it('should accept valid username', () => {
    const usernameOrError = Username.create('jhon.doe321')

    expect(usernameOrError.isSuccess).toBeTruthy()
  })

  it('should reject usernames with more than 255 characters', () => {
    const usernameOrError = Username.create(`johndo${'e'.repeat(260)}`)

    expect(usernameOrError.isFailure).toBeTruthy()
  })

  it('should reject invalid username', () => {
    const invalidUsernames = [
      'John Doe',
      'johndoe@!$-²¹²³',
      'jhon@',
      'jhon)(doe',
    ]

    invalidUsernames
      .map((username) => Username.create(username))
      .forEach((usernameOrError) => {
        expect(usernameOrError.isFailure).toBeTruthy()
      })
  })
})
