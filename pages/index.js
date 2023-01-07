import Head from 'next/head';
import MeetupList from '../components/meetups/MeetupList';

import getData from '../util/getData';

const HomePage = ({ meetups }) => {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Browse a huge list of highly active React meetups!" />
      </Head>
      <MeetupList meetups={meetups} />
    </>
  );
};

export async function getStaticProps() {
  const [client, meetupsCollection] = await getData();
  console.log(meetupsCollection);

  const meetups = await meetupsCollection.find().toArray();

  await client.close();

  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
