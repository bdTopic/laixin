import React, { Component } from 'react'
import {transferDate} from '../../util/util';
import Gallery from '../gallery/gallery';

require('./threeItem.less');

class ThreeItem extends Component {
    render () {
        let itemData = this.props.itemData;
        let imageSrc = itemData.abstract.image;
        let len=imageSrc.length;
        let galleryImgs=[];
        for(let i=0;i<len&&i<3;i++ ) {
            let img = {src: imageSrc[i]};
            galleryImgs.push(img);
        }

        return (
            <div className="cnt-list">
                <a href="" className="typeNews">
                    <div className="text">
                        <h2>{itemData.abstract.text}</h2>
                        <div className="threeImg">
                            <Gallery images={galleryImgs} userStyle="threeImg"></Gallery>
                        </div>
                        <div className="text-extra">
                            <div className="comment">{itemData.source}</div>
                            <div className="time">{transferDate(itemData.time)}</div>
                        </div>
                    </div>
                </a>
            </div>
        )
    }
}
export default ThreeItem;