import React from 'react';
import { Link } from "react-router-dom";
import styles from './styles.module.scss'
import Icon from '@/components/base/Icon/index'
// import Icon from '../../components/base/Icon/index'
export default class Index extends React.Component{
    render() {
        return (
            <div className={styles.index}>
                <p>this is index</p>
                <Link to='/home'>home</Link>
                <Icon icon="icontab_icon_home_sel"/>
            </div>
        )
    }
}