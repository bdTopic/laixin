import React, { Component } from 'react';
require('./oneItem.less');

class OneItem extends Component {

    render() {
        let itemData = this.props.itemData;
        return (
            <div className="imgRow">
                <img src = {itemData.abstract.image[0]} className="imgItem"/>
                <div className="imgTitle">{itemData.abstract.text}</div>
            </div>
        )

    }
}

export default OneItem;