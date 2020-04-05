import React, {Component} from 'react';

class Item extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tag: "",
            tags: []
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleClick = () => {
        const newTag = {id: this.state.tag, text: this.state.tag};
        const copy = [...this.state.tags, newTag];

        if (this.state.tag !== "") this.setState({tag: "", tags: copy});
    }

    handleChange = e => this.setState({tag: e.target.value});

    handleDelete = i => {
        const copy = [...this.state.tags];
        let removed = copy.filter((elem, indx) => indx !== i);

        this.setState({tags: removed});
    }

    onDragStart = (e, i) => {
        this.draggedItem = this.state.tags[i];
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/html", e.target.parentNode);
        e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
    };
    
    onDragOver = i => {
        const draggedOverItem = this.state.tags[i];

        // if the item is dragged over itself, ignore
        if (this.draggedItem === draggedOverItem) return;
        
        // filter out the currently dragged item
        let tags = this.state.tags.filter(item => item !== this.draggedItem);

        // add the dragged item after the dragged over item
        tags.splice(i, 0, this.draggedItem);

        this.setState({tags: tags});
    };
    
    onDragEnd = () => this.draggedIdx = null;

    componentDidMount = () => this.setState({tags: this.props.data.tags});

    render() {
        const assets = this.props.data;
        
        return (
            <div className="item">
                <img src={assets.url} alt="assets.title"/>
                <h1 className="item__title">{assets.title}</h1>

                <div className="item__tag-holder">
                    <ul className="item__tag-list">
                        {this.state.tags.map((elem, i) => (
                            <li 
                                className="item__tag" 
                                key={elem.id} 
                                onDragOver={() => this.onDragOver(i)}
                            >
                                <div
                                    className="item__holder"
                                    draggable
                                    onDragStart={e => this.onDragStart(e, i)}
                                    onDragEnd={this.onDragEnd}
                                >
                                    {elem.text}
                                </div>

                                <button 
                                    className="item__tag-del" 
                                    onClick={() => this.handleDelete(i)}>
                                    x
                                </button>
                            </li>
                        ))}
                    </ul>

                    <input 
                        type="text" 
                        value={this.state.tag} 
                        onChange={this.handleChange} 
                        placeholder="Enter new tag" 
                        className="item__tag-input"
                        list={`suggestions_${assets.title}`}
                    />

                    <datalist id={`suggestions_${assets.title}`}>
                        {assets.suggestions.map((elem) => (
                            <option key={elem.id} value={elem.text} />
                        ))}
                    </datalist>

                    <button className="item__btn" onClick={this.handleClick}>Add</button>
                </div>
            </div>
        );
    }
}

export default Item;