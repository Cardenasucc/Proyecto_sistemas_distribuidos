/**
 * @author deivid & santiago
 * @version 1.0.0
 * 
 * Order Controller
 * This file defines the order controllers
 */

const { response, request } = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const showOrders = async (req = request, res = response) => {
    try {
        const orders = await prisma.orders.findMany();
        res.json({ orders });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        await prisma.$disconnect();
    }
};

const addOrder = async (req = request, res = response) => {
    const { user_id, order_date } = req.body;
    try {
        const newOrder = await prisma.orders.create({
            data: {
                user_id,
                order_date
            }
        });
        res.status(201).json({ newOrder });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        await prisma.$disconnect();
    }
};

const showOrder = async (req = request, res = response) => {
    const { id } = req.params;
    try {
        const order = await prisma.orders.findUnique({ where: { id: Number(id) } });
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json({ order });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        await prisma.$disconnect();
    }
};

const editOrder = async (req = request, res = response) => {
    const { id } = req.params;
    const { user_id, order_date } = req.body;
    try {
        const updatedOrder = await prisma.orders.update({
            where: { id: Number(id) },
            data: {
                user_id,
                order_date
            }
        });
        res.json({ updatedOrder });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        await prisma.$disconnect();
    }
};

const deleteOrder = async (req = request, res = response) => {
    const { id } = req.params;
    try {
        const deletedOrder = await prisma.orders.delete({ where: { id: Number(id) } });
        res.json({ deletedOrder });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        await prisma.$disconnect();
    }
};

module.exports = {
    showOrders,
    addOrder,
    showOrder,
    editOrder,
    deleteOrder
};
