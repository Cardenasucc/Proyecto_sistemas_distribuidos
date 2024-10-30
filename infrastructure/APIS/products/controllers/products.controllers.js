/**
 * @author deivid & santiago
 * @version 1.0.0
 * 
 * Product Controller
 * This file defines the product controllers
 */

const { response, request } = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const showProducts = async (req = request, res = response) => {
    try {
        const products = await prisma.product.findMany({
            include: { category: true } // Incluye la categoría asociada
        });
        res.json({ products });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        await prisma.$disconnect();
    }
};

const addProduct = async (req = request, res = response) => {
    const { name, description, price, quantity, categoryId } = req.body;
    try {
        const newProduct = await prisma.product.create({
            data: {
                name,
                description,
                price,
                quantity,
                category: { connect: { id: categoryId } }
            }
        });
        res.status(201).json({ newProduct });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        await prisma.$disconnect();
    }
};

const showProduct = async (req = request, res = response) => {
    const { id } = req.params;
    try {
        const product = await prisma.product.findUnique({
            where: { id: Number(id) },
            include: { category: true }
        });
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json({ product });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        await prisma.$disconnect();
    }
};

const editProduct = async (req = request, res = response) => {
    const { id } = req.params;
    const { name, description, price, quantity, categoryId } = req.body;
    try {
        const updatedProduct = await prisma.product.update({
            where: { id: Number(id) },
            data: {
                name,
                description,
                price,
                quantity,
                category: { connect: { id: categoryId } }
            }
        });
        res.json({ updatedProduct });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        await prisma.$disconnect();
    }
};

const deleteProduct = async (req = request, res = response) => {
    const { id } = req.params;
    try {
        const deletedProduct = await prisma.product.delete({
            where: { id: Number(id) }
        });
        res.json({ deletedProduct });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        await prisma.$disconnect();
    }
};

module.exports = {
    showProducts,
    addProduct,
    showProduct,
    editProduct,
    deleteProduct
};
