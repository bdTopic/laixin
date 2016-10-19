import React, { Component } from 'react';
import ThreeItem from './component/itemThree/threeItem';
import NewOne from './component/newOne/newOne';
import ItemOne from './component/itemOne/oneItem';
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
            tipsContent:'',
            topicid:'',
            is_login:''
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
    _setInfo=(title,imgUrl,description,is_login)=>{
        this.setState({title:title,imgUrl:imgUrl,description:description,is_login:is_login});
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
    _filterId=(item)=>{
        if (item.abstract.image.length===0){
            return false;
        }
        else
            return true;
    }
    //加载数据 nj02-bccs-rdtest05.nj02.baidu.com:8082/doug/public/articlelist?version=1.0&topicid=4086764444&ischecked=1
    //测试 三张图片 http://nj02-bccs-rdtest05.nj02.baidu.com:8082/doug/public/articlelist?version=1.0&ischecked=0&topicid=1813627663
    //  let url =  'http://just.baidu.com/doug/public/articlelist?version=1.0&ischecked=0&topicid=';
    initData=()=>{
        let url =  'http://just.baidu.com/doug/public/articlelist?version=1.0&ischecked=1&topicid=';
        url+=query.topicid;
        let setState = this._setState.bind(this);
        let filterId = this._filterId.bind(this);
        if(this.state.maxIndex!=='-1') {
            url += '&index=' + this.state.maxIndex;
        }
       // console.log(this.state.maxIndex+"@111");
        this.serverRequest = $.ajax({
            type: "GET",
            url: url,
            dataType: "jsonp",
            success : function(data){
                //if(data!='')
                if(data.errno){
                    console.log('已经到底了');
                    $('.dropload-down').hide();
                    $('.mth-toast-down').show();
                }
                else{
                    if(query.topicid=="4086764444"){
                        setState(data.response_params.article_list.filter(filterId));
                    }
                    else
                        setState(data.response_params.article_list);

                }

               // $('.dropload-down').hide();
            },
            error:  function(data){
                console.error('error');
                console.error(data);
            }
        });
    }
    initHeader=()=>{
        let self = this;
        let url = 'http://just.baidu.com/restapi/public/topicmeta?version=1.0&topicid=';
        url+= query.topicid;
        //console.log(url+"@@@@@@000");
        self.setState({topicid:query.topicid});
        //console.log(this.state.topcid);
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
                    var is_login = data.response_params.is_login;
                    var third_id = data.response_params.third_id;
                    var is_readable = data.response_params.is_readable;
                    self.____islogin = is_login;
                    self.third_Id = third_id;
                    self.isreadable = is_readable;
                    //console.log(self.third_Id);
                    //console.log(self.____islogin);
                    setInfo(title,imgUrl,description,is_login);
                    self.getfouusStatus();
                }

            }
        })
    }
    getfouusStatus = ()=>{
        let buttonColor = this._buttonColor.bind(this);
        let url = 'http://ext.baidu.com/api/subscribe/v1/relation/get?type=card&sfrom=laixin&source=laixin_detail&store=uid_cuid&is_login=';
        let setStatus = this._setStatus.bind(this);
        let setStatusHavent = this._setStatusHavent.bind(this);
        let islogin = this.____islogin;
        let thirdId = this.third_Id;
        console.log("thirdid"+thirdId);
        console.log(this.____islogin);
        let urltopicId = '&third_id='+thirdId;
        url+=islogin;
        url+=urltopicId;
        console.log(url+"@@@@")
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
        let url = 'http://ext.baidu.com/api/subscribe/v1/relation/receive?type=card&sfrom=laixin&source=laixin_detail&store=uid_cuid&op_type=';
        let setStatus = this._setStatus.bind(this);
        let setStatusHavent = this._setStatusHavent.bind(this);
        let optType = this.state.foucebool;
        let showTips = this._showTips.bind(this);
        let islogin = this.____islogin;
        let thirdId = this.third_Id;
        let urlid = '&is_login='+islogin+'&third_id='+thirdId;
        url += optType;
        url += urlid;
        console.log("asdfasf"+url);
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

        this.bindScrollListener();
       // console.log(this.props.entryProps);

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
        let getUrlParm = this.props.getUrlParm;
        let topcid = this.state.topicid;
        let is_readable = this.isreadable;
        //console.log(is_readable);
        let rows = articleList.map(function (item) {
            let len = item.abstract.image.length;
            let id = item.id;
            let url = item.url;
            let source = item.source;
            if (len <= 1) {//一张图片的情况
                return(
                    <ItemOne itemData={item} key={item.id}  geUrlParm={getUrlParm} id={id} url={url} topcid={topcid} is_readable={is_readable} ></ItemOne>
                );
            }
            else if (len >= 2) {//2张及以上图片的情况
                return(
                    <ThreeItem itemData={item} key={item.id}  geUrlParm={getUrlParm} id={id} url={url} topcid={topcid} source={source} is_readable={is_readable}></ThreeItem>
                );
            }
        });

        return (
            <div className="bodyCon">
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