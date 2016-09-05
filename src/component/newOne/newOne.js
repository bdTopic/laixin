import React, { Component } from 'react';
import {transferDate} from '../../util/util';
import $ from 'jquery';
require('./newOne.less');

class OneItem extends Component {
    scroll=(id)=>{
        let ele = document.getElementById('a'+id);
        if(ele){
            ele.scrollIntoView();
        }
    }
    change=(id)=>{
        let scroll= this.scroll.bind(this);
        // console.error(_hmt);
        // console.error(window);
        var val = $('#img'+id).attr('class');
        var bool = val.indexOf('threeImg');
        if(val.indexOf('threeImg')>=0){
            _hmt.push(['_trackEvent', '点击查看文章', 'click']);
            $('#img'+id).removeClass('threeImg');
            $('#img'+id).addClass('newPhoto');
        }
        else {
            console.log('none');
            $('#img'+id).removeClass('newPhoto');
            $('#img'+id).addClass('threeImg');
            scroll(id);
        }

    }
    urlFormate = (str)=>{
        let exp = /src=(.+)$/;
        let matchs = str.match(exp);
        return !!matchs ? decodeURIComponent(matchs[1]) : '';
    }
    render() {
        let itemData = this.props.itemData;
        var imgUrl = itemData.abstract.image[0];
        let urlFormate = this.urlFormate(imgUrl);
        return (
            <li className="cnt-list">
                <div className="typeNews">
                    <a className="text" id={"a"+itemData.id}>
                        <h2>{itemData.abstract.text}</h2>
                        <img src = {urlFormate} className="threeImg"   onClick={this.change.bind(this,this.props.itemData.id)} id={"img"+itemData.id} />
                        <div className="text-extra">
                            <div className="comment">{itemData.source}</div>
                            <div className="time">{transferDate(itemData.time)}</div>
                        </div>
                    </a>
                </div>
            </li>

        )

    }
}

export default OneItem;