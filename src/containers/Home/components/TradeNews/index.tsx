import React, { Component } from 'react'
import styles from './styles.module.scss'
import * as OrderServise from '@/services/order'
interface TradeItem {
    productName?: string,
    amount?: number,
    unit?: string,
    unitPrice?: number,
    price?: number,
    time?: number
}
export default class TradeNews extends Component {
    state = {
        list: [],
        timeId: undefined,
        ulStyles: {}
    }
    startTransform() {
        this.state.timeId && clearInterval(this.state.timeId)
        const timeId = setInterval(() => {
            const ulStyles = { transform: 'translate3d(0,-100%,0)', transition: 'transform 1s' }
            this.setState({ ulStyles }, () => {
                const list: Array<any> = this.state.list
                setTimeout(() => {
                    const ulStyles = { transform: 'translate3d(0,0,0)', transition: 'none' }
                    list.push(list.shift())
                    this.setState({ ulStyles, list })
                }, 1000)
            })
        }, 5000)
        this.setState({ timeId })
    }
    componentDidMount() {
        OrderServise
            .getBrannerList()
            .then((res: any) => {
                this.setState({
                    list: res._schema.list
                }, () => {
                    this.startTransform()
                })
            })

    }
    componentWillUnmount() {
        this.state.timeId && clearInterval(this.state.timeId)
    }
    componentDidUpdate(prevProps: any) {
        // if (this.state.list !== prevProps.list) {
        //     this.startTransform()
        // }

    }
    render() {
        const { list, ulStyles } = this.state
        return (
            <div className={styles.tradeNews}>
                <ul className={styles.tradeNewsList} style={ulStyles}>
                    {
                        list.map((item:TradeItem, index: number) => (
                            <li
                                key={index}
                                className={'gb-long-text-ellipsis'}>
                                <span>{item.productName}</span>{item.amount}{item.unit}&nbsp;&nbsp;单价<span>{item.unitPrice}元/{item.unit}</span>&nbsp;&nbsp;总计<span>{item.price}元</span>
                            </li>
                        )
                        )
                    }
                </ul>
            </div>
        )
    }
}