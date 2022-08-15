
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function Expense(parent, args, context, info) {
	const { adminId, userId, Role } = context;

	return prisma.expense.findMany({
		where: {
			adminId: adminId, ...(Role == "User" && {
				userId: userId
			}), } });
}

function ExpenseInfo(parent, args, context, info) {
	return prisma.expense.findUnique({
		where: {
			id: args.id
		}
	});
}

module.exports = {
	Expense,
	ExpenseInfo
};
