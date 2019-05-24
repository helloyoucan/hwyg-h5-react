import React from 'react';
// import { Link } from "react-router-dom";
import styles from './styles.module.scss'
import Icon from '@/components/base/Icon';
// import Icon from '@base/Icon/index'
export default class Header extends React.Component{
    render() {
        return (
            <header className={styles.header}>
                <a  className={styles.messageBtn} href="/">
                <Icon className={styles.messageIcon} icon="nav_icon_message"/>
                </a>
                <a className={styles.inputView} href="/">
                <Icon  className={styles.searchIcon}  icon="nav_icon_search"/>
                请输入产品名称
                </a>
                <a  className={styles.addBtn} href="/">
                <Icon  className={styles.addIcon}  icon="nav_icon_issue"/>
                </a>
            </header>
        )
    }
}