import React, { Component } from 'react'
import styles from './styles.module.scss'
import Icon from '@base/Icon/index'
interface State {
    activeFilter: symbol | string
}
const FilterType = {
    price: Symbol('price'),
    storage: Symbol('storage'),
    fish: Symbol('fish'),
    category: Symbol('category'),
}
export default class Filter extends Component {
    state: State = {
        activeFilter: ''
    }
    constructor(props: any) {
        super(props)
        this.handleClickFilterItem = this.handleClickFilterItem.bind(this)
    }
    handleClickFilterItem(FilterType: symbol | string) {
        const activeFilter = this.state.activeFilter
        if (activeFilter === FilterType) {
            this.setState({
                activeFilter: ''
            })
        } else if (activeFilter === '') {
            this.setState({
                activeFilter: FilterType
            })
        } else {
            this.setState({
                activeFilter: ''
            }, () => {
                setTimeout(() => {
                    this.setState({
                        activeFilter: FilterType
                    })
                }, 400);
            })
        }

    }
    render() {
        const activeFilter: symbol | string = this.state.activeFilter
        return (
            <div className={styles.filter}>
                <div className={activeFilter === FilterType.price ? styles.active : undefined}>
                    <div className={styles.triangle} onClick={() => { this.handleClickFilterItem(FilterType.price) }}>价格</div>
                    <div className={styles.content}>
                        1111111111
                    </div>
                </div>
                <div className={activeFilter === FilterType.storage ? styles.active : undefined}>
                    <div className={styles.triangle} onClick={() => { this.handleClickFilterItem(FilterType.storage) }}>存储类型</div>
                    <div className={styles.content}>
                        222222222
                    </div>
                </div>
                <div className={activeFilter === FilterType.fish ? styles.active : undefined}>
                    <div className={styles.triangle} onClick={() => { this.handleClickFilterItem(FilterType.fish) }}>渔获类型</div>
                    <div className={styles.content}>
                        33333333333
                    </div>
                </div>
                <div className={activeFilter === FilterType.category ? styles.active : undefined}>
                    <div onClick={() => { this.handleClickFilterItem(FilterType.category) }}><Icon className="icon" icon="icon_classify" />分类</div>
                    <div className={styles.content}>

                    </div>
                </div>
            </div>
        )
    }
}