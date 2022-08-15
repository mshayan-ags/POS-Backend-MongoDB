const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function User(parent, args, context) {
	return prisma.expense.findUnique({ where: { id: parent.id } }).User();
}

function Admin(parent, args, context) {
	return prisma.expense.findUnique({ where: { id: parent.id } }).Admin();
}

module.exports = {
	User,
	Admin
};
