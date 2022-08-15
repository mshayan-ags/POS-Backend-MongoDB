
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function Admin(parent, args, context, info) {
	return prisma.admin.findMany();
}

async function loggedInAdmin(parent, args, context, info) {
	const {  adminId } = context;
	
	return await prisma.admin.findUnique({
		where: { id: adminId }
	});
}
module.exports = {
	Admin,
	loggedInAdmin
};
