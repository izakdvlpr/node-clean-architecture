import { describe, it, expect } from 'bun:test'

import { Email } from './email'

describe('Email', () => {
  it('should accept valid email address', () => {
    const emailOrError = Email.create('jhondoe@example.com')

    expect(emailOrError.isSuccess).toBeTruthy()
  })

  it('should reject invalid email address', () => {
    const invalidEmails = [
      'johndoe',
      'johndoe@example',
      '@example.com',
      'johndoe@example.',
    ]

    invalidEmails
      .map((email) => Email.create(email))
      .forEach((emailOrError) => {
        expect(emailOrError.isFailure).toBeTruthy()
      })
  })
})
