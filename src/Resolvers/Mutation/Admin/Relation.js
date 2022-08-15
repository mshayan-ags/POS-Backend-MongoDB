const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function Sale(parent, args, context) {
	return prisma.admin.findUnique({ where: { id: parent.id } }).Sale();
}
function Purchase(parent, args, context) {
	return prisma.admin.findUnique({ where: { id: parent.id } }).Purchase();
}
function SaleOfProduct(parent, args, context) {
	return prisma.admin.findUnique({ where: { id: parent.id } }).SaleOfProduct();
}
function PurchaseOfProduct(parent, args, context) {
	return prisma.admin.findUnique({ where: { id: parent.id } }).PurchaseOfProduct();
}
function Customers(parent, args, context) {
	return prisma.admin.findUnique({ where: { id: parent.id } }).Customers();
}
function Vendor(parent, args, context) {
	return prisma.admin.findUnique({ where: { id: parent.id } }).Vendor();
}
function User(parent, args, context) {
	return prisma.admin.findUnique({ where: { id: parent.id } }).User();
}
function profilePicture(parent, args, context) {
	return prisma.admin.findUnique({ where: { id: parent.id } }).profilePicture();
}
function Products(parent, args, context) {
	return prisma.admin.findUnique({ where: { id: parent.id } }).Products();
}
function Expense(parent, args, context) {
	return prisma.admin.findUnique({ where: { id: parent.id } }).Expense();
}
function Payment(parent, args, context) {
	return prisma.admin.findUnique({ where: { id: parent.id } }).Payment();
}
function ReturnPurchase(parent, args, context) {
	return prisma.admin.findUnique({ where: { id: parent.id } }).ReturnPurchase();
}
function SaleReturn(parent, args, context) {
	return prisma.admin.findUnique({ where: { id: parent.id } }).SaleReturn();
}
function Accounts(parent, args, context) {
	return prisma.admin.findUnique({ where: { id: parent.id } }).Accounts();
}

module.exports = {
	Sale,
	Purchase,
	SaleOfProduct,
	PurchaseOfProduct,
	Customers,
	Vendor,
	User,
	profilePicture,
	Products,
	Expense,
	Payment,
	ReturnPurchase,
	SaleReturn,
	Accounts
};
