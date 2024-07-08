import React, {useEffect, useState} from 'react';
import BreadCrumb from "../../partials/BreadCrumb";
import CardHeader from "../../partials/miniComponent/CardHeader";
import {useNavigate} from "react-router-dom";
import axiosClient from "../../../axios";
import Swal from "sweetalert2";
import AddCustomer from "../../partials/modals/AddCustomer";
import ShowOrderConfirmation from "../../partials/modals/ShowOrderConfirmation";
import useScanDetection from "use-scan-detection-react18";

const OrderCreate = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState({
        order_by : 'id',
        per_page : 5,
        direction : 'desc',
        search : '',
    });

    const [customerInput, setCustomerInput] = useState('')
    const [customers, setCustomers] = useState([])

    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);

    const [itemsCountPerPage, setItemsCountPerPage] = useState(0)
    const [totalItemsCount, setTotalItemsCount] = useState(1)
    const [startFrom, setStartFrom] = useState(1)
    const [activePage, setActivePage] = useState(1)
    const [carts, setCarts] = useState({})
    const [orderSummary, setOrderSummary] = useState({
        items : 0,
        amount : 0,
        discount : 0,
        pay_able : 0,
        customer : '',
        customer_id : 0,
        paid_amount : 0,
        due_amount : 0,
        payment_method_id : 1,
        trx_id: '',
    })

    const [order, setOrder] = useState({})
    const [modalShow, setModalShow] = React.useState(false);
    const [showOrderConfirmationModal, setShowOrderConfirmationModal] = React.useState(false);
    const [paymentMethods, setPaymentMethods] = React.useState([]);
    const [barCode, setBarCode] = useState('')

    // START CES SCRIPT PERMETTENT D'UTILISER LE useScanDetection

    useScanDetection({
        onComplete: setBarCode,
        minLength: 2,

    })

    useEffect(() => {
        console.log(barCode)
        setInput(prevState => ({...prevState, search : barCode}))
    }, [barCode])

    useEffect(() => {
        getProducts(1)
    },[input.search])
    // END CES SCRIPT PERMETTENT D'UTILISER LE useScanDetection

    const getPaymentMethods = () => {
        //setIsLoading(true)
        axiosClient.get(`/get-payment-methods`).then( res => {
            setPaymentMethods(res.data)
            //setIsLoading(false)
        })
    }

    const handleOrderPlace = () => {
        console.log(orderSummary)
        setIsLoading(true)
        axiosClient.post(`/order`, {carts: carts, 'order_summary':orderSummary}).then( res => {
            Swal.fire({
                position: "top-end",
                icon: res.data.cls,
                title: res.data.msg,
                showConfirmButton: false,
                toast:true,
                timer: 1500
            })
            if (res.data.flag != undefined){
                setShowOrderConfirmationModal(false)
                navigate(`/order/${res.data.order_id}`)

            }
            setIsLoading(false)
        })
    }

    const selectCustomer = (customer) => {
        setOrder(prevState => ({...prevState, customer_id : customer.id}))
        setOrderSummary(prevState => ({...prevState, customer : customer.name+' - '+customer.phone}))
        setOrderSummary(prevState => ({...prevState, customer_id : customer.id}))

    }

    const handleCustomerSearch = (e) => {
        setCustomerInput(e.target.value)
    }

    const handleIncrease = (id) => {
        if (carts[id].stock > carts[id].quantity ){
            setCarts(prevState => ({
                ...prevState,
                [id]: {
                    ...prevState[id], quantity: carts[id].quantity + 1
                }
            }))
        }
    }

    const handleDecrease = (id) => {
        if (carts[id].quantity > 1 ){
            setCarts(prevState => ({
                ...prevState,
                [id]: {
                    ...prevState[id], quantity: carts[id].quantity - 1
                }
            }))
        }
    }

    const getCustomer = () => {
        axiosClient.get(`/customer?&search=${customerInput}`).then( res => {
            setCustomers(res.data)
            setIsLoading(false)
        })
    }

    const handleInput = (e) => {
        setInput(prevState => ({...prevState, [e.target.name] : e.target.value}))
    }

    const handleCart = (id) => {
        products.map((product, index) => {
            if (product.id == id){
                if (carts[id] == undefined){
                    setCarts(prevState => ({...prevState, [id]: product}))
                    setCarts(prevState => ({
                        ...prevState,
                        [id]: {
                            ...prevState[id], quantity: 1
                        }
                    }))
                }else {
                    if (carts[id].stock > carts[id].quantity ){
                        setCarts(prevState => ({
                            ...prevState,
                            [id]: {
                                ...prevState[id], quantity: carts[id].quantity + 1
                            }
                        }))
                    }
                }

            }
        })
    }

    const removeCart = (id) => {
        setCarts(current => {
            const copy = {...current};
            delete copy[id];
            return copy;
        })
    }

    const getProducts = (pageNumber=1) => {
        setIsLoading(true)
        axiosClient.get(`/product?page=${pageNumber}&search=${input.search}&order_by=${input.order_by}&per_page=${input.per_page}&direction=${input.direction}`).then( res => {
            setProducts(res.data.data)
            setItemsCountPerPage(res.data.meta.per_page)
            setStartFrom(res.data.meta.from)
            setTotalItemsCount(res.data.meta.total)
            setActivePage(res.data.meta.current_page)
            setIsLoading(false)
        }).catch(errors => {
            console.log(errors)
        })
    }

    const calculateOrderSummary = () => {
        let items = 0
        let amount = 0
        let discount = 0
        let pay_able = 0
        let paid_amount = 0
        Object.keys(carts).map((key)=> {
            amount += carts[key].original_price * carts[key].quantity
            discount += carts[key].sell_price.discount * carts[key].quantity
            pay_able += carts[key].sell_price.price * carts[key].quantity
            items += carts[key].quantity
            paid_amount = amount

        })

        setOrderSummary(prevState => ({...prevState,
            items: items,
            amount: amount,
            discount: discount,
            pay_able: pay_able,
            paid_amount: pay_able,

        }))
    }

    const handleOrderSummaryInput = (e) => {

        if (e.target.name == 'paid_amount' && orderSummary.pay_able >= e.target.value){
            setOrderSummary(prevState => ({...prevState,
                paid_amount: e.target.value,
                due_amount: orderSummary.pay_able - e.target.value,
            }))
        }else if (e.target.name == 'payment_method_id'){
            setOrderSummary(prevState => ({...prevState,
                payment_method_id: e.target.value,
            }))

            if (e.target.value == 1){
                setOrderSummary(prevState => ({...prevState,
                    trx_id: '',
                }))
            }

        }else if (e.target.name == 'trx_id'){
            setOrderSummary(prevState => ({...prevState,
                trx_id: e.target.value,
            }))
            console.log(orderSummary)
        }

    }

    useEffect( () => {
        getProducts()
        getPaymentMethods()

    }, [])

    useEffect( () => {
        calculateOrderSummary()
    }, [carts])

    return (
        <>
            <BreadCrumb title={'Créer une commande'} />
            <div className="row ">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <CardHeader
                                title={'Créer une commande'}
                                link={'/order'}
                                icon={'fa-list'}
                                button_text={'Liste'}
                            />
                        </div>
                        <div className="card-body">
                           <div className="row">
                               <div className="col-md-4">
                                   <div className="card">
                                       <div className="card-header">
                                           <h5> List des produits </h5>
                                       </div>
                                       <div className="card-body p-1">
                                           <div className="product-search-area mb-3 mt-2">
                                               <div className="input-group">
                                                   <input
                                                       className="form-control form-control-sm"
                                                       type={'search'}
                                                       name={'search'}
                                                       value={input.search}
                                                       onChange={handleInput}
                                                       placeholder={'Recherche...'}
                                                   />
                                                   <button onClick={getProducts} className="input-group-text theme_bg">
                                                       <i className="fa-solid fa-search"/>
                                                   </button>
                                               </div>

                                           </div>
                                           {products.map((product, index) =>(
                                               <div className="d-flex align-items-center py-2 position-relative order-product-container" key={index}>
                                                   <div className="details-area">
                                                       <button className={'btn btn-sm ms-1 btn-info'}><i className="fa-solid fa-eye"/></button>
                                                       <button className={'btn btn-sm ms-1 btn-success'} onClick={()=> handleCart(product.id)}><i className="fa-solid fa-plus"/></button>

                                                   </div>
                                                   <div className="flex-shrink-0">
                                                       <img className={'order-product-photo img-thumbnail'} src={product.primary_photo} alt="Photo produit"/>
                                                   </div>
                                                   <div className="flex-grow-1 ms-2">
                                                       <p className={'text-theme'}> <strong>{product.name}</strong> </p>
                                                       <p> <small> Prix original: {product.price} </small> </p>
                                                       <p className={'text-theme'}> <small> Prix V: {product.sell_price.price} {product.sell_price.symbol} | Réduction : {product.sell_price.discount} {product.sell_price.symbol} </small> </p>
                                                       <p> <small> SKU: {product.sku} | Stock: {product.stock} </small> </p>
                                                   </div>
                                               </div>
                                           ))}

                                       </div>
                                   </div>
                               </div>
                               <div className="col-md-4">
                                   <div className="card">
                                       <div className="card-header">
                                           <h5> Panier </h5>
                                       </div>
                                       <div className="card-body p-1">
                                           <div className="order-summury mt-2">
                                               <p className={'pb-2 ms-1'}> <strong> Client: <span className={'text-theme'}> {orderSummary.customer} </span> </strong> </p>
                                               <table className={'table-sm table table-hover table-stripped table-bordered '}>
                                                   <tbody>
                                                       <tr>
                                                           <th>Total QTY : </th>
                                                           <th className={'text-end'}> {orderSummary.items}</th>
                                                       </tr>
                                                       <tr>
                                                           <th>Prix original : </th>
                                                           <th className={'text-end'}> {new Intl.NumberFormat('en').format(orderSummary.amount)} FCFA</th>
                                                       </tr>
                                                       <tr>
                                                           <th>Réduction : </th>
                                                           <th className={'text-end'}>- {new Intl.NumberFormat('en').format(orderSummary.discount)} FCFA</th>
                                                       </tr>
                                                       <tr>
                                                           <th>Net à payer : </th>
                                                           <th className={'text-end text-theme'}> {new Intl.NumberFormat('en').format(orderSummary.pay_able)} FCFA</th>
                                                       </tr>
                                                   </tbody>
                                               </table>
                                           </div>

                                           {Object.keys(carts).map((key)=>(
                                               <div className="d-flex align-items-center py-2 border-bottom position-relative order-product-container" key={key}>
                                                   <div className="details-area">
                                                       <button className={'btn btn-sm ms-1 btn-info'}><i className="fa-solid fa-eye"/></button>
                                                       <button className={'btn btn-sm ms-1 btn-danger'} onClick={()=>removeCart(key)}><i className="fa-solid fa-times"/></button>
                                                   </div>
                                                   <div className="flex-shrink-0">
                                                       <img className={'order-product-photo img-thumbnail'} src={carts[key].primary_photo} alt="Photo produit"/>
                                                   </div>
                                                   <div className="flex-grow-1 ms-2">
                                                       <p className={'text-theme'}> <strong>{carts[key].name}</strong> </p>
                                                       <p> <small> Prix original: {carts[key].price} </small> </p>
                                                       <p className={'text-theme'}> <small> Prix V: {carts[key].sell_price.price} {carts[key].sell_price.symbol} | Réduction : {carts[key].sell_price.discount} {carts[key].sell_price.symbol} </small> </p>
                                                       <p> <small> SKU: {carts[key].sku} | Stock: {carts[key].stock} </small> </p>
                                                       <p> Quantité :
                                                           <button onClick={()=> handleDecrease(carts[key].id)} disabled={carts[key].quantity <= 1} className={'quantity-button'}> - </button>
                                                            <span> {carts[key].quantity} </span>
                                                           <button onClick={()=> handleIncrease(carts[key].id)} disabled={carts[key].stock <= carts[key].quantity} className={'quantity-button'}> + </button>
                                                       </p>

                                                   </div>
                                               </div>
                                           ))}
                                       </div>
                                   </div>
                               </div>
                               <div className="col-md-4">
                                   <div className="card">
                                       <div className="card-header">
                                           <div className="d-flex justify-content-between">
                                               <h5> Clients </h5>
                                               <button onClick={() => setModalShow(true)} className={'btn btn-sm btn-success py-0 px-2'}><i className="fa-solid fa-plus"/></button>
                                           </div>
                                       </div>
                                       <div className="card-body p-1">
                                           <div className="input-group">
                                               <input
                                                   className="form-control form-control-sm"
                                                   type={'search'}
                                                   name={'search'}
                                                   value={customerInput}
                                                   onChange={handleCustomerSearch}
                                                   onKeyUp={getCustomer}
                                                   placeholder={'Recherche...'}
                                               />
                                               <button onClick={getCustomer} className="input-group-text theme_bg">
                                                   <i className="fa-solid fa-search"/>
                                               </button>
                                           </div>
                                           <ul className={'customer-list mt-3'}>
                                               {customers.map((customer, index) => (
                                                   <li className={orderSummary.customer_id == customer.id ? 'text-theme order-product-container px-2' : 'order-product-container px-2'} onClick={()=> selectCustomer(customer)} key={index}> {customer.name} - {customer.phone} </li>
                                               ))}
                                           </ul>
                                           <div className="d-grid mt-4">
                                               <button disabled={orderSummary.items == 0 || orderSummary.customer_id == 0} onClick={()=> setShowOrderConfirmationModal(true)} className={'btn theme-button'}> Commander </button>
                                           </div>
                                       </div>
                                   </div>
                               </div>
                           </div>
                        </div>
                    </div>
                </div>
            </div>
            <AddCustomer
                show={modalShow}
                onHide={() => setModalShow(false)}
                setModalShow = {setModalShow}
            />
            <ShowOrderConfirmation
                show={showOrderConfirmationModal}
                onHide={() => setShowOrderConfirmationModal(false)}
                order_summary={orderSummary}
                carts={carts}
                is_loading={isLoading}
                handleOrderPlace={handleOrderPlace}
                handleOrderSummaryInput={handleOrderSummaryInput}
                paymentMethods={paymentMethods}

            />
        </>
    );
};

export default OrderCreate;