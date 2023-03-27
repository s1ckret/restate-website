import type { PageLoad } from './$types';
import type { ad, Prisma } from '@prisma/client';
import type { AdPosting, BuildingGeoJSON } from '$lib/server/types';

export const load = (({ fetch }) => {
  const fetchGeojsons = async (): Promise<BuildingGeoJSON[]> => {
    const geojsons = await fetch('/api/buildings/geojson');
    const response = await geojsons.json();
    return response;
  };
  const fetchAdsFirstPage = async (): Promise<AdPosting[]> => {
    const ads = await fetch('/api/ads?limit=2&page=0');
    const response = await ads.json();
    return response;
  };
  return {
    buildings: fetchGeojsons(),
    ads: fetchAdsFirstPage()
  };
}) satisfies PageLoad;
