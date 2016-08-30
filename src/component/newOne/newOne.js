import React, { Component } from 'react';
import {transferDate} from '../../util/util';
import Gallery from '../gallery/gallery';

require('./newOne.less');

class OneItem extends Component {

    render() {
        let itemData = this.props.itemData;
        var imgUrl = itemData.abstract.image[0];
        return (
            <li className="cnt-list">
                <div className="typeNews">
                    <div className="text">
                        <h2>{itemData.abstract.text}</h2>
                        <img src = {imgUrl} className="threeImg"  data-box="imageViewer" data-box-viewerurl={imgUrl}/>
                        <div className="text-extra">
                            <div className="comment">{itemData.source}</div>
                            <div className="time">{transferDate(itemData.time)}</div>
                        </div>
                    </div>
                </div>
            </li>

        )

    }
}

export default OneItem;