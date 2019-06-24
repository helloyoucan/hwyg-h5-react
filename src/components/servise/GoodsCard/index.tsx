import React, { Component } from 'react'
import styles from './styles.module.scss'
import { formatTime } from '@/utils/time.js'
interface Goods {
    defaultImage?: string,
    productName?: string,
    specification?: string,
    addedTime?: number,
    unit?: string,
    unitPrice?: number,
    totalAmount?: number,
    quoteType?: number // '报价类型 1一口价 2可议价'

}
interface Props {
    goods?: Goods | any
}
export default class GoodsCard extends Component<Props, any> {
    render() {
        const { goods } = this.props
        return goods ? (
            <div className={styles.goodsCard}>
                <img className={styles.goodsImg} src={goods.defaultImage} alt={goods.productName} />
                <div className={styles.goodsInfo}>
                    <h4 className={['gb-long-text-ellipsis', styles.name].join(' ')}>{goods.productName}&nbsp;{goods.totalAmount}{goods.unit}</h4>
                    <p className={styles.infoItem}>规格：{goods.specification}</p>
                    <p className={styles.infoItem}>发布时间：{formatTime(goods.addedTime, '{y}-{m}-{d} {h}:{i}')}</p>
                    {
                        goods.quoteType === 1
                            ? (
                                <p className={styles.price}>
                                    {goods.unitPrice}
                                    <span className={styles.unit}>元/{goods.unit}</span>
                                </p>
                            )
                            : <p className={styles.price}>
                                可议价
                            </p>
                    }

                </div>
            </div>
        ) : (<div></div>)
    }
}