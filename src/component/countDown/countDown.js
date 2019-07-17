/** 60秒倒计时 **/
import React from "react";
import { Button } from 'antd'
import "./countDown.scss";

export default class partner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          count: 60,
          stop: true,
          disabled: '',
          text: '立即获取'
        };
    }

    
    //倒计时方法
    setTime = () => {
      clearInterval(this.timer);
      this.state.stop = false;
      this.setState({
          disabled: 'disabled'
      })
      this.setInterval()
    }

    setInterval = () => {
      this.timer = setInterval(function() {
          let count = this.state.count;
          this.state.liked = false;
          count -= 1;
          this.setState({
              count: count
          });
          if (count < 1) {
              this.state.stop = true;
              this.setState({
                  liked: true,
                  disabled: '',
                  text: '重新获取',
                  count: 60
              });
　　　　　　　this.clearInterval()
          }
      }.bind(this), 1000);
    }

    clearInterval = () => {
      clearInterval(this.timer);
    }

    componentDidMount() {

    }

    render() {
        let { stop ,text, count, disabled } = this.state;
        let getText = stop ? text : count + 's后重新获取';
        return (
            <div className="getCode" onClick={this.props.handelGetCode}>
                <Button disabled={disabled}>{getText}</Button>
            </div>
        );
    }
}