import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apiKey } from './apiKey';


const Details = () => {
    const { id } = useParams();
    const [allData, setData] = useState([]);
    const [errMsg, setErrMsg] = useState('');
    // const{extendedIngredients,analyzedInstructions}=allData;

    useEffect(() => {
        fetchAll();
    }, [])
    const fetchAll = async () => {
        try {
            setErrMsg('')
            const result = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`);
            if (!result) {
                console.log('No data')
            }
            console.log('result is :', result.data);
            setData(result.data);
        }
        catch (err) {
            console.log('Error:', err);
            setErrMsg(err.response.data);
        }
    }
    return (
        <div className='bg-slate-300'>

            <div className='container m-0 p-1'>


                {allData ? (
                    <div className='grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-1'>

                        <div className=''>
                            <h1 className='text-2xl font-bold text-amber-700'>Receipe Details</h1>
                            <img src={allData?.image} alt={allData?.title} className='object-cover mb-4' />
                            <h1 className='text-2xl text-red-400 font-bold mb-2'>{allData?.title}</h1>
                        </div>


                        <div className='bg-red-300 m-1 p-1  rounded'>
                            <details>
                                <summary className='text-2xl font-sans text-indigo-600'>Ingredients Required</summary>

                                {allData?.extendedIngredients?.map((ingre, index) => (
                                    <div key={index} className='bg-pink-200 p-1 m-1'>
                                        <h1>Type:{ingre?.aisle}</h1>
                                        <h2>Amount: {ingre?.amount}</h2>
                                        <h2>Unit: {ingre?.unit}</h2>
                                        <h2>Name: {ingre?.name}</h2>
                                        <h3>Original: {ingre?.original}</h3>


                                    </div>
                                ))}



                            </details>


                            <div className='m-0 p-1 rounded'>
                                <details>
                                    <summary className='text-2xl font-sans text-blue-500'>Instructions
                                    </summary>
                                    {allData?.analyzedInstructions?.map((item, index) => (
                                        <div key={index} className=''>
                                            {item.name && <h2>{item.name}</h2>}
                                            {item.steps.map((step, stepIndex) => (
                                                <div key={stepIndex} className='bg-pink-300 m-1 p-1 rounded'>
                                                    <p>Step: {step.number}</p>
                                                    <p className='m-1'>{step.step}</p>
                                                    {step.ingredients.length > 0 && (
                                                        <div>
                                                            {step.ingredients.map((ingre, ingreIndex) => (
                                                                <div key={ingreIndex} className='flex justify-evenly m-2 p-2'>
                                                                    <p>{ingre.name}</p>
                                                                    <img className='w-20 h-20' src={ingre.image} alt={ingre.name} style={{ mixBlendMode: 'multiply' }} />
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    ))}

                                </details>

                            </div>

                        </div>
                    </div>
                ) : (
                    <div className='bg-amber-200'>
                        <h1 className='text-3xl text-red-700 text-center'>{errMsg.status} {errMsg.code}</h1>
                        <h2 className='text-xl text-red-500'>{errMsg.message}</h2>
                    </div>
                )}
            </div>



        </div>
    )
}

export default Details
