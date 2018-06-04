import React from 'react';

import Bucketlists from '../../../../../containers/Lists';

const AllBucketlists = () => {
  const navigator = 'AllBucketlistNavigator';
  const route = 'bucketlist';
  const screen = 'allBucketlists';
  const currentRoute = 'bucketlists';
  const fromRoute = 'Home';

  const props = {
    navigator,
    route,
    screen,
    currentRoute,
    fromRoute,
  };

  return (<Bucketlists {...props} />);
};

export default AllBucketlists;
