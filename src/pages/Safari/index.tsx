import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Slot from '../../component/Slots';

import Background from '../../assets/background.png';
import MinusImage from '../../assets/minus.png';
import PlusImage from '../../assets/plus.png';
import AutoStartImage from '../../assets/auto_start.png';
import AutoStopImage from '../../assets/autostop.png';
import SpinImage from '../../assets/spin.png';
import StopSpinImage from '../../assets/stop.png';
import MenuBtnImage from '../../assets/menubar/menu_btn.png';
import MenuImage from '../../assets/menubar/menu.png';
import MenuBackImage from '../../assets/menubar/menu_back.png';
import MenuHelpImage from '../../assets/menubar/menu_help.png';
import MenuAudioOffImage from '../../assets/menubar/menu_audio_off.png';
import MenuShakeImage from '../../assets/menubar/menu_shake.png';
import MenuLogoutImage from '../../assets/menubar/menu_logout.png';
import SideLeft1 from '../../assets/sider/left-1.png';
import SideLeft2 from '../../assets/sider/left-2.png';
import SideLeft3 from '../../assets/sider/left-3.png';
import SideLeft4 from '../../assets/sider/left-4.png';
import SideLeft5 from '../../assets/sider/left-5.png';
import SideLeft10 from '../../assets/sider/left-10.png';
import SideLeft11 from '../../assets/sider/left-11.png';
import SideLeft12 from '../../assets/sider/left-12.png';
import SideLeft13 from '../../assets/sider/left-13.png';
import SideRight1 from '../../assets/sider/right-1.png';
import SideRight2 from '../../assets/sider/right-2.png';
import SideRight3 from '../../assets/sider/right-3.png';
import SideRight6 from '../../assets/sider/right-6.png';
import SideRight7 from '../../assets/sider/right-7.png';
import SideRight8 from '../../assets/sider/right-8.png';
import SideRight9 from '../../assets/sider/right-9.png';
import SideRight14 from '../../assets/sider/right-14.png';
import SideRight15 from '../../assets/sider/right-15.png';

import './index.css';

