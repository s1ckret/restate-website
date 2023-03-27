<script lang="ts">
  import type { PageData } from './$types';
  import { onMount } from 'svelte';
  import AdCard from '../../lib/AdCard.svelte';
  import Pagination from '$lib/Pagination.svelte';

  export let data: PageData;

  $: ({ buildings } = data);

  onMount(async () => {
    if (typeof window !== 'undefined') {
      const mapLib = await import('./map.client');
      mapLib.create('map', { center: [49.98851927159875, 36.25307152594603], zoom: 13 });
      buildings.forEach((it) => mapLib.addGeoJSON(it.id, it.geojson));
    }
  });
</script>

<link
  rel="stylesheet"
  href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
  integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
  crossorigin=""
/>

<div class="columns is-variable is-6">
  <div class="column is-one-half" style="height: 86vh;">
    <AdCard />
    <AdCard />
    <div class="container" style="margin-top: 2.5rem!important;">
      <Pagination />
    </div>
  </div>

  <div class="column is-one-half p-0">
    <div id="map" style="height: 86vh;" />
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

  .column {
    overflow-y: auto;
  }
</style>
