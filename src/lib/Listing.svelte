<script lang="ts">
  import FlatPosting from './FlatPosting.svelte';
  import Pagination from './Pagination.svelte';
  import type { Posting } from './server/types';
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
  let oldAds: Posting[] = [];

  const fetchAds = async (buildingId: number | null): Promise<Posting[]> => {
    if (buildingId) {
      const postings = await fetch(
        `/api/postings?limit=2&page=${currentPage}&buildingId=${buildingId}`
      );
      const response = await postings.json();
      console.log(response);
      return response;
    } else {
      const postings = await fetch(`/api/postings?limit=2&page=${currentPage}`);
      const response = await postings.json();
      oldAds = response as Posting[];
      return response;
    }
  };

  const fetchPages = async (buildingId: number | null): Promise<number> => {
    if (buildingId) {
      const postings = await fetch(`/api/postings/pages?size=2&buildingId=${buildingId}`);
      const response = await postings.json();
      return response;
    } else {
      const postings = await fetch(`/api/postings/pages?size=2`);
      const response = await postings.json();
      return response;
    }
  };
</script>

{#key currentPage}
  {#await fetchAds(buildingId)}
    {#each oldAds as ad}
      <FlatPosting {ad} imageUrls={ad.photo.map((it) => it.key)} />
    {/each}
  {:then postings}
    {#each postings as ad}
      <FlatPosting {ad} imageUrls={ad.photo.map((it) => it.key)} />
    {/each}
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
{/key}

{#await fetchPages(buildingId) then pages}
  <div class="container" style="margin-top: 1.5rem!important;">
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
