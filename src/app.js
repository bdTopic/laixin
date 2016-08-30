import React, { Component } from 'react';
import ThreeItem from './component/itemThree/threeItem';
import OneItem from './component/itemOne/oneItem';
import NewOne from './component/newOne/newOne';
import $ from 'jquery';
import {getBrowserInfo} from './util/util';
require('./app.less');

let query ={};
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
            foucebool:''
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
            console.log('maxIndex=' + maxIndex);
            this.setState({maxIndex: maxIndex});
            this.setState({articleList: preArticleList});
        }
    }
    //TODO 通用设置传参数 传参顺序无关
    _setInfo=(title,imgUrl,description)=>{
        this.setState({title:title,imgUrl:imgUrl,description:description});
    }
    _setStatus=()=>{
        this.setState({fouceStauts:'已关注',foucebool:'cancel'})
    }
    _setStatusHavent=()=>{
        this.setState({fouceStauts:'关注',foucebool:'add'})
    }
    //加载数据 nj02-bccs-rdtest05.nj02.baidu.com:8082/doug/public/articlelist?version=1.0&topicid=4086764444&ischecked=1
    initData=()=>{
        let url =  'http://nj02-bccs-rdtest05.nj02.baidu.com:8082/doug/public/articlelist?version=1.0&ischecked=1&topicid=';
        console.log(query.topicid);
        url+=query.topicid;
        let setState = this._setState.bind(this);
        if(this.state.maxIndex!=='-1') {
            url += '&index=' + this.state.maxIndex;
        }
        console.log(url);
        this.serverRequest = $.ajax({
            type: "GET",
            url: url,
            dataType: "jsonp",
            success : function(data){
                console.log('data');
                console.log(data);
                setState(data.response_params.article_list);
            },
            error:  function(data){
                console.error('error');
                console.error(data);
            }
        });
    }
    initHeader=()=>{
        let url = 'http://just.baidu.com/restapi/public/topicmeta?version=1.0&topicid=';
        url+=query.topicid;
        let setInfo = this._setInfo.bind(this);
        this.serverRequestHeader = $.ajax({
            type: "GET",
            url: url,
            dataType: "jsonp",
            success : function(data){
                // console.log(data);
                if(data.response_params.topic_list.length > 0){
                    var title = data.response_params.topic_list[0].title;
                    var imgUrl = data.response_params.topic_list[0].logo.small;
                    var description = data.response_params.topic_list[0].description;
                    setInfo(title,imgUrl,description);
                }

            }
        })
    }
    getfouusStatus = ()=>{
        let url = 'http://cq01-duwei04.epc.baidu.com:8220/api/subscribe/v1/relation/get?type=card&sfrom=sbox&third_id=6000';
        let setStatus = this._setStatus.bind(this);
        let setStatusHavent = this._setStatusHavent.bind(this);
        this.serverRequestHeader = $.ajax({
            type: "GET",
            url: url,
            dataType: "jsonp",
            success : function(data){
                JSON.stringify(data);
                if(data.data.items.length > 0){
                    setStatus();
                    console.log('已关注');
                }
                else {
                    setStatusHavent();
                    console.log('未关注');
                }

            }
        })
    }

    focusTopic=()=>{
        let url = 'http://cq01-duwei04.epc.baidu.com:8220/api/subscribe/v1/relation/receive?type=card&sfrom=sbox&third_id=6000&op_type=';
        let setStatus = this._setStatus.bind(this);
        let setStatusHavent = this._setStatusHavent.bind(this);
        let optType = this.state.foucebool;
        url += optType;
        console.log(url);
        this.serverRequestHeader = $.ajax({
            type: "GET",
            url: url,
            dataType: "jsonp",
            success : function(data){
                console.log(data);
                //JSON.stringify(data);
                console.log(url);
                if(data.errno === 0){
                    // console.log(this.state.foucebool);
                    if(optType == 'add'){
                        console.log('add');
                        setStatus()
                    }
                    else if(optType == 'cancel'){
                        console.log('cancel');
                        setStatusHavent();
                    }
                }
                else {
                    console.log('点击没返回成功');
                }

            }
        })
    }
    //添加滚动监听事件
    bindScrollListener = () =>{
        let initData = this.initData.bind(this);
        $(window).scroll(function(){
            var scrollTop = $(this).scrollTop();
            var scrollHeight = $(document).height();
            var windowHeight = $(this).height();
            if(scrollTop + windowHeight == scrollHeight){
                initData();
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
        console.log('parm='+JSON.stringify(queryObj));
        query = queryObj;
    }
    componentDidMount = () => {
        this.getUrlParm();
        this.initData();
        this.initHeader();
        this.getfouusStatus();
        this.bindScrollListener();

    }
    componentDidUpdate = () => {
       // console.log(document.querySelectorAll('img'))
        window.BoxJS.updateImageViewer();
    }
    componentWillUnmount = () => {
        this.serverRequest.abort();
        this.serverRequestHeader.abort();
    }

    render() {
        let articleList = this.state.articleList;
        let title = this.state.title;
        let imgUrl = this.state.imgUrl;
        let description = this.state.description;
        let fouceStauts = this.state.fouceStauts;
        let rows = articleList.map(function (item) {
            let len = item.abstract.image.length;
            if (len <= 1) {//一张图片的情况
                return(
                    <NewOne itemData={item} key={item.id}></NewOne>
                );
            }
            else if (len >= 2) {//2张及以上图片的情况
                return(
                    <ThreeItem itemData={item} key={item.id}></ThreeItem>
                );
            }
        });
        return (
            <div>
                <div className="list-head">
                    <div className="pageHeader">
                        <div className="imgbg">
                            <img src={imgUrl} id="topicImg"/>
                        </div>
                        <div className="msg">
                            <div className="fontheader">
                                <h1 className="title" id="topTitle">{title}</h1>
                            </div>
                            <span className="description" id="fansPeople">{description}</span>
                        </div>
                        <div className="operation">
                            <div className="normal follow trblBor" onClick={this.focusTopic}>
                                {fouceStauts}
                            </div>
                        </div>

                    </div>
                </div>
                <div className="content">{rows}</div>
            </div>
        )
    }
}
export default App;