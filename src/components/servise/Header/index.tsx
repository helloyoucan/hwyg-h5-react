import React from 'react';
// import { Link } from "react-router-dom";
import styles from './styles.module.scss'
import Icon from '@/components/base/Icon';
// import Icon from '@base/Icon/index'
export default class Header extends React.Component {
    render() {
        return (
            <header className={styles.header}>
                <span className={styles.messageBtn}>
                    <Icon className={styles.messageIcon} icon="nav_icon_message" />
                </span>
                <span className={styles.inputView} >
                    <Icon className={styles.searchIcon} icon="nav_icon_search" />
                    请输入产品名称
                </span>
                <span className={styles.addBtn} >
                    <Icon className={styles.addIcon} icon="nav_icon_issue" />
                </span>
            </header>
        )
    }
}