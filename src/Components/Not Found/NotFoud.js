import React from 'react';

const NotFoud = () => {
    const headStyle={
        color:'red',

    };
    return (
        <div>
           <h2>Sorry Page Not Found!!</h2>
           <p style={headStyle}>404 Error!</p> 
        </div>
    );
};

export default NotFoud;