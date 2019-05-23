import React, { Component } from 'react'
import styles from './styles.module.scss'
import AuctionCard from '../AuctionCard/index'
import SceneCard from '../SceneCard/index'
interface Props {
    type: number
}
export default class List extends Component<Props, any> {

    render() {
        const { type } = this.props
        let Ul: JSX.Element
        switch (type) {
            case 1:
                Ul = (<ul>{new Array(6).fill(1).map((item, index) => (<li key={index}><SceneCard /></li>))}</ul>)
                break
            case 2:
                Ul = (<ul>{new Array(6).fill(1).map((item, index) => (<li key={index}><SceneCard /></li>))}</ul>)
                break
            case 3:
                Ul = (<ul>{new Array(6).fill(1).map((item, index) => (<li key={index}><SceneCard /></li>))}</ul>)
                break
            case 1:
            default:
                Ul = (<ul>{new Array(6).fill(1).map((item, index) => (<li key={index}><AuctionCard /></li>))}</ul>)
        }
        return (
            <div className={styles.list}>{Ul}</div>
        )
    }
}