import { isoDate } from '../interfaces/response.interface'
import { InventoryResponse } from '../model/inventory.model'
import { defineEndpoint } from '../utils/plugin.utils'

export const useInventoryEndpoint = defineEndpoint({
  getAll: () =>
    new Promise<InventoryResponse[]>((resolve) => {
      let itemIdCounter = 1000
      const statuses = ['Received', 'QC Passed', 'In Transit', 'Draft'] as const
      const generateDummyItems = (count: number): InventoryResponse[] => {
        const randomIsoDateInLastWeek = (): isoDate => {
          const now = Date.now()
          const sevenDays = 7 * 24 * 60 * 60 * 1000
          const randomTime = now - Math.floor(Math.random() * sevenDays)
          return new Date(randomTime).toISOString() as isoDate
        }
        return Array.from({ length: count }, () => ({
          id: itemIdCounter--,
          code: `PR-${Math.floor(900000 + Math.random() * 10000)}`,
          company: 'PT Megah Dunia',
          itemCount: Math.floor(Math.random() * 100),
          status: statuses[Math.floor(Math.random() * statuses.length)],
          date: randomIsoDateInLastWeek(),
        }))
      }
      const delay = 500 + Math.random() * 3000

      setTimeout(() => {
        resolve(generateDummyItems(10))
      }, delay)
    }),
})
