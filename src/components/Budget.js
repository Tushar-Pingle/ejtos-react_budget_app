import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { budget, currency } = useContext(AppContext); // Destructure currency from context
    const [newBudget, setNewBudget] = useState(budget);
    const handleBudgetChange = (event) => {
        setNewBudget(event.target.value);
    };

    return (
        <div className='alert alert-secondary'>
            <span>Budget: ({currency})</span> {/* currency is now defined */}
            <input type="number" step="10" value={newBudget} onChange={handleBudgetChange} max="20000" />
        </div>
    );
};

export default Budget;
