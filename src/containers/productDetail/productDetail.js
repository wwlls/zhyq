import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'antd-mobile';
import Utils from 'utils';
import Tools from "utils/tools";
import './productDetail.scss';

const alert = Modal.alert;

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: Tools.getUrlParam('id') !== null ? Tools.getUrlParam('id') : '',
      card: false,
      pathname: '/productDetail',
    }
  }
  
  componentDidMount = () => {
    document.title = '90天标的产品第2期';
  }

  // 是否绑卡
  handleBuy = () => {
    let { id, card, pathname } = this.state;

    if (card) {
      this.props.history.push(`productBuy?id=${id}`)
    } else {
      alert('', '您还没有添加银行卡', [
        { text: '取消', onPress: () => console.log('cancel')},
        { text: '去添加', onPress: () => this.props.history.push(`bankCard?pathname=${pathname}`) },
      ]);
    }
  }

  // 借款人列表
  handleBorrower = () => {
    let { id } = this.state;
    this.props.history.push(`borrowerList?id=${id}`)
  }

  render = () => {
    return ( 
      <div className="product_detail">
        <div className="product_detail_info">
          <div className="product_detail_info_head">
            <span className="interest">7.0<em>%</em></span>
            <span className="size">协议利率</span>
          </div>
          <div className="product_detail_info_foot">
            <em className="top"></em>
            <ul>
              <li>
                <span className="money">90</span>
                <span className="text">出借期限(天)</span>
              </li>
              <li>
                <span className="money">{Tools.isNumeral(100.00)}</span>
                <span className="text">最低起购金额(元)</span>
              </li>
              <li>
                <span className="money">{Tools.isNumeral(90000.10)}</span>
                <span className="text">总金额(元)</span>
              </li>
              <li>
                <span className="money">{Tools.isNumeral(1110.10)}</span>
                <span className="text">剩余可出借(元)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="product_detail_news">
          <h5>项目信息</h5>
          <ul>
            <li>
              <span className="news_left">募集期限</span>
              <span className="news_right">1天</span>
            </li>
            <li>
              <span className="news_left">起息日</span>
              <span className="news_right">撮合成功隔天即开始计息</span>
            </li>
            <li>
              <span className="news_left">还款方式</span>
              <span className="news_right">一次性还本付息</span>
            </li>
            <li>
              <span className="news_left">产品兑付</span>
              <span className="news_right">回款将自动装入账户余额</span>
            </li>
          </ul>
          <div className="new_bottom">
            <span className="new_bottom_left">担保方</span>
            <span className="new_bottom_right">核心企业</span>
          </div>
        </div> 

        <div className="product_detail_list" onClick={this.handleBorrower}>
            <span className="product_detail_list_left">借款人列表</span>
            <span className="product_detail_list_right">查看更多></span>
        </div>

        <div className="product_detail_foot" onClick={this.handleBuy}>
          <Button>立即出借</Button>
        </div>
      </div>
    )
  }
}

export default ProductDetail;