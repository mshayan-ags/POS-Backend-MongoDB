
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function Sale(parent, args, context, info) {
	const { adminId, userId, Role } = context;

	return prisma.sale.findMany({
		where: {
			adminId: adminId,
			...(Role == "User" && {
				userId: userId
			}),
		}
	});
}

function SaleInfo(parent, args, context, info) {
	return prisma.sale.findUnique({
		where: {
			id: args.id
		}
	});
}

async function SaleOfProduct(parent, args, context, info) {
	const { adminId } = context;

	return prisma.saleOfProduct.findMany({ where: { adminId: adminId } });
}

function SaleOfProductInfo(parent, args, context, info) {
	return prisma.saleOfProduct.findUnique({
		where: {
			id: args.id
		}
	});
}

module.exports = {
	Sale,
	SaleInfo,
	SaleOfProduct,
	SaleOfProductInfo
};
