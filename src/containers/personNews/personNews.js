import React, { Component } from 'react';
import { Button } from 'antd-mobile';
import Utils from 'utils';
import './personNews.scss'

class PersonNews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  
  componentDidMount = () => {
    document.title = '个人信息';
  }

  render = () => {
    return ( 
      <div className="personNews">
        <div className="person_news_top">
          <div className="person_news_list">
            <ul>
              <li>
                <div className="mine_list_left">
                  <span>银行卡号</span>
                </div>
                <div className="mine_list_right">
                  <span>362321********1331</span>
                </div>
              </li>
              <li>
                <div className="mine_list_left">
                  <span>银行</span>
                </div>
                <div className="mine_list_right">
                  <span>362321********1331</span>
                </div>
              </li>
              <li>
                <div className="mine_list_left">
                  <span>手机号</span>
                </div>
                <div className="mine_list_right">
                  <span>362321********1331</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="person_news_top">
          <div className="person_news_list">
            <ul>
              <li>
                <div className="mine_list_left">
                  <span>真实名字</span>
                </div>
                <div className="mine_list_right">
                  <span>362321********1331</span>
                </div>
              </li>
              <li>
                <div className="mine_list_left">
                  <span>身份证号</span>
                </div>
                <div className="mine_list_right">
                  <span>362321********1331</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="person_news_bottom">
          *若要更换银行卡等信息请联系自己所属企业
        </div>
      </div>
    )
  }
}

export default PersonNews;