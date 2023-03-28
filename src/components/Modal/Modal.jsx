import { Component } from "react";
import style from './Modal.module.css';

export class Modal extends Component {
    handleKeyDown = element => {
      if (element.code === 'Escape') {
        this.props.onClose();
      }
    };
  
    handleBackdropClick = event => {
      if (event.currentTarget === event.target) {
        this.props.onClose();
      }
    };
  
    componentDidMount() {
      window.addEventListener('keydown', this.handleKeyDown);
    }
  
    componentWillUnmount() {
      window.removeEventListener('keydown', this.handleKeyDown);
    }
  
    render() {
      return (
        <div className={style.overlay} onClick={this.handleBackdropClick}>
          <div className={style.modal}>
            <img src={this.props.largeImageURL} alt="" />
          </div>
        </div>
      );
    }
  }