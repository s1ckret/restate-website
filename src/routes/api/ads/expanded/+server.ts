import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/prisma';

export const GET = (async ({ url }) => {
  const limit = Number(url.searchParams.get('limit') ?? '2');
  const buildingId = Number(url.searchParams.get('buildingId') ?? '0');
 

  if (limit <= 0 || limit > 20) {
    return new Response(`Limit parameter should be in range [1, 20]!`, { status: 400 });
  }

  if (url.searchParams.get('buildingId') && buildingId <= 0) {
    return new Response(`BuildingId parameter should be positive!`, { status: 400 });
  }
  
  try {
    
    let ads;
    if(buildingId!=0){
    ads = await getPageByBuildingId(limit, buildingId);
  }
  else {
    
    ads = null;
  }
    return new Response(JSON.stringify(ads), { status: 200 });
  } catch (e) {
    
    if (e instanceof Error) {
      return new Response(e.message, { status: 400 });
    }
    return new Response('Internal server error', { status: 500 });
  }
}) satisfies RequestHandler;

async function getPageByBuildingId(limit: number, buildingId: number) {
  
  return await prisma.ad.findFirst({
    include: {
      building: {
        select: {
          id: true,
          street: true,
          houseNumber: true,
          maxFloors: true,
          lat: true,
          lon: true
        }
      },
      photo: {
        select: {
          key: true
        }
      }
    },
    where: { buildingId: buildingId },
    take: limit
  });
}
