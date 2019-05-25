import React, { Component } from 'react'
import styles from './styles.module.scss'
import Icon from '@base/Icon/index'
function NoImgCard(): JSX.Element {
    return (
        <div className={styles.newsCard}>
            <h2 className={styles.title}>
                我是标题
            </h2>
            <span className={styles.pushTime}>2小时前</span>
            <span className={styles.viewCount}><Icon className={styles.viewIcon} icon="icon_eye_open" />434</span>
        </div>
    )
}
function OneImgCard(): JSX.Element {
    return (
        <div className={[styles.newsCard, styles.oneImgCard].join(' ')}>
            <img className={styles.newsImg} alt="资讯图片" />
            <div className={styles.newsInfo}>
                <h2 className={styles.title}>我是标题</h2>
                <span className={styles.pushTime}>2小时前</span>
                <span className={styles.viewCount}><Icon className={styles.viewIcon} icon="icon_eye_open" />324</span>
            </div>
        </div>
    )
}
function ThreeImgCard(): JSX.Element {
    return (
        <div className={[styles.newsCard, styles.threeImgCard].join(' ')}>
            <h2 className={styles.title}>我是标题</h2>
            <div className={styles.imgGroup}>
                <img className={styles.newsImg} alt="资讯图片" />
                <img className={styles.newsImg} alt="资讯图片" />
                <img className={styles.newsImg} alt="资讯图片" />
            </div>
            <span className={styles.pushTime}>2小时前</span>
            <span className={styles.viewCount}><Icon className={styles.viewIcon} icon="icon_eye_open" />322</span>
        </div>
    )
}
export default function NewsCard(): JSX.Element {
    const length = parseInt(Math.random() * 10 + '', 10)
    if (length === 0) {
        return <NoImgCard />
    }
    if (length < 3) {
        return <OneImgCard />
    }
    return <ThreeImgCard />
} 