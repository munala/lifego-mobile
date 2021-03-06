import React from 'react';

import Bucketlists from '../../../../containers/Lists';

const MyBucketlists = () => {
  const navigator = 'MyBucketlistNavigator';
  const route = 'bucketlist';
  const screen = 'myBucketlists';
  const currentRoute = 'bucketlists';
  const fromRoute = 'Bucketlists';

  const props = {
    navigator,
    route,
    screen,
    currentRoute,
    fromRoute,
  };

  return (<Bucketlists {...props} />);
};

export default MyBucketlists;
