export type idType = `<${string}>`;

const fetchQuery = async (query: string): Promise<Array<Object>> => {
  return $fetch('https://api.data.netwerkdigitaalerfgoed.nl/datasets/heritageflix/v1/services/v1/sparql', {
    method: 'POST',
    body: {
      query: query
    }
  });
}

export class NdeRepository {
  // Get the periods that have artworks
  async getArtPeriodsWithArt () {
    const query = `
      PREFIX schema: <https://schema.org/>

      SELECT DISTINCT
        (COUNT(?heritageObject) AS ?numberOfHeritageObjects)
        ?artPeriod
        ?name
        ?startDate
        ?endDate
      WHERE {
        ?heritageObject a schema:VisualArtwork ;
          schema:temporalCoverage ?artPeriod .
        ?artPeriod a schema:DefinedTerm ;
          schema:name ?name ;
          schema:startDate ?startDate .
        OPTIONAL { ?artPeriod schema:endDate ?endDate }
      }
      ORDER BY ?startDate
      LIMIT 1000`;

    return fetchQuery(query);
  }

  async getArtworksForPeriod (periodId: string, limit: Number = 16, offset: Number = 0) {
    console.log(periodId, limit, offset)
    const query = `
      PREFIX schema: <https://schema.org/>

      SELECT *
      WHERE {
        {
          SELECT *
          WHERE {
            ?heritageObject a schema:VisualArtwork ;
              schema:name ?name ;
              schema:dateCreated ?dateCreated ;
              schema:image/schema:contentUrl ?imageContentUrl ;
              schema:image/schema:encodingFormat ?imageEncodingFormat ;
              schema:image/schema:license ?imageLicense ;
              schema:creator/schema:name ?creatorName ;
              schema:temporalCoverage <${periodId}> .
          }
          ORDER BY ?dateCreated
        }
      }
      LIMIT ${limit}
      OFFSET ${offset}
    `;
    return fetchQuery(query);
  }

  async getArtworkById (id: idType) {
    const query = `
      PREFIX schema: <https://schema.org/>

      SELECT *
      WHERE {
        BIND(${id} AS ?heritageObject)

        ?heritageObject a schema:VisualArtwork ;
          schema:name ?name ;
          schema:description ?description ;
          schema:dateCreated ?dateCreated ;
        OPTIONAL { ?heritageObject schema:mainEntityOfPage ?webpage }

        # Art period
        ?heritageObject schema:temporalCoverage/schema:name ?artPeriodName ;
          schema:temporalCoverage/schema:startDate ?artPeriodStartDate ;
          schema:temporalCoverage/schema:endDate ?artPeriodEndDate .

        # Image
        ?heritageObject schema:image/schema:contentUrl ?imageContentUrl ;
          schema:image/schema:encodingFormat ?imageEncodingFormat ;
          schema:image/schema:license ?imageLicense .

        # Creator
        ?heritageObject schema:creator/schema:name ?creatorName .

        # Publisher
        ?heritageObject schema:publisher/schema:name ?publisherName .
        OPTIONAL { ?heritageObject schema:publisher/schema:mainEntityOfPage ?publisherHomepage }
      }`;
    return fetchQuery(query);
  }
}
