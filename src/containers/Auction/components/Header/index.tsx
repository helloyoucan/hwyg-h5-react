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
export default class Header extends Component {
    state = {
        activeType: 0
    }
    constructor(props: any) {
        super(props)
        this.handleClickTabItem = this.handleClickTabItem.bind(this)

    }
    handleClickTabItem(type: number) {
        this.setState({
            activeType: type
        })
    }
    render() {
        const { activeType } = this.state
        return (
            <div className={styles.header}>
                <div className={styles.title}>竞价大厅</div>
                <div className={styles.tabs}>
                    {
                        tabList.map(item => (
                            <div
                                key={item.type}
                                onClick={() => { this.handleClickTabItem(item.type) }}
                                className={[styles.tabItem, activeType === item.type ? styles.active : undefined].join(' ')}>
                                {item.text}
                            </div>
                        ))
                    }

                </div>
            </div>
        )
    }
}