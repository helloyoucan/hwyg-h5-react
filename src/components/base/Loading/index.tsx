import React from 'react';
import styles from './styles.module.scss'
export default function Loading(props: any) {
    if (props.error) {
        return (
            <div className={styles.index}>
                <div className={styles.message}>加载错误，请刷新！</div>
            </div>
        )
    } else if (props.timedOut) {
        return (
            <div className={styles.index}>
               <div className={styles.message}>加载超时</div>
            </div>
        )
    } else if (props.pastDelay) {
        return (
            <div className={styles.index}>
                <span className={[styles.message,styles.loading].join(' ')}></span>
            </div>
        )
    } else {
        return null;
    }
}