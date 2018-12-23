import config from '../config.js';


export function getAllBreeds() {
  return new Promise((resolve, reject) => {
    const url = `${config.DOG_API_BASE_URL}/breeds/list/all`;
    fetch(url)
      .then(res => res.json())
      .then(res => resolve(res.message))
      .catch(err => reject(err));
  });
};

export function getImageByBreed(breed) {
  return new Promise((resolve, reject) => {
    const url = `${config.DOG_API_BASE_URL}/breed/${breed}/images/random`;
    fetch(url)
      .then(res => res.json())
      .then(res => resolve(res.message))
      .catch(err => reject(err));
  });
}

export function getImageBySubBreed(breed, subBreed) {
  return new Promise((resolve, reject) => {
    const url = `${config.DOG_API_BASE_URL}/breed/${breed}/${subBreed}/images/random`;
    fetch(url)
      .then(res => res.json())
      .then(res => resolve(res.message))
      .catch(err => reject(err));
  });
}

export function getRandomText() {
  return new Promise((resolve, reject) => {
    const url = `https://baconipsum.com/api/?type=all-meat&sentences=1&start-with-lorem=1`;
    fetch(url)
      .then(res => res.json())
      .then(res => resolve(res[0]))
      .catch(err => reject(err));
  });
}

