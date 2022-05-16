import Layout from '../components/Layout';
import { useFetchUser } from '../lib/authContext';

const Home = () => {
  const { user, loading } = useFetchUser();
  return (
    <Layout user={user}>
      <h1 className="text-5xl md:text-5xl font-extrabold leading-tighter mb-8 text-center ">
        Strapi and Next JS{' '}
        <span className="bg-clip-text text-transparent bg-gradient-to-r text-center from-blue-500 to-teal-400">
          Film Reviews
        </span>
      </h1>
      <p className="py-4 text-center">
        Sample website created by {' '}
        <a
          className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-teal-400 hover:bg-gradient-to-r hover:from-teal-400 hover:to-blue-500"
          href="https://google.com"
        >
          Puskar Ghimire.
        </a>{' '}
        
        
      </p>
    </Layout>
  );
};

export default Home;