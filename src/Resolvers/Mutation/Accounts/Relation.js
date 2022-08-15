const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function Admin(parent, args, context) {
  return prisma.accounts.findUnique({ where: { id: parent.id } }).Admin();
}
function User(parent, args, context) {
  return prisma.accounts.findUnique({ where: { id: parent.id } }).User();
}
module.exports = {
  Admin,
  User
};
