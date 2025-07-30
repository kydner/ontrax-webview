import { IMetaEndpoint, IMetaModule } from 'src/common/interfaces/meta.interface'
import { pascalCase } from '../utils/converter.utils'

export class MetaService {
  private readonly _meta: IMetaModule
  private static instance: InstanceType<typeof MetaService>
  private readonly _useCaseTemp

  constructor(meta: IMetaModule) {
    this._meta = meta
    this._useCaseTemp = import(`src/common/repository/${this._meta?.name}.repository`)
  }

  static getInstance(meta: IMetaModule): InstanceType<typeof MetaService> {
    if (!MetaService.instance) {
      MetaService.instance = new MetaService(meta)
    }
    return MetaService.instance
  }

  async useCase(): Promise<IMetaEndpoint> {
    const module = await this._useCaseTemp
    const useCaseMap = module?.[`use${pascalCase(this._meta?.name)}Repository`]
    return useCaseMap()
  }
}
