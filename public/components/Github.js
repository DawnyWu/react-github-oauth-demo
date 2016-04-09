import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import querystring from 'querystring'
import events from 'events';
import {EventEmitter} from 'events';
import axios from 'axios';
import Avatar from 'react-avatar'

class Github extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      avatar_url: "",
      email: "",
      access_token: null
    };
  }

  componentWillUnmount() {
  }

  componentDidMount() {
  }

  githubLogin(){
    let access_token 
    let client_id = 'a4a062caf4edbc424290'
    let popWin = window.open(`https://github.com/login/oauth/authorize?client_id=${client_id}`,
                 null, "width=600,height=400")

    let code 
    let eventEmitter = new EventEmitter();

    let checkCode = () => {
      try { 
        let query = popWin.location.search.substring(1)

        code = querystring.parse(query).code

        if((typeof code)!=='undefined'){
          clearInterval(intervalId)
          popWin.close()
          eventEmitter.emit('code', code);
        }
      } catch (err){}
    }

    let intervalId = setInterval(checkCode, 1000);

    eventEmitter.on('code', (code) => {
      console.log('get code:' + code)

      axios.get(`/api/githubToken?code=${code}`)
      .then((res)=>{
        access_token = res.data.access_token
        this.setState({access_token: res.data.access_token});
        return access_token
      })
      .then((res)=>{
        axios.get(`https://api.github.com/user?access_token=${res}`)
        .then((res)=>{
           console.log('res2:'+ JSON.stringify(res))
           let {name, avatar_url, email} = res.data
           this.setState({
             name: name, avatar_url: avatar_url, email: email
           })
        })
      });
    })
  }

  render() {
    if(!this.state.access_token){
      return (
        <div className='btn btn-default' onClick={this.githubLogin.bind(this)}>Github</div>
      );
    }else{
      return (
        <div>
          <Avatar src={this.state.avatar_url}/>
          <h3>{this.state.name}</h3>
        </div>

      );      
    }
  }
}

export default Github;
