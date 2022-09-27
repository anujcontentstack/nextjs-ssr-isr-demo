import Cors from 'cors';
import {
  MongoClient,
  ServerApiVersion,
} from 'mongodb';

const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
});

export default async function handler(req, res) {
  // Run the middleware
  await runMiddleware(req, res, cors);

  // res.setHeader("cache-control", "max-age=3600")
  console.log(req.body);
  if (req.method === "POST") {
    console.log("In POSt handler");
    await saveVisitorCount(req.body);
    res.status(201).json(req.body);
  // } else if(req.method === "GET") {
  //   console.log("In GET Handler")
  //   const results = await getFeedbackVotes();
  //   res.status(200).json(results)
  } else {
    res.status(200).end();
  }
}

// async function getFeedbackVotes() {
//     //   const uri = process.env.MONGODB_URI;
//     const uri =
//       "mongodb://contentflyuser:mongodbDevPass321@ac-fq7yvo0-shard-00-00.1cerein.mongodb.net:27017,ac-fq7yvo0-shard-00-01.1cerein.mongodb.net:27017,ac-fq7yvo0-shard-00-02.1cerein.mongodb.net:27017/?ssl=true&replicaSet=atlas-1qydc3-shard-0&authSource=admin&retryWrites=true&w=majority";
  
//     const client = new MongoClient(uri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       serverApi: ServerApiVersion.v1,
//     });
  
//     const dbName = "csguide";
//     let results
//     try {
//       console.log("Before Connect");
//       await client.connect();
//       console.log("Connected");
//       const db = client.db(dbName);
//       const collection = db.collection("feedbacks");
  
//       // Perform CRUD operation ...
//       results = await collection.find({}).toArray();
//       console.log("Results", results)
//       console.log("DB Operation successful");
//     } catch (err) {
//       console.log("Error during db operation", err);
//     } finally {
//       await client.close();
//     }
//     return results;
//   }

async function saveVisitorCount(data) {
  //   const uri = process.env.MONGODB_URI;
  const uri =
    "mongodb://contentflyuser:mongodbDevPass321@ac-fq7yvo0-shard-00-00.1cerein.mongodb.net:27017,ac-fq7yvo0-shard-00-01.1cerein.mongodb.net:27017,ac-fq7yvo0-shard-00-02.1cerein.mongodb.net:27017/?ssl=true&replicaSet=atlas-1qydc3-shard-0&authSource=admin&retryWrites=true&w=majority";
  // "mongodb://contentflyuser:mongodbDevPass321@ac-qx70btz-shard-00-00.clv85y5.mongodb.net:27017,ac-qx70btz-shard-00-01.clv85y5.mongodb.net:27017,ac-qx70btz-shard-00-02.clv85y5.mongodb.net:27017/?ssl=true&replicaSet=atlas-342alk-shard-0&authSource=admin&retryWrites=true&w=majority";

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  const dbName = "csguide";

  try {
    console.log("Before Connect");
    await client.connect();
    console.log("Connected");
    const db = client.db(dbName);
    const collection = db.collection("feedbacks");

    // const data2 = {
    //   page: "Testaa page",
    //   path: "/abc/234aa",
    //   // timestamp: new Date().toISOString(),
    //   vote: 'downvote',
    // }

    // Perform CRUD operation ...
    // const result = await collection.insertOne(data2);
    const result = await collection.updateOne({ page: data.page }, {
      $set: { page: data.page },  $inc: { 'visitorCount': 1 }
    }, {upsert: true} )                                                                                                                                           
    console.log("DB Operation successful");
  } catch (err) {
    console.log("Error during db operation", err);
  } finally {
    await client.close();
  }
}

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}
