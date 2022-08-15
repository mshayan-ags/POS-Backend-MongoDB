
const { QuantityTotal, CalculateVendorBalance } = require("../../../utils/Calculate");

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function CreatePurchase(parent, args, context, info) {
	try {
		// await prisma.purchaseOfProduct.deleteMany();
		// await prisma.purchase.deleteMany();

		const { userId, Role, adminId } = context;
		if (!userId) {
			throw new Error("You must be Logged in");
		}
		else {
			const Products = JSON.parse(JSON.stringify(args.Product));

			// Create Purchase
			const Purchase = await prisma.purchase.create({
				data: {
					discount: args.discount,
					BillNo: args.BillNo,
					Vendor: {
						connect: {
							id: args.vendorId
						}
					},
					Product: {
						create: [
							...Products.map((pro) => {
								return {
									Products: {
										connect: {
											id: pro.ProductId
										}
									},
									Admin: {
										connect: {
											id: adminId
										}
									},
									...(Role == "User"
										&& {
										User: {
											connect: {
												id: userId
											}
										},
									}),
									Quantity: pro.ProductQuantity,
									price: pro.Price
								};
							})
						]
					},
					Admin: {
						connect: {
							id: adminId
						}
					},
					...(Role == "User"
						&& {
						User: {
							connect: {
								id: userId
							}
						},
					}),
				}
			});

			// Calculate Total
			const Total = await QuantityTotal(Products);
			const Discount = Total - args.discount;
			
			await prisma.purchase.update({
				where: {
					id: Purchase.id
				},
				data: {
					total: Discount,
				}
			});

			if (args.AmountPayed > 0) {
				await prisma.payment.create({
					data: {
						BillNo: Purchase.id,
						Amount: args.AmountPayed,
						type: args.PaymentType,
						Purchase: { connect: { id: Purchase.id } },
						PaymentSent: { connect: { id: args.vendorId } },
						Admin: { connect: { id: adminId } },
						...(Role == "User" && {
							User: { connect: { id: userId } }
						})
					}
				});
			}
			CalculateVendorBalance(args.vendorId);

			return {
				success: true,
				message: "Purchase Created Successfully..."
			};
		}
	} catch (e) {
		return {
			success: false,
			message: "Purchase did'nt Created Successfully...",
			debugMessage: e.message
		};
	}
}

async function UpdatePurchase(parent, args, context, info) {
	try {
		// await prisma.purchaseOfProduct.deleteMany();
		// await prisma.purchase.deleteMany();

		const { Role, adminId } = context;

		if (!adminId && Role !== "Admin") {
			throw new Error("You must be Logged in");
		} else if (Role == "Admin" && adminId) {
			const Products = JSON.parse(JSON.stringify(args.Product));
			// Create Purchase
			const Purchase = await prisma.purchase.update({
				where: {
					id: args.id
				},
				data: {
					discount: args.discount,
					BillNo: args.BillNo,
					Vendor: {
						connect: {
							id: args.vendorId
						}
					}
				}
			});

			Products.map(async (pro) => {
				await prisma.purchaseOfProduct.update({
					where: {
						PurchaseId_ProductId: {
							PurchaseId: args.id,
							ProductId: pro.ProductId
						}
					},
					data: {
						Products: {
							connect: {
								id: pro.ProductId
							}
						},
						Quantity: pro.ProductQuantity,
						price: pro.Price
					}
				});
			});

			// Calculate Total
			const Total = await QuantityTotal(Products);

			const Discount = Total - args.discount;
			await prisma.purchase.update({
				where: {
					id: Purchase.id
				},
				data: {
					total: Discount,
				}
			});

			if (args.AmountPayed > 0) {
				await prisma.payment.create({
					data: {
						BillNo: Purchase.id,
						Amount: args.AmountPayed,
						type: args.PaymentType,
						Purchase: { connect: { id: Purchase.id } },
						PaymentSent: { connect: { id: args.vendorId } },
						Admin: { connect: { id: adminId } },
						...(Role == "User" && {
							User: { connect: { id: userId } }
						})
					}
				});
			}
			CalculateVendorBalance(args.vendorId);

			return {
				success: true,
				message: "Purchase Updated Successfully..."
			};
		} else {
			return {
				success: false,
				message: "Purchase did'nt Updated Successfully..."
			};
		}
	} catch (e) {
		return {
			success: false,
			message: "Purchase did'nt Updated Successfully...",
			debugMessage: e.message
		};
	}
}

