import React, { Component } from 'react';
import { Button } from 'antd-mobile';
import Utils from 'utils';
import './noData.scss';

class Nodata extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  
  componentDidMount = () => {
  }

  render = () => {
    let { text, hasBtn } = this.props
    return ( 
        <div className="noData">
          <img src={require('static/img/common/noData.png')} />
          <span>{text}</span>
          {
            hasBtn && hasBtn 
            ?
            <div className="btn">
              <Button className="enabled" onClick={this.props.handleSame}>立即出借</Button>
            </div>
            : null
          }

        </div>
    )
  }
}

export default Nodata;