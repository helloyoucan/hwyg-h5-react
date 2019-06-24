import React, { Component } from 'react'
import styles from './styles.module.scss'
import Icon from '@base/Icon/index'
enum Type {
    supply = 1,
    purchase = 2
}
interface Props {
    type: Type,
    changeType: Function
}
interface State {
    tabIndexActive: number
}
export default class Header extends Component<Props, any> {
    constructor(props: any) {
        super(props)
        this.handleClickTabItem = this.handleClickTabItem.bind(this)
    }
    handleClickTabItem(e: any) {
        e.persist()
        const target = e.target
        const newTabIndexActive = parseInt(target.getAttribute('data-index'), 10)
        this.props.changeType(newTabIndexActive)
    }
    render() {
        const tabListData = [
            { title: '供应信息', type: 2 },
            { title: '求购信息', type: 1 }
        ]
        const tabIndexActive = this.props.type
        return (
            <div className={styles.header}>
                <div className={styles.tabs}
                    onClick={(e) => { this.handleClickTabItem(e) }}>
                    {
                        tabListData.map((item) => (
                            <span
                                className={[styles.tabItem, tabIndexActive === item.type ? styles.active : undefined].join(' ')}
                                key={item.title}
                                data-index={ item.type}>
                                {item.title}
                            </span>))
                    }
                </div>
                <div className={styles.btnGruop}>
                    <Icon icon='nav_icon_search' className={styles.searchBtn} />
                    <Icon icon='nav_icon_issue' className={styles.plusBtn} />
                </div>
            </div>
        )
    }
}