import { shallow } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import Index from 'index';

test('Link changes the class when hovered', () => {
  const dom = shallow(<Index />);
  expect(dom.text()).toEqual('');

  const component = renderer.create(<Index />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
