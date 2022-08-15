
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function Purchase(parent, args, context, info) {
	const { adminId, userId, Role } = context;

	return prisma.purchase.findMany({
		where: {
			adminId: adminId,
			...(Role == "User" && {
				userId: userId
			}),
		}
	});
}

function PurchaseInfo(parent, args, context, info) {
	return prisma.purchase.findUnique({
		where: {
			id: args.id
		}
	});
}

async function PurchaseOfProduct(parent, args, context, info) {
	const { adminId } = context;

	return prisma.purchaseOfProduct.findMany({ where: { adminId: adminId } });
}

function PurchaseOfProductInfo(parent, args, context, info) {
	return prisma.purchaseOfProduct.findUnique({
		where: {
			id: args.id
		}
	});
}

module.exports = {
	Purchase,
	PurchaseInfo,
	PurchaseOfProduct,
	PurchaseOfProductInfo
};
