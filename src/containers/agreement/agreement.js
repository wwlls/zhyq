import React, { Component } from 'react'
import { Toast } from 'antd-mobile'
import Utils from 'utils'
import Api from 'api/api'
import './agreement.scss'

class Agreement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '<p>1111</p><p>22222</p>'
    }
  }
  
  componentDidMount = () => {
    document.title = '协议'
    this.initData()
  }

  initData = () => {
    // let data = {}
    // Utils.postRequest(Api.test, data).then((res) => {
    //   console.log(res)
    //   if (res.data.error === 0) {
    //     let content = res.data.content
    //     this.setState({
    //       content: content
    //     })
    //   } else {
    //     Toast.info(res.data.msg)
    //   }
    // })
  }

  render = () => {
    let { content } = this.state
    return ( 
      <div className="agreement">
        <div dangerouslySetInnerHTML = {{__html:content}}></div>
      </div>
    )
  }
}

export default Agreement;