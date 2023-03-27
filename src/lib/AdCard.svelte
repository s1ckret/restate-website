<script lang="ts">
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';

  export let title: string;
  export let price: number;
  export let currency: string;
  export let roomQty: number;
  export let area: number;
  export let atFloor: number;
  export let maxFloor: number | null;
  export let street: string;
  export let houseNumber: string;
  export let foundAt: number;
  export let postedAt: number;
  export let imageUrls: string[];

  let Carousel;
  onMount(async () => {
    const module = await import('svelte-carousel');
    Carousel = module.default;
  });

  const items = [
    {
      name: 'Leonardo',
      age: 26,
      location: 'Italy'
    },
    {
      name: 'Maria',
      age: 27,
      location: 'Brazil'
    },
    {
      name: 'Oliver',
      age: 28,
      location: 'United States'
    },
    {
      name: 'Margarida',
      age: 29,
      location: 'Portugal'
    }
  ];
</script>

<div class="card">
  <div class="card-content">
    <div class="media">
      <div class="media-left">
        <figure class="image is-align-content-center">
          {#if browser}
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
          {/if}
        </figure>
      </div>
      <div class="media-content">
        <p class="title is-4">{title}</p>
        <p class="subtitle mb-2">{street} {houseNumber}</p>
        <div class="columns is-multiline is-gapless">
          <div class="column is-full"><p>💵 {price} {currency}</p></div>
          <div class="column is-full"><p>#️⃣ {roomQty} кімнати</p></div>
          <div class="column is-full"><p>🔲 {area}м²</p></div>
          <div class="column is-full"><p>📶 Поверх: {atFloor}/{maxFloor}</p></div>
        </div>
        <p class="subtitle is-7 mt-3 mb-0 has-text-left">
          Створено: <time datetime="2016-1-1">{new Date(postedAt).toLocaleString()}</time>
        </p>
        <p class="subtitle is-7 mb-3 has-text-left">
          Знайдено: <time datetime="2016-1-1">{new Date(foundAt).toLocaleString()}</time>
        </p>
        <div class="container">
          <div class="field is-grouped mb-2">
            <!-- <p class="control">
              <button class="button is-danger">Favorite</button>
            </p> -->
            <p class="control">
              <button class="button is-link">Open in new tab</button>
            </p>
            <p class="control">
              <button class="button">Show on Map</button>
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
