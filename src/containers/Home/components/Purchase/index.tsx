import React, { Component } from 'react'
import styles from './styles.module.scss'
import Icon from '@base/Icon/index'
import GoodsCard from '@servise/GoodsCard/index'
import * as GoodsServise from '@/services/goods'
export default class Purchase extends Component {
    state = {
        list: []
    }
    componentDidMount() {
        GoodsServise
            .getGoodsList({ type: 1 })
            .then((res: any) => {
                this.setState({
                    list: res._schema.list
                })
            })
    }
    render() {
        const { list } = this.state
        return (
            <section>
                <h3 className={styles.listTitle}>
                    <span className={styles.moduleTitle}>最新求购</span>
                    <span className={styles.readMore}>查看更多<Icon className={styles.icon} icon="nav_icon_go" /></span>
                </h3>
                <ul>
                    {
                        list.map((item: any, index: number) => (<GoodsCard goods={item} key={index} />))
                    }
                </ul>
            </section>
        )
    }
}