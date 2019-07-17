import React, { Component } from 'react';
import { List, InputItem, Button, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import Utils from 'utils';
import Tools from 'utils/tools';
import CountDown from 'component/countDown/countDown';
import openEyesImg from "static/img/icon/eyes_close.png";
import closeEyesImg from "static/img/icon/eyes_open.png";
import test from 'static/img/login/test.png';
import './changePassword.scss';

const Item = List.Item;

class ChangePasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      submit: '确定',
      type: 'password',
      isEyesImg: openEyesImg,
      picCodeIMg: test,
      changeType: Tools.getUrlParam('type') !== null ? parseFloat(Tools.getUrlParam('type')) : '',
      mobile: Tools.getUrlParam('mobile') !== null ? Tools.getUrlParam('mobile') : ''
    }
  }
  
  componentDidMount = () => {
    document.title = '修改登录密码';
  }

  // button是否高亮
  buttonChange = () => {
    let { disabled, changeType  } = this.state;
    const form = this.props.form;
    let pic_code = form.getFieldValue('picCode');
    let num_code = form.getFieldValue('numCode');
    let psd_num = form.getFieldValue('password');
    if (changeType === 1 || changeType === 2) {   // 修改登录密码
      if (pic_code && num_code && Tools.checkPassword(psd_num)) {
        this.setState({
          disabled: false
        })
      } else {
        this.setState({
          disabled: true
        })
      }
    } else if (changeType === 3) {   // 修改交易密码
      let idCard = form.getFieldValue('idCard');
      if (pic_code && num_code && Tools.checkPassword(psd_num) && Tools.isIdCard(idCard)) {
        this.setState({
          disabled: false
        })
      } else {
        this.setState({
          disabled: true
        })
      }
    }
  }

  changeForm = () => {
    this.buttonChange()
  }

  // 是否显示密码
  isEyes = (e) => {
    let { type } = this.state;
    if (type === 'password') {
      this.setState({
        type: 'text',
        isEyesImg: closeEyesImg,
      })
    } else if (type === 'text') {
      this.setState({
        type: 'password',
        isEyesImg: openEyesImg,
      })
    }
  }

  // 切换图片验证码
  changePicCode = (e) => {
    console.log(e.target.getAttribute('src'))
    this.setState({
      picCodeIMg: `${e.target.getAttribute('src')}?id=${new Date().getTime()}`
    })
  }

  //获取验证码
  handelGetCode = () => {
    let { mobile } = this.state;
    if (mobile !== '' && mobile !== null && mobile != undefined) {
      this.refs.getTime.setTime();
    }
  }

  onSubmit = () => {
    this.props.form.validateFields({ force: true }, (error) => {
      console.log(error)
      console.log(this.props.form.getFieldsValue())
      if (!error) {
        console.log(this.props.form.getFieldsValue());
        // clearInterval(this.refs.getTime.clearInterval());

      }     
    });
  }

  render = () => {
    const { getFieldProps, getFieldError } = this.props.form
    let { disabled, submit, type, isEyesImg, picCodeIMg, changeType, mobile } = this.state
    console.log(changeType)

    return ( 
      <form className="changePassword" onChange={this.changeForm}>
        <div className="head">
          您的手机号：{mobile}
        </div>
        <List className="form_list">
          <InputItem 
            {...getFieldProps('picCode', {
              // initialValue: 'little ant',
              rules: [
                { required: true, whitespace : true, message: '请图形验证码'},
                { validator: this.validatePicCode },
              ],
            })} 
            placeholder="图形验证码" 
            type='number'
            maxLength="4"
          >
            <img src={require('static/img/icon/pic_code.png')} />
            <div className="pic_code">
              <img onClick={this.changePicCode} src={picCodeIMg} />
            </div>
          </InputItem>
          <InputItem 
            {...getFieldProps('numCode', {
              // initialValue: 'little ant',
              rules: [
                { required: true, whitespace : true, message: '请输入短信验证码'},
                { validator: this.validateNumCode },
              ],
            })} 
            placeholder="短信验证码" 
            type='number'
            maxLength="6"
          >
            <img src={require('static/img/icon/num_code.png')} />
              <CountDown 
                handelGetCode={this.handelGetCode}
                ref="getTime" 
              />
          </InputItem>
          {
            changeType === 3 
            ?
            <InputItem 
              {...getFieldProps('idCard', {
                // initialValue: 'little ant',
                rules: [
                  { required: true, whitespace : true, message: '请输入身份证号码'},
                  { validator: this.validateIdcard },
                ],
              })} 
              placeholder="请输入身份证号码" 
              type="text"
            >
              <img src={require('static/img/icon/num.png')} />
            </InputItem>
            :
            null
          }
          <InputItem 
            {...getFieldProps('password', {
              // initialValue: 'little ant',
              rules: [
                { required: true, whitespace : true, message: '请输入密码'},
                { validator: this.validatePassword },
              ],
            })} 
            placeholder="请输入6-16位密码" 
            type={type}
            minLength="6"
            maxLength="16"
          >
            <img src={require('static/img/icon/password.png')} />
            <div className="eyes">
              <img onClick={this.isEyes} src={isEyesImg} />
            </div>
          </InputItem>
          <Item>
            <Button className={disabled ? "disabled" : "enabled"} disabled={disabled} onClick={this.onSubmit}>
              {submit}
            </Button>
          </Item>
        </List>
      </form>
    )
  }
}

const ChangePassword = createForm()(ChangePasswordForm);
export default ChangePassword;