const Safari = () => {
  const navigate = useNavigate();
  const [line, setLine] = useState(1);
  const [betValue, setBetValue] = useState(0.01);
  const [isSpinning, setIsSpinning] = useState(false);
  const [sideLeft, setSideLeft] = useState(SideLeft1);
  const [sideRight, setSideRight] = useState(SideRight1);
  // const [isSpinClicked, setIsSpinClicked] = useState(false);

  useEffect(() => {
    switch (line) {
      case 1:
        setSideLeft(SideLeft1);
        setSideRight(SideRight1);
        break;
      case 2:
        setSideLeft(SideLeft2);
        setSideRight(SideRight2);
        break;
      case 3:
        setSideLeft(SideLeft3);
        setSideRight(SideRight3);
        break;
      case 4:
        setSideLeft(SideLeft4);
        break;
      case 5:
        setSideLeft(SideLeft5);
        break;
      case 6:
        setSideRight(SideRight6);
        break;
      case 7:
        setSideRight(SideRight7);
        break;
      case 8:
        setSideRight(SideRight8);
        break;
      case 9:
        setSideRight(SideRight9);
        break;
      case 10:
        setSideLeft(SideLeft10);
        break;
      case 11:
        setSideLeft(SideLeft11);
        break;
      case 12:
        setSideLeft(SideLeft12);
        break;
      case 13:
        setSideLeft(SideLeft13);
        break;
      case 14:
        setSideRight(SideRight14);
        break;
      case 15:
        setSideRight(SideRight15);
        break;
      default:
        setSideLeft(SideLeft1);
        setSideRight(SideRight1);
        break;
    }
  }, [line]);

  const handleIncrementLine = () => {
    setLine((prevLine) => (prevLine < 15 ? prevLine + 1 : 1));
  };

  const handleDecrementLine = () => {
    setLine((prevLine) => (prevLine > 1 ? prevLine - 1 : 15));
  };
  const handleIncrementBet = () => {
    setBetValue((prevBetValue) =>
      prevBetValue < 15 ? prevBetValue * line : 1
    );
  };

  const handleDecrementBet = () => {
    setBetValue((prevBetValue) =>
      prevBetValue > 1 ? prevBetValue / line : 15
    );
  };
  const handleSpinClick = () => {
    setIsSpinning(true);
  };

  const handleSpinEnd = () => {
    setTimeout(() => {
      setIsSpinning(false);
    }, 1400);
    // setIsSpinning(true);
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col 2xl:w-[1612px] h-[100vh] xl:w-[1200px] lg:w-[960px] md:w-[700px] sm:w-[540px] bg-no-repeat inset-0 2xl:h-[906px] xl:h-[576px] lg:h-[462px] md:h-[335px] sm:h-[257px] bg-cover rotate"
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
      }}
    >
      {/* <div
        className=" "
      > */}
        <div className="flex justify-between h-[50px]">
          <div className="flex mt-[4px]">
            <p className="text-white text-center font-extrabold text-[24px] w-[493px] pl-[275px]">
              864.30
            </p>
            <p className="text-white font-extrabold text-center text-[24px] pl-[157px]  w-[450px]">
              5864.30
            </p>
            <p className="text-white font-extrabold text-[24px] text-center pl-[150px] w-[365px]">
              864.30
            </p>
          </div>
          <div>
            <button
              onClick={toggleDrawer}
              className="w-[71px] h-[91px] focus:outline-none hover:brightness-125 bg-no-repeat bg-center border-none p-0"
              style={{ backgroundImage: `url(${MenuBtnImage})` }}
            ></button>
            {isOpen && (
              <div
                className="fixed inset-0 z-20 bg-black bg-opacity-50"
                onClick={toggleDrawer}
              ></div>
            )}
            <div
              className={`fixed top-0 z-40 w-[326px] h-[906px] shadow-lg transform ease-in-out duration-300 ${
                isOpen
                  ? 'translate-x-0 right-[153px]'
                  : 'translate-x-full right-[180px] hidden'
              }`}
              style={{ backgroundImage: `url(${MenuImage})` }}
            >
              {/* Drawer content here */}
              <div className="flex flex-col gap-[37.5px] pt-[162px] px-[21px] ">
                <button
                  onClick={() => navigate('/')}
                  className="h-[83px] w-[286px] focus:outline-none hover:brightness-110 bg-no-repeat bg-center border-none"
                  style={{ backgroundImage: `url(${MenuBackImage})` }}
                ></button>
                <button
                  onClick={() => navigate('/safari/help')}
                  className="h-[83px] w-[286px] focus:outline-none hover:brightness-110 bg-no-repeat bg-center border-none"
                  style={{ backgroundImage: `url(${MenuHelpImage})` }}
                ></button>
                <button
                  className="h-[83px] w-[286px] focus:outline-none hover:brightness-110 bg-no-repeat bg-center border-none"
                  style={{ backgroundImage: `url(${MenuAudioOffImage})` }}
                ></button>
                <button
                  className="h-[83px] w-[286px] focus:outline-none hover:brightness-110 bg-no-repeat bg-center border-none"
                  style={{ backgroundImage: `url(${MenuShakeImage})` }}
                ></button>
                <button
                  className="h-[83px] w-[286px] focus:outline-none hover:brightness-110 bg-no-repeat bg-center border-none"
                  style={{ backgroundImage: `url(${MenuLogoutImage})` }}
                ></button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex pt-[102px] gap-[19.2px]">
          <div className="flex gap-[3px]">
            <div
              className="w-[64px] h-[628px] mt-[-11px]"
              style={{
                backgroundImage: `url(${sideLeft})`,
              }}
            ></div>
            <Slot count={9} isSpinning={isSpinning} onSpinEnd={handleSpinEnd} />
          </div>
          <Slot count={12} isSpinning={isSpinning} onSpinEnd={handleSpinEnd} />
          <Slot count={15} isSpinning={isSpinning} onSpinEnd={handleSpinEnd} />
          <Slot count={18} isSpinning={isSpinning} onSpinEnd={handleSpinEnd} />
          <div className="flex gap-[4px]">
            <Slot
              count={21}
              isSpinning={isSpinning}
              onSpinEnd={handleSpinEnd}
            />
            <div
              className="w-[64px] h-[628px] mt-[-12px]"
              style={{
                backgroundImage: `url(${sideRight})`,
              }}
            ></div>
          </div>
        </div>
        <div className="flex mt-[2px]">
          <div className="w-[374px]">
            <p className="gradient-text pt-[55px] bg-[#300E0C] text-[36px] font-bold">
              182354324
            </p>
          </div>
          <div className="w-[373px]">
            <p className="gradient-text  text-[36px] font-bold pl-[76px] mt-[-4px]">
              {line}
            </p>
            <div className="flex mt-[2px]">
              <button
                type="submit"
                onClick={handleDecrementLine}
                className="h-[81px] w-[173px] focus:outline-none hover:brightness-125 bg-no-repeat bg-center border-none"
                style={{
                  backgroundImage: isSpinning ? '' : `url(${MinusImage})`,
                }}
              ></button>
              <button
                type="submit"
                onClick={handleIncrementLine}
                className="h-[81px] w-[172px] focus:outline-none hover:brightness-125 bg-no-repeat bg-center border-none ml-[-2px]"
                style={{
                  backgroundImage: isSpinning ? '' : `url(${PlusImage})`,
                }}
              ></button>
            </div>
          </div>
          <div className="w-[373px]">
            <p className="gradient-text text-[36px] font-bold pl-[40px] mt-[-4px]">
              {(betValue * line).toFixed(2)}
            </p>
            <div className="flex mt-[2px] ml-[7px]">
              <button
                type="submit"
                onClick={handleDecrementBet}
                className="h-[81px] w-[172px] focus:outline-none hover:brightness-125 bg-no-repeat bg-center border-none"
                style={{
                  backgroundImage: isSpinning ? '' : `url(${MinusImage})`,
                }}
              ></button>
              <button
                type="submit"
                // onMouseEnter={handleIncrementBet}
                onClick={handleIncrementBet}
                className="h-[81px] w-[172px] focus:outline-none hover:brightness-125 bg-no-repeat bg-center border-none ml-[-2px]"
                style={{
                  backgroundImage: isSpinning ? '' : `url(${PlusImage})`,
                }}
              ></button>
            </div>
          </div>
          <div className="w-auto">
            <p className="gradient-text text-[36px] font-bold pl-[70px] mt-[-4px]">
              {(betValue * line).toFixed(2)}
            </p>
            <div className="flex gap-[6px] mt-[2px] ml-[7px]">
              <button
                type="submit"
                // onClick={handleDecrementLine}
                onClick={handleSpinClick}
                className="h-[81px] w-[243px] focus:outline-none hover:brightness-125 bg-no-repeat bg-center border-none"
                style={{
                  backgroundImage: isSpinning
                    ? `url(${AutoStopImage})`
                    : `url(${AutoStartImage})`,
                }}
              ></button>
              <button
                type="submit"
                onClick={handleSpinClick}
                className="focus:outline-none hover:brightness-125 border-none w-[234px] h-[79px] bg-opacity-0 aspect-auto object-cover"
                style={{
                  backgroundImage: isSpinning
                    ? `url(${StopSpinImage})`
                    : `url(${SpinImage})`,
                }}
              ></button>
            </div>
          </div>
        </div>
      </div>
    // </div>
  );
};

export default Safari;
