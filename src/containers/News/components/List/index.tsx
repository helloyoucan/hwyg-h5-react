
import React, { Component } from 'react'
import styles from './styles.module.scss'
import NewsCard from '../NewsCard/index'
import InfiniteScroll from '@base/InfiniteScroll/index'
import * as NewsServise from '@/services/news'
export default class List extends Component {
    state = {
        list: [],
        size: 10,
        page: 1,
        totalPages: Infinity
    }
    constructor(props: any) {
        super(props)
        this.handleOnUpdate = this.handleOnUpdate.bind(this)
        this.handleOnLoad = this.handleOnLoad.bind(this)
    }
    componentDidMount() {
        this.getGoods()
    }
    getGoods() {
        const { page } = this.state
        return NewsServise
            .getNewsList({ page })
            .then((res: any) => {
                this.setState({
                    list: res._schema.list,
                    totalPages: res._schema.pager.totalPages
                })
            })
    }
    handleOnUpdate(done: Function) {
        this.setState({
            page: 1,
            list: []
        })
        this.getGoods()
            .finally(() => {
                done()
            })
    }
    handleOnLoad(done: Function) {
        let { page } = this.state
        page++
        NewsServise
            .getNewsList({ page })
            .then((res: any) => {
                const oldList = this.state.list
                this.setState({
                    page,
                    list: [...oldList, ...res._schema.list]
                }, () => {
                    setTimeout(() => {
                        done()
                    })
                })
            })
    }
    render() {
        const { list, page, totalPages } = this.state
        return (
            <InfiniteScroll
                className={styles.goodsConatiner}
                canLoad={page < totalPages}
                onUpdate={this.handleOnUpdate}
                onLoad={this.handleOnLoad}>
                <ul className={styles.list}>
                    {
                        list.map((item, index) => (<NewsCard news={item} key={index} />))
                    }

                </ul>

            </InfiniteScroll>
        )
    }
}