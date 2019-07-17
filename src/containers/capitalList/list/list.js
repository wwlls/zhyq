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

  render = () => {
    let { currentAssetDetails } = this.props
    return ( 
      <div className="list_current">
        <ul>
          {
            currentAssetDetails && currentAssetDetails.map((item, index) => {
              return (
                <li className="list_info" key={index}>
                  <div className="list_info_head">
                    <div className="list_info_head_left">
                      <span className="name">
                        {
                          item.type === 1 ? '提现'
                          : item.type === 2 ? '回款'
                          : ''
                        }
                      </span>
                      <span className="buy_time">{item.occurencyDate}</span>
                    </div>
                    <div className="list_info_head_right">
                      <span className={"money " + 
                        (item.money > 0 ? 'block' : 'green')
                      }
                      >
                        {
                          item.money
                        }
                      </span>
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