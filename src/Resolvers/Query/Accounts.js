
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function Accounts(parent, args, context, info) {
	const { adminId, Role, userId } = context;

	return await prisma.accounts.findMany({
		where: {
			adminId: adminId,
			...(Role == "User" && {
				userId: userId
			}),
			createdAt: {
				gte: new Date(args.startDate),
				lt: new Date(args.endDate)
			}
		}
	});
}

function AccountInfo(parent, args, context, info) {
	return prisma.accounts.findUnique({
		where: {
			id: args.id
		}
	});
}

module.exports = {
	Accounts,
	AccountInfo
};
