import React, { Component } from 'react';
import { Button } from 'antd-mobile';
import Utils from 'utils';
import Tools from 'utils/tools'
import NoData from 'component/noData/noData'
import PullLoad from 'component/pullLoad/pullLoad'
import './capitalList.scss'

class CapitalList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }
  
  componentDidMount = () => {
    document.title = '列表'
  }

  render = () => {
    return ( 
      <div className="">
        <PullLoad />
      </div>
    )
  }
}

export default CapitalList;