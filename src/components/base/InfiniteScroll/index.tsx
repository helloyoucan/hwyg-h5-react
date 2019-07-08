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
interface State {
    isPull: Boolean,
    isLoading: Boolean,
    startPos: number,
    endPos: number,
    distance: number,//滑动距离
    modulus: number,//滑动系数
    pullStatus: string,//状态
    srcollContentStyle: {},
    topStyle: {},
    bottomStyle: {}
}
export default class InfiniteScroll extends Component<Props, any> {
    $refSrcollContent: any = React.createRef()
    $refTop: any = React.createRef()
    $refBottom: any = React.createRef()
    $el: any = React.createRef()
    state: State = {
        isPull: false,
        isLoading: false,
        startPos: 0,
        endPos: 0,
        distance: 0,//滑动距离
        modulus: 1,//滑动系数
        pullStatus: '',//状态
        srcollContentStyle: {},
        topStyle: {},
        bottomStyle: {}
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
        const { canLoad } = this.props
        const { scrollTop, offsetTop, scrollHeight, clientHeight } = this.$refSrcollContent.current
        if (!isPull &&
            !isLoading &&
            (scrollTop === offsetTop ||
                (canLoad && (scrollTop + clientHeight >= scrollHeight - 5)))) {
            this.setState({
                startPos: e.touches[0].pageY,
                isPull: true
            })
        }
    }

    handleTouchMove(e: TouchEvent) {
        const _endPos = e.touches[0].pageY;
        const { isPull, isLoading, startPos, modulus } = this.state
        const { scrollTop, offsetTop, scrollHeight, clientHeight } = this.$refSrcollContent.current
        if (!isPull || isLoading) { return false }
        //顶部往下拉
        if (scrollTop === offsetTop && startPos < _endPos) {
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
        // 底部往上拉
        if ((scrollTop + clientHeight >= scrollHeight - 5) && startPos > _endPos) {
            e.preventDefault()
            const _distance = (_endPos - startPos) * modulus
            const $bottomHeight = this.$refBottom.current.scrollHeight
            let _pullStatus = ''
            if (Math.abs(_distance) >= $bottomHeight) {
                _pullStatus = 'up'
            } else {
                _pullStatus = 'down'
            }
            this.setState({
                distance: _distance,
                pullStatus: _pullStatus,
                bottomStyle: { height: Math.abs(_distance) }
            })
            this.moveTransition(_distance, 0)
        }
    }
    handleTouchEnd(e: TouchEvent) {
        const { isPull, isLoading, distance } = this.state
        const { onUpdate, onLoad } = this.props
        const { scrollTop, offsetTop, scrollHeight, clientHeight } = this.$refSrcollContent.current
        if (isPull && !isLoading) {
            const $topHeight = this.$refTop.current.scrollHeight
            const $bottomHeight = this.$refBottom.current.scrollHeight
            //顶部上拉
            if (scrollTop === offsetTop && distance >= $topHeight && typeof onUpdate === 'function') {
                //执行刷新动作
                this.setState({ pullStatus: 'laoding' }, () => {
                    const height = this.$refTop.current.querySelector('.' + styles.topContent).scrollHeight
                    this.moveTransition(height, 500)
                    this.setState({
                        isLoading: true,
                        topStyle: { height: height }
                    })
                })
                onUpdate(() => {
                    this.moveTransition(0, 500)
                    setTimeout(() => {
                        this.setState({
                            pullStatus: 'down',
                            isPull: false,
                            isLoading: false
                        })
                    }, 500)
                })
                //test
                // setTimeout(() => {
                //     this.moveTransition(0, 500)
                //     setTimeout(() => {
                //         this.setState({
                //             pullStatus: 'down',
                //             isPull: false,
                //             isLoading: false
                //         })
                //     }, 500)
                // }, 1500)
                //底部往上拉
            } else if ((scrollTop + clientHeight >= scrollHeight - 5) && Math.abs(distance) >= $bottomHeight && typeof onLoad === 'function') {
                //执行加载动作
                this.setState({ pullStatus: 'laoding' }, () => {
                    const height = this.$refBottom.current.querySelector('.' + styles.bottomContent).scrollHeight
                    this.moveTransition(height * -1, 500)
                    this.setState({
                        isLoading: true,
                        bottomStyle: { height: height }
                    })
                })
                onLoad(() => {
                    this.moveTransition(0, 500)
                    setTimeout(() => {
                        this.setState({
                            pullStatus: 'down',
                            isPull: false,
                            isLoading: false
                        })
                    }, 500)
                })
                //test
                // setTimeout(() => {
                //     this.moveTransition(0, 500)
                //     setTimeout(() => {
                //         this.setState({
                //             pullStatus: 'down',
                //             isPull: false,
                //             isLoading: false
                //         })
                //     }, 500)
                // }, 1500)
            } else {
                //返回初始状态
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
    getTopDom(type: string) {
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
            default:
                return (<div></div>)

        }
    }
    getBottomDom(type: string) {
        switch (type) {
            case 'up':
                return (<div className={styles.bottomContent}>
                    <p>释放加载</p>
                    <p><Icon icon="xiajiantou" className={styles.downIcon} /></p>
                </div>)
            case 'down':
                return (<div className={[styles.bottomContent, styles.up].join(' ')}>
                    <p>上拉加载</p>
                    <p><Icon icon="xiajiantou" className={styles.downIcon} /></p>
                </div>)
            case 'laoding':
                return (
                    <div className={styles.bottomContent}>
                        <p><Icon icon="jiazai" className={styles.loadIcon} /></p>
                    </div>
                )
            default:
                return (<div></div>)

        }
    }
    render() {
        const { children, height, className } = this.props
        const { srcollContentStyle, topStyle, bottomStyle, pullStatus } = this.state
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
                >{this.getTopDom(pullStatus)}</div>
                <div
                    className={styles.srcollContent}
                    ref={this.$refSrcollContent}
                    style={srcollContentStyle}
                >
                    {children}
                </div>
                <div className={styles.bottom} style={bottomStyle} ref={this.$refBottom}>
                    {this.getBottomDom(pullStatus)}
                </div>
            </div>
        )
    }
}