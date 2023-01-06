import MeetupList from '../components/meetups/MeetupList';
import getData from '../util/getData';

const HomePage = ({ meetups }) => {
  return <MeetupList meetups={meetups} />;
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
