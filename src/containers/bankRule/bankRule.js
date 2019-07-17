import React, { Component } from 'react';
import { Button } from 'antd-mobile';
import Utils from 'utils';
import './bankRule.scss';

class Template extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      getBankLimitInfos: [
        {bankName: '工商银行', singleLimit: 50000, singleDayLimit: 50000, singleMonthLimit: 1000000, remark: ''},
        {bankName: '中国银行', singleLimit: 50000, singleDayLimit: 50000, singleMonthLimit: 1000000, remark: ''}
      ]
    }
  }
  
  componentDidMount = () => {
    document.title = '银行卡规则';
  }

  render = () => {
    let { getBankLimitInfos } = this.state;
    return ( 
      <div className="bank_rule">
        <h5>银行卡规则(仅支持储蓄卡)</h5>
        <div className="bank_rule_table">
          <ul>
            <li className="bank_rule_table_head">
              <span>银行</span>
              <span>单笔限额</span>
              <span>单日限额</span>
              <span>单月限额</span>
              <span>备注</span>
            </li>
            {
              getBankLimitInfos && getBankLimitInfos.map((item,index) => {
                return (
                  <li className="bank_rule_table_main" key={index}>
                    <span>
                      <img src={require(`static/img/bank-rule/${item.bankName}.png`)} />
                      <em>{item.bankName}</em>
                    </span>
                    <span>
                      {
                        item.singleLimit > 10000 ? item.singleLimit / 10000 + '万' : item.singleLimit
                      }
                    </span>
                    <span>
                      {
                        item.singleDayLimit > 10000 ? item.singleDayLimit / 10000 + '万' : item.singleDayLimit
                      }
                    </span>
                    <span>
                      {
                        item.singleMonthLimit > 10000 ? item.singleMonthLimit / 10000 + '万' : item.singleMonthLimit
                      }
                    </span>
                    <span>{item.remark}</span>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    )
  }
}

export default Template;