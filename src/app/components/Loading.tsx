import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const Loading: React.FC = () => {
    return (
        <div className='flex justify-center items-center h-screen'>
            <Spinner style={{ width: '3rem', height: '3rem' }} animation="grow" variant="success" />
            <span className="text-gray-500 text-2xl ml-4">Cargando...</span>
        </div>
    );
};


export default Loading;