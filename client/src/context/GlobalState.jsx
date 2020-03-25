import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

// initial state
const initialState = {
    transactions: [],
    error: null,
    loading: true
}

// create context
export const GlobalContext = createContext(initialState);

// provider component
export const GlobalProvider = ({ children }) =>{
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // actions

    function getTransactions(){
        fetch('/api/v1/transactions')
        .then(data => data.json())
        .then(res =>{
            console.log(res)
            dispatch({
                type: 'GET_TRANSACTIONS',
                payload: res.data
            });
        })
        .catch(err =>{
            console.log(err)
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err
            })
        })
    }

    function deleteTransaction(id){

        fetch(`/api/v1/transactions/${id}`, {
            method: 'DELETE',
            headers: new Headers()
        })
        .then(data => data.json())
        .then(res =>{
            console.log(res)
            dispatch({
                type: 'DELETE_TRANSACTION',
                payload: id
            });
        })
        .catch(err =>{
            console.log(err)
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: "Failed to delete transaction"
            })
        })
    }
    
    function addTransaction(transaction){
        console.log('transaction', transaction);
        fetch('api/v1/transactions/', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({ text: transaction.text, amount: transaction.amount })
        })
        .then(data => data.json())
        .then(res =>{
            console.log(res);
            dispatch({
                type: 'ADD_TRANSACTION',
                payload: res.data
            })
        })
        .catch(err =>{
            console.log(err)
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: "Failed to add transaction"
            })
        })


    }
    
    return (
        <GlobalContext.Provider value={{
            transactions: state.transactions,
            error: state.error,
            loading: state.loading,
            getTransactions,
            deleteTransaction,
            addTransaction
        }}>
            {children}
        </GlobalContext.Provider>
    );
}