import React, { Component } from 'react'
import styles from './styles.module.scss'
import Icon from '@base/Icon/index'
export default class GoodsCard extends Component {
    render() {
        return (
            <div className={styles.goodsCard}>
                <img className={styles.goodsImg} />
                <div className={styles.goodsInfo}>
                    <h4 className={['gb-long-text-ellipsis',styles.name].join(' ')}>深带鱼&nbsp;10吨</h4>
                    <p className={styles.infoItem}>规格：100-200</p>
                    <p className={styles.infoItem}>发布时间：50分钟前</p>
                    <p className={styles.price}>
                    100000.00
                    <span className={styles.unit}>元/吨</span>
                    </p>
                    <span className={styles.location}><Icon className={styles.icon} icon="icon_location"/>珠海市</span>
                </div>
            </div>
        )
    }
}