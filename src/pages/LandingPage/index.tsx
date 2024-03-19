import { Outlet, useNavigate } from 'react-router-dom';
import './index.css';
import { useState } from 'react';

const Background = 'https://i.postimg.cc/g0qCs0Mg/login_page.png';
const CheckboxDisable = 'https://i.postimg.cc/9MhkqjCy/check_unclick.png';
const CheckboxEnable = 'https://i.postimg.cc/q7nYR7Vk/check_click.png';
const LoginImage = 'https://i.postimg.cc/KjcsJrKz/login_btn.png';

const LandingPage = () => {
  const navigate = useNavigate();
  const [checkImage, setCheckImage] = useState(false);
  return (
    <div
      className="flex flex-col 2xl:w-[1602px] xl:w-[1200px] w-[657px] 2xl:h-[906px] xl:h-[674px] h-[371px] bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url(${Background})`,
      }}
    >
      <div className="flex flex-col justify-center gap-[61px] mt-[287px] px-[442px]">
        <input className="ml-[243px] pl-2 h-[62px] text-[32px] text-white rounded-xl border-2 border-black bg-[#0C0142]" />
        <input className="ml-[243px] pl-2 h-[62px] text-[32px] text-white rounded-xl border-2 border-black bg-[#0C0142]" />
      </div>
      <div className="mt-[190px] pl-[552px]">
        <div
          onClick={() => {
            setCheckImage(!checkImage);
          }}
          className="w-[59px] h-[59px] cursor-pointer hover:brightness-110 "
          style={{
            backgroundImage: checkImage
              ? `url(${CheckboxDisable})`
              : `url(${CheckboxEnable})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        />
      </div>
      <div className="mt-[77px] ml-[28px] justify-end">
        <button
          type="button"
          onClick={() => navigate('/safari')}
          className="text-white w-[348px] h-[97px] rounded-lg text-sm focus:outline-none bg-no-repeat border-none"
          style={{
            background: `url(${LoginImage})`,
          }}
        >
        </button>
      </div>
      {/* <Outlet /> */}
    </div>
  );
};
export default LandingPage;
