import React, { useState } from 'react';

const HomePage: React.FC = () => {
  const [userQuery, setUserQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = () => {
    setLoading(true);
    // Simulating a loading delay of 2 seconds
    setTimeout(() => {
      setLoading(false);
      console.log("Query submitted:", userQuery);
      // Handle the user's query here
    }, 2000);
  };

  return (
    <>
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
  <div className="flex items-center flex-shrink-0 text-white mr-6">
    <span className="font-semibold text-xl tracking-tight">ChatGPT</span>
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

    <div className="flex flex-col justify-center items-center">
    
  <div className="">
  <h1 className='mb-2'>Openai Response</h1>
    {loading && <p className="mt-4">Loading...</p>}
  </div>
  <div className="textbox fixed bottom-0 mb-5">
    <div className="mb-4 w-80">
      <textarea
        rows={3}
        value={userQuery}
        onChange={(e) => setUserQuery(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
        placeholder="Enter your query..."
      />
    </div>
    <button
      onClick={handleSubmit}
      disabled={!userQuery || loading}
      className="bg-teal-500 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
    >
      {loading ? 'Loading...' : 'Submit'}
    </button>
  </div>
</div>
</>
  );
};

export default HomePage;

