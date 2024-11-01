/**
 * @author deivid & santiago
 * @version 1.0.0
 * 
 * Order Item Controller
 * This file defines the order item controllers
 */

const { response, request } = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const showOrderItems = async (req = request, res = response) => {
    try {
        const orderItems = await prisma.order_items.findMany();
        res.json({ orderItems });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        await prisma.$disconnect();
    }
};

const addOrderItem = async (req = request, res = response) => {
    const { order_id, membership_id, product_id, quantity, price } = req.body;
    try {
        const newOrderItem = await prisma.order_items.create({
            data: {
                order_id,
                membership_id,
                product_id,
                quantity,
                price
            }
        });
        res.status(201).json({ newOrderItem });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        await prisma.$disconnect();
    }
};

const showOrderItem = async (req = request, res = response) => {
    const { id } = req.params;
    try {
        const orderItem = await prisma.order_items.findUnique({ where: { id: Number(id) } });
        if (!orderItem) return res.status(404).json({ message: 'Order Item not found' });
        res.json({ orderItem });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        await prisma.$disconnect();
    }
};

const editOrderItem = async (req = request, res = response) => {
    const { id } = req.params;
    const { order_id, membership_id, product_id, quantity, price } = req.body;
    try {
        const updatedOrderItem = await prisma.order_items.update({
            where: { id: Number(id) },
            data: {
                order_id,
                membership_id,
                product_id,
                quantity,
                price
            }
        });
        res.json({ updatedOrderItem });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        await prisma.$disconnect();
    }
};

const deleteOrderItem = async (req = request, res = response) => {
    const { id } = req.params;
    try {
        const deletedOrderItem = await prisma.order_items.delete({ where: { id: Number(id) } });
        res.json({ deletedOrderItem });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        await prisma.$disconnect();
    }
};

module.exports = {
    showOrderItems,
    addOrderItem,
    showOrderItem,
    editOrderItem,
    deleteOrderItem
};
