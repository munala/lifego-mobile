import React from 'react';
import { PropTypes } from 'prop-types';
import {
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import { List, ListItem } from 'react-native-elements';

import styles from './styles';

const SearchResults = ({ bucketlists, onItemPress }) => (
  <ScrollView>
    <List containerStyle={styles.results}>
      {
        bucketlists.map(result => (
          <ListItem
            key={result.id}
            title={result.name}
            subtitle={result.description || 'no description'}
            containerStyle={styles.resultContainerStyle}
            wrapperStyle={styles.resultWrapperStyle}
            titleStyle={styles.title}
            subtitleStyle={styles.subtitle}
            onPress={() => onItemPress(result)}
            hideChevron
          />
        ))
      }
    </List>
  </ScrollView>
);

SearchResults.propTypes = {
  bucketlists: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  })).isRequired,
  onItemPress: PropTypes.func.isRequired,
};

function mapStateToProps({ allData: { bucketlists } }, ownProps) {
  return {
    bucketlists,
    ...ownProps,
  };
}
export default connect(mapStateToProps)(SearchResults);
