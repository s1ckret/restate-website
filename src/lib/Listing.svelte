<script lang="ts">
  import AdCard from './AdCard.svelte';
  import Pagination from './Pagination.svelte';
  import type { AdPosting } from './server/types';
  import { page } from '$app/stores';

  let currentPage = Number($page.url.searchParams.get('page') ?? '1');
  let oldAds: AdPosting[] = [];

  const fetchAds = async (): Promise<AdPosting[]> => {
    const ads = await fetch(`/api/ads?limit=2&page=${currentPage}`);
    const response = await ads.json();
    oldAds = response as AdPosting[];
    return response;
  };

  const fetchPages = async (): Promise<number> => {
    const ads = await fetch(`/api/ads/pages?size=2`);
    const response = await ads.json();
    return response;
  };

  const pagesPromise = fetchPages();
</script>

{#key currentPage}
  <p>{currentPage}</p>
  {#await fetchAds()}
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

{#await pagesPromise}
  <p>Loading...</p>
{:then pages}
  <div class="container" style="margin-top: 2.5rem!important;">
    <Pagination {pages} bind:currentPage />
  </div>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
