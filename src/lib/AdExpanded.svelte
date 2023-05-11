<script lang="ts">
    import { browser } from '$app/environment';
    import { onMount } from 'svelte';
    import type { AdPosting } from './server/types';
  
    export let ad: AdPosting;
    export let imageUrls: string[];
  
    let Carousel: any;
    onMount(async () => {
      const module = await import('svelte-carousel');
      Carousel = module.default;
    });
  
    
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
          <p class="title is-1">{ad.title}</p>
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
      margin-right: auto;
      margin-left: auto;
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
    .media{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .media-left{
        display: flex;
        flex-direction: column;
    }
    .media-content{
       display: flex;
       flex-direction: column;
       margin-top: 20px;
       align-items: center;
    }
    
  </style>
  