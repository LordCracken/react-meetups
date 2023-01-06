import getData from '../../util/getData';

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    const { title, image, address, description } = data;

    const [client, meetupsCollection] = await getData();

    const result = await meetupsCollection.insertOne(data);
    console.log(result);

    await client.close();

    res.status(201).json({ message: 'Meetup inserted!' });
  }
}

export default handler;
