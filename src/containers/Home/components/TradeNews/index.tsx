import React, { Component } from 'react'
import styles from './styles.module.scss'
export default class TradeNews extends Component {
    state = {
        list: [
            { name: '马鲛鱼', number: 623, price: '23000', unit: '吨', totalPrice: 34200000 },
            { name: '马鲛鱼1', number: 543, price: '32400', unit: '吨', totalPrice: 32432005 },
            { name: '马鲛鱼2', number: 64, price: '430', unit: '吨', totalPrice: 18432000 },
            { name: '马鲛鱼3', number: 645, price: '6400', unit: '吨', totalPrice: 18000000 },
        ],
        timeId: undefined,
        ulStyles: {}
    }
    componentDidMount() {
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
    componentWillUnmount() {
        this.state.timeId && clearInterval(this.state.timeId)
    }

    render() {
        const { list, ulStyles } = this.state
        return (
            <div className={styles.tradeNews}>
                <ul className={styles.tradeNewsList} style={ulStyles}>
                    {
                        list.map(item => (
                            <li
                                key={item.number}
                                className={'gb-long-text-ellipsis'}>
                                <span>{item.name}</span>{item.number}{item.unit}&nbsp;&nbsp;单价<span>{item.price}元/{item.unit}</span>&nbsp;&nbsp;总计<span>{item.totalPrice}元</span>
                            </li>
                        )
                        )
                    }
                </ul>
            </div>
        )
    }
}