import React from 'react';
import Breed from '../Breed';
import DataProvider from '../DataProvider';
import styles from './styles.module.css';


const App = () => {
  return (
    <DataProvider>
      {({ data, isLoading, error}) => {

        if (error) {
          return <div>{error}</div>;
        }
        if (!data || isLoading) {
          return <div className={styles.loading}>Loading...</div>;
        }
        return (
          <div>
            {data.map((breed) => <Breed key={breed.name} data={breed} />)}
          </div>
        );
      }}
    </DataProvider>
  );
}

export default App;
