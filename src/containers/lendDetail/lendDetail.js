import React, { Component } from 'react';
import { Button } from 'antd-mobile';
import Utils from 'utils';
import Tools from 'utils/tools';
import './lendDetail.scss';

class LendDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: Tools.getUrlParam('id') !== null ? Tools.getUrlParam('id') : '',
    }
  }
  
  componentDidMount = () => {
    document.title = '出借详情';
  }

  // 借款人列表
  handelBorrower = () => {
    let { id } = this.state;
    this.props.history.push(`borrowerList?id=${id}`)
  }

  render = () => {
    return ( 
      <div className="lend_detail">
        <div className="lend_detail_top">
          <div className="lend_detail_list">
            <ul>
              <li>
                <div className="mine_list_left">
                  <span>出借本金(元)</span>
                </div>
                <div className="mine_list_right">
                  <span>{Tools.isNumeral(1023.84)}</span>
                </div>
              </li>
              <li>
                <div className="mine_list_left">
                  <span>出借时间</span>
                </div>
                <div className="mine_list_right">
                  <span>{Tools.isNumeral(1023.84)}</span>
                </div>
              </li>
              <li>
                <div className="mine_list_left">
                  <span>计息时间</span>
                </div>
                <div className="mine_list_right">
                  <span>{Tools.isNumeral(1023.84)}</span>
                </div>
              </li>
              <li>
                <div className="mine_list_left">
                  <span>预计回款时间</span>
                </div>
                <div className="mine_list_right">
                  <span>1023.84</span>
                </div>
              </li>
              <li>
                <div className="mine_list_left">
                  <span>预期收益(元)</span>
                </div>
                <div className="mine_list_right">
                  <span>{Tools.isNumeral(1023.84)}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="lend_detail_top">
          <div className="lend_detail_list">
            <ul>
              <li onClick={this.handelBorrower}>
                <div className="mine_list_left">
                  <span>借款人列表</span>
                </div>
                <div className="mine_list_right">
                  <img src={require('static/img/icon/right.png')} />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default LendDetail;