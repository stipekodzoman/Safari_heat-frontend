import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import Slot from '../../component/Slots';
import Background from '../../assets/background.png';
import MinuImage from '../../assets/minus.png';
import PlusImage from '../../assets/plus.png';
import AutoStartImage from '../../assets/auto_start.png'
import HoverPlusImage from '../../assets/hover_plus.png';
import './index.css';

const Safari = () => {
  const [line, setLine] = useState(1);
  const [betValue, setBetValue] = useState(0.01);

  const [isSpinning, setIsSpinning] = useState(false);

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
    }, 2000);
    // setIsSpinning(true);
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    // <div className="flex flex-col w-[100vw] h-[100vh] ">
    <div className="min-w-[540px]">
      <div className="flex flex-col 2xl:w-[1612px] h-[100vh] xl:w-[1200px] lg:w-[960px] md:w-[700px] sm:w-[540px]">
        <div
          style={{
            backgroundImage: `url(${Background})`,
            backgroundSize: 'cover',
          }}
          className=" bg-no-repeat inset-0 2xl:h-[906px] xl:h-[576px] lg:h-[462px] md:h-[335px] sm:h-[257px] h-[257px] bg-cover rotate"
        >
          <div className="flex justify-between pl-28">
            <div className="flex justify-between gap-2 bg-[#CDCDCD] rounded-lg h-[50px]">
              <div className="flex  rounded-lg p-[2px]">
                <div className="flex border rounded-lg bg-[#291E2C] p-[2px]">
                  <p className="bg-[#0051A2] text-white font-[700] text-[20px] px-10 py-[3px] rounded-md shadow-2xl">
                    MAJOR
                  </p>
                  <p className="text-white font-extrabold text-[24px] px-20">
                    864.30
                  </p>
                </div>
              </div>
              <div className="flex rounded-lg p-[2px]">
                <div className="flex border rounded-lg bg-[#291E2C] p-[2px]">
                  <p className="bg-[#900D00] text-white font-[700] text-[20px] px-10 py-[3px] rounded-md">
                    RANDOM
                  </p>
                  <p className="text-white font-extrabold text-[24px] px-20">
                    5864.30
                  </p>
                </div>
              </div>
              <div className="flex rounded-lg p-[2px]">
                <div className="flex border rounded-lg bg-[#291E2C] p-[2px]">
                  <p className="bg-[#4CA500] text-white font-[700] text-[20px] px-10 py-[3px] rounded-md">
                    MINOR
                  </p>
                  <p className="text-white font-extrabold text-[24px] px-20">
                    864.30
                  </p>
                </div>
              </div>
            </div>
            <div>
              <button
                onClick={toggleDrawer}
                className="bg-[#4B3DBD] rounded-r-none"
              >
                <Icon className="text-white w-[60px] h-[60px]" icon="f7:menu" />
              </button>

              {/* The overlay that appears behind the drawer when it's open */}
              {isOpen && (
                <div
                  className="fixed inset-0 z-20 bg-black bg-opacity-50"
                  onClick={toggleDrawer}
                ></div>
              )}

              {/* The drawer container */}
              <div
                className={`fixed top-0 z-40 w-52 h-full bg-[#1d1438] border-[#32329D] border-l-2 shadow-lg transform ease-in-out duration-300 ${
                  isOpen
                    ? 'translate-x-0 right-[235px]'
                    : 'translate-x-full right-[180px] hidden'
                }`}
              >
                {/* Drawer content here */}
                <div className="flex flex-col gap-4 p-4 ">
                  <p className="text-[30px] text-white border-[#5c5c8a] border-b">
                    MENU
                  </p>
                  <button className="rounded-lg bg-[#56D1EA] flex justify-between items-center pl-1 py-1">
                    <div className="bg-white border-4 border-[#1369B4] rounded-lg">
                      <Icon
                        className="text-blue-400 mt-0.5 ml-0.5 w-8 h-8"
                        icon="fluent-mdl2:navigate-back"
                      />
                    </div>
                    <p className="text-white text-[24px]">BACK</p>
                  </button>
                  {/* Add navigation links or other content here */}
                </div>
              </div>
            </div>
          </div>
          <div className="flex px-[68px] pt-[72px] gap-[18.6px]">
            <Slot
              count={13}
              isSpinning={isSpinning}
              onSpinEnd={handleSpinEnd}
              speed="spinning1"
            />
            <Slot
              count={18}
              isSpinning={isSpinning}
              onSpinEnd={handleSpinEnd}
              speed="spinning2"
            />
            <Slot
              count={23}
              isSpinning={isSpinning}
              onSpinEnd={handleSpinEnd}
              speed="spinning3"
            />
            <Slot
              count={28}
              isSpinning={isSpinning}
              onSpinEnd={handleSpinEnd}
              speed="spinning4"
            />
            <Slot
              count={33}
              isSpinning={isSpinning}
              onSpinEnd={handleSpinEnd}
              speed="spinning5"
            />
          </div>
          <div className="flex">
            <div className="w-[374px]">
              <p className="gradient-text pt-[55px] bg-[#300E0C] text-[36px] font-bold">
                182354324
              </p>
            </div>
            <div className="w-[373px]">
              <p className="gradient-text  text-[36px] font-bold pl-[78px] mt-[-4px]">
                {line}
              </p>
              <div className="flex">
                <button
                  onClick={handleDecrementLine}
                  className="h-[81px] w-[173px] focus:outline-none bg-no-repeat bg-center border-none"
                  style={{ backgroundImage: `url(${MinuImage})` }}
                ></button>
                <button
                  onClick={handleIncrementLine}
                  className="h-[81px] w-[172px] focus:outline-none bg-no-repeat bg-center border-none"
                  style={{ backgroundImage: `url(${PlusImage})` }}
                ></button>
              </div>
            </div>
            <div className="w-[373px]">
              <p className="gradient-text text-[36px] font-bold pl-[70px] mt-[-4px]">
                {betValue * line}
              </p>
              <div className="flex">
                <button
                  onClick={handleDecrementBet}
                  className="h-[81px] w-[173px] focus:outline-none bg-no-repeat bg-center border-none"
                  style={{ backgroundImage: `url(${MinuImage})` }}
                ></button>
                <button
                  onClick={handleIncrementBet}
                  className="h-[81px] w-[172px] focus:outline-none bg-no-repeat bg-center border-none"
                  style={{ backgroundImage: `url(${PlusImage})` }}
                ></button>
              </div>
            </div>
            <div className="w-auto">
              <p className="gradient-text text-[36px] font-bold pl-[270px] mt-[-4px]">
                {betValue * line}
              </p>
              <div className="flex gap-2">
                <button
                  // onClick={handleDecrementLine}
                  className="h-[84px] w-[243px] focus:outline-none bg-no-repeat bg-center border-none"
                  style={{ backgroundImage: `url(${AutoStartImage})` }}
                ></button>
                <button
                  type="submit"
                  onClick={handleSpinClick}
                  className="focus:outline-none border-none w-[230px] h-[80px] bg-opacity-0"
                ></button>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Safari;
