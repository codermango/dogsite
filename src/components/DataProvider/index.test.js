import React from 'react';
import { shallow } from 'enzyme';
import DataProvider from './index.js';
import * as api from '../../libs/api.js';


describe('DataProvider', () => {
  it('change state correctly when there is no error', async () => {
    expect.assertions(2)
    api.getAllBreeds = jest.fn().mockReturnValue({
      brabancon: [],
      briard: [],
      bulldog: [
        "boston",
        "french"
      ]
    });

    api.getImageByBreed = jest.fn().mockReturnValue(Promise.resolve('testBreedImage'));
    api.getImageBySubBreed = jest.fn().mockReturnValue(Promise.resolve('testSubBreedImage'));
    api.getRandomText = jest.fn().mockReturnValue(Promise.resolve('testText'));
    
    const initState = { data: null, isLoading: true, error: null };
    const expectedState = {
      data: [
        { name: 'brabancon', image: 'testBreedImage', text: 'testText' },
        { name: 'briard', image: 'testBreedImage', text: 'testText' },
        { name: 'bulldog', text: 'testText', subBreeds: [
          { image: 'testSubBreedImage', name: 'boston'},
          { image: 'testSubBreedImage', name: 'french'}
        ]}
      ],
      isLoading: false,
      error: null
    };
    const component = shallow(
      <DataProvider>
        {() => <div></div>}
      </DataProvider>
    );
    expect(component.state()).toEqual(initState);
    await component.instance().formatData();
    expect(component.state()).toEqual(expectedState);
  });

  it('change state correctly when there is error', async () => {
    expect.assertions(2)
    api.getAllBreeds = jest.fn().mockReturnValue(Promise.reject('error'));

    api.getImageByBreed = jest.fn().mockReturnValue(Promise.resolve('testBreedImage'));
    api.getImageBySubBreed = jest.fn().mockReturnValue(Promise.resolve('testSubBreedImage'));
    api.getRandomText = jest.fn().mockReturnValue(Promise.resolve('testText'));
    
    const initState = { data: null, isLoading: true, error: null };
    const expectedState = { data: null, isLoading: false, error: 'error' };
    const component = shallow(
      <DataProvider>
        {() => <div></div>}
      </DataProvider>
    );
    expect(component.state()).toEqual(initState);
    try {
      await component.instance().formatData();
    } catch(err) {
      expect(component.state()).toEqual(expectedState);
    }
  });

  it('getImageByBreed, getImageBySubBreed and getRandomText failure should be handled correctly', async () => {
    expect.assertions(2)
    api.getAllBreeds = jest.fn().mockReturnValue({
      brabancon: [],
      briard: [],
      bulldog: [
        "boston",
        "french"
      ]
    });

    api.getImageByBreed = jest.fn().mockReturnValue(Promise.reject('error'));
    api.getImageBySubBreed = jest.fn().mockReturnValue(Promise.reject('error'));
    api.getRandomText = jest.fn().mockReturnValue(Promise.reject('error'));
    
    const initState = { data: null, isLoading: true, error: null };
    const expectedState = {
      data: [
        { name: 'brabancon', image: 'error', text: 'error' },
        { name: 'briard', image: 'error', text: 'error' },
        { name: 'bulldog', text: 'error', subBreeds: [
          { image: 'error', name: 'boston'},
          { image: 'error', name: 'french'}
        ]}
      ],
      isLoading: false,
      error: null
    };
    const component = shallow(
      <DataProvider>
        {() => <div></div>}
      </DataProvider>
    );
    expect(component.state()).toEqual(initState);
    await component.instance().formatData();
    expect(component.state()).toEqual(expectedState);
  });
});

