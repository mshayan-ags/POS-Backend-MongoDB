
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function Customer(parent, args, context, info) {
	const { adminId } = context;

	return prisma.customer.findMany({ where: { adminId: adminId } });
}

function CustomerInfo(parent, args, context, info) {
	return prisma.customer.findUnique({
		where: {
			id: args.id
		}
	});
}

module.exports = {
	Customer,
	CustomerInfo
};
