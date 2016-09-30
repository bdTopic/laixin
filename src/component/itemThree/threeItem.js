import React, { Component } from 'react'
import {transferDate} from '../../util/util';
import $ from 'jquery';

require('./threeItem.less');

class ThreeItem extends Component {
    change=(id)=>{
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
        let host = document.domain;
        let id2 = this.props.id;
        let url = this.props.url;
        let topicId =this.props.topcid;
        let detailUrl = "http://"+host+"/doug/public/bdarticle?version=1&articleid="+id2+"&url="+url+"&topicId="+topicId;
        for(let i=0;i<len&&i<3;i++ ) {
            urlFormate[i] = imageSrc[i];
            rows.push(
                <div className="imgItem" key={itemData.id+'img'+i}  id={"img"+i+"_"+itemData.id}>
                    <img src = {urlFormate[i]} />
                </div>
            );
        }

        return (
            <div className="cnt-list">
                <div href={detailUrl} className="typeNews">
                    <div className="text">
                        <h2>{itemData.abstract.text}</h2>
                        <div className="threeImgs">
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