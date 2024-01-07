import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Currency = () => {
    const [setCurrency] = useContext(AppContext);

    const handleCurrencyChange = (event) => {
        const currencySymbolMap ={
            Dollar: '$',
            Pound: '£',
            Euro: '€',
            Rupee: '₹'
        };
        setCurrency(currencySymbolMap[event.traget.value])
    }

    return (
        <div className="currency-container">
            <label htmlFor="currency-select" className="currency-label">Currency ({Currency})</label>
            <select id="currency-select" className="form-select" value={Currency} onChange={handleCurrencyChange}>
                <option value="Dollar">$ Dollar</option>
                <option value="Pound">£ Pound</option>
                <option value="Euro">€ Euro</option>
                <option value="Rupee">₹ Rupee</option>
            </select>
        </div>
    );
};

export default Currency;
