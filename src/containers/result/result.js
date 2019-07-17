import React, { Component } from 'react';
import { Button } from 'antd-mobile';
import Utils from 'utils';
import Tools from 'utils/tools';
import Success from 'static/img/result/success.png';
import Fail from 'static/img/result/fail.png';
import './result.scss';

class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pathname: Tools.getUrlParam('pathname') !== null ? Tools.getUrlParam('pathname') : '',
      type: Tools.getUrlParam('type') !== null ? Tools.getUrlParam('type') : '',
      successImg: Success,
      failImg: Fail,
      size: '由于xxxxxxxxxxxxxxxxxxxx，充值失败',
      submit: '重新发起充值',
    }
  }
  
  componentDidMount = () => {
    document.title = '结果页';
  }

  render = () => {
    let { successImg, size, submit } = this.state;
    return ( 
      <div className="result">
        <img src={successImg} />
        <span>{size}</span>
        <div className="result_btn">
          <Button className="enabled" onClick={this.onSubmit}>
            {submit}
          </Button>
        </div>
      </div>
    )
  }
}

export default Result;