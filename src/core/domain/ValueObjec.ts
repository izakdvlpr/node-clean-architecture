export interface ValueObjectProps {
  [index: string]: any
}

export abstract class ValueObject<T extends ValueObjectProps> {
  readonly props: T

  constructor(props: T) {
    this.props = Object.freeze(props)
  }

  equals(valueObject?: ValueObject<T>): boolean {
    if (valueObject === null || valueObject === undefined) {
      return false
    }

    if (valueObject.props === undefined) {
      return false
    }

    return this.props === valueObject.props
  }
}
