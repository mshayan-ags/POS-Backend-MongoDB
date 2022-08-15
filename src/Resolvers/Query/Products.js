const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function Products(parent, args, context, info) {
	const { adminId } = context;
	return prisma.products.findMany({ where: { adminId: adminId } });
}

function ProductInfo(parent, args, context, info) {
	return prisma.products.findUnique({
		where: {
			id: args.id
		}
	});
}

module.exports = {
	Products,
	ProductInfo
};
