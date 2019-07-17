import React, { Component } from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import { Toast } from 'antd-mobile';
import { Provider } from 'react-redux';
import promise from 'redux-promise'; //可以实行异步
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import FastClick from 'fastclick';
import qs from 'qs';
import RouterMap from './router';
import reducers from './reducers/index';
import Config from '../config';
import './static/css/base.css';

const str = navigator.userAgent.toLowerCase();
const ver = str.match(/cpu iphone os (.*?) like mac os/);

//移动设备上的浏览器默认会在用户点击屏幕大约延迟300毫秒后才会触发点击事件，这是为了检查用户是否在做双击。为了能够立即响应用户的点击事件，才有了FastClick
if (!ver) {
	FastClick.attach(document.body);
}

const createStoreWithMiddleware = applyMiddleware(promise, thunkMiddleware)(createStore);
ReactDom.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <RouterMap />
    </Provider>,
    document.getElementById('root')
);
