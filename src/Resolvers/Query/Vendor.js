
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function Vendor(parent, args, context, info) {
	const { adminId } = context;
	return prisma.vendor.findMany({ where: { adminId: adminId } });
}

function VendorInfo(parent, args, context, info) {
	return prisma.vendor.findUnique({
		where: {
			id: args.id
		}
	});
}

module.exports = {
	Vendor,
	VendorInfo
};
