import React, { Component, PropTypes } from 'react';
import _ from 'lodash'
import axios from 'axios';
import Avatar from 'react-avatar'
import Loader from 'react-loader'
import Item from './Item'
// 处理一下用react实现每5秒从服务器拿接口并根据数据对比更新table的内容，
// 实例可以自己写，带上注释就好 diff loading

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading: true,
      error: ""
    };
  }

  componentDidMount() {
    setInterval(this.startPolling.bind(this), 5000)
  }

  startPolling(){
    let number = _.random(0,50)
    axios.get(`http://jsonplaceholder.typicode.com/posts/${number}/comments`)
         .then( res => this.setState({items: res.data, loading: false}) )
         .catch( eror => this.setState({error: "请求失败"}) )
  }

  render() {
    if(this.state.loading){
      return <Loader loaded={!this.state.loading} ></Loader>
    }else if(this.state.error !== ""){
      {this.state.error}
    }else{
      return (
        <div>
          {_.map(this.state.items, (item, idx) => {
            return <Item key={idx} name={item.name} email={item.email}/>;
          })}
        </div>
      )      
    }
  }
}

export default List;
