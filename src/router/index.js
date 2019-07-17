import React, { Component } from 'react';
import { BrowserRouter, HashRouter, Router, Route, Switch, Redirect } from 'react-router-dom';
import history from 'utils/history'; 

// 登录
import Login from '../containers/login/login';
// 修改密码
import ChangePassword from '../containers/changePassword/changePassword';
// 注册协议
import Agreement from '../containers/agreement/agreement';
// 定期列表
import Home from '../containers/home/home';
// 标的详情
import ProductDetail from '../containers/productDetail/productDetail';
// 标的购买
import ProductBuy from '../containers/productBuy/productBuy';
// 绑卡
import BankCard from '../containers/bankCard/bankCard';
// 银行卡规则
import BankRule from '../containers/bankRule/bankRule';
// 我的
import Mine from '../containers/mine/mine';
// 充值
import Recharge from '../containers/recharge/recharge';
// 取现
import Cash from '../containers/cash/cash';
// 设置
import Setting from '../containers/setting/setting';
// 个人信息
import PersonNews from '../containers/personNews/personNews';
// 出借记录
import LendList from '../containers/lendList/lendList';
// 出借详情
import LendDetail from '../containers/lendDetail/lendDetail';
// 借款人列表
import BorrowerList from '../containers/borrowerList/borrowerList';
// 资金流水
import CapitalList from '../containers/capitalList/capitalList';
// 结果页
import Result from '../containers/result/result';
import AssetList from '../containers/assetList/assetList';

class RouterMap extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/login" component= { Login } />
          <Route path="/changePassword" component= { ChangePassword } />
          <Route path="/agreement" component= { Agreement } />
          <Route path="/home" exact component={ Home } />
          <Route path="/productDetail" component={ ProductDetail } />
          <Route path="/productBuy" component={ ProductBuy } />
          <Route path="/bankCard" component={ BankCard } />
          <Route path="/bankRule" component={ BankRule } />
          <Route path="/mine" component={ Mine } />
          <Route path="/recharge" component={ Recharge } />
          <Route path="/cash" component={ Cash } />
          <Route path="/setting" component={ Setting } />
          <Route path="/personNews" component={ PersonNews } />
          <Route path="/lendList" component={ LendList } />
          <Route path="/lendDetail" component={ LendDetail } />
          <Route path="/borrowerList" component={ BorrowerList } />
          <Route path="/capitalList" component={ CapitalList } />

          <Route path="/result" component={ Result } />
          <Route path="/assetList" component={ AssetList } />
          <Redirect to="/home" />
        </Switch>
      </Router>
    )
  }
}

export default RouterMap;