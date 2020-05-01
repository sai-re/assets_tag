import React, {useState} from 'react';
import Item from './Item'

import './Assets.scss'

function Assets(props) {
    const [state, updateMethod] = useState({tag: "", tags: []});

    const printList = () => {
        //if tag has been added        
        if (state.tags.length > 0) {
            return props.data.map(elem => {
                //extract ids from obj into array
                const dataArr = elem.tags.map(item => item.id);
                const stateArr = state.tags.map(item => item.id);

                //check if tag is found in asset
                const doesTagExist = stateArr.some(item => dataArr.includes(item));
                //if found, return asset with bool passed on to indicate if it was matched
                return <Item key={elem.title} data={elem} hide={doesTagExist}/>;
            })
        } else {
            return props.data.map(elem => (<Item key={elem.title} data={elem} /> ));
        }
    };

    const handleClick = () => {
        const newTag = {id: state.tag, text: state.tag};
        const copy = [...state.tags, newTag];

        if (state.tag !== "") updateMethod({tag: "", tags: copy});
    }

    const handleChange = e => updateMethod({tag: e.target.value, tags: state.tags});

    const handleDelete = i => {
        const copy = [...state.tags];
        let removed = copy.filter((elem, indx) => indx !== i);

        updateMethod({tag: state.tag, tags: removed});
    }

    return (
        <div className="assets">
            <div className="asset__filter">
                <h3>Add tags to filter</h3>
                <ul className="asset__tag-list">
                    {state.tags.map((elem, i) => (
                        <li className="asset__tag" key={`${elem.id}_${i}`} >
                            {elem.text}

                            <button className="asset__tag-del" onClick={() => handleDelete(i)}>x</button>
                        </li>
                    ))}
                </ul>

                <input 
                    type="text" 
                    value={state.tag}
                    onChange={handleChange} 
                    placeholder="Enter new tag" 
                    className="asset__tag-input"
                />

                <button className="asset__btn" onClick={handleClick}>Add</button>
            </div>
            
            <div className="item__list-holder">
                {printList()}
            </div>
        </div>
    );  
}

export default Assets;