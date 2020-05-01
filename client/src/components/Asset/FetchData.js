import React, {useState, useEffect} from 'react';
import Assets from './Assets';

function FecthData() {
    const [state, updateMethod] = useState({assets: []});

	const getData = async () => {
		const url = `http://localhost:4000/api/assets`;

		try {
			//fetch response from api
			const response = await fetch(url);
			const data = await response.json();
            
            const temp = [];
			//push best odd and bet name to temp array
			data.forEach(elem => temp.push(elem));
            
            updateMethod({assets: temp});
		} catch(err) {
			console.log(err)
		}
    }
    
    useEffect(() =>{
        getData();
    }, []);

    return (
        <Assets data={state.assets} />
    )
}

export default FecthData;