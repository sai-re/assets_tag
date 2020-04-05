import React, {useState, useEffect} from 'react';

//global variables so drag can access values 
let draggedItem;

function Item(props) {
    const [state, updateMethod] = useState({tag: "", tags: []});

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

    const onDragStart = (e, i) => {
        draggedItem = state.tags[i];
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/html", e.target.parentNode);
        e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
    };
    
    const onDragOver = i => {
        const draggedOverItem = state.tags[i];

        // if the item is dragged over itself, ignore
        if (draggedItem === draggedOverItem) return;
        
        // filter out the currently dragged item
        let tags = state.tags.filter(item => item !== draggedItem);

        // add the dragged item after the dragged over item
        tags.splice(i, 0, draggedItem);

        updateMethod({tag: state.tag, tags: tags});
    };
    
    const onDragEnd = () => draggedItem = null;
    
    useEffect(() => {
        updateMethod({tag: "", tags: props.data.tags});
    }, [props])
    
    const assets = props.data;

    return (
        <div className="item">
            <img src={assets.url} alt="assets.title"/>
            <h1 className="item__title">{assets.title}</h1>

            <div className="item__tag-holder">
                <ul className="item__tag-list">
                    {state.tags.map((elem, i) => (
                        <li 
                            className="item__tag" 
                            key={elem.id} 
                            onDragOver={() => onDragOver(i)}
                        >
                            <div
                                className="item__holder"
                                draggable
                                onDragStart={e => onDragStart(e, i)}
                                onDragEnd={onDragEnd}
                            >
                                {elem.text}
                            </div>

                            <button 
                                className="item__tag-del" 
                                onClick={() => handleDelete(i)}>
                                x
                            </button>
                        </li>
                    ))}
                </ul>

                <input 
                    type="text" 
                    value={state.tag} 
                    onChange={handleChange} 
                    placeholder="Enter new tag" 
                    className="item__tag-input"
                    list={`suggestions_${assets.title}`}
                />

                <datalist id={`suggestions_${assets.title}`}>
                    {assets.suggestions.map((elem) => (
                        <option key={elem.id} value={elem.text} />
                    ))}
                </datalist>

                <button className="item__btn" onClick={handleClick}>Add</button>
            </div>
        </div>
    );
}

export default Item;