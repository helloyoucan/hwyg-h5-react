import React, { Component } from 'react'
import styles from './styles.module.scss'
import Icon from '@base/Icon/index'
import GoodsCard from '@servise/GoodsCard/index'
export default class Purchase extends Component {
    state={
        list:[1,2.3,4,5]
    }
    render() {
        const {list} = this.state
        return (
            <section>
                <h3 className={styles.listTitle}>
                    <span>最新求购</span>
                    <a href="#">查看更多<Icon className={styles.icon} icon="nav_icon_go"/></a>
                </h3>
                <ul>
                    {
                        list.map(item=>(<GoodsCard key={item}/>))
                    }
                </ul>
            </section>
        )
    }
}