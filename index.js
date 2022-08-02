const employees = require("./employee.json");
const mongoClient = require('mongodb').MongoClient;

const connectionString = 'mongodb://127.0.0.1:27017';

mongoClient.connect(connectionString, async (err, db) => {
    if(err) {
        console.error("Error while connecting", err);
        return;
    }
    console.log("Connected to Database")
    const database = db.db("humanresource")
    console.log(database);

    const result = await database.collection("employee").insertMany(employees);
    console.log(result);

    const tofind = await database.collection("employee").find().toArray();
    console.log(tofind);

    const findsalary = await database.collection("employee").find({"salary": {$gt: "30000"}}).toArray();
    console.log(findsalary);

    const experince = await database.collection("employee").find({"overallExp": {$gt: "1"}}).toArray();
    console.log(experince);

    const conditions = await database.collection("employee").find({$and: [{"yearGrad": {$gt: "2015"}}, {"overallExp": {$gt: "1"}}]}).toArray();
    console.log(conditions);

    const updateSalary = await database.collection("employee").updateMany({"salary": {$gt: "30000"}}, {$set: {"salary": "28000"}});
    console.log(updateSalary);

    const deletelastcomany = await database.collection("employee").deleteMany({"lastCompany": "Y"});
    console.log(deletelastcomany);
})