
import React, { Component } from 'react'
import styles from './styles.module.scss'
import NewsCard from '../NewsCard/index'
export default class List extends Component {
    render() {
        const listData = new Array(5).fill(1)
        return (
            <div className={styles.list}>
            {
                listData.map((item,index)=>(
                    <NewsCard key={index}/>
                ))
            }
            </div>
        )
    }
}