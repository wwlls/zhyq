import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { InputItem, Button, Modal } from 'antd-mobile';
import Utils from 'utils';
import Tools from 'utils/tools'
import './cash.scss';

const prompt = Modal.prompt;

class Cash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      submit: '确认提现',
      money: 0,
      type: 3,
    }
  }
  
  componentDidMount = () => {
    document.title = '提现';
  }

  changeCash = (e) => {
    console.log(e)
    if (e >= 50) {
      this.setState({
        disabled: false,
        money: e,
      })
    }
  }

  onSubmit = () => {
    let { money, type } = this.state
    prompt('请输入交易密码', '', [
      { text: '确定', onPress: (value) => {
          if (value === '') {
            alert('11')
          } else {
            this.props.history.push(`/result?type=${type}`)
          }
        }
      },
    ])
  }

  render = () => {
    let { disabled, submit } = this.state
    return ( 
      <div className="cash">
        <div className="recharge_main">
          <InputItem type="digit" placeholder="请输入50元及以上的提现金额" onChange={this.changeCash}></InputItem>
          <div className="recharge_money">
            账户可用余额：<span>{Tools.isNumeral(0)}元</span>
          </div>
          <div className="recharge_money_btn">
            <Button className={disabled ? "disabled" : "enabled"} disabled={disabled} onClick={this.onSubmit}>
              {submit}
            </Button>
          </div>
          <div className="recharge_money_foot">
            <Link className="cash_rule">了解取现规则</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Cash;