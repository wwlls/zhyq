import React, { Component } from 'react'
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
    var myChart = echarts.init(document.getElementById('car'))
    // 绘制图表
    myChart.setOption({
      title: { text: '某地区蒸发量和降水量' },
      tooltip : {
        trigger: 'axis'
      },
      legend: {
        data:['蒸发量','降水量']
      },
      toolbox: {
        show : true,
        feature : {
          dataView : {show: true, readOnly: false},
          magicType : {show: true, type: ['line', 'bar']},
          restore : {show: true},
          saveAsImage : {
            show: true,
            type: 'jpg'
          }
        }
      },
      xAxis : [
        {
          type : 'category',
          data : this.props.data.xdata
        }
      ],
      yAxis : [
        {
          type : 'value'
        }
      ],
      series : [
        {
          name:'蒸发量',
          type:'bar',
          data: this.props.data.ydata,
          markPoint : {
            data : [
              {type : 'max', name: '最大值'},
              {type : 'min', name: '最小值'}
            ]
          },
          markLine : {
            data : [
              {type : 'average', name: '平均值'}
            ]
          }
        }
      ]
    })
  }

  render = () => {
    return ( 
      <div className="echarts" id="car" style={{ width: '100%', height: 312 }}></div>
    )
  }
}

export default Template;