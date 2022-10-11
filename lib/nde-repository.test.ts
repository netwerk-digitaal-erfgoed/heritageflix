import { describe, expect, test } from 'vitest'
import { NdeRepository } from './nde-repository'

describe('Query SPARQL', async () => {
  const ndeRepository = new NdeRepository()
  const results = await ndeRepository.getArtworkById('<http://hdl.handle.net/10934/RM0001.COLLECT.10653>')

  test('Query result name', async () => {
    expect(results[0].get('name').value).toEqual('Portret van Willem II, koning der Nederlanden')
  })

  test('Query result length', async () => {
    expect(results).toHaveLength(1)
  })
})
