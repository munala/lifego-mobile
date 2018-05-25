import React from 'react';

import Bucketlists from '../../List/Bucketlists';

const MyBucketlists = () => {
  const navigator = 'MyBucketlistNavigator';
  const route = 'bucketlist';
  const screen = 'myBucketlists';
  const currentRoute = 'bucketlists';

  const props = {
    navigator,
    route,
    screen,
    currentRoute,
  };

  return (<Bucketlists {...props} />);
};

export default MyBucketlists;
