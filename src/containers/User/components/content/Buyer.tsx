import React, { Component } from 'react'
import styles from './styles.module.scss'
import Panel from '../Panel/index'
import Icon from '@base/Icon/index'
import { NavLink } from 'react-router-dom'
import EntryItem from '@base/EntryItem/index'
interface Props {
    toType: Symbol,
    updateType: Function
}
export default class Buyer extends Component<Props,any> {
    render() {
        const {toType,updateType} = this.props
        const OrderPanleList = [{ path: '', icon: 'icon_hezuoguanxi', text: '定向交易' }, { path: '', icon: 'tab_icon_bidding_sel', text: '竞价交易' }, { path: '', icon: 'icon_gongyingguanli', text: '供应/求购' }]
            .map((item, index) => (
                <NavLink key={index} to={item.path} className={styles.panelItem}>
                    <Icon icon={item.icon} className={styles.panleItemIcon} />
                    <p>{item.text}</p>
                </NavLink>
            ))
        const OrderEntryList = [{ path: '', text: '我的竞价' }, { path: '', text: '我的求购' }, { path: '', text: '收到的报价' }]
            .map(((item, index, arr) => (<EntryItem key={index} hasLine={arr.length - 1 !== index}>{item.text}</EntryItem>)))
        const AuthEntryList = [{ path: '', text: '个人认证' }, { path: '', text: '企业对公账户' }]
            .map(((item, index, arr) => (<EntryItem key={index} hasLine={arr.length - 1 !== index}>{item.text}</EntryItem>)))
        return (
            <div className={styles.content}>
                <span
                    className={styles.switchBtn} onClick={() => { updateType(toType) }}>
                    切换为卖家
                </span>
                <Panel className={styles.panel} title="订单管理">{OrderPanleList}</Panel>
                <div className={styles.entryGroup}>
                    {OrderEntryList}
                </div>
                <div className={styles.entryGroup}>
                    {AuthEntryList}
                </div>
            </div>
        )
    }
}