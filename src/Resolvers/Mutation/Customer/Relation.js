const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function Sale(parent, args, context) {
	return prisma.customer.findUnique({ where: { id: parent.id } }).Sale();
}
function Admin(parent, args, context) {
	return prisma.customer.findUnique({ where: { id: parent.id } }).Admin();
}
function Payment(parent, args, context) {
	return prisma.customer.findUnique({ where: { id: parent.id } }).Payment();
}
module.exports = {
	Sale,
	Admin,
	Payment
};
