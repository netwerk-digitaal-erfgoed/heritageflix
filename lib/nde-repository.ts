import { QueryEngine } from '@comunica/query-sparql'
import { QuerySourceContext } from '@rdfjs/types/query/queryable'

export type idType = `<${string}>`;

export async function getQueryResults (query: string, context: QuerySourceContext<string>): Promise<Array<Object>> {
  const engine = new QueryEngine()
  const bindingsStream = await engine.queryBindings(query, context)
  return await bindingsStream.toArray()
}

export class NdeRepository {
  private sparqlQueryContext: QuerySourceContext<string> = {
    sources: ['https://api.data.netwerkdigitaalerfgoed.nl/datasets/Sjors/heritageflix/services/heritageflix/sparql'],
  }

  async getArtworkList (limit: Number = 10, offset: Number = 0): Promise<Array<Object>> {
    const query = `
      PREFIX schema: <https://schema.org/>
      
      SELECT *
      WHERE {
        ?uri schema:name ?name ;
          schema:about ?about ;
          schema:description ?description ;
          schema:dateCreated ?dateCreated ;
          schema:creator ?creator ;
          schema:publisher ?publisher ;
          schema:image ?image .
        ?image schema:contentUrl ?imageUrl .
      }
      ORDER BY ?dateCreated
      LIMIT ${limit} OFFSET ${offset}`
    return getQueryResults(query, this.sparqlQueryContext)
  }

  async getArtworkById (id: idType): Promise<Array<Object>> {
    const query = `
      PREFIX schema: <https://schema.org/>
      
      SELECT *
      WHERE {
        ?uri schema:name ?name ;
          schema:about ?about ;
          schema:description ?description ;
          schema:dateCreated ?dateCreated ;
          schema:creator ?creator ;
          schema:publisher ?publisher ;
          schema:image ?image .
        ?image schema:contentUrl ?imageUrl .
        FILTER(?uri = ${id})
      }
      LIMIT 1`
    return getQueryResults(query, this.sparqlQueryContext)
  }
}

