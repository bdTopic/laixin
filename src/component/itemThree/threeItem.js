import React, { Component } from 'react'
import {transferDate} from '../../util/util';
import Gallery from '../gallery/gallery';
import {clickHtml} from '../../util/util';

require('./threeItem.less');

class ThreeItem extends Component {
    change=(id)=>{
        let _hmt = _hmt || [];
        clickHtml();
        var val = $(id).attr('class');
        var bool = val.indexOf('imgItem');
        console.log(bool);
        if(val.indexOf('imgItem')>=0){
            console.log(id);
            _hmt.push(['_trackEvent', '点击查看文章', 'click']);

        }
        else {
            console.log('none');
            _hmt.push(['_trackEvent', '点击查看文章', 'click']);
        }

    }
    urlFormate = (str)=>{
        let exp = /src=(.+)$/;
        let matchs = str.match(exp);
        return !!matchs ? decodeURIComponent(matchs[1]) : '';
    }
    render () {
        let itemData = this.props.itemData;
        let imageSrc = itemData.abstract.image;
        let len=imageSrc.length;
        let rows = [];
        let urlFormate = [];
        for(let i=0;i<len&&i<3;i++ ) {
            urlFormate[i] = this.urlFormate(imageSrc[i]);
            rows.push(
                <div className="imgItem" key={itemData.id+'img'+i}  onClick={this.change.bind(this, "#img"+i+"_"+itemData.id)} id={"img"+i+"_"+itemData.id}>
                    <img src = {urlFormate[i]} />
                </div>
            );
        }

        return (
            <div className="cnt-list">
                <div href="" className="typeNews">
                    <div className="text">
                        <h2>{itemData.abstract.text}</h2>
                        <div className="threeImg">
                            {rows}
                        </div>
                        <div className="text-extra">
                            <div className="comment">{itemData.source}</div>
                            <div className="time">{transferDate(itemData.time)}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ThreeItem;