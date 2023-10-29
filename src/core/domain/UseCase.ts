export interface UseCase<DTO = any, Response = any> {
  execute(dto?: DTO): Response
}
