import React, { Component } from 'react'
import {transferDate} from '../../util/util';
import Gallery from '../gallery/gallery';
import {clickHtml} from '../../util/util';

require('./threeItem.less');

class ThreeItem extends Component {
    change=(id)=>{
        let _hmt = _hmt || [];
        clickHtml();
        var val = $('#img'+id).attr('class');
        var bool = val.indexOf('threeImg');
        console.log(bool);
        if(val.indexOf('threeImg')>=0){
            console.log(id);
            _hmt.push(['_trackEvent', '点击查看文章', 'click']);
            $('#img'+id).removeClass('threeImg');
            $('#img'+id).addClass('newPhoto');
        }
        else {
            console.log('none');
            $('#img'+id).removeClass('newPhoto');
            $('#img'+id).addClass('threeImg');
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
        console.log(itemData);
        for(let i=0;i<len&&i<3;i++ ) {
            urlFormate[i] = this.urlFormate(imageSrc[i]);
            rows.push(
                <div className="imgItem" key={itemData.id+'img'+i}>
                    <img src = {urlFormate[i]} onClick={this.change.bind(this,this.props.itemData.id)} id={"img"+itemData.id}/>
                </div>
            );
        }

        return (
            <div className="cnt-list">
                <a href="" className="typeNews">
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
                </a>
            </div>
        )
    }
}
export default ThreeItem;