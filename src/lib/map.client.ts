import L, { Map, Marker, TileLayer } from 'leaflet';
import type { MapOptions } from 'leaflet';

type CreateMapFn = (mapId: string, options: MapOptions) => Map | null;

let map: Map;

const create: CreateMapFn = (mapId, options) => {
  // Initialize the map
  map = L.map(mapId, options);

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

function addGeoJSON(id: number, geojson: any) {
  L.geoJson(geojson, {
    onEachFeature: (feature, layer) => {
      layer.on({
        click: (e) => {
          console.log(id);
        }
      });
    }
  }).addTo(map);
}

export function showOnMap(lat: number, lon: number) {
  const marker = new L.Marker([lat, lon]);
  map.addLayer(marker);
  return marker;
}

export function hideMarker(marker: any) {
  return map.removeLayer(marker);
}

export { create, addGeoJSON };
