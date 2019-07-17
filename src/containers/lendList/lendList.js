import React, { Component } from 'react';
import { Tabs, Badge, Button } from 'antd-mobile';
import Utils from 'utils';
import Tools from 'utils/tools';
import List from './list/list';
import NoData from 'component/noData/noData';
import './lendList.scss';

const tabs = [
  { title: <Badge>持有资产</Badge> },
  { title: <Badge>已到期资产</Badge> },
]

class LendList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: tabs,
      assetsList: [
        {name: '3个月标的产品第2期', buyTime: '2019-09-24 11:00:50', money: 35687400, interest: 7.0, profit: 3200, isExpired: 1, id: 1},
        {name: '3个月标的产品第2期', buyTime: '2019-09-24 11:00:50', money: 356874, interest: 7.0, profit: 320000, isExpired: 2, id: 2},
        {name: '3个月标的产品第2期', buyTime: '2019-09-24 11:00:50', money: 356874, interest: 12.0, profit: 3200, isExpired: 3, id: 3},
      ],
    }
  }
  
  componentDidMount = () => {
    document.title = '出借记录';
  }

  onTabClick = (tab, index) => {
    console.log(tab, index)
  }

  // 无数据回列表页
  handleHome = () => {
    this.props.history.push('/home')
  }

  render = () => {
    let { tab, assetsList } = this.state;
    return ( 
      <div className="lend_list">
        <div className="lend_list_head">
          <span className="money">{Tools.isNumeral(6356874.12)}</span>
          <span className="size">出借资产(元)</span>
        </div>

        <Tabs tabs={tabs}
          initialPage={0}
          onTabClick={this.onTabClick}
        >
          {
            assetsList && assetsList.length > 0
            ?
            <List assetsList={assetsList} />
            :
            <NoData text="暂无资产" hasBtn={true} handleSame={this.handleHome} />
          }
        </Tabs>
      </div>
    )
  }
}

export default LendList;