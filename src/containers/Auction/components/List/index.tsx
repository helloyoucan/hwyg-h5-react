import React, { Component } from 'react'
import styles from './styles.module.scss'
import AuctionCard from '../AuctionCard/index'
import SceneCard from '../SceneCard/index'
interface Props {
    type: number
}
export default class List extends Component<Props, any> {
$refContent: any = React.createRef()
    render() {
        const { type } = this.props
        const listData = new Array(6).fill(1)
        this.$refContent.current&&(this.$refContent.current.scrollTop=0)
        switch (type) {
            case 1:
            case 2:
            case 3:
                return (<div ref={this.$refContent} className={[styles.listContent,styles.secneListContent].join(' ')}><ul>{listData.map((item, index) => (<li key={index}><SceneCard /></li>))}</ul></div>)
                break
            case 1:
            default:
                return (<div ref={this.$refContent} className={[styles.listContent,styles.auctionListContent].join(' ')}><ul>{listData.map((item, index) => (<li key={index}><AuctionCard /></li>))}</ul></div>)
        }
    }
}