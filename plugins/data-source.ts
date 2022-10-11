import { NdeRepository } from '~/lib/nde-repository'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      ndeRepository: new NdeRepository()
    }
  }
})
