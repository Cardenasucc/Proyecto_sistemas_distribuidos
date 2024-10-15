/**
 * @author Deivid & Santiago
 * @version 1.0.0
 * 
 * User Controller
 * This file defines the user controllers
 */

const { response, request } = require('express');
const { PrismaClient } = require('@prisma/client');
const { Encrypt, Decrypt } = require('../middlewares/validate');
const { CreateJWT } = require('../middlewares/jwt');

const prisma = new PrismaClient();

const showUsers = async (req = request, res = response) => {
    try {
        const users = await prisma.user.findMany();
        res.json({ users });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        await prisma.$disconnect();
    }
};

const addUser = async (req = request, res = response) => {
    try {
        let { email, password } = req.body;
        password = Encrypt(password);

        const newUser = await prisma.user.create({
            data: {
                email,
                password,
            },
        });
        res.status(201).json({ newUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        await prisma.$disconnect();
    }
};

const showUser = async (req = request, res = response) => {
    const { id } = req.params;

    try {
        const user = await prisma.user.findUnique({
            where: { id: Number(id) },
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        await prisma.$disconnect();
    }
};

const editUser = async (req = request, res = response) => {
    const { id } = req.params;
    const { email, password } = req.body;

    try {
        const updatedUser = await prisma.user.update({
            where: { id: Number(id) },
            data: {
                email,
                password: password ? Encrypt(password) : undefined, 
            },
        });
        res.json({ updatedUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        await prisma.$disconnect();
    }
};

const deleteUser = async (req = request, res = response) => {
    const { id } = req.params;

    try {
        const deletedUser = await prisma.user.delete({
            where: { id: Number(id) },
        });
        res.json({ deletedUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        await prisma.$disconnect();
    }
};

const login = async (req = request, res = response) => {
    let { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (Decrypt(user.password) === password) {
            const userJWT = CreateJWT(user);
            res.json({ user, userJWT });
        } else {
            res.status(401).json({ message: 'Incorrect password' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        await prisma.$disconnect();
    }
};

module.exports = {
    addUser,
    showUsers,
    showUser,
    editUser,
    deleteUser,
    login,
};
