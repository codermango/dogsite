import React from 'react';
import renderer from 'react-test-renderer';

import Breed from './index.js';

describe('Breed', () => {
  it('Breed renders correctly when there is no subbreeds', () => {
    const props = {
      name: 'testName',
      image: 'testImage',
      text: 'testText'
    };
    const component = renderer.create(<Breed data={props} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Breed renders correctly when there is subbreeds', () => {
    const props = {
      name: 'testName',
      subBreeds: [
        { name: 'testSubName1', image: 'testSubImage1' },
        { name: 'testSubName2', image: 'testSubImage2' }
      ],
      text: 'testText'
    };
    const component = renderer.create(<Breed data={props} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

