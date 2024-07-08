import React, {useEffect, useState} from 'react';
import BreadCrumb from "../../partials/BreadCrumb";
import CardHeader from "../../partials/miniComponent/CardHeader";
import {useNavigate} from "react-router-dom";
import axiosClient from "../../../axios";
import Swal from "sweetalert2";

const Report = () => {
    const [report, setReport] = useState([])
    const getReport = () => {
        axiosClient.get(`/get-reports`).then(res => {
            setReport(res.data)
        })
    }

    useEffect(() => {
        getReport()
    }, [])

    return (
        <>
            <BreadCrumb title={'Rapport'} />
            <div className="row ">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <CardHeader
                                title={'Rapport'}
                                link={'#'}
                                icon={'fa-list'}
                                button_text={'Liste'}
                                hide={true}
                            />
                        </div>
                        <div className="card-body">
                            {/*=============== START  BLOCKS =================== */}
                            <div className="card ">
                                <div className="card-header">
                                    <h3> Ventes </h3>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-3">
                                            <div className="card report-card">
                                                <div className="card-body">
                                                    <div className="d-flex align-items-center">
                                                        <div className="flex-shrink-0">
                                                            <i className="fa-solid fa-cart-shopping fa-2x"></i>
                                                        </div>
                                                        <div className="flex-grow-1 ms-3">
                                                            <h6>Vente Totale</h6>
                                                            <h4>{report.total_sale}</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="card report-card">
                                                <div className="card-body">
                                                    <div className="d-flex align-items-center">
                                                        <div className="flex-shrink-0">
                                                            <i className="fa-solid fa-cart-plus fa-2x"></i>
                                                        </div>
                                                        <div className="flex-grow-1 ms-3">
                                                            <h6>Achat Totale</h6>
                                                            <h4>{report.total_purchase}</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/*<div className="col-md-3">*/}
                                        {/*    <div className="card report-card">*/}
                                        {/*        <div className="card-body">*/}
                                        {/*            <div className="d-flex align-items-center">*/}
                                        {/*                <div className="flex-shrink-0">*/}
                                        {/*                    <i className="fa-solid fa-rotate-left fa-2x"></i>*/}
                                        {/*                </div>*/}
                                        {/*                <div className="flex-grow-1 ms-3">*/}
                                        {/*                    <h6>Ventes retournées</h6>*/}
                                        {/*                    <h4>0</h4>*/}
                                        {/*                </div>*/}
                                        {/*            </div>*/}
                                        {/*        </div>*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
                                        {/*<div className="col-md-3">*/}
                                        {/*    <div className="card report-card">*/}
                                        {/*        <div className="card-body">*/}
                                        {/*            <div className="d-flex align-items-center">*/}
                                        {/*                <div className="flex-shrink-0">*/}
                                        {/*                    <i className="fa-solid fa-rotate-left fa-flip-horizontal fa-2x"/>*/}
                                        {/*                </div>*/}
                                        {/*                <div className="flex-grow-1 ms-3">*/}
                                        {/*                    <h6>Achats retournées</h6>*/}
                                        {/*                    <h4>0</h4>*/}
                                        {/*                </div>*/}
                                        {/*            </div>*/}
                                        {/*        </div>*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
                                        <div className="col-md-3">
                                            <div className="card report-card">
                                                <div className="card-body">
                                                    <div className="d-flex align-items-center">
                                                        <div className="flex-shrink-0">
                                                            <i className="fa-solid fa-hand-holding-dollar fa-flip-horizontal fa-2x"/>
                                                        </div>
                                                        <div className="flex-grow-1 ms-3">
                                                            <h6>Vente aujourd'hui</h6>
                                                            <h4>{report.total_sale_today}</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="card report-card">
                                                <div className="card-body">
                                                    <div className="d-flex align-items-center">
                                                        <div className="flex-shrink-0">
                                                            <i className="fa-solid fa-person-walking-arrow-loop-left fa-flip-horizontal fa-2x"/>
                                                        </div>
                                                        <div className="flex-grow-1 ms-3">
                                                            <h6>Achats aujourd'hui</h6>
                                                            <h4>0</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/*<div className="col-md-3 mt-4">*/}
                                        {/*    <div className="card report-card">*/}
                                        {/*        <div className="card-body">*/}
                                        {/*            <div className="d-flex align-items-center">*/}
                                        {/*                <div className="flex-shrink-0">*/}
                                        {/*                    <i className="fa-solid fa-arrow-right-arrow-left fa-flip-horizontal fa-2x"/>*/}
                                        {/*                </div>*/}
                                        {/*                <div className="flex-grow-1 ms-3">*/}
                                        {/*                    <h6>Vente retournée aujourd'hui</h6>*/}
                                        {/*                    <h4>0</h4>*/}
                                        {/*                </div>*/}
                                        {/*            </div>*/}
                                        {/*        </div>*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
                                    </div>
                                </div>
                            </div>
                            <div className="card mt-4 stock">
                                <div className="card-header">
                                    <h3> Stock </h3>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-3">
                                            <div className="card report-card">
                                                <div className="card-body">
                                                    <div className="d-flex align-items-center">
                                                        <div className="flex-shrink-0">
                                                            <i className="fa-solid fa-box-open fa-2x"></i>
                                                        </div>
                                                        <div className="flex-grow-1 ms-3">
                                                            <h6>Article Total</h6>
                                                            <h4> {report.total_product} </h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="card report-card">
                                                <div className="card-body">
                                                    <div className="d-flex align-items-center">
                                                        <div className="flex-shrink-0">
                                                            <i className="fa-solid fa-box fa-2x"></i>
                                                        </div>
                                                        <div className="flex-grow-1 ms-3">
                                                            <h6> Stock Total </h6>
                                                            <h4>{report.total_stock} </h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="card report-card">
                                                <div className="card-body">
                                                    <div className="d-flex align-items-center">
                                                        <div className="flex-shrink-0">
                                                            <i className="fa-solid fa-battery-quarter fa-2x"></i>
                                                        </div>
                                                        <div className="flex-grow-1 ms-3">
                                                            <h6>Stock total faible</h6>
                                                            <h4>{report.low_stock}</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="card report-card">
                                                <div className="card-body">
                                                    <div className="d-flex align-items-center">
                                                        <div className="flex-shrink-0">
                                                            <i className="fa-solid fa-dollar-sign fa-2x"/>
                                                        </div>
                                                        <div className="flex-grow-1 ms-3">
                                                            <h6> Prix d'achat total </h6>
                                                            <h4> {report.buy_value} </h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-3 mt-4">
                                            <div className="card report-card">
                                                <div className="card-body">
                                                    <div className="d-flex align-items-center">
                                                        <div className="flex-shrink-0">
                                                            <i className="fa-solid fa-dollar-sign fa-2x"/>
                                                        </div>
                                                        <div className="flex-grow-1 ms-3">
                                                            <h6>Prix de vente total</h6>
                                                            <h4>{report.sale_value}</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-3 mt-4">
                                            <div className="card report-card">
                                                <div className="card-body">
                                                    <div className="d-flex align-items-center">
                                                        <div className="flex-shrink-0">
                                                            <i className="fa-solid fa-dollar-sign fa-2x"/>
                                                        </div>
                                                        <div className="flex-grow-1 ms-3">
                                                            <h6>Bénéfice possible</h6>
                                                            <h4>{report.possible_profit}</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Report;