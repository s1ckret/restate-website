<script lang="ts">
  import { onMount } from 'svelte';
  import type { Map } from 'leaflet';

  // import createMap from './map.client';

  const MAP_ID = 'map';

  onMount(async () => {
    if (typeof window !== 'undefined') {
      const createMap = await import('./map.client');
      const map: Map | null = createMap.default(MAP_ID, { center: [51.505, -0.09], zoom: 13 });
    }
  });
</script>

<link
  rel="stylesheet"
  href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
  integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
  crossorigin=""
/>

<div class="columns is-gapless">
  <div class="column is-one-third" />
  <div class="column is-two-thirds">
    <div id="map" style="height: 100vh;" />
  </div>
</div>

<style>
  #map {
    width: 100%;
    height: 100%;
  }

  .columns {
    width: 100%;
    margin: 0;
  }
</style>
