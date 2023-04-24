import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/MucicCard.css';

class MusicCard extends Component {
  render() {
    const {
      trackId,
      trackName,
      previewUrl,
      checked,
      verifyChecked,
      music,
    } = this.props;

    return (
      <div className="div-pai-musicCard">
        <h2 className="h2-music">
          {trackName}
        </h2>
        <audio
          data-testid="audio-component"
          src={ previewUrl }
          controls
          className="audio"
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="inputCheckbox">
          <input
            data-testid={ `checkbox-music-${trackId}` }
            id="inputCheckbox"
            type="checkbox"
            value={ music }
            onChange={ verifyChecked }
            checked={ checked }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.elementType.isRequired,
  trackId: PropTypes.number.isRequired,
  music: PropTypes.objectOf(PropTypes.string).isRequired,
  checked: PropTypes.bool.isRequired,
  verifyChecked: PropTypes.func.isRequired,
};

export default MusicCard;
