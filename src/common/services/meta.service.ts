import { IMetaEndpoint, IMetaListModule } from 'src/common/interfaces/meta.interface'
import { pascalCase } from '../utils/converter.utils'

export class MetaService<T> {
  private readonly _meta: IMetaListModule<T>
  private static instance: InstanceType<typeof MetaService>
  private readonly _repositoryTemp

  constructor(meta: IMetaListModule<T>) {
    this._meta = meta
    this._repositoryTemp = import(`src/common/repository/${this._meta?.name}.repository`)
  }

  static getInstance(meta: IMetaListModule): InstanceType<typeof MetaService> {
    if (!MetaService.instance) {
      MetaService.instance = new MetaService(meta)
    }
    return MetaService.instance
  }

  async repository(): Promise<IMetaEndpoint> {
    const module = await this._repositoryTemp
    const repositoryMap = module?.[`use${pascalCase(this._meta?.name)}Repository`]
    return repositoryMap()
  }
}
