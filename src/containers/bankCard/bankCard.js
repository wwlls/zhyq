import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { List, InputItem, Button, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import Utils from 'utils';
import Tools from 'utils/tools';
import BankCardList from './bankCardList';
import './bankCard.scss';

const Item = List.Item;

class BardCardForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      submit: '保存',
      mask: false,
      bankName: '北京银行',
    }
  }
  
  componentDidMount = () => {
    document.title = '添加银行卡';
  }

  // 选择银行卡
  handleChoiceBank = () => {
    this.setState({
      mask: true
    })
  }

  onSubmit = () => {
    this.props.form.validateFields({ force: true }, (error) => {
      console.log(error)
      console.log(this.props.form.getFieldsValue())
      if (!error) {
        console.log(this.props.form.getFieldsValue());
      }     
    });
  }

  render = () => {
    const { getFieldProps, getFieldError } = this.props.form
    let { disabled, submit, mask, bankName } = this.state

    return ( 
      <div>
        <form className="bankCard">
          <div className="head">
            请绑定您本人的身份证和银行卡！
          </div>
          <List className="form_list">
            <div className="form_list_head">
              <InputItem 
                {...getFieldProps('bankCard', {
                  // initialValue: 'little ant',
                  rules: [
                    { required: true, whitespace : true, message: '请输入银行卡号'},
                    { validator: this.validateBandCard },
                  ],
                })} 
                placeholder="请输入银行卡号" 
                type="bankCard"
              >
                银行卡号
              </InputItem>
              <Item>
                <div className="bank_card" onClick={this.handleChoiceBank}>
                  <div className="bank_card_left">
                    <span className="title">银行</span>
                    <span className="choice_bank">请选择银行</span>
                  </div>
                  <div className="bank_card_right">
                    <img src={require('static/img/icon/right.png')} />
                  </div>
                </div>
              </Item>
              <InputItem
                  {...getFieldProps('mobile', {
                    // initialValue: 'little ant',
                    rules: [
                      { required: true, whitespace : true, message: '请输入银行预留手机号'},
                      { validator: this.validateAccount },
                    ],
                  })}
                  placeholder="请输入银行预留手机号" 
                  type="phone"
                >
                手机号
              </InputItem>
            </div>

            <div className="form_list_foot">
              <InputItem 
                {...getFieldProps('name', {
                  // initialValue: 'little ant',
                  rules: [
                    { required: true, whitespace : true, message: '请输入真实姓名'},
                    { validator: this.validateName },
                  ],
                })} 
                placeholder="请输入真实姓名" 
                type="text"
              >
                真实姓名
              </InputItem>
              <InputItem 
                {...getFieldProps('idCard', {
                  // initialValue: 'little ant',
                  rules: [
                    { required: true, whitespace : true, message: '请输入身份证号'},
                    { validator: this.validateIdCard },
                  ],
                })} 
                placeholder="请输入身份证号码" 
                type="text"
              >
                真实姓名
              </InputItem>
            </div>
            <Item>
              <Button className={disabled ? "disabled" : "enabled"} disabled={disabled} onClick={this.onSubmit}>
                {submit}
              </Button>
            </Item>
          </List>

          <div className="foot">
            <p>外贸通向您保证，您的信息皆由第三方支付平台保管，受到加密保护，不会在任何地方泄露。</p>
            <Link className="bank_rule_href" to={'/bankRule'}>银行卡规则 ></Link>
          </div>
        </form>
        <BankCardList mask={mask} bankName={bankName} />
      </div>
    )
  }
}

const BardCard = createForm()(BardCardForm);
export default BardCard;