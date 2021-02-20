import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';

import Admin from '../screens/Admin';

describe('<Admin /> test tag if exists', () => {
  it(' section tag', () => {
    let app = shallow(<Admin />);
    expect(app.find('section').exists()).toBeTruthy();
  });

  it('div tag', () => {
    let app = shallow(<Admin />);
    expect(app.find('div').exists()).toBeTruthy();
  });

  it('input tag', () => {
    let app = shallow(<Admin />);
    expect(app.find('input').exists()).toBeTruthy();
  });

  it('p tag', () => {
    let app = shallow(<Admin />);
    expect(app.find('p').exists()).toBeTruthy();
  });

  it('a tag', () => {
    let app = shallow(<Admin />);
    expect(app.find('a').exists()).toBeTruthy();
  });
});
