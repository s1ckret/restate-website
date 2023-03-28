<script lang="ts">
  import { goto } from '$app/navigation';

  export let pages = 1;
  export let currentPage = 1;
  export let buildingId: number | null = null;
  let minPage = 1;
  let maxPage = pages;

  $: setUrl(currentPage, buildingId), refreshHrefs(currentPage, buildingId);

  function setUrl(currentPage: number, buildingId: number | null) {
    let query = new URLSearchParams();

    query.set('page', `${currentPage}`);
    if (buildingId) {
      query.set('buildingId', `${buildingId}`);
    }

    goto(`?${query.toString()}`, { replaceState: true });
  }

  let previousButtonDisabled = false;
  let nextButtonDisabled = false;
  let leftPageCssClass = '';
  let rightPageCssClass = '';
  let leftJumpCssClass = '';
  let rightJumpCssClass = '';

  let hrefNext = '';
  let hrefPrev = '';
  let hrefMinPage = '';
  let hrefMaxPage = '';

  function refreshHrefs(currentPage: number, buildingId: number | null) {
    hrefNext = buildingId
      ? `/map?buildingId=${buildingId}&page=${currentPage + 1}`
      : `/map?page=${currentPage + 1}`;

    hrefPrev = buildingId
      ? `/map?buildingId=${buildingId}&page=${currentPage - 1}`
      : `/map?page=${currentPage - 1}`;

    hrefMinPage = buildingId
      ? `/map?buildingId=${buildingId}&page=${minPage}`
      : `/map?page=${minPage}`;

    hrefMaxPage = buildingId
      ? `/map?buildingId=${buildingId}&page=${maxPage}`
      : `/map?page=${maxPage}`;
  }

  refreshButtons();

  function previousPage() {
    if (previousButtonDisabled) return;
    currentPage -= 1;
    refreshButtons();
  }

  function nextPage() {
    if (nextButtonDisabled) return;
    currentPage += 1;
    refreshButtons();
  }

  function goToPage(page: number) {
    currentPage = page;
    refreshButtons();
  }

  function refreshButtons() {
    previousButtonDisabled = currentPage <= minPage;
    nextButtonDisabled = currentPage >= maxPage;
    const leftPageVisible = currentPage > minPage;
    const rightPageVisible = currentPage < maxPage;
    const leftJumpVisible = currentPage >= minPage + 2;
    const rightJumpVisible = currentPage <= maxPage - 2;

    leftPageCssClass = leftPageVisible ? '' : 'is-invisible';
    rightPageCssClass = rightPageVisible ? '' : 'is-invisible';
    leftJumpCssClass = leftJumpVisible ? '' : 'is-invisible';
    rightJumpCssClass = rightJumpVisible ? '' : 'is-invisible';
  }
</script>

{#key pages}
  <nav class="pagination is-centered">
    <ul class="pagination-list">
      <li>
        {#if !previousButtonDisabled}
          <a class="pagination-previous" href={hrefPrev} on:click={previousPage}>Previous</a>
        {:else}
          <p class="pagination-previous is-disabled" title="This is the first page">Previous</p>
        {/if}
      </li>

      <li>
        <a
          class="pagination-link {leftJumpCssClass}"
          href={hrefMinPage}
          on:click={() => goToPage(minPage)}
          aria-label="Goto page {minPage}">{minPage}</a
        >
      </li>
      <li><span class="pagination-ellipsis {leftJumpCssClass}">&hellip;</span></li>

      <li>
        <a class="pagination-link {leftPageCssClass}" on:click={previousPage} href={hrefPrev}
          >{currentPage - 1}</a
        >
      </li>

      <li>
        <p class="pagination-link is-current">{currentPage}</p>
      </li>

      <li>
        <a
          class="pagination-link {rightPageCssClass}"
          href={hrefNext}
          on:click={nextPage}
          aria-label="Goto page {currentPage + 1}">{currentPage + 1}</a
        >
      </li>

      <li><span class="pagination-ellipsis {rightJumpCssClass}">&hellip;</span></li>
      <li>
        <a
          class="pagination-link {rightJumpCssClass}"
          href={hrefMaxPage}
          on:click={() => goToPage(maxPage)}
          aria-label="Goto page {maxPage}">{maxPage}</a
        >
      </li>

      {#if !nextButtonDisabled}
        <li>
          <a class="pagination-next" href={hrefNext} on:click={nextPage}>Next page</a>
        </li>
      {:else}
        <li>
          <p class="pagination-next is-disabled" title="This is the last page">Next page</p>
        </li>
      {/if}
    </ul>
  </nav>
{/key}

<style>
  .is-disabled {
    background-color: #dbdbdb;
    border-color: #dbdbdb;
    box-shadow: none;
    color: #7a7a7a;
    opacity: 0.5;
  }

  .is-invisible {
    visibility: hidden;
  }
</style>
