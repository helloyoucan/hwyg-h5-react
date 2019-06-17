import React, { Component } from 'react'
import styles from './styles.module.scss'
import Header from './components/Header/index'
import List from './components/List/index'
import * as AuctionServise from '@/services/auction'
enum EnumRang {
    today = "today",
    future = "future",
    previous = "previous"
}
export default class Auction extends Component {
    state = {
        type: 0,
        list: []
    }
    constructor(props: any) {
        super(props)
        this.handleChangeType = this.handleChangeType.bind(this)
    }
    componentDidMount() {
        this.getAuctionList()
    }
    getAuctionList() {
        AuctionServise
            .getSealList({
                page: 1,
                size: 10
            })
            .then((res: any) => {
                this.setState({
                    list: res._schema.list
                })
            })
            .catch(res => {

            })
            .finally(() => {

            })
    }
    getSceneList(type: number) {
        let rang: EnumRang
        switch (type) {
            case 1:
                rang = EnumRang.today
                break
            case 2:
                rang = EnumRang.future
                break
            case 3:
                rang = EnumRang.previous
                break
            default:
                rang = EnumRang.today
        }
        AuctionServise
            .getSceneList({
                page: 1,
                size: 10,
                rang
            })
            .then((res: any) => {
                this.setState({
                    list: res._schema.list
                })
            })
            .catch(res => {

            })
            .finally(() => {

            })
    }
    handleChangeType(type: number) {
        this.setState({
            list: []
        })
        if (type === 0) {
            this.getAuctionList()
        } else {
            this.getSceneList(type)
        }
        this.setState({ type })
    }
    render() {
        const { type, list } = this.state
        return (
            <div className={styles.auction}>
                <Header type={type} updateType={this.handleChangeType} />
                <List type={type} listData={list} />
            </div>
        )
    }
}