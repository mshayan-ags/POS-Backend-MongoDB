const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function Sale(parent, args, context) {
	return prisma.user.findUnique({ where: { id: parent.id } }).Sale();
}
function Purchase(parent, args, context) {
	return prisma.user.findUnique({ where: { id: parent.id } }).Purchase();
}
function ProductsSaled(parent, args, context) {
	return prisma.user.findUnique({ where: { id: parent.id } }).ProductsSaled();
}
function ProductsPurchased(parent, args, context) {
	return prisma.user.findUnique({ where: { id: parent.id } }).ProductsPurchased();
}
function profilePicture(parent, args, context) {
	return prisma.user.findUnique({ where: { id: parent.id } }).profilePicture();
}
function Admin(parent, args, context) {
	return prisma.user.findUnique({ where: { id: parent.id } }).Admin();
}
function Expense(parent, args, context) {
	return prisma.user.findUnique({ where: { id: parent.id } }).Expense();
}
function ReturnPurchase(parent, args, context) {
	return prisma.user.findUnique({ where: { id: parent.id } }).ReturnPurchase();
}
function SaleReturn(parent, args, context) {
	return prisma.user.findUnique({ where: { id: parent.id } }).SaleReturn();
}
function Accounts(parent, args, context) {
	return prisma.user.findUnique({ where: { id: parent.id } }).Accounts();
}

module.exports = {
	Sale,
	Purchase,
	ProductsSaled,
	ProductsPurchased,
	profilePicture,
	Admin,
	Expense,
	ReturnPurchase,
	SaleReturn,
	Accounts
};
