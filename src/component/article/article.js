import React, { Component } from 'react';
import {transferDate} from '../../util/util';
import $ from 'jquery';
import {Router} from 'react-router';
require('./article.less');
class Article extends Component {
    render(){
        return (
            <div className="pageWrapper">
                <h1 className="mth-header">Baby因怀孕退出跑男顶替人竟是她 来头不小</h1>
                <h3 className="mth-extra-info">
                    <div className="auAticle">
                        <a href="" className="author-level"></a>
                    </div>
                    <div className="detail">
                        <div className="topicName">
                            <a href="">每日笑话</a>
                        </div>
                        <div className="info">
                            <span className="year">2016-09-21</span>
                        </div>
                    </div>
                </h3>
                <div className="mth-editor-content">
                    asdfasfsdf
                    asdfsadfsafsadfsadfsad
                </div>
            </div>

        )
    }
}
export default Article;