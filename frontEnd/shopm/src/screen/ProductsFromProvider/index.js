import React from "react";
import './styles.css';

import Header from "screen/Header";
import ProductsFromProviderTop from "./components/ProductsFromProviderTop";
import ProductsFromProviderBottom from "./components/ProductsFromProviderBottom";

const ProductsFromProvider = () => {
    return (
        <div className="ProductsFromProvider">
            <Header />
            <ProductsFromProviderTop />
            <ProductsFromProviderBottom />
        </div>
    )
}

export default ProductsFromProvider;