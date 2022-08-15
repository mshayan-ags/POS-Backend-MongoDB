const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function Purchase(parent, args, context) {
	return prisma.vendor.findUnique({ where: { id: parent.id } }).Purchase();
}
function Admin(parent, args, context) {
	return prisma.vendor.findUnique({ where: { id: parent.id } }).Admin();
}
function Payment(parent, args, context) {
	return prisma.vendor.findUnique({ where: { id: parent.id } }).Payment();
}

module.exports = {
	Purchase,
	Admin,
	Payment
};
