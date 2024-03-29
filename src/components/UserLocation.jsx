import React, { useState } from 'react'
import axios from 'axios';
import API_KEY from './ApiKey';
import { toast } from 'react-toastify';

const UserLocation = () => {
    const [location, setLocation] = useState({ lati: null, long: null });
    const [temp, setTemp] = useState(' ');
    const[d,setD]=useState([]);
    const {minutes,hourly,daily}=d;

    //'userLocation' this function take user coordinates and set to location
    const userLocation = () => {
        if (navigator.geolocation) {
             navigator.geolocation.getCurrentPosition(function (position) {
                console.log('lati:', position.coords.latitude);
                console.log('long:', position.coords.longitude);
                const lati = position.coords.latitude;
                const long = position.coords.longitude;
                setLocation({
                    lati, long
                })
                fetchWeatherData(lati, long);
            })
        }
    }

    //fetch weather
    const fetchWeatherData = async (lati, long) => {
        try {
            const response = await axios.get(
                `https://api.tomorrow.io/v4/weather/forecast?location=${lati},${long}&apikey=${API_KEY}`
            );
            //if no response it will give toast notification 
            if (!response) {
                toast.error("unable to fetch the data")
            }
            // console.log('Data is:', response.data?.timelines);
            // console.log('Data is:', response.data?.timelines?.daily[0]);

            setD(response?.data.timelines);
            toast.success("loading...")

            // Extract temperature from response data and set it in state
            setTemp(response.data?.timelines?.daily[0]);



        } catch (error) {
            toast.error("failed to fetch the data")

        }
    };


    return (
        <div className='bg-blue-300 grid sm:grid-cols-1 justify-center rounded mt-32'>
            <button onClick={userLocation} className="bg-blue-500 text-white m-1 px-4 py-2 rounded"
            >Click here</button>
            <div>
                <div
                    className="w-full aspect-video rounded-lg shadow flex flex-col items-center justify-center gap-2 bg-slate-50 group"
                >
                    <div
                        className="flex flex-col items-center p-8 rounded-md w-full sm:px-12 bg-gray-900 text-gray-100"
                    >
                        <div className="text-center">
                            <p className="text-sm text-gray-400"> {(temp?.time)}</p>
                        </div>
                        {/* this is animation spinner from uiverse.io */}
                        <svg
                            className="w-32 h-32 p-6 text-yellow-400 fill-current animate-[spin_5s_linear_infinite;]"
                            viewBox="0 0 512 512"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M256,104c-83.813,0-152,68.187-152,152s68.187,152,152,152,152-68.187,152-152S339.813,104,256,104Zm0,272A120,120,0,1,1,376,256,120.136,120.136,0,0,1,256,376Z"
                            ></path>
                            <rect
                                className="animate-[pulse_1s_cubic-bezier(0.4,_0,_0.6,_1)_infinite;]"
                                y="16"
                                x="240"
                                height="48"
                                width="32"
                            ></rect>
                            <rect
                                className="animate-[pulse_2s_cubic-bezier(0.4,_0,_0.6,_1)_infinite;]"
                                y="448"
                                x="240"
                                height="48"
                                width="32"
                            ></rect>
                            <rect
                                className="animate-[pulse_1s_cubic-bezier(0.4,_0,_0.6,_1)_infinite;]"
                                y="240"
                                x="448"
                                height="32"
                                width="48"
                            ></rect>
                            <rect
                                className="animate-[pulse_2s_cubic-bezier(0.4,_0,_0.6,_1)_infinite;]"
                                y="240"
                                x="16"
                                height="32"
                                width="48"
                            ></rect>
                            <rect
                                className="animate-[pulse_1s_cubic-bezier(0.4,_0,_0.6,_1)_infinite;]"
                                transform="rotate(-45 416 416)"
                                y="393.373"
                                x="400"
                                height="45.255"
                                width="32"
                            ></rect>
                            <rect
                                className="animate-[pulse_2s_cubic-bezier(0.4,_0,_0.6,_1)_infinite;]"
                                transform="rotate(-45 96 96)"
                                y="73.373"
                                x="80"
                                height="45.255"
                                width="32.001"
                            ></rect>
                            <rect
                                className="animate-[pulse_1s_cubic-bezier(0.4,_0,_0.6,_1)_infinite;]"
                                transform="rotate(-45.001 96.002 416.003)"
                                y="400"
                                x="73.373"
                                height="32"
                                width="45.255"
                            ></rect>
                            <rect
                                className="animate-[pulse_2s_cubic-bezier(0.4,_0,_0.6,_1)_infinite;]"
                                transform="rotate(-45 416 96)"
                                y="80"
                                x="393.373"
                                height="32.001"
                                width="45.255"
                            ></rect>
                        </svg>
                        <div className="mb-2 text-2xl font-semibold">
                            max:{temp?.values?.temperatureMax}°C<span className="mx-1 font-normal">/</span>min:{temp?.values?.temperatureMin}°C
                        </div>
                        {(temp.length > 0) ? ' ' : <div className='text-gray-400'>Humidity:{temp?.values?.humidityAvg}</div>}
                    </div>
                </div>

            </div>
          
            {(temp.length > 0) ? ' ': <div>   <h2>Daily Data</h2>
              <ul className="flex flex-wrap gap-2">
        {daily.map((entry, index) => (
          <li key={index} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 bg-gray-100 p-1 m-1 rounded-md">
            <p className="text-lg font-semibold">Date: {entry.time}</p>
            <p className=''>Temp Base Max: {entry.values.temperatureAvg}°C</p>
            <p>Cloud Base Average: {entry.values.cloudBaseAvg}</p>
            <p>Cloud Base Max: {entry.values.cloudBaseMax}</p>
          </li>
        ))}
      </ul></div> }
           
        </div>
    )
}

export default UserLocation
              {/* <p className="text-gray-400">Humidity:{temp?.values?.humidityAvg}</p> */}
            {/* <p>Lati{location.lati}</p>
            <p>Long{location.long}</p> */}

            {/* <div>
                <hr></hr>
                <p>{JSON.stringify(temp, null, 2)}</p>
                <hr />
                {temp?.values?.cloudBaseAvg}
                <h1>temp:{temp?.values?.temperatureMax}</h1>
                <h1>Humidity:{temp?.values?.humidityAvg}</h1>
            </div> */}
                            {/* <p>{JSON.stringify(d.values.daily, null, 2)}</p> */}
                            {/* <p>{JSON.stringify(daily, null, 2)}</p> */}


            {/* {d.map(el=>(
                <ul>
                    <li>{el.daily.values.cloudBaseAvg}</li>
                </ul>
            ))} */}

            {/* {daily.map((entry)=>{

                <li>{entry?.values?.cloudBaseAvg}</li>
            }
            )} */}
