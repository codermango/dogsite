import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import App from './index.js';


describe('App', () => {
  it('render loading correctly', () => {
    const state1 = { data: null, error: null, isLoading: true };
    const state2 = { data: null, error: null, isLoading: false };
    const component = shallow(<App />);
    const childrenComp1 = shallow(component.props().children(state1));
    const childrenComp2 = shallow(component.props().children(state2));

    expect(toJson(childrenComp1)).toMatchSnapshot();
    expect(toJson(childrenComp2)).toMatchSnapshot();
  });

  it('render error correctly', () => {
    const state = { data: null, error: 'error', isLoading: false }
    const component = shallow(<App />);
    const childrenComp = shallow(component.props().children(state));
    expect(toJson(childrenComp)).toMatchSnapshot();
  });

  it('render data correctly', () => {
    const state = { data: [{ name: 'testName1', image: 'testImage1' }], error: null, isLoading: false }
    const component = shallow(<App />);
    console.log(component.props().children(state))
    const childrenComp = shallow(component.props().children(state));
    expect(toJson(childrenComp)).toMatchSnapshot();
  });
});

