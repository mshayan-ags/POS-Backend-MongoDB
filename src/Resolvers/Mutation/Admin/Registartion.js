const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET, saveProfilePicture } = require("../../../utils");
const { sendMail, emailVerification } = require("../../../utils/Mail");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function createAdmin(parent, args, context, info) {
	try {
		const { userId, Role } = context;
		if (userId && Role == "Super Admin") {
			const isEmailExists = await prisma.admin.findMany({ where: { email: args.email } });
			if (isEmailExists.length > 0) throw new Error('Email has already been taken');

			const isEmailVerified = await emailVerification(args.email);
			console.log(isEmailVerified)
			if (!isEmailVerified) throw new Error('Email is not valid....');

			const password = await bcrypt.hash(args.password, 15);
			const file = args.profilePicture
				? await Promise.resolve(saveProfilePicture(args.profilePicture)).then(async (value) => {
					return await value;
				})
				: undefined;

			const admin = await prisma.admin.create({
				data: {
					...args,
					...(args.profilePicture
						? {
							profilePicture: {
								create: file
							}
						}
						: false),
					password
				}
			});

			// 3
			const token = jwt.sign({ userId: admin.id, adminId: admin.id, Role: "Admin" }, APP_SECRET)
			// 4
			return {
				token,
				admin
			};
		} else {
			throw new Error("Super Admin must be Logged in");
		}
	} catch (e) {
		throw new Error(e);
	}
}

async function loginAdmin(parent, args, context, info) {
	try {
		// 1
		const admin = await prisma.admin.findUnique({ where: { email: args.email } });
		if (!admin) {
			throw new Error("No such admin found");
		}

		// 2
		const valid = await bcrypt.compare(args.password, admin.password);
		if (!valid) {
			throw new Error("Invalid password");
		}

		const token = jwt.sign({ userId: admin.id, adminId: admin.id, Role: "Admin" }, APP_SECRET);

		// 3
		return {
			token,
			admin
		};
	} catch (e) {
		throw new Error(e);
	}
}

async function updateAdmin(parent, args, context, info) {
	try {
		const { userId, Role } = context;
		if (!userId && Role && Role == "User") {
			throw new Error("You are Not Allowed For This Action");
		} else if (userId && Role && Role !== "User") {
			// 1
			const password = await bcrypt.hash(args.password, 15);
			const file = args.profilePicture
				? await Promise.resolve(saveProfilePicture(args.profilePicture)).then(async (value) => {
					return await value;
				})
				: undefined;

			await prisma.admin.update({
				where: {
					id: args.id
				},
				data: {
					...args,
					...(args.profilePicture
						? {
							profilePicture: {
								create: file
							}
						}
						: false),
					password
				}
			});

			return {
				success: true,
				message: "Admin Updated Successfully ..."
			};
		} else {
			return {
				success: false,
				message: "Sorry The Action You Tried Failed ..."
			};
		}
	} catch (e) {
		throw new Error(e);
	}
}

async function deleteAdmin(parent, args, context, info) {
	try {
		const { userId, Role } = context;
		if (!userId && Role != "Super Admin") {
			throw new Error("You must be Logged in as Super Admin");
		} else if (userId && Role == "Super Admin") {
			await prisma.admin.delete({
				where: {
					id: args.id
				}
			});
			return {
				success: true,
				message: "Admin Deleted Successfully ..."
			};
		} else {
			return {
				success: false,
				message: "Sorry The Action You Tried Failed ..."
			};
		}
	} catch (e) {
		throw new Error(e);
	}
}


async function changePasswordAdmin(parent, args, context, info) {
	try {
		const { adminId,userId } = context;
		if (adminId != args.id && userId != args.id) {
			throw new Error("You must be Logged in as Admin");
		} else {
			const admin = await prisma.admin.findUnique({
				where: {
					id: args.id
				}
			});

			const valid = await bcrypt.compare(args.oldPassword, admin.password);
			if (!valid) {
				throw new Error("Invalid password");
			}

			const newPassword = await bcrypt.hash(args.newPassword, 15);
     
			await prisma.admin.update({
				where: {
					id: args.id
				},
				data: {
					password: newPassword
				}
			});

			return {
				success: true,
				message: "Your Password was Changed Successfully ..."
			};
		}
	} catch (e) {
		throw new Error(e);
	}
}


module.exports = {
	createAdmin,
	loginAdmin,
	updateAdmin,
	deleteAdmin,
	changePasswordAdmin
};
