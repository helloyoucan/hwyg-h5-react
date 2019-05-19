import React from 'react';
// import { Link } from "react-router-dom";
import styles from './styles.module.scss'
// import Icon from '@base/Icon/index'
// import { Redirect } from 'react-router-dom'
import Header from './components/Header/index'
import Swipe from './components/Swipe/index'
import SwipeItem from './components/SwipeItem/index'
import TradeNews from './components/TradeNews/index'
import Supply from './components/Supply/index'
import Purchase from './components/Purchase/index'
export default class Home extends React.Component {
    render() {
        return (
            <div className={styles.home}>
                <Header />
                <Swipe>
                    <SwipeItem>
                        <div style={{ backgroundColor: '#eee', height: '100%' }}>1</div>
                    </SwipeItem>
                    <SwipeItem>
                        <div style={{ backgroundColor: '#ddd', height: '100%' }}>2</div>
                    </SwipeItem>
                    <SwipeItem>
                        <div style={{ backgroundColor: '#f0f0f0', height: '100%' }}>3</div>
                    </SwipeItem>
                    <SwipeItem>
                        <div style={{ backgroundColor: '#cdcdcd', height: '100%' }}>4</div>
                    </SwipeItem>
                </Swipe>
                <TradeNews />
                <Supply/>
                <Purchase/>
            </div>
        )
    }
}