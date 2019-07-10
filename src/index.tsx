import React from 'react';
import ReactDOM from 'react-dom';
import App from '@/App';
import * as serviceWorker from './serviceWorker';
import '@/styles/index.scss'
// import { Provider } from 'react-redux'
import Router from '@/router/index'
ReactDOM.render(
    // <Provider store={store}>
    <App router={Router} />,
    // </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

//解决chrome和Safari viewpoint height 会计算地址栏的问题
const setVh = () => {
    // 首先获取视窗高度，再乘以1%得到vh单位的值 
    let vh = window.innerHeight * 0.01; // 把--vh的值设置到文档的根元素中 
    document.documentElement.style.setProperty('--vh', `${vh}px`);//添加CSS自定义属性级联变量
}

setVh()
// 监听resize事件 
window.addEventListener('resize', setVh);