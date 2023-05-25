<script lang="ts">
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  import type { Posting } from './server/types';

  export let ad: Posting;
  export let imageUrls: string[];
  let shownOnMap = false;
  let marker: any;

  let Carousel: any;
  onMount(async () => {
    const module = await import('svelte-carousel');
    Carousel = module.default;
  });

  async function showOnMap() {
    const mapLib = await import('./map.client');
    marker = mapLib.showOnMap(ad.building.lat, ad.building.lon);
    shownOnMap = true;
  }

  async function hideMarker() {
    shownOnMap = false;
    const mapLib = await import('./map.client');
    mapLib.hideMarker(marker);
  }
</script>

<div class="card">
  <div class="card-content">
    <div class="media">
      <div class="media-left">
        <figure class="image is-align-content-center">
          {#if browser}
            {#key imageUrls}
              <svelte:component
                this={Carousel}
                let:showPrevPage
                let:showNextPage
                autoplay
                autoplayDuration={5000}
                autoplayProgressVisible
                pauseOnFocus
              >
                <button
                  class="cb is-left button is-link is-small is-rounded"
                  type="button"
                  slot="prev"
                  on:click={showPrevPage}
                >
                  &LongLeftArrow;
                </button>
                {#each imageUrls as url}
                  <img
                    class="image"
                    src={`https://restate-photos.s3.eu-north-1.amazonaws.com/${url}`}
                  />
                {/each}
                <button
                  class="cb is-right button is-link is-small is-rounded"
                  type="button"
                  slot="next"
                  on:click={showNextPage}
                >
                  &LongRightArrow;
                </button>
              </svelte:component>
            {/key}
          {/if}
        </figure>
      </div>
      <div class="media-content">
        <p class="title is-4">{ad.title}</p>
        <p class="subtitle mb-2">{ad.building.street} {ad.building.houseNumber}</p>
        <div class="columns is-multiline is-gapless">
          <div class="column is-full"><p>💵 {ad.price} {ad.currency}</p></div>
          <div class="column is-full"><p>#️⃣ {ad.roomQty} кімнати</p></div>
          <div class="column is-full"><p>🔲 {ad.totalArea}м²</p></div>
          <div class="column is-full"><p>📶 Поверх: {ad.atFloor}/{ad.building.maxFloors}</p></div>
        </div>
        <p class="subtitle is-7 mt-3 mb-0 has-text-left">
          Створено: <time datetime="2016-1-1"
            >{new Date(ad.postedAtSec * 1000).toLocaleString()}</time
          >
        </p>
        <p class="subtitle is-7 mb-3 has-text-left">
          Знайдено: <time datetime="2016-1-1"
            >{new Date(ad.foundAtSec * 1000).toLocaleString()}</time
          >
        </p>
        <div class="container">
          <div class="field is-grouped mb-2">
            <!-- <p class="control">
              <button class="button is-danger">Favorite</button>
            </p> -->
            <p class="control">
              <a class="button is-link" target="_blank" href="/postings/{ad.id}">Open in new tab</a>
            </p>
            <p class="control">
              {#if shownOnMap}
                <button class="button" on:click={hideMarker}>Hide marker</button>
              {:else}
                <button class="button" on:click={showOnMap}>Show on Map</button>
              {/if}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .image {
    width: 300px;
    height: 300px;
  }

  .card {
    margin-top: 0.75rem;
  }

  .field.is-grouped {
    justify-content: flex-end !important;
  }

  .cb {
    position: absolute;
    top: 50%;
    z-index: 999;
    transform: translateY(-50%);
    width: 16px;
  }

  .is-left {
    left: 0;
  }

  .is-right {
    right: 0;
  }
</style>
