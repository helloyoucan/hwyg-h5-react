import React, { Component } from 'react'
import styles from './styles.module.scss'
import Panel from '../Panel/index'
import Icon from '@base/Icon/index'
import { NavLink } from 'react-router-dom'
interface Props {
    toType: Symbol,
    updateType: Function
}
export default class Buyer extends Component<Props, any> {
    render() {
        const { toType, updateType } = this.props
        const DealCountpanleList = [
            { text: '今日支付金额', value: 5465 },
            { text: '今日支付买家', value: 45654 },
            { text: '今日支付订单', value: 789 },
            { text: '今日成交量（斤）', value: 54654 },
            { text: '昨日支付金额', value: 445 },
            { text: '昨日支付买家', value: 123 },
            { text: '昨日支付订单', value: 6546 },
            { text: '昨日成交量（斤）', value:564}
        ]
            .map((item, index) => (
                <div key={index} className={[styles.panelItem,styles.count].join(' ')}>
                    <p className={styles.panleCountValue}>{item.value}</p>
                    <p>{item.text}</p>
                </div>
            ))
        const OrderPanleList = [{ path: '', icon: 'icon_hezuoguanxi', text: '定向交易' }, { path: '', icon: 'tab_icon_bidding_sel', text: '竞价交易' }, { path: '', icon: 'icon_gongyingguanli', text: '供应/求购' }]
            .map((item, index) => (
                <NavLink key={index} to={item.path} className={styles.panelItem}>
                    <Icon icon={item.icon} className={styles.panleItemIcon} />
                    <p>{item.text}</p>
                </NavLink>
            ))
        const DealPanleList = [{ path: '', icon: 'icon_baoguofahuo', text: '我的供应' }, { path: '', icon: 'icon_liebiaocaidan', text: '发出的报价' }]
            .map((item, index) => (
                <NavLink key={index} to={item.path} className={styles.panelItem}>
                    <Icon icon={item.icon} className={styles.panleItemIcon} />
                    <p>{item.text}</p>
                </NavLink>
            ))
        return (
            <div className={styles.content}>
                <span
                    className={styles.switchBtn} onClick={() => { updateType(toType) }}>
                    切换为买家
                </span>
                <Panel className={styles.panel} title="交易看板">{DealCountpanleList}</Panel>
                <Panel className={styles.panel} title="订单管理">{OrderPanleList}</Panel>
                <Panel className={styles.panel} title="交易管理">{DealPanleList}</Panel>

            </div>
        )
    }
}