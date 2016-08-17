import React, { Component } from 'react';
import {transferDate} from '../../util/util'
require('./oneItem.less');

class OneItem extends Component {

    render() {
        let itemData = this.props.itemData;
        return (
            <li className="cnt-list">
                <a href="" className="typeNews">
                    <div className="img">
                        <img src = {itemData.abstract.image[0]} className="imgItem"/>
                    </div>
                    <div className="text">
                        <h2>{itemData.abstract.text}</h2>
                        <div className="text-extra">
                            <div className="comment">0评论</div>
                            <div className="time">{transferDate(itemData.time)}</div>
                        </div>
                    </div>
                </a>
            </li>

        )

    }
}

export default OneItem;