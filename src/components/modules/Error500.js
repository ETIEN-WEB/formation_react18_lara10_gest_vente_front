import React from 'react';
import BreadCrumb from '../partials/BreadCrumb';

const Error500 = () => {
    return (
        <>
            <BreadCrumb title={'Error 500'} />
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className={'text-danger'}> Désolé, quelque chose s'est mal tournée </h2>
                </div>
            </div>
        </>
    );
};

export default Error500;