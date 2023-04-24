import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import AlbumStructure from '../components/AlbumStructure';
import '../styles/Search.css';

class Search extends Component {
  state = {
    nameArtist: '',
    disabledButton: true,
    isLoading: false,
    album: [],
    nameArtistSalve: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      this.verifyButton();
    });
  };

  verifyButton = () => {
    const minLength = 2;
    const { nameArtist } = this.state;
    if (nameArtist.length >= minLength) {
      this.setState({
        disabledButton: false,
      });
    }
  };

  verifyClickButton = async () => {
    const { nameArtist } = this.state;
    this.setState({
      nameArtist: '',
      isLoading: true,
    });
    const resultSearch = await searchAlbumsAPI(nameArtist);
    this.setState({
      album: resultSearch,
      isLoading: false,
      nameArtist: '',
      nameArtistSalve: nameArtist,
    });
  };

  render() {
    const {
      nameArtist,
      disabledButton,
      isLoading,
      album,
      nameArtistSalve,
    } = this.state;
    // if (isLoading) return <Loading />;
    return (
      <>
        <div data-testid="page-search">
          <Header />
        </div>
        {
          isLoading
            ? <Loading />
            : (
              <>
                <form className="form-search">
                  <label htmlFor="search-artist-input">
                    <input
                      placeholder="Pesquise pelo Álbum/ Artista"
                      className="input-search"
                      value={ nameArtist }
                      name="nameArtist"
                      type="text"
                      id="search-artist-input"
                      data-testid="search-artist-input"
                      onChange={ this.handleChange }
                    />
                  </label>
                  <button
                    className="button-search"
                    type="button"
                    data-testid="search-artist-button"
                    disabled={ disabledButton }
                    onClick={ this.verifyClickButton }
                  >
                    Pesquisar
                  </button>
                </form>
                <section className="result-search">
                  {
                    album.length === 0
                      ? (
                        <p className="p">
                          Nenhum álbum foi encontrado
                        </p>
                      )
                      : (
                        <h2 className="h2">
                          {`Resultado de álbuns de: ${nameArtistSalve}`}
                        </h2>
                      )
                  }
                </section>
                <section className="section-search">
                  {
                    album.map((albumIndivual, index) => (
                      <div
                        className="album-search"
                        key={ index }
                      >
                        <Link
                          data-testid={ `link-to-album-${albumIndivual.collectionId}` }
                          to={ `/album/${albumIndivual.collectionId}` }
                        >
                          <img
                            src={ albumIndivual.artworkUrl100 }
                            alt={ `Álbum de: ${albumIndivual.artistName}` }
                          />
                        </Link>
                        <AlbumStructure
                          artworkUrl100={ albumIndivual.artworkUrl100 }
                          artistName={ albumIndivual.artistName }
                          collectionName={ albumIndivual.collectionName }
                        />
                      </div>
                    ))
                  }
                </section>
              </>
            )
        }
      </>
    );
  }
}

export default Search;
