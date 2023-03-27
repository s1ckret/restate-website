<script>
  import Carousel from 'svelte-carousel';
</script>

<div class="card">
  <div class="card-content">
    <div class="media">
      <div class="media-left">
        <figure class="image">
          <img src="https://bulma.io/images/placeholders/128x128.png" alt="Placeholder image" />
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
</style>
