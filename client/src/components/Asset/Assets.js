import React from 'react';
import Item from './Item'
import data from '../../data.json';

import './Assets.scss'

function Assets() {
    const printList = () => data.assets.map(elem => (<Item key={elem.title} data={elem} /> ));

    return (
        <div className="assets">
            {printList()}
        </div>
    );  
}

export default Assets;