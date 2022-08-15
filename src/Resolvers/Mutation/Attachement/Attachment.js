const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function Products(parent, args, context) {
	return prisma.attachment.findUnique({ where: { id: parent.id } }).Products();
}
function Admin(parent, args, context) {
	return prisma.attachment.findUnique({ where: { id: parent.id } }).Admin();
}
function Products(parent, args, context) {
	return prisma.attachment.findUnique({ where: { id: parent.id } }).Products();
}
module.exports = {
	Products,
	Admin,
	Products
};
