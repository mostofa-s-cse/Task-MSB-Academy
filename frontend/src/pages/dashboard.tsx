import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/reducers';
import { fetchChatHistoryStart, fetchChatHistorySuccess, fetchChatHistoryFailure } from '../store/chatHistorySlice';

const DashboardPage: React.FC = () => {
  const chatHistory = useSelector((state: RootState) => state.chatHistory.data);
  // console.log('chatHistory',chatHistory);
  const totalPages = useSelector((state: RootState) => state.chatHistory.totalPages);
  const loading = useSelector((state: RootState) => state.chatHistory.loading);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    dispatch(fetchChatHistoryStart());
    try {
      const response = await axios.get(`http://localhost:5000/api/chatHistory?page=${currentPage}`);
     console.log(dispatch(fetchChatHistorySuccess(response.data)))
    } catch (error) {
      console.error('Error fetching data:', error);
      dispatch(fetchChatHistoryFailure());
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
      <div className="align-middle text-center text-lg rounded-tl-lg rounded-tr-lg inline-block w-full py-4 overflow-hidden bg-white shadow-lg px-12">
        <h1>Chat History</h1>
      </div>
      <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">User Query</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">OpenAI Response</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {chatHistory.map((chat, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">{chat.usersQuery}</td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">{chat.openaiResponse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="flex justify-center mt-4 work-sans mb-2">
          <nav className="relative z-0 inline-flex shadow-sm">
            <div>
              <button 
                className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium 
                ${currentPage === 1 ? 'cursor-not-allowed' : 'hover:text-gray-400'} 
                ${currentPage === 1 ? 'text-gray-500' : 'text-gray-900'}`} 
                onClick={handlePrevPage} 
                disabled={currentPage === 1} 
                aria-label="Previous"
              >
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div>
              {Array.from(Array(totalPages).keys()).map((pageNumber) => (
                <button 
                  key={pageNumber} 
                  className={`-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium 
                  ${pageNumber + 1 === currentPage ? 'text-blue-700' : 'text-blue-600'} 
                  ${pageNumber + 1 === currentPage ? 'hover:text-blue-700' : 'hover:text-blue-600'} 
                  focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-tertiary active:text-gray-700 transition ease-in-out duration-150`} 
                  onClick={() => setCurrentPage(pageNumber + 1)}
                >
                  {pageNumber + 1}
                </button>
              ))}
            </div>
            <div>
              <button 
                className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium 
                ${currentPage === totalPages ? 'cursor-not-allowed' : 'hover:text-gray-400'} 
                ${currentPage === totalPages ? 'text-gray-500' : 'text-gray-900'}`} 
                onClick={handleNextPage} 
                disabled={currentPage === totalPages} 
                aria-label="Next"
              >
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10l-3.293-3.293a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
