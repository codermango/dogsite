import { Component } from 'react';
import {
  getAllBreeds,
  getImageByBreed,
  getImageBySubBreed,
  getRandomText
} from '../../libs/api.js';


class DataProvider extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isLoading: false,
      error: null,
    };
  }

  async breedPromise(breed) {

    const formatedBreed = {
      name: breed.name
    };

    if (breed.subBreeds.length > 0) {
      const subBreedPromises = breed.subBreeds.map(async (subBreed) => {
        const image = await getImageBySubBreed(breed.name, subBreed).catch((err) => err);
        return { name: subBreed, image: image };
      });
      formatedBreed.subBreeds = await Promise.all(subBreedPromises).catch((err) => err);
    } else {
      formatedBreed.image = await getImageByBreed(breed.name).catch((err) => err);
    }
    formatedBreed.text = await getRandomText().catch((err) => err);

    return formatedBreed;
  }

  async formatData() {

    try {
      const breeds = await getAllBreeds();
      const breedPromises = Object.keys(breeds).map((key) => {
        return this.breedPromise({ name: key, subBreeds: breeds[key] });
      });
      return await Promise.all(breedPromises);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.formatData()
      .then(res => this.setState({ isLoading: false, data: res }))
      .catch(err => this.setState({ isLoading: false, error: err }));
  }

  render() {
    return this.props.children(this.state);
  }
};

export default DataProvider;


