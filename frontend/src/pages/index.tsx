import React, { useState } from 'react';

interface ApiResponse {
  usersQuery: string;
  data: {
    content: string;
    // Add other properties if needed
  };
}

const HomePage: React.FC = () => {
  const [userQuery, setUserQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<ApiResponse | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usersQuery: userQuery }),
      });
      const data = await response.json();
      console.log(data);
      setResponse(data);
      setUserQuery(''); // Reset the input field
    } catch (error) {
      console.error('Error:', error);
      // Handle error if needed
    } finally {
      setLoading(false);
    }
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

    <div className="mt-4 flex flex-col justify-center items-center">
      <div className="p-8 max-w-lg overflow-hidden">
        {loading && <p className="mt-4">Loading...</p>}
        {!loading && response && (
          <div className='mt-4'>
            <h1 className='mb-2 text-lg text-center font-bold text-green-700 underline'>OpenAI Response</h1>
            <p> <span className='font-bold'>User Query:</span>  {response.usersQuery}</p>
            <p> <span className='font-bold'>Response Content:</span>  {response.data.content}</p>
          </div>
        )}
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
