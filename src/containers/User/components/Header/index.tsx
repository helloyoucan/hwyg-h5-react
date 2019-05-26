import React, { Component } from 'react'
import styles from './styles.module.scss'
import Icon from '@base/Icon/index'
export default class Index extends Component {
    render() {
        return (
            <div className={styles.header}>
                <div className={styles.iconBtnGroup}>
                    <a href="javascript:void(0)">
                        <Icon className={styles.iconBtn} icon="nav_nav_icon_set" />
                    </a>
                    <a href="javascript:void(0)">
                        <Icon className={styles.iconBtn} icon="nav_icon_message" />
                    </a>
                </div>
                <div className={styles.userContent}>
                    <div className={styles.userIconContent}>
                        <img src="#" className={styles.userIcon} alt="用户头像" />
                        <Icon icon="icon_edit" className={styles.editIconBtn} />
                    </div>
                    <div className={styles.userInfo}>
                        <p className={styles.userName}>用户名</p>
                        <p className={styles.userAuth}>
                            <span className={styles.authTag}>
                                <Icon icon="icon_vip" />个人认证
                            </span>
                            <span className={styles.authTag}>
                                <Icon icon="icon_vip" />企业认证
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}