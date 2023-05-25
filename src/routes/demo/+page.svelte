<script>
  import Dropdown from '$lib/Dropdown.svelte';
  import TabButton from '$lib/TabButton.svelte';
  import UploadIcon from '$lib/UploadIcon.svelte';

  export let data;

  let fileInput;
  let imgFile;
  let imgSrc;
  let fileName = '';
  let loadingClass = '';
  let currentTab = 'Results';
  let selectedModelKey;
  let detections;
  let detectedObjects = [];
  let detectionsForTextArea;

  const setImage = (image) => {
    console.log(image);
    imgFile = image;
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (e) => {
      imgSrc = e.target.result;
    };
  };

  const detect = () => {
    loadingClass = 'is-loading';
    let formData = new FormData();
    formData.append('file', imgFile);

    fetch('http://centernet.s1ckret.com/detectors/' + selectedModelKey + '/image', {
      method: 'POST',
      body: formData
    }).then(async (response) => {
      detections = await response.json();
      console.log(detections);
      detectionsForTextArea = JSON.stringify(detections, null, 4);
      detectedObjects = detections['detections'].map((it) => it.label);
      loadingClass = '';
    });
  };
</script>

<div class="container">
  <div class="columns">
    <div class="column is-half">
      {#if imgSrc}
        <div class="flex-center">
          <img class="image" src={imgSrc} on:click={() => fileInput.click()} />
        </div>
      {:else}
        <div class="flex-center">
          <label for="dropzone-file" class="file-drop">
            <div class="upload-icon-wrapper">
              <UploadIcon />
              <p class="upload-text">
                <span class="font-semibold">Click to upload</span> or drag and drop
              </p>
            </div>
          </label>
        </div>
      {/if}

      <div class="file has-name is-fullwidth mt-3">
        <label class="file-label">
          <input
            id="dropzone-file"
            type="file"
            class="hidden"
            accept="image/jpeg, image/png, image/jpg"
            bind:this={fileInput}
            on:change={(e) => {
              fileName = e.target.files[0].name;
              setImage(e.target.files[0]);
            }}
          />
          <span class="file-cta">
            <UploadIcon />
            <span class="file-label"> Choose a file… </span>
          </span>
          <span class="file-name">{fileName}</span>
        </label>
      </div>
    </div>
    <div class="column is-half">
      <h1 class="title is-2">Try out our detection models!</h1>
      <div class="columns">
        <div class="column is-10">
          <Dropdown modelKeyToName={data.modelKeyToName} bind:selected={selectedModelKey} />
        </div>
        <div class="column is-2">
          <button class="button is-success {loadingClass}" on:click={detect}>Detect!</button>
        </div>
      </div>
      {#if selectedModelKey}
        <table class="table">
          <tbody>
            <tr>
              <td><b>Name</b></td>
              <td>{data.modelAbouts[selectedModelKey].metadata.model_name}</td>
            </tr>
            <tr>
              <td><b>Description</b></td>
              <td>{data.modelAbouts[selectedModelKey].metadata.model_description}</td>
            </tr>
            <tr>
              <td><b>Version</b></td>
              <td>{data.modelAbouts[selectedModelKey].metadata.model_version}</td>
            </tr>
            <tr>
              <td><b>Categories</b></td>
              <td>{Object.values(data.modelAbouts[selectedModelKey].id_to_categories)}</td>
            </tr>
          </tbody>
        </table>
      {/if}
      <div class="tabs is-centered is-boxed">
        <ul>
          <TabButton text="Results" bind:currentTab />
          <TabButton text="JSON" bind:currentTab />
        </ul>
      </div>
      {#if currentTab === 'Results'}
        <div class="card">
          <div class="card-content">
            <div class="content">
              <ul>
                {#each detectedObjects as o}
                  <li>{o}</li>
                {/each}
              </ul>
            </div>
          </div>
        </div>
      {:else}
        <div class="card">
          <div class="card-content">
            <textarea
              class="textarea is-success"
              placeholder="JSON"
              readonly
              bind:value={detectionsForTextArea}
            />
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .image {
    width: 70vh;
    height: 70vh;
    border-radius: 4px;
    border-width: 2px;
    border-color: #dbdbdb;
    border-style: dashed;
    cursor: pointer;
  }

  .flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .file-drop {
    display: flex;
    background-color: #f5f5f5;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 70vh;
    height: 70vh;
    border-radius: 0.5rem;
    border-width: 2px;
    border-color: #d1d5db;
    border-style: dashed;
    cursor: pointer;
  }
  .file-drop:hover {
    background-color: #eee;
  }
  .upload-icon-wrapper {
    display: flex;
    padding-top: 1.25rem;
    padding-bottom: 1.5rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .upload-text {
    margin-top: 0.75rem;
    margin-bottom: 0.5rem;
    color: #6b7280;
    font-size: 0.875rem;
    line-height: 1.25rem;
  }
  .hidden {
    display: none;
  }

  .tabs ul {
    border-bottom-color: #dbdbdb;
    border-bottom-style: solid;
    border-bottom-width: 1px;
  }

  .table {
    width: 100%;
  }
</style>
