import React, { Component } from 'react'
import styles from './styles.module.scss'
import Panel from '../Panel/index'
import Icon from '@base/Icon/index'
import { NavLink } from 'react-router-dom'
export default class Buyer extends Component {
    render() {
        const PanleList = [
            { path: '', icon: 'icon_hezuoguanxi', text: '定向交易' },
            { path: '', icon: 'tab_icon_bidding_sel', text: '竞价交易' },
            { path: '', icon: 'icon_gongyingguanli', text: '供应/求购' }
        ]
            .map((item, index) => (
                <NavLink
                    key={index}
                    to={item.path}
                    className={styles.panelItem}>
                    <Icon
                        icon={item.icon}
                        className={styles.panleItemIcon} />
                    <p>{item.text}</p>
                </NavLink>
            ))
        return (
            <div className={styles.buyer}>
                <a
                    href="javascript:void(0)"
                    className={styles.switchBtn}>
                    切换为卖家
                </a>
                <Panel className={styles.panel} title="订单管理">{PanleList}</Panel>
            </div>
        )
    }
}