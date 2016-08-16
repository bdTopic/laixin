import React, { Component } from 'react';
import $ from 'jquery';
require('./test.less');

class Component1 extends Component {

    render() {
        return (
            <li className="cnt-list">
                 <a href="" className="typeNews">
                    <div className="img">
                        <img src="test.png" alt=""/>
                    </div>
                    <div className="text">
                        <h2>
                            茶艺表演 红茶 绿茶
                        </h2>
                    </div>
                     <div className="text-extra">
                         <div className="pv">111阅读</div>
                         <div className="comment">0评论</div>
                        <div className="time">06-20 12:01</div>
                    </div>
                  </a>
             </li>
    )
    }
}

export default Component1;