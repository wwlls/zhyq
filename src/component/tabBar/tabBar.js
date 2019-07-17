import React from 'react';
import history from 'utils/history'; 
import { TabBar } from 'antd-mobile';
import PropTypes from 'prop-types';
import Utils from 'utils/index';
import './tabBar.scss';

class Tabbar extends React.Component {
  //子组件路由无法跳转使用 Context
  static contextTypes = {
    router: PropTypes.object
  }
  constructor(props, context) {
    super(props, context);
    this.state = { 
    };
  }

  componentDidMount() {
  }   

  render() {
      return (
          <div style={{position: 'fixed', width: '100%', bottom: 0 }}>
              <TabBar
                  unselectedTintColor="#949494"
                  tintColor="#FF5D0C"
                  barTintColor="white"
              >
                <TabBar.Item
                    title="产品"
                    key="Life"
                    icon={<div className="tabBarImg homeIcon"
                    />
                  }
                  selectedIcon={<div className="tabBarImg selectedHomeIcon"
                  />
                  }
                  selected={this.props.pathname === '/home'}
                  onPress={() => {
                    history.push('/home');
                  }}
                > 
                </TabBar.Item>
                <TabBar.Item
                  icon={
                    <div className="tabBarImg mineIcon"
                    />
                  }
                  selectedIcon={
                    <div className="tabBarImg selectedMineIcon"
                    />
                  }
                  title="我的"
                  key="Friend"
                  selected={this.props.pathname === '/mine'}
                  onPress={() => {
                    history.push('/mine');
                  }}
                >
                </TabBar.Item>

              </TabBar>
          </div>
      )
  }
}

export default Tabbar;