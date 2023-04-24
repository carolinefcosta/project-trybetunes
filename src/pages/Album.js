import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import '../styles/Album.css';

class Album extends Component {
  state = {
    artistName: '',
    imgArtist: '',
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
      imgArtist: musics[0].artworkUrl100,
      nameAlbum: musics[0].collectionName,
      musicFavorite: favoriteSalve,
    });
  }

  verifyChecked = async (value) => {
    this.setState({ isLoading: true });
    await addSong(value);
    const myFavorites = await getFavoriteSongs();
    await removeSong(myFavorites);
    this.setState({
      isLoading: false,
      musicFavorite: myFavorites,
    });
  };

  // remove = async (param) => {
  //   const { musicFavorite } = this.state;
  //   // if (!target.checked) { await removeSong(target.checked); }

  //   const removeMusic = musicFavorite.filter((music) => music.trackId !== param.trackId);
  //   return removeMusic;
  // };

  render() {
    const {
      musicList,
      artistName,
      imgArtist,
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
              <div className="div-pai">
                <section className="section-artist-album">
                  <img
                    src={ imgArtist }
                    alt={ `Álbum de: ${artistName}` }
                    className="img-album"
                  />
                  <div data-testid="artist-name" className="album-name">
                    {artistName}
                  </div>
                  <div data-testid="album-name" className="album-name">
                    {nameAlbum}
                  </div>
                </section>
                <section className="section-album">
                  {
                    musicList.map((music, index) => (
                      <div key={ index } className="music">
                        <MusicCard
                          trackId={ music.trackId }
                          trackName={ music.trackName }
                          previewUrl={ music.previewUrl }
                          music={ music }
                          musicFavorite={ musicFavorite }
                          checked={ musicFavorite.some((element) => (
                            element.trackId === music.trackId
                          )) }
                          verifyChecked={ () => { this.verifyChecked(music); } }
                          // onClick={ () => { this.remove(music); } }
                        />
                      </div>
                    ))
                  }
                </section>
              </div>
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
