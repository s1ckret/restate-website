import type { ad, Prisma } from '@prisma/client';

export type Posting = ad & {
  building: {
    id: number;
    street: string;
    houseNumber: string;
    maxFloors: number | null;
    lat: number;
    lon: number;
  };
  photo: {
    key: string;
  }[];
};

export type BuildingGeoJSON = {
  id: number;
  geojson: Prisma.JsonValue;
};
