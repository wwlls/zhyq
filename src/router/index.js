import React, { Component } from 'react';
import { BrowserRouter, HashRouter, Router, Route, Switch, Redirect } from 'react-router-dom';
import history from 'utils/history'; 
import Loadable from 'react-loadable'
// 通用的过场组件
const Loading = () =>{ 
    return (
        <div></div>
    ) 
}

let loadable = (component) => {
    return Loadable({  
        loader: () => import(`../containers/${component}`), 
        loading: Loading //loading属性必须有
    })
}


// 首页
const Home = loadable('home/home')
// 列表
const CapitalList = loadable('capitalList/capitalList')
// 协议
const Agreement = loadable('agreement/agreement')

class RouterMap extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/home" exact component={ Home } />
          <Route path="/capitalList" component={ CapitalList } />
          <Route path="/agreement" component= { Agreement } />
          <Redirect to="/home" />
        </Switch>
      </Router>
    )
  }
}

export default RouterMap;