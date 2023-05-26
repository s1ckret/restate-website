<script>
  export let text;
  export let currentTab;
  let activeClass = '';

  $: setActiveClass(currentTab);

  function setActiveClass(a) {
    if (a === text) {
      activeClass = 'is-active';
    } else {
      activeClass = '';
    }
  }
</script>

<li class={activeClass}>
  <a
    on:click={() => {
      currentTab = text;
    }}
  >
    <span>{text}</span>
  </a>
</li>
