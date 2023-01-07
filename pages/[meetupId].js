import { ObjectId } from 'mongodb';

import Head from 'next/head';
import MeetupDetail from '../components/meetups/MeetupDetail';

import getData from '../util/getData';

const MeetupDetails = ({ meetupData }) => {
  const { image, title, address, description } = meetupData;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <MeetupDetail image={image} title={title} address={address} description={description} />
    </>
  );
};

export async function getStaticPaths() {
  const [client, meetupsCollection] = await getData();

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  await client.close();

  return {
    fallback: false,
    paths: meetups.map(meetup => ({ params: { meetupId: meetup._id.toString() } })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const [client, meetupsCollection] = await getData();

  const selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });

  await client.close();

  return {
    props: {
      meetupData: {
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
        id: selectedMeetup._id.toString(),
      },
    },
  };
}

export default MeetupDetails;
