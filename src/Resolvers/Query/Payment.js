
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function Payment(parent, args, context, info) {
	const { adminId } = context;

	return prisma.payment.findMany({ where: { adminId: adminId } });
}

function PaymentInfo(parent, args, context, info) {
	return prisma.payment.findUnique({
		where: {
			id: args.id
		}
	});
}

module.exports = {
	Payment,
	PaymentInfo
};
