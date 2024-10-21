/**
 * @author deivid & santiago
 * @version 1.0.0
 * 
 * Memberships Controllers
 * This file defines the membership controllers
 */

const { response, request } = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const showMemberships = async (req = request, res = response) => {
    try {
        const memberships = await prisma.membership.findMany();
        res.json({ memberships });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        await prisma.$disconnect();
    }
};

const addMembership = async (req = request, res = response) => {
    const { type, stat_date, ent_date, person_id } = req.body;
    try {
        const newMembership = await prisma.membership.create({
            data: {
                type,
                stat_date,
                ent_date,
                person_id
            }
        });
        res.status(201).json({ newMembership });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        await prisma.$disconnect();
    }
};

const showMembership = async (req = request, res = response) => {
    const { id } = req.params;
    try {
        const membership = await prisma.membership.findUnique({ where: { id: Number(id) } });
        if (!membership) return res.status(404).json({ message: 'Membership not found' });
        res.json({ membership });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        await prisma.$disconnect();
    }
};

const editMembership = async (req = request, res = response) => {
    const { id } = req.params;
    const { type, stat_date, ent_date, person_id } = req.body;
    try {
        const updatedMembership = await prisma.membership.update({
            where: { id: Number(id) },
            data: {
                type,
                stat_date,
                ent_date,
                person_id
            }
        });
        res.json({ updatedMembership });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        await prisma.$disconnect();
    }
};

const deleteMembership = async (req = request, res = response) => {
    const { id } = req.params;
    try {
        const deletedMembership = await prisma.membership.delete({
            where: { id: Number(id) }
        });
        res.json({ deletedMembership });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        await prisma.$disconnect();
    }
};

module.exports = {
    showMemberships,
    addMembership,
    showMembership,
    editMembership,
    deleteMembership
};
