import { randomUUID } from 'node:crypto'

export abstract class Entity<T> {
  protected readonly _id: string

  readonly props: T

  get id() {
    return this._id
  }

  constructor(props: T, id?: string) {
    this._id = id || randomUUID()

    this.props = props
  }

  equals(object?: Entity<T>): boolean {
    if (object === null || object === undefined) {
      return false
    }

    if (this === object) {
      return true
    }

    if (!(object instanceof Entity)) {
      return false
    }

    return this._id === object._id
  }
}
