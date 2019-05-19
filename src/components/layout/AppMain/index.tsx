import React,{Component} from 'react'
import styles from './styles.module.scss'
import TavBar from '@/components/layout/TabBar/index'
import {Route} from "react-router-dom";//Redirect
import Home from '@/containers/Home/index'
export default class AppMain extends Component{
render(){
    return (
        <main className={styles.appMain}>
            <div className={styles.containber}>
            {this.props.children}
            </div>
            <TavBar></TavBar>
        </main>
    )
}
}