import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

class Breed extends Component {

  static propsType = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string,
    subBreeds: PropTypes.shape([{
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired
    }]),
    text: PropTypes.string.isRequired
  }

  renderContent = () => {
    const { name, image, subBreeds } = this.props.data;

    return subBreeds ? (
      <div className={styles.subBreeds}>
        {subBreeds.map((subBreed) => (
          <div key={subBreed.name} className={styles.subBreed}>
            <h2 className={styles.subBreedName}>{subBreed.name}</h2>
            <img className={styles.image} alt={subBreed.name} src={subBreed.image} />
          </div>
        ))}
      </div>
    ) : (
      <img className={styles.image} alt={name} src={image} />
    );
  }

  render() {
    const { name, text } = this.props.data;

    return (
      <div className={styles.container}>
        <h1 className={styles.breedName}>{name}</h1>
        {this.renderContent()}
        <p>{text}</p>
      </div>
    )
  }
}

export default Breed;
