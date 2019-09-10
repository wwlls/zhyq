import React, { Component } from 'react';
import PullLoad from 'component/pullLoad/pullLoad';
import './agreement.scss';

class Agreement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: []
    }
  }
  
  componentDidMount = () => {
    document.title = '协议'
    this.initData()
    initData = () => {
      // 获取借款中的借款标列表,如果已登录在本地保存登录状态
      Utils.postRequest(Api.getBidList, {}).then((data) => {
          let list = data.list;
          this.setState({
              productList: list
          });
      });
  };
  }

  render = () => {
    return ( 
      <div className="">
        <PullLoad />
      </div>
    )
  }
}

export default Agreement;