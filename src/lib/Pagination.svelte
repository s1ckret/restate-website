<script lang="ts">
  let pages = 100;
  let minPage = 1;
  let maxPage = pages;
  let currentPage = 1;
  let previousButtonDisabled = false;
  let nextButtonDisabled = false;

  let leftPageVisible = false;
  let rightPageVisible = false;

  let leftJumpVisible = false;
  let rightJumpVisible = false;

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
    leftPageVisible = currentPage > minPage;
    rightPageVisible = currentPage < maxPage;
    leftJumpVisible = currentPage >= minPage + 2;
    rightJumpVisible = currentPage <= maxPage - 2;
  }
</script>

<nav class="pagination is-centered" role="navigation" aria-label="pagination">
  <ul class="pagination-list">
    {#if !previousButtonDisabled}
      <li><a class="pagination-previous" on:click={previousPage}>Previous</a></li>
    {:else}
      <li>
        <a
          class="pagination-previous is-disabled"
          title="This is the first page"
          on:click={previousPage}>Previous</a
        >
      </li>
    {/if}

    {#if leftJumpVisible}
      <li>
        <a
          class="pagination-link"
          on:click={() => goToPage(minPage)}
          aria-label="Goto page {minPage}">{minPage}</a
        >
      </li>
      <li><span class="pagination-ellipsis">&hellip;</span></li>
    {:else}
      <li><a class="pagination-link is-invisible">{minPage}</a></li>
      <li><span class="pagination-ellipsis is-invisible">&hellip;</span></li>
    {/if}

    {#if leftPageVisible}
      <li>
        <a class="pagination-link" on:click={previousPage} aria-label="Goto page {currentPage - 1}"
          >{currentPage - 1}</a
        >
      </li>
    {:else}
      <li><a class="pagination-link is-invisible">{currentPage - 1}</a></li>
    {/if}

    <li>
      <a class="pagination-link is-current" aria-label="Page {currentPage}" aria-current="page"
        >{currentPage}</a
      >
    </li>
    {#if rightPageVisible}
      <li>
        <a class="pagination-link" on:click={nextPage} aria-label="Goto page {currentPage + 1}"
          >{currentPage + 1}</a
        >
      </li>
    {:else}
      <li>
        <a class="pagination-link is-invisible">{currentPage + 1}</a>
      </li>
    {/if}

    {#if rightJumpVisible}
      <li><span class="pagination-ellipsis">&hellip;</span></li>
      <li>
        <a
          class="pagination-link"
          on:click={() => goToPage(maxPage)}
          aria-label="Goto page {maxPage}">{maxPage}</a
        >
      </li>
    {:else}
      <li><span class="pagination-ellipsis is-invisible">&hellip;</span></li>
      <li>
        <a class="pagination-link is-invisible">{maxPage}</a>
      </li>
    {/if}

    {#if !nextButtonDisabled}
      <li><a class="pagination-next" on:click={nextPage}>Next page</a></li>
    {:else}
      <li>
        <a class="pagination-next is-disabled" title="This is the last page" on:click={nextPage}
          >Next page</a
        >
      </li>
    {/if}
  </ul>
</nav>

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
