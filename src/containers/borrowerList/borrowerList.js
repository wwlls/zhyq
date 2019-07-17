import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd-mobile';
import Utils from 'utils';
import Tools from 'utils/tools';
import './borrowerList.scss';

class LendDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: Tools.getUrlParam('id') !== null ? Tools.getUrlParam('id') : '',
    }
  }
  
  componentDidMount = () => {
    document.title = '借款人列表';
  }

  render = () => {
    return ( 
      <div className="borrower_List">
        <div className="borrower_List_top">
          <div className="borrower_List_list">
            <ul>
              <li>
                <div className="mine_list_left">
                  <span>借款人</span>
                </div>
                <div className="mine_list_right">
                  <span>xxxx企业</span>
                </div>
              </li>
              <li>
                <div className="mine_list_left">
                  <span>匹配金额(元)</span>
                </div>
                <div className="mine_list_right">
                  <span>{Tools.isNumeral(1023.84)}</span>
                </div>
              </li>
              <li>
                <div className="mine_list_left">
                  <span>借款周期</span>
                </div>
                <div className="mine_list_right">
                  <span>{Tools.isNumeral(1023.84)}</span>
                </div>
              </li>
              <li>
                <div className="mine_list_left">
                  <span>相关协议</span>
                </div>
                <div className="mine_list_right">
                  <Link>《借款协议》</Link>
                </div>
              </li>
              <li>
                <div className="mine_list_left">
                  <span></span>
                </div>
                <div className="mine_list_right">
                  <Link>企业相关申请资料查看 ></Link>
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