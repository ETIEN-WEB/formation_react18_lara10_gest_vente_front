import React from 'react';
import GlobalFunction from "../../../GlobalFunction";
import Barcode from "react-barcode";

const BarCodePage = React.forwardRef((props, ref)  => {
    return (
        <div className="print-area"
             ref={ref}
             style={{width: props.paperSize.a4.width, height: props.paperSize.a4.height}}>
            {props.products.map((product, index) =>(
                <div className="bar-code-items" key={index}>
                    <p> <strong> {product.name} </strong> </p>
                    <p>
                        Prix: {product?.sell_price?.discount != 0 ? GlobalFunction.formatPrice(product?.sell_price?.price) : ''}
                        <span className={product?.sell_price?.discount != 0 ? 'deleted ms-2':''}>
                                                {product.price}
                                            </span>
                    </p>
                    <div className="barcode">
                        <Barcode value={product.sku} width={1} height={50} fontSize={10} />
                    </div>
                </div>
            ))}
        </div>
    );
});

export default BarCodePage;