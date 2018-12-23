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

  breedPromise(breed) {

    const formatedBreed = {
      name: breed.name
    };

    return new Promise((resolve, reject) => {

      if (breed.subBreeds.length > 0) {
        const subBreedPromises = breed.subBreeds.map((subBreed) => {
          return new Promise((resolve, reject) => {
            getImageBySubBreed(breed.name, subBreed)
              .then(res => resolve({ name: subBreed, image: res }))
              .catch(err => reject(err));
          });
        });

        Promise.all(subBreedPromises)
          .then(res => { formatedBreed.subBreeds = res; })
          .catch(err => reject(err));

      } else {
        getImageByBreed(breed.name)
          .then(res => { formatedBreed.image = res; })
          .catch(err => reject(err));
      }

      getRandomText()
        .then(res => {
          formatedBreed.text = res;
          resolve(formatedBreed)
        })
        .catch(err => reject(err));

    });
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


