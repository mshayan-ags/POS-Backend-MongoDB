const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function Customer(parent, args, context) {
	return prisma.sale.findUnique({ where: { id: parent.id } }).Customer();
}
function Product(parent, args, context) {
	return prisma.sale.findUnique({ where: { id: parent.id } }).Product();
}
function Payment(parent, args, context) {
	return prisma.sale.findUnique({ where: { id: parent.id } }).Payment();
}
function User(parent, args, context) {
	return prisma.sale.findUnique({ where: { id: parent.id } }).User();
}
function Admin(parent, args, context) {
	return prisma.sale.findUnique({ where: { id: parent.id } }).Admin();
}


module.exports = {
	Payment,
	Product,
	Customer,
	User,
	Admin
};
