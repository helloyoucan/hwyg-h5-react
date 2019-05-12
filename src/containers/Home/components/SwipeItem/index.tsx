import React, { Component } from 'react'
import styles from './styles.module.scss'
interface Props {
    children?: React.ReactNode,
    width?: string
}
export default class SwipeItem extends Component<Props> {
    render() {
        const { children, width } = this.props
        return (
            <div className={styles.swipeItem} style={{ width: width }}>
                {children}
            </div >
        )
    }
}