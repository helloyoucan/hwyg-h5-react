import React, { Component } from 'react'
import styles from './styles.module.scss'
import Icon from '@base/Icon/index'
export default class Filter extends Component {
    render() {
        return (
            <div className={styles.filter}>
                <div>
                    <span className={styles.triangle}>价格</span>
                </div>
                <div>
                    <span className={styles.triangle}>存储类型</span>
                </div>
                <div>
                    <span className={styles.triangle}>渔获类型</span>
                </div>
                <div>
                    <span>
                        <Icon className="icon" icon="icon_classify" />
                        分类
                    </span>
                </div>
            </div>
        )
    }
}