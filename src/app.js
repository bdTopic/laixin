import React, { Component } from 'react';
import ThreeItem from './component/itemThree/threeItem';
import NewOne from './component/newOne/newOne';
import Article from './articleList';
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
            entryComponent: Article,
            entryProps: {
                topicId: query.topicid
            },
        };

        this.switchEntry = this.switchEntry.bind(this);
        this.getUrlParm = this.getUrlParm.bind(this);
    }

    switchEntry(type, params) {
        console.log(type);
        switch (type) {
            case 'list':
                this.setState({
                    entryComponent: Article
                });
                break;
            case 'detail':
                this.setState({
                    entryComponent: Detail
                });
        }
    }
    componentDidMount = () => {
        this.getUrlParm();
        let url = document.location.href;
        if(/topicid/.test(url)){
           // switchEntry('list', {topicId:query.topicId});
            console.log('12313');
        }

    }

    renderArticle({type, data}) {
        let dom;
        switch (type) {
            case 'text':
                dom = <span>{data}</span>;
                break;
            case 'image':
                dom
        }
        return dom;
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

    componentDidUpdate = () => {
       // console.log(document.querySelectorAll('img'))
       // window.BoxJS.updateImageViewer();
    }
    componentWillUnmount = () => {
        this.serverRequest.abort();
        this.serverRequestHeader.abort();
    }

    render() {
        let Entry =this.state.entryComponent;
        let entryProps = this.state.entryProps;

        return (

            <Entry entryProps={entryProps} switchEntry={this.switchEntry} geUrlParm={this.getUrlParm}/>

        )
    }
}
export default App;