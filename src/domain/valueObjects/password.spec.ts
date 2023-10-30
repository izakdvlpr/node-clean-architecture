import { Password } from './password'

describe('Password', () => {
  it('should accept valid password', async () => {
    const passwordOrError = Password.create('super-secure-pa$$word')

    expect(passwordOrError.isSuccess).toBeTruthy()
  })
})
