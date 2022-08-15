const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function Purchase(parent, args, context) {
	return prisma.returnPurchase
		.findUnique({
			where: {
				PurchaseId_ProductId: { ProductId: parent.ProductId, PurchaseId: parent.PurchaseId }
			},
			select: { Purchase: true }
		})
		.Purchase();
}
function Products(parent, args, context) {
	return prisma.returnPurchase
		.findUnique({
			where: {
				PurchaseId_ProductId: { ProductId: parent.ProductId, PurchaseId: parent.PurchaseId }
			},
			select: { Products: true }
		})
		.Products();
}

function User(parent, args, context) {
	return prisma.returnPurchase
		.findUnique({
			where: {
				PurchaseId_ProductId: { ProductId: parent.ProductId, PurchaseId: parent.PurchaseId }
			},
			select: { User: true }
		})
		.User();
}

function Admin(parent, args, context) {
	return prisma.returnPurchase
		.findUnique({
			where: {
				PurchaseId_ProductId: { ProductId: parent.ProductId, PurchaseId: parent.PurchaseId }
			},
			select: { Admin: true }
		})
		.Admin();
}

module.exports = {
	Products,
	Purchase,
	User,
	Admin
};
