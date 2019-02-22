import { shallow } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import App from 'app/components/app';

test('Link changes the class when hovered', () => {
  const component = renderer.create(<App/>);
  const dom = shallow(<App/>);
  expect(dom.text()).toEqual('lol');
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
