import { Outlet, useNavigate } from 'react-router-dom';
import './index.css';

const Background = 'https://i.postimg.cc/MG85kfDT/background.png';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="">
      {/* <img
        className={`h-full w-full block bg-no-repeat`}
        style={{
          backgroundImage: `url(${Background})`,
        }}
        // alt="background"
      /> */}
      <div className='justify-end'>
        <button
          type="button"
          onClick={() => navigate('/safari')}
          className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none "
        >
          Safari
        </button>
      </div>
      <Outlet />
    </div>
  );
};
export default LandingPage;
