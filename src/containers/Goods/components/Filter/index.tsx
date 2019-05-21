import React, { Component } from 'react'
import styles from './styles.module.scss'
import Icon from '@base/Icon/index'
interface State {
    showFilterType: symbol | string,
    priceSort: string
}
const FilterType = {
    price: Symbol('price'),
    storage: Symbol('storage'),
    fish: Symbol('fish'),
    category: Symbol('category')
}

const priceSortList = [
    { text: '默认排序', type: '-1' },
    { text: '价格降序', type: '0' },
    { text: '价格升序', type: '1' }
]
export default class Filter extends Component {
    state: State = {
        showFilterType: '',
        priceSort: '-1'
    }
    constructor(props: any) {
        super(props)
        this.handleClickFilterItem = this.handleClickFilterItem.bind(this)
        this.handleClickPriceSort = this.handleClickPriceSort.bind(this)
    }
    handleClickFilterItem(FilterType: symbol | string) {
        const showFilterType = this.state.showFilterType
        if (showFilterType === FilterType) {
            this.setState({
                showFilterType: ''
            })
        } else if (showFilterType === '') {
            this.setState({
                showFilterType: FilterType
            })
        } else {
            this.setState({
                showFilterType: ''
            }, () => {
                setTimeout(() => {
                    this.setState({
                        showFilterType: FilterType
                    })
                }, 0);
            })
        }

    }
    handleClickPriceSort(e: React.MouseEvent) {
        e.persist()
        const target = e.target as HTMLLIElement
        if (target.nodeName.toLocaleUpperCase() === 'LI') {
            this.setState({
                priceSort: target.getAttribute('data-type'),
                showFilterType: ''
            })
        }
        e.nativeEvent.stopImmediatePropagation()
    }
    render() {
        const { showFilterType, priceSort } = this.state
        const priceSortListItem = priceSortList.find(item => item.type === priceSort)
        const priceSortLabel = priceSort === '-1' ? '价格' : priceSortListItem && priceSortListItem.text
        return (
            <div className={styles.filter}>
                <div className={showFilterType === FilterType.price ? styles.active : undefined}>
                    <div
                        className={[styles.label, styles.triangle].join(' ')}
                        onClick={() => { this.handleClickFilterItem(FilterType.price) }}>
                        {priceSortLabel}
                    </div>
                    <div
                        onClick={() => { this.handleClickFilterItem('') }} 
                        className={styles.content}>
                        <ul
                            style={{ height: showFilterType === FilterType.price ? `calc(${priceSortList.length} * ( 80 / 750 ) *100vw)` : 0 }}
                            className={styles.filterList}
                            onClick={(e) => { this.handleClickPriceSort(e) }}>
                            {
                                priceSortList.map(item => (<li key={item.type} className={priceSort === item.type ? styles.active : undefined} data-type={item.type}>{item.text}</li>))
                            }
                        </ul>
                    </div>
                </div>
                <div className={showFilterType === FilterType.storage ? styles.active : undefined}>
                    <div className={[styles.label, styles.triangle].join(' ')} onClick={() => { this.handleClickFilterItem(FilterType.storage) }}>存储类型</div>
                    <div className={styles.content}>

                    </div>
                </div>
                <div className={showFilterType === FilterType.fish ? styles.active : undefined}>
                    <div className={[styles.label, styles.triangle].join(' ')} onClick={() => { this.handleClickFilterItem(FilterType.fish) }}>渔获类型</div>
                    <div className={styles.content}>

                    </div>
                </div>
                <div className={showFilterType === FilterType.category ? styles.active : undefined}>
                    <div className={[styles.label, styles.triangle].join(' ')} onClick={() => { this.handleClickFilterItem(FilterType.category) }}><Icon className="icon" icon="icon_classify" />分类</div>
                    <div className={styles.content}>

                    </div>
                </div>
            </div>
        )
    }
}