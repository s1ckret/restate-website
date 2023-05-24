import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/prisma';

export const GET = (async ({ url }) => {
  const size = Number(url.searchParams.get('size') ?? '2');
  const buildingId = Number(url.searchParams.get('buildingId') ?? '0');
  if (buildingId <= 0) {
    const postings = await prisma.ad.count();
    const pages = Math.floor(postings / size);
    return new Response(JSON.stringify(pages), { status: 200 });
  } else {
    const postings = await prisma.ad.count({ where: { buildingId: buildingId } });
    const pages = Math.floor(postings / size);
    return new Response(JSON.stringify(pages), { status: 200 });
  }
}) satisfies RequestHandler;
