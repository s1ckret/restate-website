import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/prisma';

export const GET = (async ({ url }) => {
  const page = Number(url.searchParams.get('page') ?? '1');
  const limit = Number(url.searchParams.get('limit') ?? '2');
  const buildingId = Number(url.searchParams.get('buildingId') ?? '0');

  if (page < 1) {
    throw new Error(`Page parameter should be positive!`);
  }

  if (limit <= 0 || limit > 20) {
    return new Response(`Limit parameter should be in range [1, 20]!`, { status: 400 });
  }

  if (url.searchParams.get('buildingId') && buildingId <= 0) {
    return new Response(`BuildingId parameter should be positive!`, { status: 400 });
  }

  try {
    let ads;
    if (buildingId != 0) {
      ads = await getPageByBuildingId(page - 1, limit, buildingId);
    } else {
      ads = await getPage(page - 1, limit);
    }
    return new Response(JSON.stringify(ads), { status: 200 });
  } catch (e) {
    if (e instanceof Error) {
      return new Response(e.message, { status: 400 });
    }
    return new Response('Internal server error', { status: 500 });
  }
}) satisfies RequestHandler;

async function getPage(page: number, limit: number) {
  const adCount = await prisma.ad.count();
  const pages = Math.floor(adCount / limit);

  if (page < 0 || page > pages) {
    throw new Error(`Page parameter should be in range [1, ${pages + 1}]!`);
  }

  const firstId = 1 + page * limit;
  const lastId = firstId + limit;

  const range = (start: number, end: number) =>
    Array.from({ length: end - start }, (v, k) => k + start);

  const ads = await prisma.ad.findMany({
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
    where: {
      id: {
        in: range(firstId, lastId)
      }
    }
  });

  return ads;
}

async function getPageByBuildingId(page: number, limit: number, buildingId: number) {
  const adCount = await prisma.ad.count({ where: { buildingId: buildingId } });
  const pages = Math.floor(adCount / limit);

  if (page < 0 || page > pages) {
    throw new Error(`Page parameter should be in range [1, ${pages + 1}]!`);
  }

  return await prisma.ad.findMany({
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
    skip: page * limit,
    take: limit
  });
}
