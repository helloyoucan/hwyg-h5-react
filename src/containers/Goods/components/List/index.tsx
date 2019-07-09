import React, { Component } from 'react'
import styles from './styles.module.scss'
import GoodsCard from '@servise/GoodsCard/index'
import InfiniteScroll from '@base/InfiniteScroll/index'
import * as GoodsServise from '@/services/goods'
enum Type {
    supply = 1,
    purchase = 2
}
interface Props {
    type: Type
}
export default class List extends Component<Props, any> {
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
    componentDidUpdate(prevProps: any) {
        if (this.props.type !== prevProps.type) {
            this.setState({
                list: [],
                page: 1,
                totalPages: Infinity
            })
            this.getGoods()
        }
    }
    getGoods() {
        const { type } = this.props
        const { page } = this.state
        return GoodsServise
            .getGoodsList({ type: type, page })
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
        const { type } = this.props
        let { page } = this.state
        page++
        GoodsServise
            .getGoodsList({ type: type, page })
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
        const canLoad = page < totalPages
        return (
            <InfiniteScroll
                className={styles.goodsConatiner}
                canLoad={canLoad}
                onUpdate={this.handleOnUpdate}
                onLoad={this.handleOnLoad}>
                <ul className={styles.list}>
                    {
                        list.map((item: any, index: number) => (<GoodsCard goods={item} key={index} />))
                    }

                </ul>

            </InfiniteScroll>
        )
    }
}