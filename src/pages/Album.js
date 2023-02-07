import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Album extends Component {
  state = {
    artistName: '',
    nameAlbum: '',
    musicList: [],
    isLoading: false,
    musicFavorite: [],
  };

  async componentDidMount() {
    const { match: { params } } = this.props;
    const musics = await getMusics(params.id);
    const favoriteSalve = await getFavoriteSongs();
    this.setState({
      musicList: musics.filter((music, index) => index !== 0),
      artistName: musics[0].artistName,
      nameAlbum: musics[0].collectionName,
      musicFavorite: favoriteSalve,
    });
  }

  verifyChecked = (value) => {
    this.setState({
      isLoading: true,
    }, async () => {
      await addSong(value);
      const myFavorites = await getFavoriteSongs();
      this.setState({
        isLoading: false,
        musicFavorite: myFavorites,
      });
    });
  };

  remove = async (param) => {
    const { musicFavorite } = this.state;
    await removeSong(param);

    const removeMusic = musicFavorite.filter((music) => music.trackId !== param.trackId);
    return removeMusic;
  };

  render() {
    const {
      musicList,
      artistName,
      nameAlbum,
      isLoading,
      musicFavorite,
    } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        {
          isLoading
            ? <Loading />
            : (
              <>
                <section>
                  <div data-testid="artist-name">
                    {artistName}
                  </div>
                  <div data-testid="album-name">
                    {nameAlbum}
                  </div>
                </section>
                <section>
                  {
                    musicList.map((music, index) => (
                      <div key={ index }>
                        <MusicCard
                          trackId={ music.trackId }
                          trackName={ music.trackName }
                          previewUrl={ music.previewUrl }
                          music={ music }
                          checked={ musicFavorite.some((element) => (
                            element.trackId === music.trackId
                          )) }
                          verifyChecked={ () => { this.verifyChecked(music); } }
                          onClick={ this.remove }
                        />
                      </div>
                    ))
                  }
                </section>
              </>
            )
        }

      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
