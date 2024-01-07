import React, { createContext, useReducer } from 'react';

// Reducer function to update state based on the action
const appReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE': {
            const totalExpenseCost = state.expenses.reduce((total, expense) => total + expense.cost, 0) + action.payload.cost;

            if (totalExpenseCost <= state.budget) {
                const updatedExpenses = state.expenses.map(expense =>
                    expense.name === action.payload.name
                        ? { ...expense, cost: expense.cost + action.payload.cost }
                        : expense
                );

                return {
                    ...state,
                    expenses: updatedExpenses,
                };
            } else {
                // You could set some state here to show an error message in the UI
                return state;
            }
        }
        case 'RED_EXPENSE': {
            const updatedExpenses = state.expenses.map(expense => {
                if (expense.name === action.payload.name && expense.cost >= action.payload.cost) {
                    return { ...expense, cost: expense.cost - action.payload.cost };
                }
                return expense;
            });

            const additionalBudget = state.expenses.find(expense => expense.name === action.payload.name)?.cost >= action.payload.cost
                ? action.payload.cost
                : 0;

            return {
                ...state,
                expenses: updatedExpenses,
                budget: state.budget + additionalBudget,
            };
        }
        case 'DELETE_EXPENSE': {
            const { cost: expenseCost } = state.expenses.find(expense => expense.name === action.payload) || {};
            const updatedExpenses = state.expenses.filter(expense => expense.name !== action.payload);
            const additionalBudget = expenseCost || 0;

            return {
                ...state,
                expenses: updatedExpenses,
                budget: state.budget + additionalBudget,
            };
        }
        case 'SET_BUDGET': {
            return {
                ...state,
                budget: action.payload,
            };
        }
        case 'CHG_CURRENCY': {
            return {
                ...state,
                currency: action.payload,
            };
        }
        default:
            return state;
    }
};

// Initial state when the app loads
const initialState = {
    budget: 2000,
    expenses: [
        { id: 'Marketing', name: 'Marketing', cost: 50 },
        { id: 'Finance', name: 'Finance', cost: 300 },
        { id: 'Sales', name: 'Sales', cost: 70 },
        { id: 'Human Resource', name: 'Human Resource', cost: 40 },
        { id: 'IT', name: 'IT', cost: 500 },
    ],
    currency: '£'
};

// Creates the context for our application
export const AppContext = createContext();

// Provider component that allows child components to access the state
export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    // Calculate remaining budget
    const remaining = state.expenses.reduce((total, expense) => total - expense.cost, state.budget);

    return (
        <AppContext.Provider
            value={{
                expenses: state.expenses,
                budget: state.budget,
                remaining,
                dispatch,
                currency: state.currency,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
