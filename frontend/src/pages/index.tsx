import React, { useState } from 'react';

interface ApiResponse {
  usersQuery: string;
  data: {
    content: string;
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
      setUserQuery('');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <>
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
