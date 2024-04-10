import React from 'react'

// Render weather icon according to weather conditions
function WeatherConditions({weatherCondition}) {
    
    if (weatherCondition?.includes('Rain')) {
        console.log("rain");
        return (
            <img width="30px" src="https://firebasestorage.googleapis.com/v0/b/netflixclone-daf20.appspot.com/o/Practice%2Fraining.png?alt=media&token=ee9946ff-9042-420e-bc35-c6bc051b43df" alt="" />
        );
    } else if (weatherCondition?.includes('Clouds')) {
        console.log("clouds");
        return (
           <img width="30px" src="https://firebasestorage.googleapis.com/v0/b/netflixclone-daf20.appspot.com/o/Practice%2Fcloudy.png?alt=media&token=1a206d85-7ed0-451b-9e20-429e0c0486e5" alt="" />
        );
    }else if (weatherCondition?.includes('Clear')) {
        console.log("clear");
        return (
            <img width="30px" src="https://firebasestorage.googleapis.com/v0/b/netflixclone-daf20.appspot.com/o/Practice%2Fclear-sky.png?alt=media&token=630f82db-f0a3-427f-b548-eacb17c279b2" alt="" />
            );
    }
}

export default WeatherConditions