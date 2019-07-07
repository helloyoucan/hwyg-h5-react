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
    $el: any = React.createRef()
    state = {
        isPull: false,
        isLoading: false,
        isBack: false,
        startPos: 0,
        endPos: 0,
        distance: 0,//滑动距离
        modulus: 1,//滑动系数
        pullStatus: '',//状态
        srcollContentStyle: {},
        topStyle: {}
    }
    constructor(props: any) {
        super(props)
        this.handleTouchStart = this.handleTouchStart.bind(this)
        this.handleTouchMove = this.handleTouchMove.bind(this)
        this.handleTouchEnd = this.handleTouchEnd.bind(this)

    }
    bindEvent() {
        const $el: HTMLElement = this.$el.current
        $el.addEventListener('touchstart', this.handleTouchStart)
        $el.addEventListener('touchmove', this.handleTouchMove)
        $el.addEventListener('touchend', this.handleTouchEnd)
    }
    handleTouchStart(e: TouchEvent) {
        const { isPull, isLoading } = this.state
        const { scrollTop, offsetTop, scrollHeight, clientHeight } = this.$refSrcollContent.current
        console.log(scrollTop, clientHeight, scrollHeight)
        if (!isPull && !isLoading && (scrollTop === offsetTop)) {
            this.setState({
                startPos: e.touches[0].pageY,
                isPull: true
            })
        }
    }

    handleTouchMove(e: TouchEvent) {
        const _endPos = e.touches[0].pageY;
        const { isPull, isLoading, startPos, modulus } = this.state
        if (isPull && !isLoading && startPos < _endPos) {
            e.preventDefault()
            const _distance = (_endPos - startPos) * modulus
            const $topHeight = this.$refTop.current.scrollHeight
            let _pullStatus = ''
            if (_distance >= $topHeight) {
                _pullStatus = 'up'
            } else {
                _pullStatus = 'down'
            }
            this.setState({
                distance: _distance,
                pullStatus: _pullStatus,
                topStyle: { height: _distance }
            })
            this.moveTransition(_distance, 0)
        }
    }
    handleTouchEnd(e: TouchEvent) {
        const { isPull, isLoading, distance } = this.state
        const { scrollTop, offsetTop } = this.$refSrcollContent.current
        if (isPull && !isLoading && distance > 0 && scrollTop === offsetTop) {
            const $topHeight = this.$refTop.current.scrollHeight
            //拉动距离大于临界值
            if (isPull && distance > 0 && distance >= $topHeight) {
                //执行刷新动作
                this.setState({ pullStatus: 'laoding' }, () => {
                    const height = this.$refTop.current.querySelector('.' + styles.topContent).scrollHeight
                    this.moveTransition(height, 500)
                    this.setState({
                        isLoading: true,
                        topStyle: { height: height }
                    })
                })
                setTimeout(() => {
                    this.moveTransition(0, 500)
                    setTimeout(() => {
                        this.setState({
                            pullStatus: 'down',
                            isPull: false,
                            isLoading: false
                        })
                    }, 500)
                }, 1500)
            } else {
                //返回初始状态
                // this.setState({isBack:true})
                this.moveTransition(0, 500)
                this.setState({
                    isPull: false,
                    pullStatus: 'down'
                })
            }

        }
    }
    moveTransition(distance: number, time: number) {
        const style = { transform: `translate3d(0,${distance}px,0)`, transition: `transform ${time / 1000}s` }
        this.setState({
            srcollContentStyle: style
        })

    }

    componentDidMount() {
        this.bindEvent()
    }
    getTopContent(type: string) {
        switch (type) {
            case 'down':
                return (<div className={styles.topContent}>
                    <p>下拉刷新</p>
                    <p><Icon icon="xiajiantou" className={styles.downIcon} /></p>
                </div>)
            case 'up':
                return (<div className={[styles.topContent, styles.up].join(' ')}>
                    <p>释放刷新</p>
                    <p><Icon icon="xiajiantou" className={styles.downIcon} /></p>
                </div>)
            case 'laoding':
                return (
                    <div className={styles.topContent}>
                        <p><Icon icon="jiazai" className={styles.loadIcon} /></p>
                    </div>
                )

        }
    }
    render() {
        const { children, height, className } = this.props
        // const { srcollContentStyle, topStyle, bottomStyle, isUpdate } = this.state
        const { srcollContentStyle, topStyle, pullStatus } = this.state
        return (
            <div
                className={[styles.infiniteScroll, className ? className : ''].join(' ')}
                style={{ height: height ? height : undefined }}
                ref={this.$el}
            >
                <div
                    className={styles.top}
                    ref={this.$refTop}
                    style={topStyle}
                >{this.getTopContent(pullStatus)}</div>
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