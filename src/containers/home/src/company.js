import React, { Component } from 'react';
import { Button } from 'antd-mobile'
import echarts from 'echarts/lib/echarts'
import './chart.scss'

class Template extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  
  componentDidMount = () => {
    // 初始化
    var myChart = echarts.init(document.getElementById('company'))
    // 绘制图表
    myChart.setOption({
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        x: 'left',
        data:['直接访问','邮件营销','联盟广告','视频广告']
      },
      series: [
        {
          name:'访问来源',
          type:'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
            }
          },
          labelLine: {
            normal: {
                show: false
            }
          },
          data: this.props.companyData
        }
      ]
    })
  }

  render = () => {
    return ( 
      <div className="echarts" id="company" style={{ width: '100%', height: 312 }}></div>
    )
  }
}

export default Template;