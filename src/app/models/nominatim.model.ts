export interface NominatimResult {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: string;
  boundingbox: [string, string, string, string];
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
  place_rank: number;
  addresstype: string;
  name: string;
  icon?: string;
  address?: NominatimAddress;
  extratags?: NominatimExtraTags;
}

interface NominatimAddress {
  city?: string;
  state_district?: string;
  state?: string;
  postcode?: string;
  country: string;
  country_code: string;
}

interface NominatimExtraTags {
  capital?: string;
  website?: string;
  wikidata?: string;
  wikipedia?: string;
  population?: string;
}
