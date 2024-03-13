import { useState } from 'react';
import Slot from '../../component/Slots';
import Background from '../../assets/background.png';
import MinusImage from '../../assets/minus.png';
import PlusImage from '../../assets/plus.png';
import AutoStartImage from '../../assets/auto_start.png';
import SpinImage from '../../assets/spin.png';
import StopSpinImage from '../../assets/stop.png';
import MenuBtnImage from '../../assets/menu_btn.png';
import MenuImage from '../../assets/menu.png';
import MenuBackImage from '../../assets/menu_back.png';
import MenuHelpImage from '../../assets/menu_help.png';
import MenuAudioOffImage from '../../assets/menu_audio_off.png';
import MenuShakeImage from '../../assets/menu_shake.png';
import MenuLogoutImage from '../../assets/menu_logout.png';
import get_winning_paylines from '../../utils/get_winning_paylines';
// import HoverPlusImage from '../../assets/hover_plus.png';
// import HoverMinusImage from '../../assets/hover_plus.png';
import './index.css';

const Safari = () => {
  const [line, setLine] = useState(1);
  const [betValue, setBetValue] = useState(0.01);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winning, setWinning]=useState(0.00)
  // const [isSpinClicked, setIsSpinClicked] = useState(false);
  const [result1,setResult1]=useState<String[]>(()=>[])
  const [result2,setResult2]=useState<String[]>(()=>[])
  const [result3,setResult3]=useState<String[]>(()=>[])
  const [result4,setResult4]=useState<String[]>(()=>[])
  const [result5,setResult5]=useState<String[]>(()=>[])
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
      get_winning_paylines(result1,result2,result3,result4,result5,line,betValue)
    }, 1400);
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
            <div className="mt-[-2px]">
              <button
                onClick={toggleDrawer}
                className="w-[71px] h-[91px] focus:outline-none hover:brightness-125 bg-no-repeat bg-center border-none"
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
                    className="h-[83px] w-[286px] focus:outline-none hover:brightness-110 bg-no-repeat bg-center border-none"
                    style={{ backgroundImage: `url(${MenuBackImage})` }}
                  ></button>
                  <button
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
          <div className="flex px-[68px] pt-[102px] gap-[18.6px]">
            <Slot
              count={9}
              isSpinning={isSpinning}
              setResult={setResult1}
              onSpinEnd={handleSpinEnd}
            />
            <Slot
              count={12}
              isSpinning={isSpinning}
              setResult={setResult2}
              onSpinEnd={handleSpinEnd}

            />
            <Slot
              count={15}
              isSpinning={isSpinning}
              setResult={setResult3}
              onSpinEnd={handleSpinEnd}

            />
            <Slot
              count={18}
              isSpinning={isSpinning}
              setResult={setResult4}
              onSpinEnd={handleSpinEnd}

            />
            <Slot
              count={21}
              isSpinning={isSpinning}
              setResult={setResult5}
              onSpinEnd={handleSpinEnd}

            />
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
                {winning.toFixed(2)}
              </p>
              <div className="flex gap-[6px] mt-[2px] ml-[7px]">
                <button
                  type="submit"
                  // onClick={handleDecrementLine}
                  className="h-[81px] w-[243px] focus:outline-none hover:brightness-125 bg-no-repeat bg-center border-none"
                  style={{
                    backgroundImage: isSpinning ? '' : `url(${AutoStartImage})`,
                  }}
                ></button>
                <button
                  type="submit"
                  onClick={handleSpinClick}
                  className="focus:outline-none hover:brightness-125 border-none w-[234px] h-[79px] bg-opacity-0"
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
        <div></div>
      </div>
    </div>
  );
};

export default Safari;
