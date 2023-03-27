import type { PageLoad } from './$types';
import type { AdPosting, BuildingGeoJSON } from '$lib/server/types';

export const load = (({ url, fetch }) => {
  const page = Number(url.searchParams.get('page') ?? '0');

  const fetchGeojsons = async (): Promise<BuildingGeoJSON[]> => {
    const geojsons = await fetch('/api/buildings/geojson');
    const response = await geojsons.json();
    return response;
  };
  const fetchAdsFirstPage = async (): Promise<AdPosting[]> => {
    const ads = await fetch(`/api/ads?limit=2&page=${page}`);
    const response = await ads.json();
    return response;
  };
  const fetchPages = async (): Promise<number> => {
    const ads = await fetch(`/api/ads/pages?size=2`);
    const response = await ads.json();
    console.log(response);
    return response;
  };
  return {
    buildings: fetchGeojsons(),
    ads: fetchAdsFirstPage(),
    pages: fetchPages(),
    page: page
  };
}) satisfies PageLoad;
