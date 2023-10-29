export interface Repository {
  save(entity: any): Promise<any>
}
