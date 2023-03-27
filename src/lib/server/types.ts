import type { ad, Prisma } from '@prisma/client';

export type AdPosting = ad & {
  building: {
    id: number;
    street: string;
    houseNumber: string;
    maxFloors: number | null;
  };
  photo: {
    key: string;
  }[];
};

export type BuildingGeoJSON = {
  id: number;
  geojson: Prisma.JsonValue;
};
