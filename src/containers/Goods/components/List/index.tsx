import React, { Component } from 'react'
import styles from './styles.module.scss'
import GoodsCard from '@servise/GoodsCard/index'
import InfiniteScroll from '@base/InfiniteScroll/index'
export default class List extends Component {
    render() {
        return (
            <InfiniteScroll className={styles.goodsConatiner} onUpdate={done => setTimeout(done, 2000)} onLoad={done => setTimeout(done, 2000)}>
                <ul className={styles.list}>
                    {
                        new Array(10).fill(1).map((item, index) => (<li key={index}><GoodsCard /></li>))
                    }

                </ul>

            </InfiniteScroll>
        )
    }
}