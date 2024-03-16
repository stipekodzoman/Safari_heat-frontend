import { Outlet, useNavigate } from 'react-router-dom';
const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => navigate('/safari')}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none "
      >
        Safari
      </button>
      <Outlet />
    </div>
  );
};
export default LandingPage;
