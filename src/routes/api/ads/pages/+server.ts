import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/prisma';

export const GET = (async ({ url }) => {
  const size = Number(url.searchParams.get('size') ?? '2');
  const ads = await prisma.ad.count();
  const pages = Math.floor(ads / size);
  return new Response(JSON.stringify(pages), { status: 200 });
}) satisfies RequestHandler;