async function DeletePurchase(parent, args, context, info) {
	try {
		// await prisma.purchaseOfProduct.deleteMany();
		// await prisma.purchase.deleteMany();

		const { adminId, Role } = context;
		if (!adminId && Role !== "Admin") {
			throw new Error("You must be Logged in");
		}
		// Create Purchase
		else if (Role == "Admin" && adminId) {
			const GetVendor = prisma.purchase
				.findUnique({
					where: {
						id: args.id
					}
				})
				.Vendor();
			const VendorId = (await GetVendor).id;

			const GetProduct = prisma.purchase
				.findUnique({
					where: {
						id: args.id
					}
				})
				.Product();
			const OBJ = { GetProduct: await GetProduct }

			await prisma.purchaseOfProduct.deleteMany({
				where: {
					PurchaseId: args.id
				}
			});

			await prisma.returnPurchase.deleteMany({
				where: {
					PurchaseId: args.id
				}
			});

			await prisma.purchase.delete({
				where: {
					id: args.id
				}
			});

			await prisma.payment.deleteMany({
				where: {
					BillNo: Purchase.id,
					PurchaseId: Purchase.id
				}
			})

			await QuantityTotal(OBJ.GetProduct);
			await CalculateVendorBalance(VendorId);

			return {
				success: true,
				message: "Purchase Deleted Successfully..."
			};
		} else {
			return {
				success: false,
				message: "Purchase Delete Only Allowed To Admin..."
			};
		}
	} catch (e) {
		return {
			success: false,
			message: "Purchase did'nt Deleted Successfully...",
			debugMessage: e.message
		};
	}
}

async function ReturnPurchase(parent, args, context, info) {
	try {
		// await prisma.purchaseOfProduct.deleteMany();
		// await prisma.purchase.deleteMany();

		const { Role, adminId, userId } = context;

		if (!adminId && Role !== "Admin") {
			throw new Error("You must be Logged in");
		} else if (Role == "Admin" && adminId) {
			const Products = JSON.parse(JSON.stringify(args.Product));
			const GetPurchase = await prisma.purchase.findUnique({
				where: {
					id: args.id
				}
			});
			// Create Purchase
			const Purchase = await prisma.purchase.update({
				where: {
					id: args.id
				},
				data: {
					discount: args.discount,
					BillNo: args.BillNo,
					Vendor: {
						connect: {
							id: args.vendorId
						}
					}
				}
			});

			Products.map(async (pro) => {
				await prisma.returnPurchase.create({
					data: {
						Products: {
							connect: {
								id: pro.ProductId
							}
						},
						Purchase: {
							connect: {
								id: args.id
							}
						},
						Quantity: pro.ProductQuantity,
						price: pro.Price,
						...(Role == "User"
							&& {
							User: {
								connect: {
									id: userId
								}
							},
						}),
					}
				});
			});

			// Calculate Total
			const OldTotal = GetPurchase.total;
			const Total = await QuantityTotal(Products);

			const Discount = OldTotal - Number(Total - args.discount);
		
			await prisma.purchase.update({
				where: {
					id: Purchase.id
				},
				data: {
					total: Discount,
				}
			});

			if (args.AmountPayed > 0) {
				await prisma.payment.create({
					data: {
						BillNo: Purchase.id,
						Amount: -Number(args.AmountPayed),
						type: args.PaymentType,
						Purchase: { connect: { id: Purchase.id } },
						PaymentSent: { connect: { id: args.vendorId } },
						Admin: { connect: { id: adminId } },
						...(Role == "User" && {
							User: { connect: { id: userId } }
						})
					}
				});
			}
			CalculateVendorBalance(args.vendorId);

			return {
				success: true,
				message: "Purchase Returned Successfully..."
			};
		} else {
			return {
				success: false,
				message: "Purchase did'nt Returned Successfully..."
			};
		}
	} catch (e) {
		return {
			success: false,
			message: "Purchase did'nt Updated Successfully...",
			debugMessage: e.message
		};
	}
}

module.exports = {
	CreatePurchase,
	UpdatePurchase,
	DeletePurchase,
	ReturnPurchase
};
