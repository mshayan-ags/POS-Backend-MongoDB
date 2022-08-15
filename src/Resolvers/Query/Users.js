
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function User(parent, args, context, info) {
	const { adminId } = context;

	return prisma.user.findMany({ where: { adminId: adminId } });
}
function loggedInUser(parent, args, context, info) {
	const { userId, Role } = context;
	if (Role !== "Admin") {
		return prisma.user.findUnique({
			where: { id: userId }
		});
	}
	else {
		return {}
	}
}

function UserInfo(parent, args, context, info) {
	return prisma.user.findUnique({
		where: { id: args.id }
	});
}
module.exports = {
	User,
	loggedInUser,
	UserInfo
};
