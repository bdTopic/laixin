import React, { Component, PropTypes } from 'react';
// import Lightbox from 'react-images';
import Lightbox from '../lightbox/Lightbox';
require('./gallery.less');

class Gallery extends Component {
	constructor () {
		super();

		this.state = {
			lightboxIsOpen: false,
			currentImage: 0,
		};

		this.closeLightbox = this.closeLightbox.bind(this);
		this.gotoNext = this.gotoNext.bind(this);
		this.gotoPrevious = this.gotoPrevious.bind(this);
		this.gotoImage = this.gotoImage.bind(this);
		this.handleClickImage = this.handleClickImage.bind(this);
		this.openLightbox = this.openLightbox.bind(this);
	}
	openLightbox (index, event) {
		console.log(index);
		event.preventDefault();
		this.setState({
			currentImage: index,
			lightboxIsOpen: true,
		});
	}
	closeLightbox () {
		this.setState({
			currentImage: 0,
			lightboxIsOpen: false,
		});
	}
	gotoPrevious () {
		this.setState({
			currentImage: this.state.currentImage - 1,
		});
	}
	gotoNext () {
		this.setState({
			currentImage: this.state.currentImage + 1,
		});
	}
	gotoImage (index) {
		this.setState({
			currentImage: index,
		});
	}
	handleClickImage () {
		// if (this.state.currentImage === this.props.images.length - 1) return;
        //
		// this.gotoNext();
		this.closeLightbox();
	}
	renderGallery () {
		const { images, userStyle } = this.props;

		if (!images) return;

		const gallery = images.map((obj, i) => {
			let myDate = new Date();
			return (
			<div className="imgItem" key={myDate.toLocaleTimeString()+'img'+i}
				 onClick={(e) => this.openLightbox(i, e)}>
				<img src = {obj.src}/>
			</div>
			);
		});

		return (
			<div className={userStyle}>
				{gallery}
			</div>
		);
	}
	render () {
		return (
			<div>
				{this.renderGallery()}
				<Lightbox
					currentImage={this.state.currentImage}
					images={this.props.images}
					isOpen={this.state.lightboxIsOpen}
					onClickImage={this.handleClickImage}
					onClickNext={this.gotoNext}
					onClickPrev={this.gotoPrevious}
					onClickThumbnail={this.gotoImage}
					onClose={this.closeLightbox}
					showThumbnails={this.props.showThumbnails}
					theme={this.props.theme}
					showCloseButton={true}
					showImageCount={true}
				/>
			</div>
		);
	}
};

Gallery.propTypes = {
	images: PropTypes.array,
	userStyle: PropTypes.string,
};

export default Gallery;
