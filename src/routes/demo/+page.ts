const fetchModels = async (): Promise<string[]> => {
  const response = await fetch(`http://centernet.s1ckret.com/detectors`);
  const models = await response.json();
  return models;
};

const fetchAbout = async (models: string[]): Promise<any[]> => {
  return await Promise.all(
    models.map((model) =>
      fetch(`http://centernet.s1ckret.com/detectors/` + model)
        // .then(checkStatus)
        .then(async (response) => await response.json())
        .catch((e) => console.log(e))
    )
  );
};

function toKeyToName(modelKeys, modelAbouts) {
  const keyToName = {};
  for (let index = 0; index < modelKeys.length; ++index) {
    const key = modelKeys[index];
    const about = modelAbouts[index];
    keyToName[key] = about.metadata.model_name + ' v' + about.metadata.model_version;
  }
  return keyToName;
}

function toKeyToAbout(modelKeys, modelAbouts) {
  const keyToName = {};
  for (let index = 0; index < modelKeys.length; ++index) {
    const key = modelKeys[index];
    const about = modelAbouts[index];
    keyToName[key] = about;
  }
  return keyToName;
}

export async function load() {
  const models = await fetchModels();
  const about = await fetchAbout(models);
  const modelKeyToName = toKeyToName(models, about);
  const modelKeyToAbout = toKeyToAbout(models, about);
  console.log(modelKeyToAbout);
  return {
    modelKeys: models,
    modelKeyToName: modelKeyToName,
    modelAbouts: modelKeyToAbout
  };
}
