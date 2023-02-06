import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AlbumStructure extends Component {
  render() {
    const {
      artistName,
      collectionName,
    } = this.props;
    return (
      <div>
        <h1>{artistName}</h1>
        <span>{collectionName}</span>
      </div>
    );
  }
}

AlbumStructure.propTypes = {
  artistName: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
};

export default AlbumStructure;
