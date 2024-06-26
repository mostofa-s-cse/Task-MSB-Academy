import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../store/store'; // Import your Redux store
import Head from 'next/head';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <title>ChatGPT Task</title> {/* Set your project title here */}
        {/* Add any other meta tags, link tags, etc. */}
      </Head>
      <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
        <a href='/' className="font-semibold text-xl tracking-tight">ChatGPT</a>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
        
        </div>
        <div>
        <a href="/dashboard" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">All Chat History</a>
        </div>
      </div>
    </nav>
      <Component {...pageProps} />
    </Provider>
  );
}