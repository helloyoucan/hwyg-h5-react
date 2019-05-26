import React, { Component } from 'react'
import styles from './styles.module.scss'
interface Props {
    className?: string | undefined,
    title: String,
    children: React.ReactNode
}
export default class Panel extends Component<Props, any> {
    render() {
        const { title, children, className } = this.props
        return (
            <div className={[className, styles.panel].join(' ')}>
                <h3 className={styles.title}>{title}</h3>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        )
    }
}