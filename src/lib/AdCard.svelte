<script>
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';

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
                class="cb is-left button is-light is-small is-rounded"
                type="button"
                slot="prev"
                on:click={showPrevPage}
              >
                &LongLeftArrow;
              </button>
              <!-- {#each items as item, i (item.name)} -->
              <img src="https://bulma.io/images/placeholders/128x128.png" alt="Placeholder image" />
              <img src="https://bulma.io/images/placeholders/128x128.png" alt="Placeholder image" />
              <img src="https://bulma.io/images/placeholders/128x128.png" alt="Placeholder image" />
              <!-- {/each} -->
              <button
                class="cb is-right button is-light is-small is-rounded"
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
        <p class="title is-4">[333819] Продається 3-кімнатна квартира Захисників України</p>
        <p class="subtitle mb-2">провулок Іскринський 19</p>
        <div class="columns is-multiline is-gapless">
          <div class="column is-full"><p>💵 95000 $</p></div>
          <div class="column is-full"><p>#️⃣ 3 кімнати</p></div>
          <div class="column is-full"><p>🔲 96.0м²</p></div>
          <div class="column is-full"><p>📶 Поверх: 1/16</p></div>
        </div>
        <p class="subtitle is-7 mt-3 mb-0 has-text-left">
          Створено: <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
        </p>
        <p class="subtitle is-7 mb-3 has-text-left">
          Знайдено: <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
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
