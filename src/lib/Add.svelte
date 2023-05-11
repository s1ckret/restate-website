<script lang="ts">
    import AdCard from './AdCard.svelte';
    import Pagination from './Pagination.svelte';
    import type { AdPosting } from './server/types';
    import { page } from '$app/stores';
    import AdExpanded from './AdExpanded.svelte';
    import { each } from 'svelte/internal';
  
    const buildingId = Number($page.url.searchParams.get('buildingId')??'0');
    
    let ad: AdPosting;
    const fetchAds = async (buildingId: number | null): Promise<AdPosting> => {
        console.log(ad);
        if (buildingId) {
        const ads = await fetch(`/api/ads/expanded?limit=2&buildingId=${buildingId}`);
        const response = await ads.json();
        console.log(response);
        return response;
      } else {
        const ads = await fetch(`/api/ads/expanded?limit=2`);
        const response = await ads.json();
        ad = response as AdPosting;
        return response;
      }
    };
  
  </script>
  
  {#key buildingId}
    {#await fetchAds(buildingId)}
    {:then ads} {#if ad=ads }
    <AdExpanded {ad} imageUrls={ad.photo.map((it) => it.key)} />
      
    {/if }
    {:catch error}
      <p style="color: red">{error.message}</p>
    {/await}
  
    {/key}
  
  
  
  <style>

  </style>
  