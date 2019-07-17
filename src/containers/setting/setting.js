import React, { Component } from 'react';
import { Modal, Button } from 'antd-mobile';
import Utils from 'utils';
import './setting.scss';

const alert = Modal.alert;

class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pathname: '/mine',
      submit: '安全退出',
      card: true,
      mobile: 13666606473,
    }
  }
  
  componentDidMount = () => {
    document.title = '设置';
  }

  // 个人信息
  handlePersonNews = () => {
    let { pathname, card } = this.state;
    if (card) {
      this.props.history.push(`personNews`)
    } else {
      this.props.history.push(`bankCard?pathname=${pathname}`)
    }
  }

  // 修改登录密码
  handleChangePasswordOne = () => {
    let { mobile } = this.state
    this.props.history.push(`/changePassword?mobile=${mobile}&type=2`)
  }

  // 修改交易密码
  handleChangePasswordTwo = () => {
    let { mobile } = this.state
    this.props.history.push(`/changePassword?mobile=${mobile}&type=3`)
  }

  // 退出
  handleLogout = () => {
    alert('温馨提示', '确定要退出外贸通吗？', [
      { text: '取消', onPress: () => console.log('cancel')},
      { text: '确认', onPress: () => console.log('退出') },
    ]);
  }

  render = () => {
    let { submit, card } = this.state;
    return ( 
      <div className="setting">
        <div className="setting_list">
          <ul>
            <li onClick={this.handlePersonNews}>
              <div className="mine_list_left">
                <span>个人信息</span>
              </div>
              <div className="mine_list_right">
                {
                  card && card 
                  ?
                  null
                  :
                  <span>完成开户</span>
                }
                <img src={require('static/img/icon/right.png')} />
              </div>
            </li>
            <li onClick={this.handleChangePasswordOne}>
              <div className="mine_list_left">
                <span>修改登录密码</span>
              </div>
              <div className="mine_list_right">
                <img src={require('static/img/icon/right.png')} />
              </div>
            </li>
            <li onClick={this.handleChangePasswordTwo}>
              <div className="mine_list_left">
                <span>修改交易密码</span>
              </div>
              <div className="mine_list_right">
                <img src={require('static/img/icon/right.png')} />
              </div>
            </li>
          </ul>
        </div>

        <div className="setting_btn">
            <Button className="enabled" onClick={this.handleLogout}>
              {submit}
            </Button>
        </div>
      </div>
    )
  }
}

export default Setting;