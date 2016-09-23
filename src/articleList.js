import React, { Component } from 'react';
import ThreeItem from './component/itemThree/threeItem';
import NewOne from './component/newOne/newOne';
import Article from './component/article/article';
import Detail from './articleDetail';
import $ from 'jquery';
import ReactPullToRefresh from 'react-pull-to-refresh';
import {getVersion} from './util/util';
import {cmpVersion} from './util/util';
require('./app.less');

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
            tipsContent:''
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
    //TODO 通用设置传参数 传参顺序无关
    _setInfo=(title,imgUrl,description)=>{
        this.setState({title:title,imgUrl:imgUrl,description:description});
    }
    _setStatus=()=>{
        this.setState({fouceStauts:'已关注',foucebool:'cancel',tipsContent:'关注成功,在"我的关注"中可查看'})
    }
    _setStatusHavent=()=>{
        this.setState({fouceStauts:'关注',foucebool:'add',tipsContent:'已取消关注'})
    }

    _setNewVersion=()=>{
        this.setState({fouceStauts:'已关注',foucebool:'cancel',tipsContent:'关注成功,在"关注"中可查看'})
    }
    //加载数据 nj02-bccs-rdtest05.nj02.baidu.com:8082/doug/public/articlelist?version=1.0&topicid=4086764444&ischecked=1
    initData=()=>{
        let url =  'http://just.baidu.com/doug/public/articlelist?version=1.0&ischecked=1&topicid=';
        url+=query.topicid;
        let setState = this._setState.bind(this);
        if(this.state.maxIndex!=='-1') {
            url += '&index=' + this.state.maxIndex;
        }
        this.serverRequest = $.ajax({
            type: "GET",
            url: url,
            dataType: "jsonp",
            success : function(data){
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
        let buttonColor = this._buttonColor.bind(this);
        let url = 'http://ext.baidu.com/api/subscribe/v1/relation/get?type=card&sfrom=laixin&third_id=6000&source=laixin_detail&store=uid_cuid';
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
                    buttonColor();
                }
                else {
                    setStatusHavent();
                    buttonColor();
                }

            }
        })
    }
    _buttonColor = ()=>{
        let buttonMsg = this.state.fouceStauts;
        if(buttonMsg=='已关注'){
            $('#buttonCSS').removeClass('follow');
            $('#buttonCSS').addClass('cssafer');
        }
        else if(buttonMsg=='关注'){
            $('#buttonCSS').removeClass('cssafer');
            $('#buttonCSS').addClass('follow');
        }
    }

    _showTips = ()=>{
        let toastHtml = '<span class="mth-follow-toast mth-toast-follow"></span>';
         if($('.mth-follow-toast').length==0){
             $('body').append(toastHtml);
         }
        let toastContent = this._toastContent.bind(this);
        toastContent();
    }
    _toastContent = ()=>{

        let msg = this.state.tipsContent;

        let $toast = $('.mth-toast-follow');

        $toast.text(msg);

        var _leftnew = (window.innerWidth - $toast[0].offsetWidth) / 2;
        $toast.css('left',_leftnew);
        //显示隐藏
        $toast.addClass('mth-toast-show');
       setTimeout(function () {
            $toast.removeClass('mth-toast-show');
        }, 1888);
    }

    focusTopic=()=>{
        let buttonColor = this._buttonColor.bind(this);
        let url = 'http://ext.baidu.com/api/subscribe/v1/relation/receive?type=card&sfrom=laixin&third_id=6000&source=laixin_detail&store=uid_cuid&op_type=';
        let setStatus = this._setStatus.bind(this);
        let setStatusHavent = this._setStatusHavent.bind(this);
        let optType = this.state.foucebool;
        let showTips = this._showTips.bind(this);
        url += optType;
        console.log(url);
        let setNewVersion = this._setNewVersion.bind(this);
        //获取版本号:
        let version = getVersion();
        let str2 = '7.7.0.0';
        let result = cmpVersion(version,str2);
        if(result == -1){
            this.serverRequestHeader = $.ajax({
                type: "GET",
                url: url,
                dataType: "jsonp",
                success : function(data){
                    if(data.errno === 0){
                        // console.log(this.state.foucebool);
                        if(optType == 'add'){
                            _hmt.push(['_trackEvent', '点击关注', 'click']);
                            setStatus();
                            showTips();
                            buttonColor();
                        }
                        else if(optType == 'cancel'){
                            _hmt.push(['_trackEvent', '取消关注', 'click']);
                            setStatusHavent();
                            showTips();
                            buttonColor();
                        }
                    }
                    else {
                        console.log('点击没返回成功');
                    }

                }
            })
        }
        else{
            this.serverRequestHeader = $.ajax({
                type: "GET",
                url: url,
                dataType: "jsonp",
                success : function(data){
                    if(data.errno === 0){
                        // console.log(this.state.foucebool);
                        if(optType == 'add'){
                            _hmt.push(['_trackEvent', '点击关注', 'click']);
                            setNewVersion();
                            showTips();
                            buttonColor();
                        }
                        else if(optType == 'cancel'){
                            _hmt.push(['_trackEvent', '取消关注', 'click']);
                            setStatusHavent();
                            showTips();
                            buttonColor();
                        }
                    }
                    else {
                        console.log('点击没返回成功');
                    }

                }
            })
        }

    }
    //添加滚动监听事件
    bindScrollListener = () =>{
        let initData = this.initData.bind(this);
        $(window).scroll(function(){
            var scrollTop = $(this).scrollTop();
            var scrollHeight = $(document).height();
            var windowHeight = $(this).height();
            if(scrollTop + windowHeight == scrollHeight){
                // TODO 此处添加加载更多动画, 在数据加载完成之后取消动画
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
        //console.log('parm='+JSON.stringify(queryObj));
        query = queryObj;
    }
    componentDidMount = () => {
        this.getUrlParm();
        this.initData();
        this.initHeader();
        this.getfouusStatus();
        this.bindScrollListener();
        console.log(this.props.entryProps);

    }
    componentDidUpdate = () => {
       // console.log(document.querySelectorAll('img'))
       // window.BoxJS.updateImageViewer();
    }
    componentWillUnmount = () => {
        this.serverRequest.abort();
        this.serverRequestHeader.abort();
    }
    handleSwipe (event) {

        alert('swipe..'+event.direction);
    }
    render() {
        let articleList = this.state.articleList;
        let title = this.state.title;
        let imgUrl = this.state.imgUrl;
        let description = this.state.description;
        let fouceStauts = this.state.fouceStauts;
        let tipsContent = this.state.tipsContent;
        let entryProps = this.props.entryProps;
        let switchEntry = this.props.switchEntry;
        let getUrlParm = this.props.getUrlParm;
        let rows = articleList.map(function (item) {
            let len = item.abstract.image.length;
            let id = item.id;
            let url = item.url;
            if (len <= 1) {//一张图片的情况
                return(
                    <NewOne itemData={item} key={item.id}  entryProps={entryProps} switchEntry={switchEntry} geUrlParm={getUrlParm} id={id} url={url}></NewOne>
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
                <div className="mth-author">
                    <div className="mth-author-head">
                        <div className="author-info">
                            <div className="author">
                                <img src={imgUrl} id="topicImg"/>
                            </div>
                            <div className="headerMsg">
                                <h1 className="title" id="topTitle">{title}</h1>
                                <div className="author-data">
                                    <span className="description" id="fansPeople">{description}</span>
                                </div>
                            </div>
                            <div className="HeaderOperation">
                                <div className="normal trblBor" onClick={this.focusTopic} id="buttonCSS">
                                    {fouceStauts}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="content">{rows}</div>
                <div className="dropload-down">
                    <div className="dropload-load">
                        <span className="loading"></span>内容加载中</div>
                </div>

            </div>
        )
    }
}
export default App;