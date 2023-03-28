<script lang="ts">
  import { onMount } from 'svelte';
  import type { BuildingGeoJSON } from './server/types';

  export let onClick: (id: number) => void = (id) => {
    console.log(id);
  };

  const fetchGeojsons = async (): Promise<BuildingGeoJSON[]> => {
    const geojsons = await fetch('/api/buildings/geojson');
    const response = await geojsons.json();
    return response;
  };

  onMount(async () => {
    const buildings = await fetchGeojsons();
    if (typeof window !== 'undefined') {
      const mapLib = await import('./map.client');
      mapLib.create('map', { center: [49.98851927159875, 36.25307152594603], zoom: 12 });
      buildings.forEach((it) => mapLib.addGeoJSON(it.id, it.geojson, onClick));
    }
  });
</script>

<div id="map" style="height: 86vh;" />

<style>
  #map {
    width: 100%;
    height: 100%;
  }
</style>
