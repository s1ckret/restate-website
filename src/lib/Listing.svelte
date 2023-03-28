<script lang="ts">
  import AdCard from './AdCard.svelte';
  import Pagination from './Pagination.svelte';
  import type { AdPosting } from './server/types';
  import { page } from '$app/stores';

  export let buildingId: number | null = null;
  let previousBuildingId: number | null = null;
  $: onBuildingIdChange(buildingId);

  function onBuildingIdChange(newId: number | null) {
    if (previousBuildingId === null) {
      rememberPage = Number($page.url.searchParams.get('page') ?? '1');
    }

    if (newId) {
      currentPage = 1;
    } else if (previousBuildingId) {
      currentPage = rememberPage;
    }
    previousBuildingId = newId;
  }

  let currentPage = Number($page.url.searchParams.get('page') ?? '1');
  let rememberPage = Number(
    $page.url.searchParams.get('buildingId') ? '1' : $page.url.searchParams.get('page') ?? '1'
  );
  let oldAds: AdPosting[] = [];

  const fetchAds = async (buildingId: number | null): Promise<AdPosting[]> => {
    if (buildingId) {
      const ads = await fetch(`/api/ads?limit=2&page=${currentPage}&buildingId=${buildingId}`);
      const response = await ads.json();
      console.log(response);
      return response;
    } else {
      const ads = await fetch(`/api/ads?limit=2&page=${currentPage}`);
      const response = await ads.json();
      oldAds = response as AdPosting[];
      return response;
    }
  };

  const fetchPages = async (buildingId: number | null): Promise<number> => {
    if (buildingId) {
      const ads = await fetch(`/api/ads/pages?size=2&buildingId=${buildingId}`);
      const response = await ads.json();
      return response;
    } else {
      const ads = await fetch(`/api/ads/pages?size=2`);
      const response = await ads.json();
      return response;
    }
  };
</script>

{#key currentPage}
  {#await fetchAds(buildingId)}
    {#each oldAds as ad}
      <AdCard {ad} imageUrls={ad.photo.map((it) => it.key)} />
    {/each}
  {:then ads}
    {#each ads as ad}
      <AdCard {ad} imageUrls={ad.photo.map((it) => it.key)} />
    {/each}
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
{/key}

{#await fetchPages(buildingId) then pages}
  <div class="container" style="margin-top: 2.5rem!important;">
    {#if buildingId}
      <button
        class="button is-link back"
        on:click={() => {
          buildingId = null;
        }}>Back</button
      >
    {/if}
    <Pagination {pages} bind:currentPage {buildingId} />
  </div>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}

<style>
  .back {
    position: absolute;
    z-index: 999;
    bottom: 0;
    left: 10vh;
  }
</style>
