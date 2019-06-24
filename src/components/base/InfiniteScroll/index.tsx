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
    $refBottom: any = React.createRef()
    state = {
        targetTouche: {
            pageY: 0
        },
        canMoveUpdate: true,
        canMoveLoad: true,
        topStyle: {},
        bottomStyle: {},
        srcollContentStyle: {},
        canMove: true,
        isUpdate: false
    }
    constructor(props: any) {
        super(props)
        this.handleTouchStart = this.handleTouchStart.bind(this)
        this.handleTouchMove = this.handleTouchMove.bind(this)
        this.handleTouchEnd = this.handleTouchEnd.bind(this)

    }
    handleTouchStart(e: React.TouchEvent) {
        if (!this.state.canMove) return
        e.persist()
        this.setState({ targetTouche: { pageY: e.targetTouches[0].pageY } })
    }
    handleTouchMove(e: React.TouchEvent) {
        e.persist()
        const scrollTop = this.$refSrcollContent.current.scrollTop
        const startPageY = this.state.targetTouche.pageY
        const movePageY = e.targetTouches[0].pageY
        if (this.state.canMoveUpdate && scrollTop === 0 && startPageY - movePageY < 0) {//顶部往下拉,刷新
            const moveDistance = Math.abs(startPageY - movePageY)
            const newSrcollContentStyle = { transform: `translate3d(0,${moveDistance}px,0)`, transtiton: 'none' }
            const newTopStyle = { height: `${moveDistance}px`, transtiton: 'none' }
            this.setState({
                srcollContentStyle: newSrcollContentStyle,
                topStyle: newTopStyle
            })
        }
        const maxScroll = this.$refSrcollContent.current.scrollHeight - this.$refSrcollContent.current.clientHeight
        if (this.props.canLoad && this.state.canMoveLoad && scrollTop === maxScroll && startPageY - movePageY > 0) {//底部往上拉，加载更多
            const moveDistance = Math.abs(startPageY - movePageY)
            const newSrcollContentStyle = { transform: `translate3d(0,-${moveDistance}px,0)`, transtiton: 'none' }
            const newBottomStyle = { height: `${moveDistance}px`, transtiton: 'none' }
            this.setState({
                srcollContentStyle: newSrcollContentStyle,
                bottomStyle: newBottomStyle
            })
        }
    }
    handleTouchEnd(e: React.TouchEvent) {
        e.persist()
        const startPageY = this.state.targetTouche.pageY
        const endPageY = e.changedTouches[0].pageY
        const scrollTop = this.$refSrcollContent.current.scrollTop
        //上拉，更新
        if (this.state.canMoveUpdate && scrollTop === 0 && startPageY - endPageY < 0) {
            const moveDistance = Math.abs(startPageY - endPageY)
            const maxHeight = this.$refTop.current.clientHeight
            const newSrcollContentStyle = { transform: `translate3d(0,${moveDistance >= maxHeight ? maxHeight : 0}px,0)`, transition: 'transform .5s' }
            const newTopStyle = { height: `${moveDistance >= maxHeight ? maxHeight : 0}px`, transition: 'height .5s' }
            this.setState({
                srcollContentStyle: newSrcollContentStyle,
                topStyle: newTopStyle,
                canMoveUpdate: !(moveDistance >= maxHeight)
            })
            if (moveDistance >= maxHeight) {//执行更新回调
                const onUpdate = this.props.onUpdate;
                (typeof onUpdate === 'function') && onUpdate(() => {
                    const newSrcollContentStyle = { transform: `translate3d(0,0,0)`, transition: 'transform .5s' }
                    const newTopStyle = { height: `0`, transition: 'height .5s' }
                    this.setState({
                        srcollContentStyle: newSrcollContentStyle,
                        topStyle: newTopStyle,
                        canMoveUpdate: true
                    })
                })
            }
        }
        //下拉，加载更多
        const maxScroll = this.$refSrcollContent.current.scrollHeight - this.$refSrcollContent.current.clientHeight
        //这里scrollTop+5是因为避免vw->px取整时产生误差
        if (this.props.canLoad && this.state.canMoveLoad && (scrollTop + 5) >= maxScroll && startPageY - endPageY > 0) {//底部往上拉，加载更多
            const moveDistance = Math.abs(startPageY - endPageY)
            const maxHeight = this.$refBottom.current.clientHeight
            const newSrcollContentStyle = { transform: `translate3d(0,-${moveDistance >= maxHeight ? maxHeight : 0}px,0)`, transition: 'transform .5s' }
            const newBottomStyle = { height: `${moveDistance >= maxHeight ? maxHeight : 0}px`, transition: 'height .5s' }
            this.setState({
                srcollContentStyle: newSrcollContentStyle,
                bttomStyle: newBottomStyle,
                canMoveLoad: !(moveDistance >= maxHeight)
            })
            if (moveDistance >= maxHeight) {//执行加载更多回调
                const onLoad = this.props.onLoad;
                (typeof onLoad === 'function') && onLoad(() => {
                    const newSrcollContentStyle = { transform: `translate3d(0,0,0)`, transition: 'transform .5s' }
                    const newBottomStyle = { height: `0`, transition: 'height .5s' }
                    this.setState({
                        srcollContentStyle: newSrcollContentStyle,
                        bottomStyle: newBottomStyle,
                        canMoveLoad: true
                    })
                })
            }
        }
    }
    render() {
        const { children, height, className } = this.props
        const { srcollContentStyle, topStyle, bottomStyle, isUpdate } = this.state
        return (
            <div
                className={[styles.infiniteScroll, className ? className : ''].join(' ')}
                style={{ height: height ? height : undefined }}
                onTouchStart={(e) => { this.handleTouchStart(e) }}
                onTouchMove={(e) => { this.handleTouchMove(e) }}
                onTouchEnd={(e) => { this.handleTouchEnd(e) }}
            >
                <div className={styles.top} style={topStyle} ref={this.$refTop}>
                    {
                        isUpdate
                            ? (<Icon icon="jiazai" />)
                            : (<div><p>刷新</p> <Icon icon="xiajiantou" /></div>)
                    }
                </div>
                <div
                    className={styles.srcollContent}
                    style={srcollContentStyle}
                    ref={this.$refSrcollContent}
                >
                    {children}
                </div>
                <div className={styles.bottom} style={bottomStyle} ref={this.$refBottom}>
                    加载更多
                </div>
            </div>
        )
    }
}