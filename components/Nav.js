import Link from 'next/link';
import { useState } from 'react';
import { fetcher } from '../lib/api';
import { setToken, unsetToken } from '../lib/auth';
import { useUser } from '../lib/authContext';
import { HiMenuAlt4, HiX } from 'react-icons/hi'

const Nav = () => {
  const [data, setData] = useState({
    identifier: '',
    password: '',
  });

  const { user, loading } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const responseData = await fetcher(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier: data.identifier,
          password: data.password,
        }),
      }
    );
    setToken(responseData);
  };

  const logout = () => {
    unsetToken();
    setToggle(false);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const [toggle, setToggle] = useState(false);
  return (
    <nav className='w-screen flex justify-between items-center px-8 py-4 bg-purple-200/25 backdrop-blur-md border-2 border-white/10 mb-20 z-20 shadow-md'>
      <div className='flex justify-start items-center'>
        <img className='w-[160px] h-[50px] ' src="/vercel.svg" alt="" />
      </div>
      <ul className='flex basis-1/2 justify-center items-center'>
        <Link href={'/'}>
        <li className='hidden mx-4 uppercase cursor-pointer flex-col md:flex justify-center items-center group'>
          <div className='h-2 w-2 rounded-full bg-transparent mb-1 group-hover:bg-slate-800' />
          <a className='text-gray-700 font-normal transition-all duration-300 ease-in-out flex-col  hover:text-purple-400'>Home</a>
        </li>
        </Link>
        <Link href='/films'>
        <li className='hidden mx-4 uppercase cursor-pointer flex-col md:flex justify-center items-center group'>
          <div className='h-2 w-2 rounded-full bg-transparent mb-1 group-hover:bg-slate-800' />
          <a className='text-gray-700 font-normal transition-all duration-300 ease-in-out flex-col  hover:text-purple-400'>Films</a>
        </li>
        </Link>
        {!loading &&
          (!user ? (
        <Link href='/register'>
        <li className='hidden mx-4 uppercase cursor-pointer flex-col md:flex justify-center items-center group'>
          <div className='h-2 w-2 rounded-full bg-transparent mb-1 group-hover:bg-slate-800' />
          <a className='text-gray-700 font-normal transition-all duration-300 ease-in-out flex-col  hover:text-purple-400'>Register</a>
        </li>
        </Link>
        ) : (
          ''
        ))}
        {!loading &&
          (user ? (
            <>
            <Link href='/profile'>
              <li className='hidden mx-4 uppercase cursor-pointer flex-col md:flex justify-center items-center group'>
                <div className='h-2 w-2 rounded-full bg-transparent mb-1 group-hover:bg-slate-800' />
                <a className='text-gray-700 font-normal transition-all duration-300 ease-in-out flex-col  hover:text-purple-400'>Profile</a>
              </li>
              </Link>
              <li className='hidden mx-4 uppercase cursor-pointer flex-col md:flex justify-center items-center group'>
                <div className='h-2 w-2 rounded-full bg-transparent mb-1 group-hover:bg-slate-800' />
                <a onClick={logout} className='text-gray-700 font-normal transition-all duration-300 ease-in-out flex-col  hover:text-purple-400'>Logout</a>
              </li>
            </>
          ) : (
            ''
          ))}
      </ul>
      {!loading &&
        (!user ? (
          <div>
            <li className=' justify-center items-center hidden md:flex'>
              <form onSubmit={handleSubmit} className="form-inline flex ">
                <input
                  type="text"
                  name="identifier"
                  onChange={handleChange}
                  placeholder="Username"
                  className="md:p-2 form-input py-2 rounded mx-2"
                  required
                />
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  placeholder="Password"
                  className="md:p-2 form-input py-2 rounded mx-2"
                  required
                />

                <button
                  className="md:p-2 rounded-md py-2  text-white bg-orange-500 p-2 hover:bg-black hover:text-white"
                  type="submit"
                >
                  Login
                </button>
              </form>
            </li>
          </div>
        ) : (
          ''
        ))}
      <div className='w-9 h-9  rounded-full relative bg-black flex justify-center items-center md:hidden'>
        <HiMenuAlt4 className='text-white w-[100%] h-[100%] cursor-pointer' onClick={() => setToggle(true)} />
        {toggle && (

          <div className='fixed w-[80%] h-screen top-0 bottom-0 right-0 z-20 bg-white  bg-pack-train shadow-lg bg-clip-border'
            whileInView={{ x: [100, 0] }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
          >
            <HiX className='w-[35px] h-[35px] my-2 mx-4 cursor-pointer' onClick={() => setToggle(false)} />
            <ul className='m-0 p-0 h-full w-full flex flex-col justify-start items-center'>
              <Link href='/'>
                <li className='list-none uppercase m-4' >
                  <a className='text-gray-600 font-normal transition-all duration-300 ease-in-out flex-col  hover:text-purple-400 cursor-pointer' 
                    onClick={() => setToggle(false)}
                  >Home</a>
                </li>
                </Link>
                <Link href='/films'>
                <li className='list-none uppercase m-4' >
                  <a className='text-gray-600 font-normal transition-all duration-300 ease-in-out flex-col  hover:text-purple-400 cursor-pointer' 
                    onClick={() => setToggle(false)}
                  >Films</a>
                </li>
                </Link>
                <Link href='/register'>
                <li className='list-none uppercase m-4' >
                  <a className='text-gray-600 font-normal transition-all duration-300 ease-in-out flex-col  hover:text-purple-400 cursor-pointer' 
                    onClick={() => setToggle(false)}
                  >Register</a>
                </li>
                </Link>
                
                <li className='list-none uppercase m-4' >
                  <a className='text-gray-600 font-normal transition-all duration-300 ease-in-out flex-col  hover:text-purple-400 cursor-pointer' 
                    onClick={logout}
                  >Logout</a>
                </li>
                
              <form onSubmit={handleSubmit} className="form-inline flex flex-col gap-3">
                <input
                  type="text"
                  name="identifier"
                  onChange={handleChange}
                  placeholder="Username"
                  className="md:p-2 form-input py-2 rounded mx-2"
                  required
                />
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  placeholder="Password"
                  className="md:p-2 form-input py-2 rounded mx-2"
                  required
                />

                <button
                  className="md:p-2 rounded-md py-2  text-white bg-orange-500 p-2 hover:bg-black hover:text-white"
                  type="submit"
                >
                  Login
                </button>
              </form>
            </ul>



          </div>

        )
        }
      </div>
    </nav>
  );
};

export default Nav;