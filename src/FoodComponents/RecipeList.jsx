import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import { apiKey } from './apiKey';

const RecipeList = () => {
    const [list, setList] = useState([]);
    const [err, setErr] = useState('');

    useEffect(() => {
        fetchData();
    }, [])
    const fetchData = async () => {
        try {
            setErr('');
            const result = await axios.get(`https://api.spoonacular.com/recipes/informationBulk?apiKey=${apiKey}&ids=1,2,3,23,5,6,7,8,29,10,13,14,15,16,17,18,19,20,21,22,23,24,25}`);

            console.log('data:', result.data);
            if (!result) {
                return (<div className='text-2xl text-center'>Loading..</div>)
                console.log('error in fetching data...')
            }
            setList(result.data);

        }
        catch (error) {
            console.log('error:', error.response.data)
            setErr(error.response.data)
        }
    }
    return (
        <div className='bg-gray-300 font-font-sans grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-3 m-1'>

            {err.length < 1 && list.length > 0
                ? (list.map(l => (
                    <div key={l.id} className='m-1 rounded bg-red-300 shadow-lg shadow-blue-500/50 hover:bg-sky-700'>
                        <Link to={`/details/${l.id}`}>

                            <img className='w-full h-auto rounded' src={l.image} />
                            <h1 className='text-2xl font-bold text-amber-700'>{l.title}</h1>
                        </Link>
                        {/* <p>{l.summary}</p> */}
                    </div>
                ))) : (<div className='bg-amber-200  flex items-center justify-center h-screen'>
                    <div>

                        <h1 className='text-3xl text-red-700 text-center'>{err.status} {err.code}</h1>
                        <h2 className='text-xl text-red-500'>{err.message}</h2>
                    </div>
                </div>)


            }

        </div>
    )
}

export default RecipeList
