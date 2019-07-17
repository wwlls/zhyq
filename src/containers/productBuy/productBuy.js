import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { List, InputItem, Button, Toast, Modal } from 'antd-mobile';
import { createForm } from 'rc-form';
import Utils from 'utils';
import Tools from 'utils/tools';
import './productBuy.scss';

const Item = List.Item;
const alert = Modal.alert;
const prompt = Modal.prompt;

class ProductBuyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      submit: '确认出借',
      money: 1000,
      pathname: 'productDetail',
      type: 1
    }
  }
  
  componentDidMount = () => {
    document.title = '90天标的产品第2期';
  }

  changeMoney = (e) => {
    console.log(e)
    if (e >= 100) {
      this.setState({
        disabled: false,
        buyMoney: e
      })
    }
  }

  // 充值
  handelRecharge = () => {
    let { pathname } = this.state;
    this.props.history.push(`recharge?pathname=${pathname}`)
  }

  onSubmit = () => {
    let { buyMoney, money, pathname, type } = this.state;
    if (parseFloat(money) < parseFloat(buyMoney)) {
      alert('', '您的账户余额不足，请充值后再出借', [
        { text: '取消', onPress: () => console.log('cancel')},
        { text: '去充值', onPress: () => this.props.history.push(`recharge?pathname=${pathname}`) },
      ]);
    } else {
      prompt('请输入交易密码', '', [
        { 
          text: '确定', 
          onPress: password => new Promise((resolve, reject) => {
            Toast.info('onPress promise reject', 1);
            setTimeout(() => {
              reject();
              console.log(`value:${value}`);
            }, 1000);
          }) 
        },
      ], 'secure-text',)
    }
  }

  render = () => {
    const { getFieldProps, getFieldError } = this.props.form
    let { disabled, submit, money} = this.state
    return ( 
      <div className="productBuy">
        <div className="product_buy_head">
          <div className="head_size">出借金额(剩余可投{Tools.isNumeral(1000000.00)}元)</div>
          <div className="head_input">
            <span>¥</span>
            <InputItem className="changeMoney" type="digit" placeholder="请输入100元起" onChange={this.changeMoney} ></InputItem>
          </div>
        </div>
        <div className="product_buy_main">
          参考收益：<span>{Tools.isNumeral(0.00)}</span>元
        </div>
        <div className="product_buy_pic">
          <ul>
            <li>
              <div className="product_buy_pic_left">
                <img src={require('static/img/product/money.png')} />
                <span>账户余额  ¥{Tools.isNumeral(money)}</span>
              </div>
              <div className="product_buy_pic_right">
                <Button onClick={this.handelRecharge}>充值</Button>
              </div>
            </li>
          </ul>
        </div>
        <div className="product_buy_btn">
          <Button className={disabled ? "disabled" : "enabled"} disabled={disabled} onClick={this.onSubmit}>
            {submit}
          </Button>
        </div>
     </div>
    )
  }
}

const ProductBuy = createForm()(ProductBuyForm);
export default ProductBuy;