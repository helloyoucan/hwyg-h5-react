import React from 'react';
import styles from './styles.module.scss'
import noDataImg from './assets/nodata.png'
interface Props {
    className?: string,
    message?: string
}
export default class Header extends React.Component<Props, any>{
    render() {
        const { className, message } = this.props
        return (
            <div className={[styles._noData, className ? className : undefined].join(' ')}>
                <div className={styles.layout}>
                    <img src={noDataImg} className={styles.img} alt="" />
                    <p className={styles.message}>{message ? message : '暂无数据'}</p>
                </div>
            </div>
        )
    }
}