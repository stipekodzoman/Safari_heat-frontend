import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Slot from '../../component/Slots';
import get_winning_paylines from '../../utils/get_winning_paylines';
import { PAYLINES } from '../../constants/paylines';

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

import HelpBackground1 from '../../assets/help/background1.png';
import HelpBackground2 from '../../assets/help/background2.png';
import HelpBackground3 from '../../assets/help/background3.png';
import Back from '../../assets/help/back.png';
import PaylineButton from '../../assets/help/paylines.png';
import PaylineImage from '../../assets/help/payline.png';
import HidePaylineImage from '../../assets/help/hidepayline.png';
import HelpImage1 from '../../assets/help/help1.png';
import HelpImageClick1 from '../../assets/help/help1_click.png';
import HelpImage2 from '../../assets/help/help2.png';
import HelpImageClick2 from '../../assets/help/help2_click.png';
import HelpImage3 from '../../assets/help/help3.png';
import HelpImageClick3 from '../../assets/help/help3_click.png';

import './index.css';
const betValueArray = [
  0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09, 0.1, 0.25, 0.5, 1.0,
  2.5, 5.0, 10.0, 20.0, 30.0, 40.0,
];
const Safari = () => {
  const [line, setLine] = useState(1);
  const [betValue, setBetValue] = useState(1);
  const [balance, setBalance] = useState(10000.0);
  const [winning, setWinning] = useState(0.0);

  const [isSpinning, setIsSpinning] = useState(false);
  const [sideLeft, setSideLeft] = useState(SideLeft1);
  const [sideRight, setSideRight] = useState(SideRight1);
  const [isBackground, setIsBackground] = useState(true);

  const [helpBackground, setHelpBackground] = useState(HelpBackground1);
  const [pageNumber, setPageNumber] = useState(1);
  // const [isSpinClicked, setIsSpinClicked] = useState(false);
  const [result1, setResult1] = useState<String[]>(() => []);
  const [result2, setResult2] = useState<String[]>(() => []);
  const [result3, setResult3] = useState<String[]>(() => []);
  const [result4, setResult4] = useState<String[]>(() => []);
  const [result5, setResult5] = useState<String[]>(() => []);

  const [suceessID1, setSuccessID1] = useState<Array<number>>([0, 1, 0]);
  const [suceessID2, setSuccessID2] = useState<Array<number>>([1, 0, 0]);
  const [suceessID3, setSuccessID3] = useState<Array<number>>([0, 1, 0]);
  const [suceessID4, setSuccessID4] = useState<Array<number>>([0, 0, 1]);
  const [suceessID5, setSuccessID5] = useState<Array<number>>([0, 1, 0]);

  const [allSuccessIDs, setAllSuccessIDs] = useState<Array<Array<number>>>([
    suceessID1,
    suceessID2,
    suceessID3,
    suceessID4,
    suceessID5,
  ]);
  const navigate = useNavigate();
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
  useEffect(() => {
    // console.log(betValueArray[betValue - 1]);
    const { scatter_winning, general_winning, result } = get_winning_paylines(
      result1,
      result2,
      result3,
      result4,
      result5,
      line,
      betValueArray[betValue - 1] * line
    );
    setWinning(result);
    console.log(general_winning);
    console.log(result1, result2, result3, result4, result5);
    if (general_winning.length !== 0) {
      const finalResult: any[][] = [
        result1,
        result2,
        result3,
        result4,
        result5,
      ];
      general_winning.map((value) => {
        console.log(value.count, value.payline);
        console.log(PAYLINES[value.payline]);
        for (let i = 0; i < value.count; i++) {
          // console.log(finalResult[i][PAYLINES[value.payline][i]]);

          setAllSuccessIDs((prevAllSuccessIDs) => {
            const newAllSuccessIDs = [...prevAllSuccessIDs];
            newAllSuccessIDs[i] = [0, 0, 0];
            return newAllSuccessIDs;
          });
        }
        console.log(finalResult);
      });
      console.log('---------------------------->general win!!!!!!!');
      // setSuccessID1([0, 0, 0]);
    }
  }, [result5]);
  const handleIncrementLine = () => {
    setLine((prevLine) => (prevLine < 15 ? prevLine + 1 : 1));
  };

  const handleDecrementLine = () => {
    setLine((prevLine) => (prevLine > 1 ? prevLine - 1 : 15));
  };
  const handleIncrementBet = () => {
    setBetValue((prevBetValue) => (prevBetValue < 19 ? prevBetValue + 1 : 1));
  };

  const handleDecrementBet = () => {
    setBetValue((prevBetValue) => (prevBetValue > 1 ? prevBetValue - 1 : 19));
  };
  const handleSpinClick = () => {
    setIsSpinning(true);
    setWinning(0.0);
  };

  const handleSpinEnd = () => {
    setIsSpinning(false);
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className={`${
          isBackground ? '' : 'hidden'
        } flex flex-col 2xl:w-[1612px] h-[100vh] xl:w-[1200px] lg:w-[960px] md:w-[700px] sm:w-[540px] bg-no-repeat inset-0 2xl:h-[906px] xl:h-[576px] lg:h-[462px] md:h-[335px] sm:h-[257px] bg-cover rotate`}
        style={{
          backgroundImage: `url(${Background})`,
          backgroundSize: 'cover',
        }}
      >
        {/* header */}
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
              className={`fixed top-[6px] z-40 w-[326px] h-[906px] shadow-lg transform ease-in-out duration-300 ${
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
                  onClick={() => {
                    setIsBackground(false);
                    setIsOpen(false);
                  }}
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
                {/*  */}
              </div>
            </div>
          </div>
        </div>
        {/* content */}
        <div className="flex mt-[102px] gap-[19.2px]">
          <div className="flex gap-[3px]">
            <div
              className="w-[64px] h-[628px] mt-[-11px]"
              style={{
                backgroundImage: `url(${sideLeft})`,
              }}
            ></div>
            <Slot
              count={9}
              isSpinning={isSpinning}
              setResult={setResult1}
              onSpinEnd={handleSpinEnd}
              spinID={1}
              suceessID={allSuccessIDs[0]}
            />
          </div>
          <Slot
            count={12}
            isSpinning={isSpinning}
            setResult={setResult2}
            onSpinEnd={handleSpinEnd}
            spinID={2}
            suceessID={allSuccessIDs[1]}
          />
          <Slot
            count={15}
            isSpinning={isSpinning}
            setResult={setResult3}
            onSpinEnd={handleSpinEnd}
            spinID={3}
            suceessID={allSuccessIDs[2]}
          />
          <Slot
            count={18}
            isSpinning={isSpinning}
            setResult={setResult4}
            onSpinEnd={handleSpinEnd}
            spinID={4}
            suceessID={allSuccessIDs[3]}
          />
          <div className="flex gap-[4px]">
            <Slot
              count={21}
              isSpinning={isSpinning}
              setResult={setResult5}
              onSpinEnd={handleSpinEnd}
              spinID={5}
              suceessID={allSuccessIDs[4]}
            />
            <div
              className="w-[64px] h-[628px] mt-[-12px]"
              style={{
                backgroundImage: `url(${sideRight})`,
              }}
            ></div>
          </div>
        </div>
        {/* bottom */}
        <div className="flex mt-[2px]">
          <div className="w-[374px]">
            <p className="gradient-text pt-[55px] bg-[#300E0C] text-[36px] font-bold">
              {balance}
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
            <p className="gradient-text font-serif text-[36px] font-bold pl-[40px] mt-[-4px]">
              {(line * betValueArray[betValue - 1]).toFixed(2)}
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
            <p className="gradient-text font-mono text-[36px] font-bold pl-[70px] mt-[-4px]">
              {winning.toFixed(2)}
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
      <div
        className={`${
          isBackground ? 'hidden' : ''
        } flex flex-col justify-end w-[1602px] h-[906px]
        `}
        style={{
          backgroundImage: `url(${helpBackground})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="flex justify-between px-[8px]">
          <div className="pl-[59px]">
            <button
              onClick={() => setIsBackground(true)}
              className="h-[81px] w-[265px] focus:outline-none hover:brightness-105 bg-no-repeat bg-center border-none"
              style={{ backgroundImage: `url(${Back})` }}
            ></button>
          </div>
          <div className={`${pageNumber != 4 ? 'mr-[152px]' : 'mr-[470px]'} `}>
            <button
              onClick={() => {
                {
                  pageNumber == 4
                    ? setHelpBackground(HelpBackground1)
                    : setHelpBackground(PaylineImage);
                }
                {
                  pageNumber == 4 ? setPageNumber(1) : setPageNumber(4);
                }
              }}
              className="h-[81px] w-[636px] focus:outline-none hover:brightness-105 bg-no-repeat bg-center border-none"
              style={{
                backgroundImage:
                  pageNumber != 4
                    ? `url(${PaylineButton})`
                    : `url(${HidePaylineImage})`,
              }}
            ></button>
          </div>
          <div
            className={`flex gap-[8px] mt-[35px] ${
              pageNumber == 4 ? 'hidden' : ''
            }`}
          >
            <button
              onClick={() => {
                setHelpBackground(HelpBackground1);
                setPageNumber(1);
              }}
              className={`h-[40px] w-[50px] focus:outline-none hover:brightness-110 bg-no-repeat bg-center border-none `}
              style={{
                backgroundImage:
                  pageNumber == 1
                    ? `url(${HelpImageClick1})`
                    : `url(${HelpImage1})`,
              }}
            ></button>
            <button
              onClick={() => {
                setHelpBackground(HelpBackground2);
                setPageNumber(2);
              }}
              className={`h-[40px] w-[50px] focus:outline-none hover:brightness-110 bg-no-repeat bg-center border-none `}
              style={{
                backgroundImage:
                  pageNumber == 2
                    ? `url(${HelpImageClick2})`
                    : `url(${HelpImage2})`,
              }}
            ></button>
            <button
              onClick={() => {
                setHelpBackground(HelpBackground3);
                setPageNumber(3);
              }}
              className={`h-[38px] w-[48px] focus:outline-none hover:brightness-110 bg-no-repeat bg-center border-none `}
              style={{
                backgroundImage:
                  pageNumber == 3
                    ? `url(${HelpImageClick3})`
                    : `url(${HelpImage3})`,
              }}
            ></button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Safari;
