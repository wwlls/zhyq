import React, { Component } from 'react';
import { Tabs, Badge, Button } from 'antd-mobile';
import Utils from 'utils';
import Tools from 'utils/tools';
import List from './list/list';
import NoData from 'component/noData/noData';
import './capitalList.scss';

const tabs = [
  { title: <Badge>全部</Badge> },
  { title: <Badge>充值</Badge> },
  { title: <Badge>提现</Badge> },
  { title: <Badge>出借</Badge> },
  { title: <Badge>回款</Badge> },
]

class CapitalList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAssetDetails: [
        {type: 1, occurencyDate: '2019-07-06 10:46', money:-100},
        {type: 2, occurencyDate: '2019-07-06 10:46', money:100},
      ]
    }
  }
  
  componentDidMount = () => {
    document.title = '资金流水';
  }

  onTabClick = (tab, index) => {
    console.log(tab, index)
  }

  // 无数据回列表页
  handleHome = () => {
    this.props.history.push('/home')
  }


  render = () => {
    let { tab, currentAssetDetails } = this.state;
    return ( 
      <div className="">
        <Tabs tabs={tabs}
          initialPage={0}
          onTabClick={this.onTabClick}
        >
          {
            currentAssetDetails && currentAssetDetails.length > 0
            ?
            <List currentAssetDetails={currentAssetDetails} />
            :
            <NoData text="暂无资金流水" hasBtn={true} handleSame={this.handleHome} />
          }
        </Tabs>
      </div>
    )
  }
}

export default CapitalList;