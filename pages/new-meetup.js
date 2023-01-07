import { useRouter } from 'next/router';

import Head from 'next/head';
import NewMeetupForm from '../components/meetups/NewMeetupForm';

const NewMeetup = () => {
  const router = useRouter();

  const addMeetupHandler = async enteredMeetupData => {
    await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(enteredMeetupData),
      headers: { 'Content-Type': 'application/json' },
    });

    await router.push('/');
  };

  return (
    <>
      <Head>
        <title>Add a New Meetup</title>
        <meta
          name="description"
          content="Add your own meetups and create amazing networking opportunities."
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  );
};

export default NewMeetup;
