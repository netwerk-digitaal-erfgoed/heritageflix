import { describe, expect, test } from 'vitest'
import { NdeRepository } from './nde-repository'

describe('Query SPARQL', async () => {
  const ndeRepository = new NdeRepository()

  // describe('getArtworkById', async () => {
  //   const results = await ndeRepository.getArtworkById('<http://hdl.handle.net/10934/RM0001.COLLECT.10653>')

  //   test('Query result name', async () => {
  //     expect(results[0].name).toEqual('Portret van Willem II, koning der Nederlanden')
  //     expect(results).toHaveLength(1);
  //   });
  // });

  // describe('getArtPeriods', async () => {
  //   const results = await ndeRepository.getArtPeriods();

  //   test('Query', async () => {
  //     expect(results[0].get('name').value).toEqual('middeleeuws');
  //   });
  // });

  // describe('getArtPeriodsWithArt', async () => {
  //   const results = await ndeRepository.getArtPeriodsWithArt();
  //   console.warn(results);

  //   test('Query', async () => {
  //     expect(results[0].get('name').value).toEqual('middeleeuws');
  //   });
  // });
})
