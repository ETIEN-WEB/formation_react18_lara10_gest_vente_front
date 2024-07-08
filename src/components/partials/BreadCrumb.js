import React from 'react';
import { Helmet } from 'react-helmet';

const BreadCrumb = (props) => {
    return (
    <>
        <Helmet>
            <title>{props.title} | Fashion Club BD</title>
        </Helmet>
        <ol class="breadcrumb my-4">
            <li class="breadcrumb-item text-theme-light active"> Tableau de bord </li>
            <li class="breadcrumb-item active">{props.title}</li>
        </ol>
    </>
    );
};

export default BreadCrumb;