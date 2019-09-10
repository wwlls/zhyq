import React from 'react';
import { Button } from 'antd-mobile';
import Utils from 'utils';
import Tools from 'utils/tools';
import NoData from 'component/noData/noData';
import './home.scss';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: [
        {name: '90天标的产品第2期', status:'到期还本付息', interest: '7.0', period: 90, remainMoney: 11000.00, id: 1},
        {name: '90天标的产品第10期', status:'到期还本付息', interest: '11.0', period: 180, remainMoney: 1100000.00, id: 2},
      ]
    }
  }

  componentDidMount = () => {
    document.title = '首页'
  };

  handleProductDetail = (e, id) => {
    e.stopPropagation();
    console.log(e.target)
    console.log(id)
    // let id = e.target.getAttribute('data-id')
    this.props.history.push(`/productDetail?id=${id}`)
  }

  render = () => {
    let { productList, pathname } = this.state;
    return ( 
      <div className="home">
        {
          productList.length > 0 
          ?
          <div className="product">
            <ul>
              {
                productList.map((item, index) => {
                  return(
                    <li className="product_list" key={item.id} onClick={() => this.handleProductDetail(event, item.id)}>
                      <div className="product_list_head">
                        <span className="name">{item.name}</span>
                        <span className="size"><em>到期还本付息</em></span>
                      </div>
                      <div className="product_list_bottom">
                        <div className="product_list_bottom_info">
                          <span className="interest">{item.interest}<em>%</em></span>
                          <span className="info_size">协议约定利率</span>
                        </div>
                        <div className="product_list_bottom_info">
                          <span className="period">{item.period}<i>元</i></span>
                          <span className="info_size">出借期限</span>
                        </div>
                        <div className="product_list_bottom_info">
                          <span className="remain_money">{Tools.isNumeral(item.remainMoney)}</span>
                          <span className="info_size">剩余金额(元)</span>
                        </div>
                      </div>
                    </li> 
                  )
                })
              }
            </ul>
            <div className="noData">无更多标的～</div>
          </div>
          :
          <NoData text="暂无已可出借标的" />
        }
      </div>
    )
  }
}

export default Home;