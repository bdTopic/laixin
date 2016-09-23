import React, { Component } from 'react';
import ThreeItem from './component/itemThree/threeItem';
import NewOne from './component/newOne/newOne';
import Article from './component/article/article';
import $ from 'jquery';
import ReactPullToRefresh from 'react-pull-to-refresh';
import {getVersion} from './util/util';
import {cmpVersion} from './util/util';
require('./app.less');
let myTestData = '{"errno":"0","data":{"site":"www.budejie.com","title":"\u6709\u56fe\u6709\u771f\u76f8\uff1a\u62ef\u6551\u4e86\u4e0a\u5e02\u516c\u53f8\u7684\u90a3\u4e24\u5957\u5b66\u533a\u623f\u957f\u5565\u6837\uff1f","time":1474545268,"desc":"","SmartNewsApp":{"content":[{"type": "text","data": "作为多年的“球迷”（足球的那个球，不是别的），胖编今天看到这个消息时，也是有点醉了。"},{"type": "image","data": {"original": {"url":"http://img1.cache.netease.com/cnews/2016/9/18/20160918175955d5888_550.jpg","width": 550,"height": 315}}},{"type": "text","data": "作为多年的“球迷”（足球的那个球，不是别的），胖编今天看到这个消息时，也是有点醉了。"},{"type": "image","data": {"original": {"url":"http://img1.cache.netease.com/cnews/2016/9/18/20160918175955d5888_550.jpg","width": 550,"height": 315}}},{"type": "image","data": {"original": {"url":"http://img1.cache.netease.com/cnews/2016/9/18/20160918175955d5888_550.jpg","width": 550,"height": 315}}}]},"NewsWebApp":{"content":[{"type": "text","data": "作为多年的“球迷”（足球的那个球，不是别的），胖编今天看到这个消息时，也是有点醉了。"},{"type": "image","data": {"original": {"url":"http://img1.cache.netease.com/cnews/2016/9/18/20160918175955d5888_550.jpg","width": 550,"height": 315}}}]},"NewsNativeApp":{"content":[{"type": "text","data": "作为多年的“球迷”（足球的那个球，不是别的），胖编今天看到这个消息时，也是有点醉了。"},{"type": "image","data": {"original": {"url":"http://img1.cache.netease.com/cnews/2016/9/18/20160918175955d5888_550.jpg","width": 550,"height": 315}}}]}}}';

let query ={};
let count = 1;
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articleList: [],
            title: '',
            imgUrl:'',
            description:'',
            fouceStauts:'',
            maxIndex:'-1',
            foucebool:'',
            tipsContent:'',
            contentDom: [],
        };
    }

    _setState=(articleList)=>{
        if(articleList&&articleList.length>0) {
            let preArticleList = this.state.articleList;
            let maxIndex = this.state.maxIndex;
            let len = articleList.length;
            for (let i = 0; i <len; i++) {
                let item = articleList[i];
                maxIndex = item.index;
                preArticleList.push(item);
            }
            this.setState({maxIndex: maxIndex});
            this.setState({articleList: preArticleList});
        }
    }

    renderArticle = (type, data, key)=> {
        let dom;
        switch (type) {
            case 'text': {
                dom = <span key={key}>{data}</span>;
                break;
            }
            case 'image':{
                dom = <img key={key} src={data.original.url}/>;
                break;
            }

        }
        return dom;
    }
    getContentDom = (smartNewsApp) => {
        let doms = [];
        // 如果包括image_urls
        if(smartNewsApp.image_urls){

        }
        let key = Math.random();
        smartNewsApp.content.map(item => {
            let dom=this.renderArticle(item.type, item.data, key);
            key++;
            doms.push(dom);
        });
        // console.log(doms);
        return doms;
    }

    getContent = () =>{
       //console.error(JSON.parse(myTestData));
       /* let testData = JSON.parse(myTestData);
        let smartNewsApp = testData.data.SmartNewsApp;
         let newsWebApp = testData.data.NewsWebApp;
         let newsNativeApp = testData.data.NewsNativeApp;
        let smartNewsAppContent = this.getContentDom(smartNewsApp);
        let newsWebAppContent = this.getContentDom(newsWebApp);
        let newsNativeAppContent = this.getContentDom(newsNativeApp);

        console.log(smartNewsAppContent);
        console.log(newsWebAppContent);
        console.log(newsNativeAppContent);
        let result = smartNewsAppContent.concat(newsWebAppContent).concat(newsNativeAppContent);
        console.log(result);
        this.setState({contentDom: result});*/

        let url = 'http://just.baidu.com:/proxy/preview/n?m=app&v=focusdetail&tnp=json&url=http://www.budejie.com/detail-20814301.html';
        this.serverRequestHeader = $.ajax({
            type: "GET",
            url: url,
            dataType: "jsonp",
            success : function(input){
                console.log(input);
                 let smartNewsApp = input.data.SmartNewsApp;
                 // let newsWebApp = input.data.NewsWebApp;
                 // let newsNativeApp = input.data.NewsNativeApp;
                 console.log(smartNewsApp);

                 this.setState({contentDom: this.getContentDom(smartNewsApp)});
            },
            error:  function(data){
                console.log(data);
                // console.error('error');
                // console.error(data);
            }
        });

    }

    getUrlParm = () =>{
        var queryArr = location.search.substring(1).split("&");
        let queryObj = query;
        queryArr.map(function (item){
            item = item.split('=');
            queryObj[item[0]] = item[1];
        });
        // JSON.stringify(query);
        //console.log('parm='+JSON.stringify(queryObj));
        query = queryObj;
        console.log(query);
    }

    componentDidMount = () => {
        this.getUrlParm();
        this.getContent();

    }

    render() {

        return (
            <div className="pageWrapper">
                <h1 className="mth-header">Baby因怀孕退出跑男顶替人竟是她 来头不小</h1>
                <h3 className="mth-extra-info">
                    <div className="auAticle">
                        <a href="" className="author-level">
                            <img src="https://timg01.bdimg.com/timg?pa&imgtype=4&sec=1439619614&di=0d7f655d732f005a28bf62f7473e021b&quality=90&size=b100_100&src=http%3A%2F%2Fbos.nj.bpc.baidu.com%2Fv1%2Fmediaspot%2Fd4455914b69a26e33ee71cabf7a9c2c9.jpeg" alt=""/>
                        </a>
                    </div>
                    <div className="detail">
                        <div className="topicName">
                            <a href="" className="hrefName">每日笑话</a>
                        </div>
                        <div className="info">
                            <span className="year">2016-09-21 09:39</span>
                        </div>
                    </div>
                </h3>
                <div className="mth-editor-content">
                    {this.state.contentDom}
                </div>
            </div>
        )
    }
}
export default App;