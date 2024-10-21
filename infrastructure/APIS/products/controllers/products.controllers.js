/**
 * @author deivid & santiago
 * @version 1.0.0
 * 
 * Product controllers
 * This file defines product controllers
 */

const {response, request} = require('express')

const ShowProducts = async(req=request, res=response)=>{
    res.json({
        "Hi": "I am the answer to show products"
    });
};

const ShowProduct = async(req=request, res=response)=>{
    res.json({
        "Hi": "I am the answer to show product"
    });
};

const AddProducts = async(req=request, res=response)=>{
    res.json({
        "Hi": "I am the answer to add products"
    });
};

const DeleteProducts = async(req=request, res=response)=>{
    res.json({
        "Hi": "I am the answer to delete products"
    });
};

const EditProducts = async(req=request, res=response)=>{
    res.json({
        "Hi": "I am the answer to edit products"
    });
};

module.exports = {
    ShowProducts,
    ShowProduct,
    AddProducts,
    DeleteProducts,
    EditProducts
};