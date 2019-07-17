import React from 'react';
import { Modal, Button } from 'antd-mobile';
import Utils from 'utils';
import Tools from 'utils/tools';
import ModalTip from 'component/modal/modal';
import TabBar from 'component/tabBar/tabBar';
import AvatarDefault from 'static/img/icon/avatar_default.png';
import './mine.scss';

const alert = Modal.alert;

class Mine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pathname: '/mine',
      wxPic: AvatarDefault,
      wxName: '小亮',
      mobile: '13666606473',
      modal: false,
      modal1: false,
      card: true,
    };
  };

  componentDidMount = () => {
    document.title = '我的';
  }; 

  // 总资产提示
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

  // 设置
  handleSetting = () => {
    this.props.history.push('setting')
  }

  // 提现
  handleCach = () => {
    let { card, pathname } = this.state;
    if (card) {
      this.props.history.push(`cash`)
    } else {
      alert('', '您还没有添加银行卡', [
        { text: '取消', onPress: () => console.log('cancel')},
        { text: '去添加', onPress: () => this.props.history.push(`bankCard?pathname=${pathname}`) },
      ]);
    }
  }

  // 充值
  handleRecharge = () => {
    let { card, pathname } = this.state;
    if (card) {
      this.props.history.push(`recharge`)
    } else {
      alert('', '您还没有添加银行卡', [
        { text: '取消', onPress: () => console.log('cancel')},
        { text: '去添加', onPress: () => this.props.history.push(`bankCard?pathname=${pathname}`) },
      ]);
    }
  }

  // 出借记录
  handleLendList = () => {
    this.props.history.push('lendList')
  }

  // 资金流水
  handleCapitalList = () => {
    this.props.history.push('capitalList')
  }

  render = () => {
    let { pathname, wxPic, wxName, mobile, modal, modal1 } = this.state
    return (
      <div className="mine">
        <div className="mine_head">
          <div className="mine_head_one">
            <div className="mine_head_one_left">
              <img className="wxPic" src={wxPic} />
              <span className="wxName">{'*' + wxName.substring(wxName.length-1,wxName.length)}</span>
              <span className="mobile">{mobile.substring(0,3) + '****' + mobile.substring(7,11)}</span>
            </div>
            <div className="mine_head_one_right">
              <img onClick={this.handleSetting} src={require('static/img/icon/setting.png')} />
            </div>
          </div>

          <div className="mine_head_two">
            <div className="mine_head_two_title">
              <span>总资产(元)</span>
              <img onClick={this.personTip('modal')} src={require('static/img/icon/point.png')} />
              <ModalTip 
                onClose={this.onClose('modal')}
                title="温馨提示"
                text="确定"
                modal={modal}  
                main={"<p class='center'>总资产 = 账号余额+待收本金</p>"}
              />
            </div>
            <div className="mine_head_two_money">
              {Tools.isNumeral(22200)}
            </div>
          </div>

          <div className="mine_head_three">
            <div className="mine_head_three_same">
              <span className="title">已赚收益(元)</span>
              <span className="money">{Tools.isNumeral(2036.66)}</span>
            </div>
            <div className="mine_head_three_same">
              <div className="same_diff">
                <span className="title">待收收益(元)</span>
                <img onClick={this.personTip('modal1')} src={require('static/img/icon/point.png')} />
                <ModalTip 
                  onClose={this.onClose('modal1')}
                  title="温馨提示"
                  text="确定"
                  modal={modal1}  
                  main={"待收收益：您的出借本金每日都会产生利息收益并进行累加，该利息收益将在标的回款当日与本金一起归还"}
                />
              </div>
              <span className="money">{Tools.isNumeral(36.66)}</span>
            </div>
          </div>

          <div className="mine_head_four">
            <div className="mine_head_four_left">
              <span className="size">账户余额(元):</span>
              <span className="account">{Tools.isNumeral(600)}</span>
            </div>
            <div className="mine_head_four_right">
              <Button className="cash" onClick={this.handleCach}>提现</Button>
              <Button className="recharge" onClick={this.handleRecharge}>充值</Button>
            </div>
          </div>
        </div>
        <div className="mine_list">
          <ul>
            <li onClick={this.handleLendList}>
              <div className="mine_list_left">
                <img src={require('static/img/icon/mine1.png')} />
                <span>出借记录</span>
              </div>
              <div className="mine_list_right">
                <img src={require('static/img/icon/right.png')} />
              </div>
            </li>
            <li onClick={this.handleCapitalList}>
              <div className="mine_list_left">
                <img src={require('static/img/icon/mine2.png')} />
                <span>资金流水</span>
              </div>
              <div className="mine_list_right">
                <img src={require('static/img/icon/right.png')} />
              </div>
            </li>
          </ul>
        </div>
        <TabBar pathname={pathname} />
      </div>
    )
  }
}

export default Mine;
