<script lang="ts">
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  import type { PageServerData } from '../$types';

  export let data: PageServerData;
  let { posting } = data;
  let imageUrls = posting.photo.map((it) => it.key);

  let Carousel: any;
  onMount(async () => {
    const module = await import('svelte-carousel');
    Carousel = module.default;
  });
</script>

<div class="container">
  <div class="columns">
    <div class="column is-half">
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
    <div class="column is-half">
      <p class="title is-4">{posting?.title}</p>
      <p class="subtitle mb-2">{posting?.building.street} {posting?.building.houseNumber}</p>
      <div class="columns is-multiline is-gapless">
        <div class="column is-full"><p>💵 {posting?.price} {posting?.currency}</p></div>
        <div class="column is-full"><p>#️⃣ {posting?.roomQty} кімнати</p></div>
        <div class="column is-full"><p>🔲 {posting?.totalArea}м²</p></div>
        <div class="column is-full">
          <p>📶 Поверх: {posting?.atFloor}/{posting?.building.maxFloors}</p>
        </div>
      </div>
      <p class="subtitle is-7 mt-3 mb-0 has-text-left">
        Створено: <time datetime="2016-1-1"
          >{new Date(posting?.postedAtSec * 1000).toLocaleString()}</time
        >
      </p>
      <p class="subtitle is-7 mb-3 has-text-left">
        Знайдено: <time datetime="2016-1-1"
          >{new Date(posting?.foundAtSec * 1000).toLocaleString()}</time
        >
      </p>
    </div>
  </div>
</div>

<style>
  .image {
    width: 70vh;
    height: 70vh;
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
