import React, { Component } from 'react'
import styles from './styles.module.scss'
import Icon from '@base/Icon/index'
interface State{
    tabIndexActive:number
}
export default class Header extends Component {
    state:State = {
        tabIndexActive: 0
    }
    constructor(props: any) {
        super(props)
        this.handleClickTabItem = this.handleClickTabItem.bind(this)
    }
    handleClickTabItem(e:any) {
        e.persist()
        const target = e.target
        const newTabIndexActive = parseInt(target.getAttribute('data-index'),10)
        console.log(newTabIndexActive)
        this.setState({
            tabIndexActive: newTabIndexActive
        })
    }
    render() {
        const tabListData = [
            { title: '供应信息' },
            { title: '求购信息' }
        ]
        const tabIndexActive = this.state.tabIndexActive
        return (
            <div className={styles.header}>
                <div className={styles.tabs}
                    onClick={(e) => { this.handleClickTabItem(e) }}>
                    {
                        tabListData.map((item, index) => (
                            <span
                                className={[styles.tabItem, tabIndexActive === index ? styles.active : undefined].join(' ')}
                                key={item.title}
                                data-index={index}>
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