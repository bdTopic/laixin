import React, { Component } from 'react';
import {transferDate} from '../../util/util'
require('./oneItem.less');

class OneItem extends Component {

    render() {
        let itemData = this.props.itemData;
        let host = document.domain;
        let id2 = this.props.id;
        let url = this.props.url;
        let topicid =this.props.topcid;
        let source = this.props.itemData.source;
        let source1 = '百思不得其解';
        let sourceName = encodeURI(source);
        let detailUrl = "http://"+host+"/doug/public/bdarticle?version=1&articleid="+id2+"&topicid="+topicid+"&url="+url+"&source="+sourceName;
        //console.log(detailUrl+'999999');
        if(itemData.abstract.image.length>0){
            return (
                <li className="cnt-list">
                    <a href={detailUrl} className="typeNews">
                        <div className="img" style={{backgroundImage : 'url(' + itemData.abstract.image[0] + ')'}}>

                        </div>
                        <div className="texts">
                            <h2>{itemData.abstract.text}</h2>
                            <div className="text-extra">
                                <div className="comment">{itemData.source}</div>
                                <div className="time">{transferDate(itemData.time)}</div>
                            </div>
                        </div>
                    </a>
                </li>

            )
        }
        else {
            return (
                <li className="cnt-list">
                    <a href={detailUrl} className="typeNews">
                        <div className="texts">
                            <h2>{itemData.abstract.text}</h2>
                            <div className="text-extra">
                                <div className="comment">{itemData.source}</div>
                                <div className="time">{transferDate(itemData.time)}</div>
                            </div>
                        </div>
                    </a>
                </li>

            )
        }


    }
}

export default OneItem;