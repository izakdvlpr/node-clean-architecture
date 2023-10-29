export abstract class Mapper {
  static toPrismaCreate(entity: any): any {
    throw new Error('Method not implemented.')
  }

  static toDomain(entity: any): any {
    throw new Error('Method not implemented.')
  }
}
