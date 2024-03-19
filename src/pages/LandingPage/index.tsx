import { useNavigate } from 'react-router-dom';
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
      <div className="flex flex-col justify-center 2xl:gap-[61px] xl:gap-[39px] gap-[26px] 2xl:mt-[287px] 2xl:px-[442px] xl:mt-[211px] xl:px-[336px] mt-[118px] px-[181px]">
        <input className="2xl:ml-[243px] xl:ml-[172px] ml-[100px] pl-2 2xl:h-[62px] xl:h-[52px] h-[24px] xl:text-[32px] text-white xl:rounded-xl rounded-md border-2 border-black bg-[#0C0142]" />
        <input className="2xl:ml-[243px] xl:ml-[172px] ml-[100px] pl-2 2xl:h-[62px] xl:h-[52px] h-[24px] xl:text-[32px] text-white xl:rounded-xl rounded-md border-2 border-black bg-[#0C0142]" />
      </div>
      <div className="2xl:mt-[190px] 2xl:pl-[552px] xl:mt-[138px] xl:pl-[410px] mt-[77px] pl-[224px]">
        <div
          onClick={() => {
            setCheckImage(!checkImage);
          }}
          className="2xl:w-[59px] 2xl:h-[59px] xl:w-[44px] xl:h-[44px] w-[26px] h-[26px] cursor-pointer hover:brightness-110 "
          style={{
            backgroundImage: checkImage
              ? `url(${CheckboxDisable})`
              : `url(${CheckboxEnable})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        />
      </div>
      <div className="2xl:mt-[77px] 2xl:ml-[28px] xl:mt-[57px] xl:ml-[12px] mt-[31px] ml-[9px] justify-end">
        <button
          type="button"
          onClick={() => navigate('/safari')}
          className="text-white 2xl:w-[348px] 2xl:h-[97px] xl:w-[260px] xl:h-[72px] w-[140px] h-[40px] hover:brightness-110 bg-no-repeat border-none bg-cover"
          style={{
            backgroundImage: `url(${LoginImage})`,
          }}
        ></button>
      </div>
      {/* <Outlet /> */}
    </div>
  );
};
export default LandingPage;
