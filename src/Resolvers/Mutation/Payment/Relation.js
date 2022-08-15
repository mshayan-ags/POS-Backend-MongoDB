const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function Sale(parent, args, context) {
	return prisma.payment.findUnique({ where: { id: parent.id } }).Sale();
}

function Purchase(parent, args, context) {
	return prisma.payment.findUnique({ where: { id: parent.id } }).Purchase();
}

function PaymentReceived(parent, args, context) {
	return prisma.payment.findUnique({ where: { id: parent.id } }).PaymentReceived();
}

function PaymentSent(parent, args, context) {
	return prisma.payment.findUnique({ where: { id: parent.id } }).PaymentSent();
}

function Admin(parent, args, context) {
	return prisma.payment.findUnique({ where: { id: parent.id } }).Admin();
}

function User(parent, args, context) {
	return prisma.payment.findUnique({ where: { id: parent.id } }).User();
}
module.exports = {
	Sale,
	Purchase,
	PaymentReceived,
	PaymentSent,
	Admin,
	User
};
