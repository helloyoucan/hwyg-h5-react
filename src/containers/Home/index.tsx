import React from 'react';
// import { Link } from "react-router-dom";
import styles from './styles.module.scss'
// import Icon from '@base/Icon/index'
// import { Redirect } from 'react-router-dom'
import Header from '@servise/Header/index'
import Swipe from './components/Swipe/index'
import SwipeItem from './components/SwipeItem/index'
import TradeNews from './components/TradeNews/index'
import Supply from './components/Supply/index'
import Purchase from './components/Purchase/index'
import * as BrannersServise from '@/services/branners'
interface BrannerItem {
    brannerName?: string,
    imgUrl?: string
}
export default class Home extends React.Component {
    state = {
        branners: []
    }
    componentDidMount() {
        BrannersServise
            .getBrannerList()
            .then((res: any) => {
                this.setState({
                    branners: res._schema.list
                })
            })
    }
    render() {
        const { branners } = this.state
        const SwipeContent = (
            <Swipe>
                {
                    branners
                        .map((item: BrannerItem, index: number) => (
                            <SwipeItem key={index} >
                                <img className={styles.brannerItem} src={item.imgUrl} alt={item.brannerName} />
                            </SwipeItem>
                        ))
                }
            </Swipe>
        )
        return (
            <div className={styles.home}>
                <Header />
                {SwipeContent}
                <TradeNews />
                <Supply />
                <Purchase />
            </div>
        )
    }
}