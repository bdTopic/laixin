import React, { Component } from 'react'
import {transferDate} from '../../util/util'
require('./threeItem.less');

class ThreeItem extends Component {
    render () {
        let itemData = this.props.itemData;
        let rows = [];
        let imageSrc = itemData.abstract.image;
        let len=imageSrc.length;

        for(let i=0;i<len&&i<3;i++ ) {
            rows.push(

                    <img src = {imageSrc[i]} className="imgItem"/>

            );
        }

        return (
            <div className="cnt-list">
                <a href="" className="typeNews">
                    <div className="text">
                        <h2>{itemData.abstract.text}</h2>
                        <div className="three-img">
                            {rows}
                        </div>
                        <div className="text-extra">
                            <div className="comment">0评论</div>
                            <div className="time">{transferDate(itemData.time)}</div>
                        </div>
                    </div>
                </a>
            </div>
        )
    }
}
export default ThreeItem;