import React,{Component} from 'react'
import styles from './styles.module.scss'
import TavBar from '@/components/layout/TabBar/index'
import {Route,Switch,NavLink } from "react-router-dom";
import Home from '@/containers/Home/index'
export default class AppMain extends Component{
render(){
    return (
        <main className={styles.appMain}>
            <div className={styles.containber}>
            <Switch>
                <Route path="/main/home" component={Home}></Route>
                <Route path="/main/a" component={Home}></Route>
                <Route path="/main/b" component={Home}></Route>
                </Switch>
            </div>
            <TavBar></TavBar>
        </main>
    )
}
}