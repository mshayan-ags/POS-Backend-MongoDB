
const { saveImage } = require("../../../utils");

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function CreateProduct(parent, args, context, info) {
	try {
		const { userId, adminId } = context;
		if (!userId) {
			throw new Error("You must be Logged in");
		}
		else {
			const files = args.image
				? await Promise.all(
					args.image.map(async (file) => {
						const img = await saveImage(file);
						return img;
					})
				)
				: undefined;

			await prisma.products.create({
				data: {
					...args,
					Admin: {
						connect: {
							id: adminId
						}
					},
					...(args.image
						? {
							image: {
								create: [
									...files.map((file) => {
										return {
											encoding: file.encoding,
											mimetype: file.mimetype,
											filename: file.filename
										};
									})
								]
							}
						}
						: false)
				}
			});

			return {
				success: true,
				message: "Product Created successfully..."
			};
		}
	} catch (e) {
		return {
			success: false,
			message: "Product did'nt Created ...",
			debugMessage: e.message
		};
	}
}

async function UpdateProduct(parent, args, context, info) {
	const { userId } = context;
	try {
		if (!userId) {
			throw new Error("You must be Logged in");
		}
		else {
			const ProductData = await prisma.products.findUnique({ where: { id: args.id } });

			const files = args.image
				? await Promise.all(
					args.image.map(async (file) => {
						const img = await saveImage(file);
						return img;
					})
				)
				: ProductData.image;

			await prisma.products.update({
				where: { id: args.id },
				data: {
					...args,
					...(args.image
						? {
							image: {
								create: [
									...files.map((file) => {
										return {
											encoding: file.encoding,
											mimetype: file.mimetype,
											filename: file.filename
										};
									})
								]
							}
						}
						: false)
				}
			});

			return {
				success: true,
				message: "Product Updated Successfully ..."
			};
		}
	} catch (e) {
		return {
			success: false,
			message: "Product did'nt Updated...",
			debugMessage: e.message
		};
	}
}

async function DeleteProduct(parent, args, context, info) {
	const { adminId, Role } = context;
	try {
		if (!adminId && Role !== "Admin") {
			throw new Error("You must be Logged in");
		}
		else if (adminId && Role == "Admin") {
			await prisma.purchaseOfProduct.deleteMany({
				where: { ProductId: args.id }
			});

			await prisma.saleOfProduct.deleteMany({
				where: { ProductId: args.id }
			});

			await prisma.products.delete({
				where: { id: args.id }
			});

			return {
				success: true,
				message: "Product Deleted Successfully ..."
			};

		}
	} catch (e) {
		return {
			success: false,
			message: "Product did'nt Deleted ...",
			debugMessage: e.message
		};
	}
}

module.exports = {
	CreateProduct,
	UpdateProduct,
	DeleteProduct
};
