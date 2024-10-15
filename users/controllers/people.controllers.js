/**
 * @author Deivid & Santiago
 * @version 1.0.0
 * 
 * Person Controller
 * This file defines the person controllers
 */

const { response, request } = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const showPersons = async (req = request, res = response) => {
    try {
        const persons = await prisma.persons.findMany();
        res.json({ persons });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        await prisma.$disconnect();
    }
};

const addPerson = async (req = request, res = response) => {
    const { name, lastname, number, published, user_id } = req.body;
    try {
        const newPerson = await prisma.persons.create({
            data: {
                name,
                lastname,
                number,
                published,
                user_id
            }
        });
        res.status(201).json({ newPerson });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        await prisma.$disconnect();
    }
};

const showPerson = async (req = request, res = response) => {
    const { id } = req.params;
    try {
        const person = await prisma.persons.findUnique({ where: { id: Number(id) } });
        if (!person) {
            return res.status(404).json({ message: 'Person not found' });
        }
        res.json({ person });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        await prisma.$disconnect();
    }
};

const editPerson = async (req = request, res = response) => {
    const { id } = req.params;
    const { name, lastname, number, published, user_id } = req.body;
    try {
        const updatedPerson = await prisma.persons.update({
            where: { id: Number(id) },
            data: {
                name,
                lastname,
                number,
                published,
                user_id
            }
        });
        res.json({ updatedPerson });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        await prisma.$disconnect();
    }
};

const deletePerson = async (req = request, res = response) => {
    const { id } = req.params;
    try {
        const deletedPerson = await prisma.persons.delete({
            where: { id: Number(id) },
        });
        res.json({ deletedPerson });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        await prisma.$disconnect();
    }
};

module.exports = {
    showPersons,
    addPerson,
    showPerson,
    editPerson,
    deletePerson
};