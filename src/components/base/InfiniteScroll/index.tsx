import React, { Component } from 'react'
import styles from './styles.module.scss'
import Icon from '@base/Icon/index'
interface Props {
    height?: string,
    className?: string,
    onUpdate?: (done: Function) => void,
    onLoad?: (done: Function) => void,
    canLoad?: Boolean
}
interface TargetTouche {
    targetTouche: {
        pageY: number
    }
}
interface State {
    targetTouche: TargetTouche,
    canMoveUpdate: Boolean,
    canMoveLoad: Boolean,
    topStyle: {},
    bottomStyle: {},
    isUpdate: Boolean
}
export default class InfiniteScroll extends Component<Props, any> {
    $refSrcollContent: any = React.createRef()
    $refTop: any = React.createRef()
    state = {
        isPull: false,
        isLoading: false,
        isBack: false,
        startPos: 0,
        endPos: 0,
        distance: 0,//滑动距离
        modulus: 2,//滑动系数
        pullStatus: '',//状态
        srcollContentStyle: {}
    }
    constructor(props: any) {
        super(props)
        this.handleTouchStart = this.handleTouchStart.bind(this)
        this.handleTouchMove = this.handleTouchMove.bind(this)
        this.handleTouchEnd = this.handleTouchEnd.bind(this)

    }
    handleTouchStart(e: React.TouchEvent) {
        e.persist()
        const { isPull, isLoading } = this.state
        const { scrollTop, offsetTop } = this.$refSrcollContent.current
        if (!isPull && !isLoading && scrollTop === offsetTop) {
            this.setState({
                startPos: e.touches[0].pageY,
                isPull: true
            })
        }
    }
    handleTouchMove(e: React.TouchEvent) {
        e.persist()
        const _endPos = e.touches[0].pageY;
        const { isPull, isLoading, startPos, modulus } = this.state
        if (isPull && !isLoading && startPos < _endPos) {
            const _distance = (_endPos - startPos) * modulus
            const $topHeight = this.$refTop.current.offsetHeight
            let _pullStatus = ''
            if (_distance >= $topHeight) {
                _pullStatus = 'up'
            } else {
                _pullStatus = 'down'
            }
            this.setState({
                distance: _distance,
                pullStatus: _pullStatus
            })
            console.log(_distance)
            this.moveTransition(_distance, 0)
        }
    }
    handleTouchEnd(e: React.TouchEvent) {
        e.persist()
        const { isBack, isLoading, distance } = this.state
        // const $topHeight = this.$refTop.current.offsetHeight
        const $topHeight = 1000
        if (isLoading || distance <= 0 || isBack) { return false; }

        //拉动距离大于临界值
        if (distance > 0 && distance >= $topHeight) {
            //执行刷新动作
        } else {
            //返回初始状态
            // this.setState({isBack:true})
            this.moveTransition(0, 500)
        }

    }
    moveTransition(distance: number, time: number) {
        const style = { transform: `translate3d(0,${distance}px,0)`, transition: `transform ${time / 1000}s` }
        this.setState({
            srcollContentStyle: style
        })

    }
    pullTransition() {

    }
    render() {
        const { children, height, className } = this.props
        // const { srcollContentStyle, topStyle, bottomStyle, isUpdate } = this.state
        const { srcollContentStyle } = this.state
        return (
            <div
                className={[styles.infiniteScroll, className ? className : ''].join(' ')}
                style={{ height: height ? height : undefined }}
                onTouchStart={(e) => { this.handleTouchStart(e) }}
                onTouchMove={(e) => { this.handleTouchMove(e) }}
                onTouchEnd={(e) => { this.handleTouchEnd(e) }}
            >
                <div
                    className={styles.top}
                    ref={this.$refTop}
                // style={topStyle} 
                >
                    {
                        // isUpdate
                        false
                            ? (<Icon icon="jiazai" />)
                            : (<div><p>刷新</p> <Icon icon="xiajiantou" /></div>)
                    }
                </div>
                <div
                    className={styles.srcollContent}
                    ref={this.$refSrcollContent}
                    style={srcollContentStyle}
                >
                    {children}
                </div>
            </div>
        )
    }
}