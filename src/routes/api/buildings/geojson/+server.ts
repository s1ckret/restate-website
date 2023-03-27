import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/prisma';

export const GET = (async () => {
  const geojsons = await prisma.building.findMany({
    select: {
      id: true,
      geojson: true
    }
  });
  return new Response(JSON.stringify(geojsons), { status: 200 });
}) satisfies RequestHandler;
