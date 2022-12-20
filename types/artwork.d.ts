interface Namespaces {
  creator?: string,
  image?: string,
  province?: string,
  contentLocation?: string,
  temporalCoverage?: string
}

interface Painting extends Namespaces {
  name?: string
}

interface Church extends Namespaces {
  identifier?: string,
  description?: string,
  locationName?: string,
  provinceName?: string
}

declare interface ArtworkResponse extends Painting, Church {
  heritageObject: string,
  dateCreated?: string,
  creatorName?: string,
  imageContentUrl?: string,
  imageLicense?: string,
  imageEncodingFormat?: string,
};

declare interface ArtProperties extends Record<string, any> {};

declare interface Artwork {
  id: string,
  originalId: string,
  categoryId: string,
  title?: string,
  description?: string,
  image?: string,
  properties: ArtProperties
}
