import { Component } from "react"
import { fetchImages } from "service/api";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Modal } from "./Modal/Modal";
import { SearchBar } from "./SearchBar/SearchBar";

export class App extends Component {
  state = {
    query: "",
    images: [],
    page: 1,
    modalImage: "",
    showBtn: false,
    largeImageURL: "",
    };

  componentDidUpdate(_, prevState){
    const { page, query } = this.state;
    if(prevState.query !== query || prevState.page !== page) {
      fetchImages(query, page).then(data => {
        if (data.hits.length === 0) {
          alert('We didn`t find any photos')
          return 
        }
        this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
          showBtn: page < Math.ceil(data.totalHits/12)
        }))
      })
    }
  }

  handleSubmit = (query) => {
    this.setState({ query,      
      images: [],
      page: 1,
      modalImage: "",
      showBtn: false,})
  }

  loadMore = () => {
    this.setState(prevState => ({page: prevState.page + 1}))
  } 

  openModal = (largeImageURL) => {
    this.setState({largeImageURL})
  }

  render () {
    return (
    <>
      <SearchBar onSubmit = {this.handleSubmit} />
      <ImageGallery images = {this.state.images} openModal = { this.openModal }/>
      {this.state.showBtn && <button type="button" onClick={this.loadMore}>Load more</button>}
      {this.state.largeImageURL && <Modal largeImageURL={this.state.largeImageURL} onClose={this.openModal}/>}
    </>
  );
  }
};