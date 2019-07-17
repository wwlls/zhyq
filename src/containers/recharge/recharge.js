import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { InputItem, Button, Modal } from 'antd-mobile';
import Utils from 'utils';
import Tools from 'utils/tools'
import './recharge.scss';

const prompt = Modal.prompt;

class Recharge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pathname: Tools.getUrlParam('pathname') !== null ? Tools.getUrlParam('pathname') : '',
      disabled: true,
      submit: '确认充值',
      money: 0,
      type: 2,
    }
  }
  
  componentDidMount = () => {
    document.title = '充值';
  }

  changeRecharge = (e) => {
    console.log(e)
    if (e >= 50) {
      this.setState({
        disabled: false,
        money: e,
      })
    }
  }

  onSubmit = () => {
    let { money, pathname, type } = this.state
    prompt('请输入短信验证码', '', [
      { text: '确定', onPress: (value) => {
          if (value === '') {
            alert('11')
          } else {
            this.props.history.push(`/result?pathname=${pathname}&type=${type}`)
          }
        }
      },
    ])
  }

  render = () => {
    let { disabled, submit } = this.state
    return ( 
      <div className="recharge">
        <div className="recharge_main">
          <InputItem type="digit" placeholder="请输入50元及以上的充值金额" onChange={this.changeRecharge}></InputItem>
          <div className="recharge_money">
            账户可用余额：<span>{Tools.isNumeral(0)}元</span>
          </div>
          <div className="recharge_money_btn">
            <Button className={disabled ? "disabled" : "enabled"} disabled={disabled} onClick={this.onSubmit}>
              {submit}
            </Button>
          </div>
          <div className="recharge_money_foot">
            <Link className="cash_rule" to={'/bankRule'}>银行卡规则</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Recharge;