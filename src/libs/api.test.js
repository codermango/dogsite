
import * as api from './api.js';

describe('api test', () => {

  it('getAllBreeds resolve and reject works correctly', async () => {
    global.fetch = jest.fn().mockImplementationOnce(() => {
      return new Promise((resolve, reject) => {
        resolve({
          status: 200,
          json: () => new Promise((resolve, reject) => {
            resolve({
              message: {
                brabancon: [],
                briard: [],
                bulldog: [
                  "boston",
                  "french"
                ]
              }
            })
          }) 
        });
      })
    })
    .mockImplementationOnce(() => Promise.reject({ message: 'error' }));
    
    expect.assertions(2);
    const expected = {
      brabancon: [],
      briard: [],
      bulldog: [
        "boston",
        "french"
      ]
    };

    const res = await api.getAllBreeds();
    expect(res).toEqual(expected);
    
    try {
      await api.getAllBreeds();
    } catch (err) {
      expect(err).toEqual('error');
    }
  });

  it('getImageByBreed resolve and reject works correctly', async () => {
    global.fetch = jest.fn().mockImplementationOnce(() => {
      return new Promise((resolve, reject) => {
        resolve({
          status: 200,
          json: () => new Promise((resolve, reject) => {
            resolve({
              status: 'success',
              message: 'image_url'
            })
          }) 
        });
      })
    })
    .mockImplementationOnce(() => Promise.reject({ message: 'error' }));
    expect.assertions(2);

    const expected = 'image_url';
    const res = await api.getImageByBreed('test_breed');
    expect(res).toEqual(expected);
    
    try {
      await api.getImageByBreed();
    } catch (err) {
      expect(err).toEqual('error');
    }
  });


  it('getImageBySubBreed resolve and reject works correctly', async () => {
    global.fetch = jest.fn().mockImplementationOnce(() => {
      return new Promise((resolve, reject) => {
        resolve({
          status: 200,
          json: () => new Promise((resolve, reject) => {
            resolve({
              status: 'success',
              message: 'image_url'
            })
          }) 
        });
      })
    })
    .mockImplementationOnce(() => Promise.reject({ message: 'error' }));
    expect.assertions(2);

    const expected = 'image_url';
    const res = await api.getImageBySubBreed('test_breed', 'test_subBreed');
    expect(res).toEqual(expected);
    
    try {
      await api.getImageBySubBreed();
    } catch (err) {
      expect(err).toEqual('error');
    }
  });


  it('getRandomText resolve and reject works correctly', async () => {
    global.fetch = jest.fn().mockImplementationOnce(() => {
      return new Promise((resolve, reject) => {
        resolve({
          status: 200,
          json: () => new Promise((resolve, reject) => {
            resolve(['test_text'])
          }) 
        });
      })
    })
    .mockImplementationOnce(() => Promise.reject({ message: 'error' }));
    expect.assertions(2);

    const expected = 'test_text';
    const res = await api.getRandomText();
    expect(res).toEqual(expected);
    
    try {
      await api.getRandomText();
    } catch (err) {
      expect(err).toEqual('error');
    }
  });
});