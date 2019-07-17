import React, { Component } from 'react';
import { Button } from 'antd-mobile';
import Utils from 'utils';
import Tools from 'utils/tools';
import history from 'utils/history';
import './list.scss';

class Template extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  
  componentDidMount = () => {
  }

  // 出借详情
  handleLendDetail = (e, id) => {
    history.push(`/lendDetail?id=${id}`)
  }

  render = () => {
    let { assetsList } = this.props
    return ( 
      <div className="list">
        <ul>
          {
            assetsList && assetsList.map((item, index) => {
              return (
                <li className="list_info" key={item.id} onClick={() => this.handleLendDetail(event, item.id)}>
                  <div className="list_info_head">
                    <div className="list_info_head_left">
                      <span className="name">{item.name}</span>
                      <span className="buy_time">出借时间：{item.buyTime}</span>
                    </div>
                    <div className={"list_info_head_right " + 
                      (item.isExpired === 1 ? 'list_info_head_right1' 
                      : item.isExpired === 2 ? 'list_info_head_right2' 
                      : item.isExpired === 3 ? 'list_info_head_right3' 
                      : '')
                      }
                    >
                      <span className={"is_expired " + 
                        (item.isExpired === 1 ? 'is_expired1' 
                        : item.isExpired === 2 ? 'is_expired2' 
                        : item.isExpired === 3 ? 'is_expired3' 
                        : '')
                      }
                      >
                        {
                          item.isExpired === 1 ? '待放款'
                          : item.isExpired === 2 ? '收款中'
                          : item.isExpired === 3 ? '已回款'
                          : ''
                        }
                      </span>
                    </div>
                  </div>

                  <div className="list_info_foot">
                    <div className="list_info_foot_same">
                      <span className={"top " + 
                        (item.isExpired === 1 || item.isExpired === 2 ? 'top1_2'
                        : item.isExpired === 3 ? 'top3'
                        : '')
                        }
                      >
                        {Tools.isNumeral(item.money)}
                      </span>
                      <span className="bottom">出借金额</span>
                    </div>
                    <div className="list_info_foot_same">
                      <span className={"top " + 
                        (item.isExpired === 1 || item.isExpired === 2 ? 'top1_2'
                        : item.isExpired === 3 ? 'top3'
                        : '')
                        }
                      >
                        {item.interest}
                      </span>
                      <span className="bottom">约定利率</span>
                    </div>
                    <div className="list_info_foot_same">
                      <span className={"top " + 
                        (item.isExpired === 1 || item.isExpired === 2 ? 'top1_2'
                        : item.isExpired === 3 ? 'top3'
                        : '')
                        }
                      >
                        {Tools.isNumeral(item.profit)}
                      </span>
                      <span className="bottom">预期收益(元)</span>
                    </div>
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

export default Template;