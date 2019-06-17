import React, { Component } from 'react'
import styles from './styles.module.scss'
import AuctionCard from '../AuctionCard/index'
import SceneCard from '../SceneCard/index'
import NoData from '@/components/servise/NoData'
interface Props {
    type: number,
    listData: Array<Object>
}
export default class List extends Component<Props, any> {
    $refContent: any = React.createRef()
    render() {
        const { type, listData } = this.props
        this.$refContent.current && (this.$refContent.current.scrollTop = 0)
        if (listData.length === 0) {
            return <NoData className={styles.nullData} />
        }
        switch (type) {
            case 1:
            case 2:
            case 3:
                return (
                    <div
                        ref={this.$refContent}
                        className={[styles.listContent, styles.secneListContent].join(' ')}>
                        <ul>
                            {listData.map((item, index) => (
                                <li key={index}><SceneCard scene={item} /></li>)
                            )}
                        </ul>
                    </div>)
            case 0:
            default:
                return (
                    <div
                        ref={this.$refContent}
                        className={[styles.listContent, styles.auctionListContent].join(' ')}>
                        <ul>
                            {listData.map((item, index) => (
                                <li key={index}><AuctionCard auction={item} /></li>)
                            )}
                        </ul>
                    </div>
                )
        }
    }
}