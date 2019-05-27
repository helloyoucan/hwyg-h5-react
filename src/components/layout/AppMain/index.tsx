import React,{Component} from 'react'
import styles from './styles.module.scss'
import TavBar from '@/components/layout/TabBar/index'
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