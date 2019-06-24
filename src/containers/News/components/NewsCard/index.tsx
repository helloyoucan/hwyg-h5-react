import React from 'react'
import styles from './styles.module.scss'
import Icon from '@base/Icon/index'
import { formatTime } from '@/utils/time.js'
interface News {
    checkNumber?: number,
    createTime: number,
    title?: string,
    content?: string
}
interface FuncProps {
    news: News,
    images: Array<string>
}
interface Props {
    news: News
}
function NoImgCard(props: Props): JSX.Element {
    const news = props.news
    return (
        <div className={styles.newsCard}>
            <h2 className={styles.title}>
                {news.title}
            </h2>
            <span className={styles.pushTime}>{formatTime(news.createTime, '{y}/{m}/{d} {h}:{i}')}</span>
            <span className={styles.viewCount}><Icon className={styles.viewIcon} icon="icon_eye_open" />{news.checkNumber}</span>
        </div>
    )
}
function OneImgCard(props: FuncProps): JSX.Element {
    const { news, images } = props
    return (
        <div className={[styles.newsCard, styles.oneImgCard].join(' ')}>
            <img src={images[0]} className={styles.newsImg} alt="资讯图片" />
            <div className={styles.newsInfo}>
                <h2 className={styles.title}>{news.title}</h2>
                <span className={styles.pushTime}>{formatTime(news.createTime, '{y}/{m}/{d} {h}:{i}')}</span>
                <span className={styles.viewCount}><Icon className={styles.viewIcon} icon="icon_eye_open" />{news.checkNumber}</span>
            </div>
        </div>
    )
}
function ThreeImgCard(props: FuncProps): JSX.Element {
    const { news, images } = props
    return (
        <div className={[styles.newsCard, styles.threeImgCard].join(' ')}>
            <h2 className={styles.title}>{news.title}</h2>
            <div className={styles.imgGroup}>
                {
                    images.slice(0, 3).map((item: string, index: number) => (
                        <img src={item} key={index} className={styles.newsImg} alt="资讯图片" />
                    ))
                }
            </div>
            <span className={styles.pushTime}>{formatTime(news.createTime, '{y}/{m}/{d} {h}:{i}')}</span>
            <span className={styles.viewCount}><Icon className={styles.viewIcon} icon="icon_eye_open" />{news.checkNumber}</span>
        </div>
    )
}
function getImgs(content: string | undefined): Array<string> {
    let src: Array<string> = []
    if (content) {
        content.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/ig, (_match: string, capture: string) => {
            src.push(capture)
            return capture
        })
    }
    return src
}

export default function NewsCard(props: Props): JSX.Element {
    const news = props.news
    const arr_img = getImgs(news.content)
    if (arr_img.length === 0) {
        return <NoImgCard news={news} />
    }
    if (arr_img.length < 3) {
        return <OneImgCard news={news} images={arr_img} /> //图片为1个或2个
    }
    return <ThreeImgCard news={news} images={arr_img} />
} 