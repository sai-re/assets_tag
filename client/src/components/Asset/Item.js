import React, {useState, useEffect, useRef} from 'react';

//global variables so drag can access values 
let draggedItem;

function Item(props) {
    const [state, updateMethod] = useState({tag: "", tags: []});

    const handleClick = () => {
        //create new tag from state
        const newTag = {id: state.tag, text: state.tag};
        //create copy of state and add new tag
        const copy = [...state.tags, newTag];
        //if state is not empty update state with new tags
        if (state.tag !== "") updateMethod({tag: "", tags: copy});
    }

    const handleChange = e => updateMethod({tag: e.target.value, tags: state.tags});

    const handleDelete = i => {
        //copy state
        const copy = [...state.tags];
        //filter out tag to be deleted
        let removed = copy.filter((elem, indx) => indx !== i);
        //add updated tags to state
        updateMethod({tag: state.tag, tags: removed});
    }

    const onDragStart = (e, i) => {
        //assign tag being dragged
        draggedItem = state.tags[i];
        e.dataTransfer.effectAllowed = "move";
        //sets the dragged item to be the parent node of the drag div
        e.dataTransfer.setData("text/html", e.target.parentNode); //for firefox
        e.dataTransfer.setDragImage(e.target.parentNode, 20, 20); //for chrome
    };
    
    const onDragOver = i => {
        //get tag being dragged over
        const draggedOverItem = state.tags[i];

        // if the item is dragged over itself, ignore
        if (draggedItem === draggedOverItem) return;
        
        // filter out the currently dragged item
        let tags = state.tags.filter(item => item !== draggedItem);

        // add the dragged item after the dragged over item
        tags.splice(i, 0, draggedItem);

        updateMethod({tag: state.tag, tags: tags});
    };
    
    //reset global variable
    const onDragEnd = () => draggedItem = null;
    
    const didMountRef = useRef(false);
    useEffect(() => {
        //run update only on mount, preserves values when filtered
        if (!didMountRef.current) {
            didMountRef.current = true;
            updateMethod({tag: "", tags: props.data.tags});
        }
    }, [props]);

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
                            key={`${elem.id}_${i}`}  
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

                            <button className="item__tag-del" onClick={() => handleDelete(i)}>x</button>
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