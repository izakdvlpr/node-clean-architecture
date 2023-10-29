export interface ErrorBaseOptions {
  message: string
  code: string
  status: number
}

export class ErrorBase {
  message: string

  code: string

  status: number

  constructor({ message, code, status }: ErrorBaseOptions) {
    this.message = message
    this.code = code
    this.status = status
  }

  toObject(): ErrorBaseOptions {
    return {
      message: this.message,
      code: this.code,
      status: this.status,
    }
  }
}
