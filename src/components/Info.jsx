import React from 'react';

const Info = ({setInfo}) => {
    return (
        <div className='infoContainer'>
            <b onClick={()=>setInfo(false)}>close</b>
            <h1>Website Editor Info</h1>
            <p>This is a simple website editor built with React.</p>
        </div>
    );
};

export default Info;