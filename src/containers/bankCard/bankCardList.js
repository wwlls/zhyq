import React, { Component } from 'react';
import { Button } from 'antd-mobile';
import Utils from 'utils';
import './bankCardList.scss';

class BankCardList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  
  componentDidMount = () => {
  }

  render = () => {
    let { mask, bankName } = this.props;
    return (
      <div> 
        {
          mask 
          ?
          <div className="bank_card_list">
            <div className="bank_card_list_head">
              <span>请选择银行</span>
              <img src={require('static/img/icon/close.png')} />
            </div>
            <div className="bank_card_list_main">
              <ul>
                <li>
                  <img src={require(`static/img/bank/${bankName}.png`)} />
                  <span>北京银行</span>
                </li>
              </ul>
            </div>
          </div>
          : 
          null
        }
      </div>
    )
  }
}

export default BankCardList;