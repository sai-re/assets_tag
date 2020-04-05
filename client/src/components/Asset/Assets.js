import React, {Component} from 'react';
import Item from './Item'
import data from '../../data.json';

import './Assets.scss'

class Assets extends Component {
    constructor(props) {
        super(props);
    }

    printList = () => data.assets.map((elem, i) => (<Item key={elem.title} data={elem} /> ));

    render() {
        return (
            <div className="assets">
                {this.printList()}
            </div>
        );
    }
}

export default Assets;