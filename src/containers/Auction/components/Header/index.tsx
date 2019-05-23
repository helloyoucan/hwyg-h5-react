import React, { Component } from 'react'
import styles from './styles.module.scss'
interface TabItem {
    text: string,
    type: number
}
const tabList: Array<TabItem> = [
    { text: '热门标的', type: 0 },
    { text: '今日专场', type: 1 },
    { text: '专场预告', type: 2 },
    { text: '历史专场', type: 3 },
]
interface Props{
    type:number,
    updateType:Function
}
export default class Header extends Component <Props,any> {
    render() {
        const {type,updateType} = this.props
        return (
            <div className={styles.header}>
                <div className={styles.title}>竞价大厅</div>
                <div className={styles.tabs}>
                    {
                        tabList.map(item => (
                            <div
                                key={item.type}
                                onClick={() => {updateType(item.type) }}
                                className={[styles.tabItem, type === item.type ? styles.active : undefined].join(' ')}>
                                {item.text}
                            </div>
                        ))
                    }

                </div>
            </div>
        )
    }
}