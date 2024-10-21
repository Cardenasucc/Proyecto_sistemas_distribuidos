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

const showPeople = async (req = request, res = response) => {
    try {
        const people = await prisma.person.findMany();
        res.json({
            people
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    } finally {
        await prisma.$disconnect();
    }
};

const addPerson = async (req = request, res = response) => {
    const { name, lastname, number, published, userId } = req.body;

    try {
        const newPerson = await prisma.person.create({
            data: {
                name,
                lastname,
                number,
                published,
                userId
            }
        });
        res.json({
            newPerson
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    } finally {
        await prisma.$disconnect();
    }
};

const showPerson = async (req = request, res = response) => {
    const { id } = req.params;

    try {
        const person = await prisma.person.findUnique({
            where: { id: Number(id) }
        });

        if (!person) {
            return res.status(404).json({
                message: 'Person not found'
            });
        }

        res.json({
            person
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    } finally {
        await prisma.$disconnect();
    }
};

const editPerson = async (req = request, res = response) => {
    const { id } = req.params;
    const { name, lastname, number, published, userId } = req.body;

    try {
        const updatedPerson = await prisma.person.update({
            where: { id: Number(id) },
            data: {
                name,
                lastname,
                number,
                published,
                userId
            }
        });

        res.json({
            updatedPerson
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    } finally {
        await prisma.$disconnect();
    }
};

const deletePerson = async (req = request, res = response) => {
    const { id } = req.params;

    try {
        const deletedPerson = await prisma.person.delete({
            where: { id: Number(id) }
        });

        res.json({
            deletedPerson
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    } finally {
        await prisma.$disconnect();
    }
};

module.exports = {
    addPerson,
    showPeople,
    showPerson,
    editPerson,
    deletePerson
};
