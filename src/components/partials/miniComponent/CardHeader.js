import React from 'react';
import { Link } from 'react-router-dom';

const CardHeader = (props) => {
    return (
    <div className="d-flex justify-content-between align-items-center">
        <h4 className="text-theme"> {props.title} </h4>
        {props.hide == undefined ?
            <>
                <Link to={props.link}>
                    <button className={'btn theme-button'}>
                        <i class={ `fa-solid mr_4 ${props.icon}`}></i> {props.button_text}
                    </button>
                </Link>
            </> : null
        }

    </div>
    );
};

export default CardHeader;