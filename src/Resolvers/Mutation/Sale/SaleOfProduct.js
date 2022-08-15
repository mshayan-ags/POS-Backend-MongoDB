const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function Sale(parent, args, context) {
	return prisma.saleOfProduct
		.findUnique({
			where: {
				SaleId_ProductId: { ProductId: parent.ProductId, SaleId: parent.SaleId }
			},
			select: { Sale: true }
		})
		.Sale();
}
function Products(parent, args, context) {
	return prisma.saleOfProduct
		.findUnique({
			where: {
				SaleId_ProductId: { ProductId: parent.ProductId, SaleId: parent.SaleId }
			},
			select: { Products: true }
		})
		.Products();
}

function User(parent, args, context) {
	return prisma.saleOfProduct
		.findUnique({
			where: {
				SaleId_ProductId: { ProductId: parent.ProductId, SaleId: parent.SaleId }
			},
			select: { User: true }
		})
		.User();
}
function Admin(parent, args, context) {
	return prisma.saleOfProduct
		.findUnique({
			where: {
				SaleId_ProductId: { ProductId: parent.ProductId, SaleId: parent.SaleId }
			},
			select: { Admin: true }
		})
		.Admin();
}

module.exports = {
	Products,
	Sale,
	User,
	Admin
};
