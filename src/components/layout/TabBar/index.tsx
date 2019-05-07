import React,{Component} from 'react'
import styles from './styles.module.scss'
import Icon from '@base/Icon/index'
import {NavLink} from 'react-router-dom'
export default class TabBar extends Component{
    render(){
        return (
            <nav className={styles.tabBar}>
                <NavLink to="home" className={styles.navItem}>
                    <Icon icon="icontab_icon_home_sel"/>
                    <p>主页</p>
                </NavLink>
                <NavLink  to="/main/a" className={styles.navItem}>
                    <Icon icon="icontab_icon_home_sel"/>
                    <p>主页</p>
                </NavLink>
                <NavLink  to="/main/b" className={styles.navItem}>
                    <Icon icon="icontab_icon_home_sel"/>
                    <p>主页</p>
                </NavLink>
            </nav>
        )
    }
}