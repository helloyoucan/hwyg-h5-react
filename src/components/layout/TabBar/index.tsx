import React,{Component} from 'react'
import styles from './styles.module.scss'
import Icon from '@base/Icon/index'
import {NavLink} from 'react-router-dom'
export default class TabBar extends Component{
    render(){
        const router = [
            {path:'/main/home',text:'首页',icon:'tab_icon_home_def',activeIcon:'tab_icon_home_sel'},
            {path:'/main',text:'供求',icon:'tab_icon_gq_def',activeIcon:'tab_icon_gq_sel'},
            {path:'/main',text:'竞价',icon:'tab_icon_bidding_sel_',activeIcon:'tab_icon_bidding_sel'},
            {path:'/main',text:'资讯',icon:'tab_icon_news_def',activeIcon:'tab_icon_news_sel'},
            {path:'/main',text:'我的',icon:'tab_icon_my_sel_',activeIcon:'tab_icon_my_sel'}
        ]
        return (
            <nav className={styles.tabBar}>
            {
                router.map(item=>{
                    return (
                        <NavLink to={item.path} className={styles.navItem} key={item.text}>  
                            <Icon className="icon" icon={item.icon}/>
                            <Icon className="icon" icon={item.activeIcon}/>
                            <p>{item.text}</p>
                        </NavLink>
                    )
                })
            }
                
            </nav>
        )
    }
}