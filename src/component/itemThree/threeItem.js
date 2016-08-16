import React, { Component } from 'react'
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
            <div>
                <div className="itemTitle">{itemData.abstract.text}</div>
                <div className="imgRow">{rows}</div>
            </div>
        )
    }
}
export default ThreeItem;