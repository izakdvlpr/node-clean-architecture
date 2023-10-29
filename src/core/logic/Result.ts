import { ErrorBase } from '../domain/ErrorBase'

export class Result<T = any> {
  isSuccess: boolean

  isFailure: boolean

  error: ErrorBase

  private _value: T

  constructor(isSuccess: boolean, error?: ErrorBase, value?: T) {
    if (isSuccess && error) {
      throw new Error(
        'InvalidOperation: A result cannot be successful and contain an error',
      )
    }

    if (!isSuccess && !error) {
      throw new Error(
        'InvalidOperation: A failing result needs to contain an error message',
      )
    }

    this.isSuccess = isSuccess
    this.isFailure = !isSuccess

    this.error = <any>error
    this._value = <any>value

    Object.freeze(this)
  }

  getValue(): T {
    if (!this.isSuccess) {
      throw new Error(
        "Can't get the value of an error result. Use 'errorValue' instead.",
      )
    }

    return this._value
  }

  getError(): ErrorBase {
    return this.error
  }

  static ok(value?: any): Result {
    return new Result(true, <any>undefined, value)
  }

  static fail(error: ErrorBase): Result {
    return new Result(false, error)
  }

  static combine(results: Result[]): Result {
    for (const result of results) {
      if (result.isFailure) return result
    }

    return Result.ok()
  }
}
