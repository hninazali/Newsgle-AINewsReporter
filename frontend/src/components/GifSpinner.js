import React from 'react';
import PropTypes from 'prop-types';

class GifSpinner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { imageSrc, overlayBackground, loading } = this.props;
    const styles = {
      display: "block",
      margin: "0 auto"
    }
    return (
      <div style={styles}>
        <img src={imageSrc} alt="spinner-img" />
      </div>
    );
  }
}

GifSpinner.propTypes = {
  imageSrc: PropTypes.string,
  overlayBackground: PropTypes.string,
  // imageStyle: PropTypes.object,
  loading: PropTypes.bool.isRequired,
};
GifSpinner.defaultProps = {
  imageSrc: "https://tenor.com/view/qoobee-gif-10865851",
  // imageStyle: {marginTop: "20%"},
  overlayBackground: "rgba(0,0,0,0.4)"
};
export default GifSpinner;