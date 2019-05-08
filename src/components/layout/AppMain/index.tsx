import React,{Component} from 'react'
import styles from './styles.module.scss'
import TavBar from '@/components/layout/TabBar/index'
import {Route,Redirect } from "react-router-dom";
import Home from '@/containers/Home/index'
export default class AppMain extends Component{
render(){
    return (
        <main className={styles.appMain}>
            <div className={styles.containber}>
                <Route path="/main/home" exact component={Home}></Route>
                <Route path="/main" exact component={Home}></Route>
                <Route path="/main/a" exact component={Home}></Route>
                <Route path="/main/b" exact component={Home}></Route>
            </div>
            <TavBar></TavBar>
        </main>
    )
}
}