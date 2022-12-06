import { defineStore } from 'pinia';

const createQuery = (query: string = '', replacements: Record<string, string> = {}) => {
  const regex = new RegExp(Object.keys(replacements).join('|'), 'gi');
  return query.replace(regex, (matched:string) => replacements[matched]);
}

export const useQueriesStore = defineStore('queries', () => {
  let apiUrl: string;
  let categoryQuery: string;
  let itemsQuery: string;

  async function getCategoryQuery (limit: number = 1000): Promise<Category[]> {
    const query = createQuery(categoryQuery, {
      "_LIMIT_": limit.toString()
    });
    return $fetch(apiUrl, {
      method: 'POST',
      body: {
        query: query
      }
    });
  }

  async function getItemsQuery (limit: number, page: number, periodId: string = null, locationId: string = null): Promise<Artwork[]> {
    const query = createQuery(itemsQuery, {
      "_LIMIT_": limit.toString(),
      "_OFFSET_": (page * limit).toString(),
      "_PERIODID_": periodId,
      "_LOCATIONID_": locationId
    });

    return $fetch(apiUrl, {
      method: 'POST',
      body: {
        query
      }
    });
  }

  async function loadQueries (): Promise<void> {
    console.warn('Queries.ts#load');
    const devPrefix = process.dev ? '/assets' : '';
    const jsonLocation = `${devPrefix}/config/queries.json`;
    const data:QueryData = await $fetch(jsonLocation);
    apiUrl = data.baseUrl;
    categoryQuery = data.categoryQuery;
    itemsQuery = data.itemsQuery;
  }

  return { getCategoryQuery, getItemsQuery, loadQueries };
});
