import React from 'react';

const NoDataFound = () => {
    return (
        <div className={'no-data-found-container'}>
            <div className={'no-data-found text-center mt-3'}>
                <p className={'text-danger'}>Aucune donnée trouvée</p>
            </div>
        </div>
    );
};

export default NoDataFound;