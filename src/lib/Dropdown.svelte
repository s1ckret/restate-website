<script>
  export let modelKeyToName;
  export let selected;
  let selectedName = 'Select detection model...';
</script>

<div class="dropdown is-hoverable">
  <div class="dropdown-trigger">
    <button class="button" aria-haspopup="true" aria-controls="dropdown-menu2">
      <span>{selectedName}</span>
      <span class="icon is-small">
        <i class="fas fa-angle-down" aria-hidden="true" />
      </span>
    </button>
  </div>
  <div class="dropdown-menu" id="dropdown-menu2" role="menu">
    <div class="dropdown-content">
      {#each Object.entries(modelKeyToName) as [modelKey, modelName]}
        {#if modelKey === selected}
          <div class="dropdown-item selected">
            <p>{modelName}</p>
          </div>
        {:else}
          <button
            class="dropdown-item"
            on:click={() => {
              selected = modelKey;
              selectedName = modelName;
            }}
          >
            {modelName}
          </button>
        {/if}
        <hr class="dropdown-divider" />
      {/each}
    </div>
  </div>
</div>

<style>
  .dropdown {
    width: 100%;
  }

  .dropdown-trigger {
    width: 100%;
  }

  .dropdown-menu {
    width: 100%;
  }

  .button {
    width: 100%;
    justify-content: space-between;
    text-align: left;
  }

  .dropdown-content {
    padding: 0;
  }

  .dropdown-item {
    cursor: pointer;
    background-color: white;
    border-width: 0;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }

  .dropdown-item:hover {
    background-color: #f5f5f5;
  }

  .selected {
    background-color: #eee !important;
  }
  .dropdown-divider {
    margin: 0;
  }

  .dropdown-divider:last-child {
    display: none;
  }
</style>
