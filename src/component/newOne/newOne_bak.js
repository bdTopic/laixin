import React, { Component } from 'react';
import {transferDate} from '../../util/util';
import Gallery from '../gallery/gallery';

require('./newOne.less');

class OneItem extends Component {

    componentDidMout() {
        const id = this.props.id;
    }

    render() {
        let itemData = this.props.itemData;
        let imgSrc = [];
        if(itemData.abstract.image[0]){
            let imgS = {
                src:''
            };
            imgS.src = itemData.abstract.image[0];
            imgSrc.push(imgS);
        }
        return (
            <li className="cnt-list">
                <a href="" className="typeNews">
                    <div className="text">
                        <h2>{itemData.abstract.text}</h2>
                        <Gallery images={imgSrc} userStyle="threeImg"></Gallery>
                        <div className="text-extra">
                            <div className="comment">{itemData.source}</div>
                            <div className="time">{transferDate(itemData.time)}</div>
                        </div>
                    </div>
                </a>
            </li>

        )

    }
}

export default OneItem;