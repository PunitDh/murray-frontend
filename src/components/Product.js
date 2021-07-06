import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProduct } from "../api/products";

function Product({ id }) {
    const [product, setProduct] = useState();
    console.log(`ID=${id}`);
    // console.log(useState());

    useEffect(() => {
        getProduct(id)
            .then(product => setProduct(product))
            .catch(() => setProduct(null))
    }, [id]);

    return (
        product ? (
            <>
                {/* <>
                    <dl>
                        <dt>Id</dt>
                        <dd>{product.id}</dd>
                    </dl>
                    <dl>
                        <dt>Name</dt>
                        <dd>{product.name}</dd>
                    </dl>
                    <dl>
                        <dt>Price</dt>
                        <dd>${product.price}</dd>
                    </dl>
                </> */}

                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                        </tr>
                    </tbody>
                </table>
                <Link to="/products">&larr;&nbsp;Back</Link>
            </>
        ) : ( <div>Loading &hellip;</div> )
    );
}

export default Product;