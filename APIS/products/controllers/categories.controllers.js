/**
 * @author deivid & santiago
 * @version 1.0.0
 * 
 * Category Controller
 * This file defines the category controllers
 */

const { response, request } = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const showCategories = async (req = request, res = response) => {
    try {
        const categories = await prisma.categories.findMany();
        res.json({ categories });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        await prisma.$disconnect();
    }
};

const addCategory = async (req = request, res = response) => {
    const { name } = req.body;
    try {
        const newCategory = await prisma.categories.create({
            data: {
                name
            }
        });
        res.status(201).json({ newCategory });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        await prisma.$disconnect();
    }
};

const showCategory = async (req = request, res = response) => {
    const { id } = req.params;
    try {
        const category = await prisma.categories.findUnique({ where: { id: Number(id) } });
        if (!category) return res.status(404).json({ message: 'Category not found' });
        res.json({ category });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        await prisma.$disconnect();
    }
};

const editCategory = async (req = request, res = response) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const updatedCategory = await prisma.categories.update({
            where: { id: Number(id) },
            data: {
                name
            }
        });
        res.json({ updatedCategory });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        await prisma.$disconnect();
    }
};

const deleteCategory = async (req = request, res = response) => {
    const { id } = req.params;
    try {
        const deletedCategory = await prisma.categories.delete({ where: { id: Number(id) } });
        res.json({ deletedCategory });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        await prisma.$disconnect();
    }
};

module.exports = {
    showCategories,
    addCategory,
    showCategory,
    editCategory,
    deleteCategory
};
