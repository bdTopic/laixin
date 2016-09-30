import React, { Component } from 'react';
import ThreeItem from './component/itemThree/threeItem';
import NewOne from './component/newOne/newOne';
import Article from './component/article/article';
import $ from 'jquery';
import ReactPullToRefresh from 'react-pull-to-refresh';
import {getVersion} from './util/util';
import {cmpVersion} from './util/util';
require('./app.less');
import {transferDate} from './util/util';
let myTestData = '{"errno":"0","data":{"site":"www.budejie.com","title":"\u6709\u56fe\u6709\u771f\u76f8\uff1a\u62ef\u6551\u4e86\u4e0a\u5e02\u516c\u53f8\u7684\u90a3\u4e24\u5957\u5b66\u533a\u623f\u957f\u5565\u6837\uff1f","time":1474545268,"desc":"","SmartNewsApp":{"content":[{"type": "text","data": "作为多年的“球迷”（足球的那个球，不是别的），胖编今天看到这个消息时，也是有点醉了。"},{"type": "image","data": {"original": {"url":"http://img1.cache.netease.com/cnews/2016/9/18/20160918175955d5888_550.jpg","width": 550,"height": 315}}},{"type": "text","data": "作为多年的“球迷”（足球的那个球，不是别的），胖编今天看到这个消息时，也是有点醉了。"},{"type": "image","data": {"original": {"url":"http://img1.cache.netease.com/cnews/2016/9/18/20160918175955d5888_550.jpg","width": 550,"height": 315}}},{"type": "image","data": {"original": {"url":"http://img1.cache.netease.com/cnews/2016/9/18/20160918175955d5888_550.jpg","width": 550,"height": 315}}}]},"NewsWebApp":{"content":[{"type": "text","data": "作为多年的“球迷”（足球的那个球，不是别的），胖编今天看到这个消息时，也是有点醉了。"},{"type": "image","data": {"original": {"url":"http://img1.cache.netease.com/cnews/2016/9/18/20160918175955d5888_550.jpg","width": 550,"height": 315}}}]},"NewsNativeApp":{"content":[{"type": "text","data": "作为多年的“球迷”（足球的那个球，不是别的），胖编今天看到这个消息时，也是有点醉了。"},{"type": "image","data": {"original": {"url":"http://img1.cache.netease.com/cnews/2016/9/18/20160918175955d5888_550.jpg","width": 550,"height": 315}}}]}}}';

let query ={};
let count = 1;
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articleList: [],
            articleTitle: '',
            articleTime:'',
            topicTitle:'',
            topicImg:'',
            description:'',
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
        return query;
    }

    renderArticle = (type, data, key)=> {
        let dom;
        switch (type) {
            case 'text': {
                let key2 = Math.random();
                dom =<p  key={key2} className="pArt"> <span key={key} className="conArt">{data}</span></p>;
                break;
            }
            case 'image':{
                let key3 = Math.random();
                dom =<p key={key3} className="pArt"> <img key={key} src={data.original.url} className="imgArt"/></p>;
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
    initHeader=()=>{
        let self = this;
        let url = '/restapi/public/topicmeta?version=1.0&topicid=';
        url+=query.topicid;
        this.serverRequestHeader = $.ajax({
            type: "GET",
            url: url,
            dataType: "jsonp",
            success : function(data){
                // console.log(data);
                if(data.response_params.topic_list.length > 0){
                    var title = data.response_params.topic_list[0].title;
                    var imgUrl = data.response_params.topic_list[0].logo.small;
                    self.setState({topicTitle:title});
                    self.setState({topicImg:imgUrl});
                }

            }
        })
    }

    getContent = () =>{
        var self= this;
       //console.error(JSON.parse(myTestData));
       /*let testData = JSON.parse(myTestData);
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

       let url = '/proxy/preview/n?m=app&v=focusdetail&tnp=json&url=';
        url+=query.url;
        console.log(url);
        this.serverRequestHeader = $.ajax({
            type: "GET",
            url: url,
            dataType: "json",
            success : function(input){
                console.log(input);
                 let smartNewsApp = input.data.SmartNewsApp;
                 // let newsWebApp = input.data.NewsWebApp;
                 // let newsNativeApp = input.data.NewsNativeApp;
                 console.log(smartNewsApp);

                 self.setState({contentDom: self.getContentDom(smartNewsApp)});
                 self.setState({articleTitle:input.data.title});
                 self.setState({articleTime:input.data.time});
                console.log(self.state.articleTitle);
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
        this.initHeader();

    }

    render() {
        let source = query.source;
        let sourceName = decodeURI(source);
        console.log(sourceName);
        return (
            <div className="pageWrapper">
                <h1 className="mth-header">{this.state.articleTitle}</h1>
                <h3 className="mth-extra-info">
                    <div className="auAticle">
                        <a href="" className="author-level">
                            <img src={this.state.topicImg} alt=""/>
                        </a>
                    </div>
                    <div className="detail">
                        <div className="topicName">
                            <a href="" className="hrefName">{this.state.topicTitle}</a>
                        </div>
                        <div className="info">
                            <span className="mr5p">{sourceName}</span>
                            <span className="year">{transferDate(this.state.articleTime)}</span>
                        </div>
                    </div>
                </h3>
                <div className="mth-editor-content">
                    {this.state.contentDom}
                </div>
                <footer  className="footer">
                    <h2>版权声明</h2>
                    <p>本文由百度转码生成，版权归原文著作权人享有。</p>
                    <p>如涉版权问题及其他疑问请联系:shoujibaidu@baidu.com</p>
                </footer>
            </div>
        )
    }
}
export default App;