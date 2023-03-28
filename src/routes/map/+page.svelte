<script lang="ts">
  import Map from '$lib/Map.svelte';
  import Listing from '$lib/Listing.svelte';
  import { page } from '$app/stores';

  let buildingId: number | null = $page.url.searchParams.get('buildingId')
    ? Number($page.url.searchParams.get('buildingId'))
    : null;
</script>

<link
  rel="stylesheet"
  href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
  integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
  crossorigin=""
/>

<div class="columns is-variable is-6">
  <div class="column is-one-half" style="height: 86vh;">
    <Listing bind:buildingId />
  </div>

  <div class="column is-one-half p-0">
    <Map
      onClick={(id) => {
        buildingId = id;
      }}
    />
  </div>
</div>

<style>
  .columns {
    width: 100%;
    margin: 0;
  }

  .column {
    overflow-y: auto;
  }
</style>
