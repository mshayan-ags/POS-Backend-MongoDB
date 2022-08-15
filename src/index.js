const { ApolloServer } = require("apollo-server-express");
const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");
const { getUserId } = require("./utils");
const http = require("http");
const { GraphQLUpload } = require("graphql-upload");
const Express = require("express");
const resolvers = require("./Resolvers/index.js");
const { GetImage } = require("./Express/file");
const { sendMail } = require("./utils/Mail");

process
	.on("SIGTERM", shutdown("SIGTERM"))
	.on("SIGINT", shutdown("SIGINT"))
	.on("uncaughtException", shutdown("uncaughtException"));

function shutdown(signal) {
	return (err) => {
		console.log(`${signal}...`);
		if (err) console.error(err.stack || err);
		setTimeout(() => {
			process.exit(err ? 1 : 0);
		}, 5000).unref();
	};
}
const app = Express();
const prisma = new PrismaClient();

app.use(GetImage);

// async function Test() {
	
// 	console.log(await sendMail({Body:"<h1>Test</h1>",Subject:"Test",ToEmail:"mshayan.ags@gmail.com"}),"Test")
// }

// Test()

const server = new ApolloServer({
	typeDefs: fs.readFileSync(path.join(__dirname, "Schema.graphql"), "utf8"),
	resolvers,
	Upload: GraphQLUpload,
	uploads: { maxFileSize: 1024 * 1024 * 1024 * 1024 * 15, maxFiles: 30 },
	introspection: true,
	playground: true,
	context: ({ req }) => {
		return {
			...req,
			// prisma: new PrismaClient({ datasources: { db: { url: `mongodb+srv://POS:POSPASSWORD@cluster0.ondyo.mongodb.net/${req && req.headers.authorization ? getUserId(req).adminId : "POS"}?retryWrites=true&w=majority` } } }),
			prisma,
			userId: req && req.headers.authorization && getUserId(req).userId,
			Role: req && req.headers.authorization && getUserId(req).Role,
			adminId: req && req.headers.authorization && getUserId(req).adminId
		};
	}
});

server.applyMiddleware({ app, path: "/graphql" });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

const port = process.env.PORT || 4000;

httpServer.listen(port, () => {
	console.log(`🚀 Apollo Server on http://localhost:${port}${server.graphqlPath}`);
});
