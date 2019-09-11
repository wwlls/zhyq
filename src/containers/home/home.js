import React from 'react'
import { Tabs, Badge, Button } from 'antd-mobile'
import Utils from 'utils'
import Tools from 'utils/tools'
import Company from './src/company'
import People from './src/people'
import Car from './src/car'
import Device from './src/device'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/toolbox'
// import 'echarts/lib/component/markPoint'
// import 'echarts/lib/component/markLine'
import './home.scss'

const tabs = [
  { title: <Badge>企业</Badge> },
  { title: <Badge>人员</Badge> },
  { title: <Badge>车辆</Badge> },
  { title: <Badge>设备</Badge> },
]
class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      companyData: [
        {value:335, name:'直接访问'},
        {value:310, name:'邮件营销'},
        {value:234, name:'联盟广告'},
        {value:135, name:'视频广告'}
      ],
      peopleData: {
        xdata: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
        ydata:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
      },
      deviceData:  [
        {value:335, name:'直接访问'},
        {value:310, name:'邮件营销'},
        {value:234, name:'联盟广告'},
        {value:135, name:'视频广告'}
      ],
    }
  }

  componentDidMount = () => {
    document.title = '首页'
  }

  onTabChange = (tab, index) => {
    console.log(index)
  }

  render = () => {
    let { companyData, peopleData, deviceData } = this.state
    return ( 
      <div className="home">
        <Tabs tabs={tabs}
          initialPage={0}
          tabBarActiveTextColor="#252424"
          tabBarInactiveTextColor="#666666"
          tabBarBackgroundColor="#ffffff"
          onChange={this.onTabChange}
        >
          <Company companyData={companyData} />
          <People data={peopleData} />
          <Car data={peopleData} />
          <Device deviceData={deviceData} />
        </Tabs>
      </div>
    )
  }
}

export default Home;