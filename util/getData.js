import { MongoClient } from 'mongodb';

const username = process.env.NEXT_PUBLIC_MONGO_USER;
const password = process.env.NEXT_PUBLIC_MONGO_PASSWORD;

const getData = async () => {
  const client = await MongoClient.connect(
    `mongodb+srv://${username}:${password}@cluster0.si65zu3.mongodb.net/meetups?retryWrites=true&w=majority`,
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  return [client, meetupsCollection];
};

export default getData;
