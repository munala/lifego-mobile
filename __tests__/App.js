import 'react-native';
import React from 'react';
import RootApp from '../main';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<RootApp />);
});
