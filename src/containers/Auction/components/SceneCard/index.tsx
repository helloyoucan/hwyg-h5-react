import React, { Component } from 'react'
import styles from './styles.module.scss'
import StatusJSX from './components/Status2JSX/index'
import CountTag from './components/CountTag/index'
import TimerCount from './components/TimerCount/index'
import {parseTime} from '@/utils/time.js'
interface Props {
    scene: {
        beginTime?: number,
        endTime?: number,
        corporeCount?: number,
        coverUrls: string,
        name?: string,
        onlookNumber?: number,
        status?: number,
        dealNumber?: number,
        participants?: number,
        bidType?: number,
        bidNumber?:number
    } | any
}
export default class SceneCard extends Component<Props, any> {
    render() {
        const scene = this.props.scene
        return (
            <div className={styles.sceneCard}>
                <img src={scene.coverUrls} className={styles.sceneImg} alt={scene.name} />
                <h3 className={styles.sceneName}>
                    {scene.name}
                </h3>
                <div className={styles.sceneInfo}>
                    <span>开始时间：{parseTime(scene.beginTime,'{m}-{d} {h}:{i}')}</span>
                    <span>标的数量：{scene.corporeCount}</span>
                    <span>结束时间：{parseTime(scene.endTime,'{m}-{d} {h}:{i}')}</span>
                    <span>参与人数：{scene.participants}</span>
                </div>
                <TimerCount
                    beginTime={scene.beginTime}
                    endTime={scene.endTime}
                    bidType={scene.bidType}
                    status={scene.status} />
                <StatusJSX
                    className={styles.status}
                    status={scene.status} />
                <CountTag
                    className={styles.count}
                    status={scene.status}
                    lookCount={scene.onlookNumber}
                    bidCount={scene.bidNumber} />
            </div>
        )
    }
}