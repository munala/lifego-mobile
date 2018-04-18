import PropTypes from 'prop-types';

export default {
  goBack: PropTypes.func.isRequired,
  context: PropTypes.shape({
    type: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  content: PropTypes.shape({
    description: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  datePickerMode: PropTypes.bool.isRequired,
  categoryPickerMode: PropTypes.bool.isRequired,
  showDatePicker: PropTypes.func.isRequired,
  showCategoryPicker: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onDateChange: PropTypes.func.isRequired,
  renderCategories: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  uploading: PropTypes.bool.isRequired,
  image: PropTypes.shape({}).isRequired,
  changePhoto: PropTypes.func.isRequired,
};
