import L, { Map, Marker, TileLayer } from 'leaflet';
import type { MapOptions } from 'leaflet';

type CreateMapFn = (mapId: string, options: MapOptions) => Map | null;

const createMap: CreateMapFn = (mapId, options) => {
  // Initialize the map
  const map = L.map(mapId, options);

  // Add a tile layer to the map
  const tileLayerUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const tileLayerAttribution =
    '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors';
  const tileLayer: TileLayer = L.tileLayer(tileLayerUrl, {
    attribution: tileLayerAttribution
  });
  tileLayer.addTo(map);

  // Add a marker to the map
  const marker: Marker = L.marker([51.5, -0.09]);
  marker.bindPopup('<b>Hello world!</b><br>I am a popup.').openPopup();
  marker.addTo(map);

  return map;
};

export default createMap;
