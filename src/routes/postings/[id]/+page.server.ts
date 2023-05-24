import { prisma } from '$lib/server/prisma';

export async function load({ params }) {
  console.log(params.id);
  const id = parseInt(params.id);
  return {
    posting: await prisma.ad.findFirst({
      include: {
        building: {
          select: {
            street: true,
            houseNumber: true,
            maxFloors: true
          }
        },
        photo: {
          select: {
            key: true
          }
        }
      },
      where: { id: id }
    })
  };
}
