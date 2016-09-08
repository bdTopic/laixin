import React, { Component } from 'react';
import {transferDate} from '../../util/util';
import $ from 'jquery';
require('./newOne.less');

let preHeight = -1;
class OneItem extends Component {

    scroll=(id)=>{
        id = "a" + id;
        //console.log('id='+id);

        let ele = document.getElementById(id);
        let scrollHeight = document.getElementById(id).scrollHeight;
        let clientHeight = ele.clientHeight;
        if(ele){
           // window.location.hash = 'ele';
           ele.scrollIntoView();
           // ScrollView.scrollTo(length);
            ele.scrollTo(0, preHeight);
           /* console.log('clientHeight='+clientHeight);
            console.log('scrollHeight='+scrollHeight);
            window.scrollTo(0,scrollHeight - clientHeight);*/
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
            preHeight = document.getElementById(id).scrollHeight;
        }
        else {
            console.log('none');
            $('#img'+id).removeClass('newPhoto');
            $('#img'+id).addClass('threeImg');
            scroll(id);
        }

    }
    _urlFormate = (str)=>{
        let exp = /src=(.+)$/;
        let matchs = str.match(exp);
        return !!matchs ? decodeURIComponent(matchs[1]) : '';
    }

    _changeText=(id)=>{
        let con = $('#111'+id).text();
        if (con=='展开'){
            $('#h2'+id).removeClass('short');
            $('#111'+id).text('收起');
        }
        else if (con == '收起'){
            $('#h2'+id).addClass('short');
            $('#111'+id).text('展开');
        }
    }


    render() {
        let itemData = this.props.itemData;
        let content = itemData.abstract.text;
        let id =  itemData.id;
       // console.log(content.length+'aaa'+ id);
        var imgUrl = itemData.abstract.image[0];
        let urlFormate = '';
        if(imgUrl) {
             urlFormate = this._urlFormate(imgUrl);
        }
        if(content.length > 150){
            return (
                <li className="cnt-list">
                    <div className="typeNews">
                        <a className="text" id={"a"+itemData.id}>
                            <h2 className="short" id={"h2"+itemData.id}>{itemData.abstract.text}</h2>
                            <button onClick={this._changeText.bind(this,this.props.itemData.id)} id={'111' + itemData.id} className="buttonS">展开</button>
                            <div className="threeImg"  onClick={this.change.bind(this,this.props.itemData.id)} id={"img"+itemData.id}>
                                <img src = {urlFormate}  className="imgSize" />
                            </div>
                            <div className="text-extra">
                                <div className="comment">{itemData.source}</div>
                                <div className="time">{transferDate(itemData.time)}</div>
                            </div>
                        </a>
                    </div>
                </li>

            )
        }
        else {
            return (
                <li className="cnt-list">
                    <div className="typeNews">
                        <a className="text" id={"a"+itemData.id}>
                            <h2 id={"ConText"+itemData.id}>{itemData.abstract.text}</h2>
                            <div className="threeImg"  onClick={this.change.bind(this,this.props.itemData.id)} id={"img"+itemData.id}>
                                <img src = {urlFormate}  className="imgSize" />
                            </div>
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
}

export default OneItem;