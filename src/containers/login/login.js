import React from 'react';
import { Link } from 'react-router-dom';
import { List, InputItem, Button, Toast, Checkbox } from 'antd-mobile';
import { createForm } from 'rc-form';
import Utils from 'utils';
import Tools from 'utils/tools';
import CountDown from 'component/countDown/countDown';
import Modal from 'component/modal/modal';
import openEyesImg from "static/img/icon/eyes_close.png";
import closeEyesImg from "static/img/icon/eyes_open.png";
import test from 'static/img/login/test.png';
import './login.scss'

const Item = List.Item;
const AgreeItem = Checkbox.AgreeItem;

class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			disabled: true,
			submit: '下一步',
			type: 'password',
			isEyesImg: openEyesImg,
			picCodeIMg: test,
      modal: false,
      isOld: false,
      isNew: false,
      checked: false,
		}
	}

	componentDidMount = () => {
		document.title = '外贸通欢迎您';
	};

	// 验证手机号
	validateAccount = (rule, value, callback) => {
		const form = this.props.form;
		if(!(Tools.isMobile(value.replace(/\s/g, ''))) || value.replace(/\s/g, '').length !== 11) {
      callback("手机号码输入有误");
      this.setState({
				isNew: false,
				isOld: false,
				submit: '下一步',
			})
			this.buttonChange()
    } else {
      callback();
			this.setState({
				mobileParams: value.replace(/\s/g, ''),
				isOld: true,
				submit: '登录',
			})
			this.buttonChange()
    }
	}

	// button是否高亮
	buttonChange = () => {
		let { disabled, isOld, isNew, checked } = this.state;
		const form = this.props.form;
		let mobile = form.getFieldValue('mobile');
		if (Tools.isMobile(mobile.replace(/\s/g, ''))) {
			if (isOld) {   // 老用户
				let psd_old_num = form.getFieldValue('login_password');
				if (Tools.checkPassword(psd_old_num)) {
					this.setState({
						disabled: false
					})
				} else {
					this.setState({
						disabled: true
					})
				}
			} else if (isNew) {   // 新用户
				let pic_code = form.getFieldValue('picCode');
				let num_code = form.getFieldValue('numCode');
				let psd_new_num = form.getFieldValue('register_password');
				let person = form.getFieldValue('person');
				if (pic_code && num_code && Tools.checkPassword(psd_new_num) && person && checked) {
					this.setState({
						disabled: false
					})
				} else {
					this.setState({
						disabled: true
					})
				}
			}
		} else {
			this.setState({
				disabled: true
			})
		}
	}
	changeForm = () => {
		this.buttonChange()
	}

	changeCheck = (e) => {
		this.setState({
			checked: e.target.checked
		},() => {
			if (this.state.checked) {
				this.buttonChange()
			} else {
				this.buttonChange()
			}
		})
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
		let form = this.props.form;
    let mobile = form.getFieldValue('mobile');
    if (mobile === '' || mobile === null || mobile === undefined) {
    	Toast.info('请输入手机号')
    	return
    } else if(!(Tools.isMobile(mobile.replace(/\s/g, '')))) {
    	Toast.info('手机号码输入有误')
    	return
    } else {
			let data = {
				mobile: mobile.replace(/\s/g, '')
			}
			this.refs.getTime.setTime();
    }
  }

  // 员工编号提示
  personTip = key => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
    });
  }
  onClose = key => () => {
    this.setState({
      [key]: false,
    });
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
		let { disabled, submit, type, isEyesImg, picCodeIMg, isOld, isNew, modal, mobileParams } = this.state
		return (
			<form className="login" onChange={this.changeForm}>
				<img className="logo" src={require('static/img/login/logo.png')} />
				<List className="form_list">
					<InputItem
	          {...getFieldProps('mobile', {
	            // initialValue: 'little ant',
	            rules: [
	              { required: true, whitespace : true, message: '请输入手机号'},
	              { validator: this.validateAccount },
	            ],
	          })}
	          placeholder="请输入手机号码登录或注册" 
	          type="phone"
	        >
	        <img src={require('static/img/icon/mobile.png')} />
	        </InputItem>
	        <div className={!isOld? "login_form" : "login_form_show"}>
		        <InputItem 
		        	{...getFieldProps('login_password', {
		            // initialValue: 'little ant',
		            rules: [
		              { required: true, whitespace : true, message: '请输入密码'},
		              { validator: this.validateLoginPassword },
		            ],
		          })} 
		        	placeholder="请输入您的密码" 
		        	type={type}
		        	minLength="6"
		        	maxLength="16"
		        >
		        	<img src={require('static/img/icon/password.png')} />
		        	<div className="eyes">
		        		<img onClick={this.isEyes} src={isEyesImg} />
		        	</div>
		        </InputItem>
		        <Link className="reset_password" to={`/changePassword?type=1&mobile=${mobileParams}`}>忘记密码？</Link>
	        </div>

	        <div className={!isNew ? "register_form" : 'register_form_show'}>
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
		        <InputItem 
		        	{...getFieldProps('register_password', {
		            // initialValue: 'little ant',
		            rules: [
		              { required: true, whitespace : true, message: '请输入密码'},
		              { validator: this.validateRegisterPassword },
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
		        <InputItem 
		        	{...getFieldProps('person', {
		            // initialValue: 'little ant',
		            rules: [
		              { required: true, whitespace : true, message: '请输入企业编号'},
		              { validator: this.validatePerson },
		            ],
		          })} 
		        	placeholder="请输入企业编号" 
		        	type="text"
		        >
		        	<img src={require('static/img/icon/num.png')} />
		        	<div className="num">
		        		<img onClick={this.personTip('modal')} src={require('static/img/icon/tip.png')} />
		        	</div>
							<Modal 
								onClose={this.onClose('modal')}
								title="关于企业编号"
								text="确定"
								modal={modal}  
								main={"1、必选填写您所属的企业编号，否则无法完成注册;<br/>2、企业编号由核心企业告知员工。"}
							/>
		        </InputItem>

	        </div>
	        <Item>
	          <Button className={disabled ? "disabled" : "enabled"} disabled={disabled} onClick={this.onSubmit}>
	          	{submit}
	          </Button>
	        </Item>
				</List>
	      <AgreeItem className={!isNew ? "register_form" : 'register_form_show'} data-seed="logId" onChange={this.changeCheck}>
	        同意 <Link className="agreeHref" to="/agreement">《外贸通用户服务协议》</Link>
	      </AgreeItem>
			</form>
		)
	}
}

const Login = createForm()(LoginForm);
export default Login;