import { useState, useEffect, SetStateAction, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Socket, io } from 'socket.io-client';
import Slot from '../../component/Slots';
import get_winning_paylines from '../../utils/get_winning_paylines';
import { PAYLINES } from '../../constants/paylines';
import { SOCKET_SERVER_URL } from '../../config/config.tsx';
import './index.css';

const Background = 'https://i.postimg.cc/MG85kfDT/background.png';
const MinusImage = 'https://i.postimg.cc/1zpFDWDR/minus.png';
const PlusImage = 'https://i.postimg.cc/Wzfqsxc8/plus.png';
const AutoStartImage = 'https://i.postimg.cc/15CrzYrL/auto-start.png';
const SpinImage = 'https://i.postimg.cc/LsBqJJMn/spin.png';
const StopSpinImage = 'https://i.postimg.cc/k4TByLGC/stop.png';
const MenuBtnImage = 'https://i.postimg.cc/rmgWkwT4/menu_btn.png';
const MenuImage = 'https://i.postimg.cc/8CSrf6PW/menu.png';
const MenuBackImage = 'https://i.postimg.cc/qMNKPr5t/menu_back.png';
const MenuHelpImage = 'https://i.postimg.cc/76q7dTFD/menu_help.png';
const MenuAudioOffImage = 'https://i.postimg.cc/LsKjkWvJ/menu_audio_off.png';
const MenuShakeImage = 'https://i.postimg.cc/9Fs9Vk6L/menu_shake.png';
const MenuLogoutImage = 'https://i.postimg.cc/v8q92T3F/menu_logout.png';
const SideLeft1 = 'https://i.postimg.cc/rsh0RnZY/left-1.png';
const SideLeft2 = 'https://i.postimg.cc/JnMG6V92/left-2.png';
const SideLeft3 = 'https://i.postimg.cc/T2kp9sQt/left-3.png';
const SideLeft4 = 'https://i.postimg.cc/05ZJ4j5d/left-4.png';
const SideLeft5 = 'https://i.postimg.cc/3NwWhjrj/left-5.png';
const SideLeft10 = 'https://i.postimg.cc/cHh6PkW4/left-10.png';
const SideLeft11 = 'https://i.postimg.cc/gjBj2wrC/left-11.png';
const SideLeft12 = 'https://i.postimg.cc/8C8FvrwD/left-12.png';
const SideLeft13 = 'https://i.postimg.cc/DwG07whN/left-13.png';
const SideRight1 = 'https://i.postimg.cc/Kvw4Xg6L/right-1.png';
const SideRight2 = 'https://i.postimg.cc/1tm300Fx/right-2.png';
const SideRight3 = 'https://i.postimg.cc/C5tMVWQY/right-3.png';
const SideRight6 = 'https://i.postimg.cc/T2H3mDYS/right-6.png';
const SideRight7 = 'https://i.postimg.cc/kX6Xyg25/right-7.png';
const SideRight8 = 'https://i.postimg.cc/ZKGYszNx/right-8.png';
const SideRight9 = 'https://i.postimg.cc/dVGszNmP/right-9.png';
const SideRight14 = 'https://i.postimg.cc/TP9RPy4t/right-14.png';
const SideRight15 = 'https://i.postimg.cc/TPGdGjCy/right-15.png';

const HelpBackground1 = 'https://i.postimg.cc/7Z2vMRX2/background1.png';
const HelpBackground2 = 'https://i.postimg.cc/SNVjbnpr/background2.png';
const HelpBackground3 = 'https://i.postimg.cc/MpTH6z68/background3.png';
const Back = 'https://i.postimg.cc/bJddv3Yw/back.png';
const PaylineButton = 'https://i.postimg.cc/9f07nGRZ/paylines.png';
const PaylineImage = 'https://i.postimg.cc/RZDFq2hJ/payline.png';
const HidePaylineImage = 'https://i.postimg.cc/sDP7QfCQ/hidepayline.png';
const HelpImage1 = 'https://i.postimg.cc/yd5x3cWX/help1.png';
const HelpImageClick1 = 'https://i.postimg.cc/G3VqJmfX/help1-click.png';
const HelpImage2 = 'https://i.postimg.cc/fTd5HhnD/help2.png';
const HelpImageClick2 = 'https://i.postimg.cc/J7Gpkkpy/help2-click.png';
const HelpImage3 = 'https://i.postimg.cc/65CLrLnQ/help3.png';
const HelpImageClick3 = 'https://i.postimg.cc/Kc6D3sKV/help3-click.png';

const GambleBackgroundImage = 'https://i.postimg.cc/6Q2w834C/background.png';
const GambleImage = 'https://i.postimg.cc/5NnsDSK2/gamble.png';
const CollectButtonImage = 'https://i.postimg.cc/8C339m56/collect.png';
const BlackButtonImage = 'https://i.postimg.cc/q7d6L9ch/black-button.png';
const RedButtonImage = 'https://i.postimg.cc/sXjQF7N3/red-button.png';
const BlackCard = 'https://i.postimg.cc/mrhyxxzd/black-card.png';
const Redcard = 'https://i.postimg.cc/XvyBcny0/red-card.png';
const Card = 'https://i.postimg.cc/VNRvF5Lp/card.png';
const betValueArray = [
  0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09, 0.1, 0.25, 0.5, 1.0,
  2.5, 5.0, 10.0, 20.0, 30.0, 40.0,
];
const Safari = () => {
  const [line, setLine] = useState(15);
  const [betValue, setBetValue] = useState(1);
  const [balance, setBalance] = useState(10000.0);
  const [winning, setWinning] = useState<number>(0.0);
  const [spin_type, setSpinType] = useState<number>(1);
  const [minor, setMinor] = useState(0.0);
  const [major, setMajor] = useState(0.0);
  const [jackpot, setJackpot] = useState(0.0);
  const [payline, setPayline] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [sideLeft, setSideLeft] = useState(SideLeft13);
  const [sideRight, setSideRight] = useState(SideRight15);
  const [backgroundName, setBackgroundName] = useState('Main');
  const [helpBackground, setHelpBackground] = useState(HelpBackground1);
  const [pageNumber, setPageNumber] = useState(1);
  const [result1, setResult1] = useState<String[]>(() => []);
  const [result2, setResult2] = useState<String[]>(() => []);
  const [result3, setResult3] = useState<String[]>(() => []);
  const [result4, setResult4] = useState<String[]>(() => []);
  const [result5, setResult5] = useState<String[]>(() => []);

  const suceessID1 = [0, 0, 0];
  const suceessID2 = [0, 0, 0];
  const suceessID3 = [0, 0, 0];
  const suceessID4 = [0, 0, 0];
  const suceessID5 = [0, 0, 0];
  const intervalID = useRef<number | null>();
  const [allSuccessIDs, setAllSuccessIDs] = useState<Array<Array<number>>>([
    suceessID1,
    suceessID2,
    suceessID3,
    suceessID4,
    suceessID5,
  ]);
  const [cardName, setCardName] = useState('card');
  const [randomValue, setRandomValue] = useState<boolean | null>(null);
  const [winingString, setWinningString] = useState(false);
  const [isGamble, setIsGamble] = useState(false);
  const [gamble, setGamble] = useState<number>(0.0);
  // const [isWinningGamble, setIsWinningGamble] = useState(true);
  let isWinningGamble: boolean;
  let cardRandomValue = false;
  const generateCardRandomValue = () => {
    const newValue = Math.floor(Math.random() * 2) % 2 === 0;
    setRandomValue(newValue);
    cardRandomValue = newValue;
  };

  const [socket, setSocket] = useState<Socket | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const newSocket = io(SOCKET_SERVER_URL);
    setSocket(newSocket);
    newSocket.emit('username', 'test1');
    newSocket.on('major_minor', (message) => {
      const { major, minor } = JSON.parse(message);
      setMajor(major);
      setMinor(minor);
    });
    newSocket.on('jackpot', (message) => {
      const { jackpot } = JSON.parse(message);
      setJackpot(jackpot.toFixed(2));
    });
    newSocket.on('update', (message) => {
      const { balance } = JSON.parse(message);
      setBalance(balance.toFixed(2));
    });
    return () => {
      newSocket.disconnect();
    };
  }, []);
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
    if (intervalID.current && isSpinning === true)
      clearInterval(intervalID.current);
  }, [isSpinning]);
  const showWinningCombinations = (
    scatter_winning: any,
    winningCombos: any
  ) => {
    let count = 0;
    if (scatter_winning.count >= 2) {
      setAllSuccessIDs(scatter_winning.locations);
      setTimeout(() => console.log(scatter_winning), 1000);
      setPayline(15);
    }
    intervalID.current = setInterval(() => {
      if (count < winningCombos.length) {
        const value = winningCombos[count];
        for (let i = 0; i < value.count; i++) {
          setAllSuccessIDs((prevAllSuccessIDs) =>
            prevAllSuccessIDs.map((successID, index) =>
              index === i
                ? [
                    PAYLINES[value.payline][i] === 0 ? 1 : 0,
                    PAYLINES[value.payline][i] === 1 ? 1 : 0,
                    PAYLINES[value.payline][i] === 2 ? 1 : 0,
                  ]
                : index < value.count
                ? successID
                : [0, 0, 0]
            )
          );
        }
        setPayline(value.payline);
        count++;
      } else {
        count = 0;
      }
    }, 2000); // Set for 2 seconds
  };
  useEffect(() => {
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
    if (general_winning.length > 0 || scatter_winning.count > 1) {
      setIsGamble(true);
    }
    let paylines = new Array();
    general_winning.forEach((winning) => {
      paylines.push(winning.payline);
    });
    if (socket) {
      socket.emit(
        'spinresult',
        JSON.stringify({
          lines: line,
          bet: betValueArray[betValue - 1] * line,
          spin_type: spin_type,
          pay_lines: paylines,
          winning: result,
        })
      );
    }
    setTimeout(() => {
      showWinningCombinations(scatter_winning, general_winning);
    }, 0); // Wait for 2 seconds
  }, [result5]);

  const handleIncrementLine = () => {
    if (isSpinning === false)
      setLine((prevLine) => (prevLine < 15 ? prevLine + 1 : 1));
  };

  const handleDecrementLine = () => {
    if (isSpinning === false)
      setLine((prevLine) => (prevLine > 1 ? prevLine - 1 : 15));
  };
  const handleIncrementBet = () => {
    if (isSpinning === false)
      setBetValue((prevBetValue) => (prevBetValue < 19 ? prevBetValue + 1 : 1));
  };

  const handleDecrementBet = () => {
    if (isSpinning === false)
      setBetValue((prevBetValue) => (prevBetValue > 1 ? prevBetValue - 1 : 19));
  };
  const handleSpinClick = () => {
    setIsSpinning(true);
    setSpinType(1);
    if (socket && isSpinning === false) {
      socket.emit(
        'bet',
        JSON.stringify({ bet: (line * betValueArray[betValue - 1]).toFixed(2) })
      );
    }

    setWinning(0.0);
    setAllSuccessIDs(() => [
      [0, 0, 0], // Initial state for successID1
      [0, 0, 0], // Initial state for successID2
      [0, 0, 0], // Initial state for successID3
      [0, 0, 0], // Initial state for successID4
      [0, 0, 0], // Initial state for successID5
    ]);
    setIsGamble(false);
  };
  const handleAutoSpinClick = () => {
    setSpinType(0);

    if (socket && isSpinning === false) {
      socket.emit(
        'bet',
        JSON.stringify({ bet: (line * betValueArray[betValue - 1]).toFixed(2) })
      );
    }
    setIsSpinning(true);
    setWinning(0.0);
    setAllSuccessIDs(() => [
      [0, 0, 0], // Initial state for successID1
      [0, 0, 0], // Initial state for successID2
      [0, 0, 0], // Initial state for successID3
      [0, 0, 0], // Initial state for successID4
      [0, 0, 0], // Initial state for successID5
    ]);
    setIsGamble(false);
  };
  const handleSpinEnd = () => {
    setIsSpinning(false);
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  const sendGamble = () => {
    console.log(gamble.toFixed(2));
    const value = isWinningGamble ? gamble - winning : -winning;
    if (socket) {
      socket.emit('gamble', JSON.stringify({ gamble: value.toFixed(2) }));
    }
    console.log(isWinningGamble);
    setWinning(isWinningGamble ? gamble : 0.0);
    setGamble(0.0);
    isWinningGamble = true;
  };
  return (
    <>
  
      {/* <img
        className="h-[800px] w-[100%] flex flex-wrap bg-no-repeat"
        style={{
          backgroundImage: `url(${Background})`,
        }}
      /> */}
      {/* Main */}
      <div
        className={`${
          backgroundName != 'Main' ? 'hidden' : ''
        }relative flex flex-col 2xl:w-[100%] w-[98.8%] bg-no-repeat inset-0 2xl:h-[906px] xl:h-[674px] h-full bg-cover rotate`}
        style={{
          backgroundImage: `url(${Background})`,
        }}
      >
        {/* header */}
        <div className="flex justify-between 2xl:h-[50px] h-[34px]">
          <div className="flex 2xl:mt-[4px] mt-0">
            <p className="text-white text-center font-extrabold text-[24px] 2xl:w-[493px] w-[360px] 2xl:pl-[275px] pl-[200px]">
              {major}
            </p>
            <p className="text-white font-extrabold text-center text-[24px] 2xl:pl-[157px] 2xl:w-[450px] pl-[125px] w-[335px]">
              {jackpot}
            </p>
            <p className="text-white font-extrabold text-[24px] text-center 2xl:pl-[150px] 2xl:w-[365px] pl-[115px] w-[283px]">
              {minor}
            </p>
          </div>
          <div className="relative">
            <button
              onClick={toggleDrawer}
              className="2xl:w-[71px] w-[50px] 2xl:h-[91px] h-[70px] focus:outline-none hover:brightness-125 bg-no-repeat bg-center border-none p-0"
              style={{
                backgroundImage: `url(${MenuBtnImage})`,
                backgroundSize: 'cover',
              }}
            ></button>
            {isOpen && (
              <div
                className="fixed inset-0 z-20 bg-black bg-opacity-50"
                onClick={toggleDrawer}
              ></div>
            )}
            <div
              className={`absolute top-[0px] z-40 2xl:w-[326px] w-[245px] 2xl:h-[906px] h-[675px] shadow-lg transform ease-in-out duration-300 ${
                isOpen
                  ? 'translate-x-0 right-[0px]'
                  : 'translate-x-full 2xl:right-[180px] hidden'
              }`}
              style={{
                backgroundImage: `url(${MenuImage})`,
                backgroundSize: 'cover',
              }}
            >
              {/* Drawer content here */}
              <div className="flex flex-col 2xl:gap-[37.5px] gap-[29px] 2xl:pt-[162px] pt-[121px] 2xl:px-[21px] px-[16px] ">
                <button
                  onClick={() => navigate('/')}
                  className="2xl:h-[83px] h-[62px] 2xl:w-[286px] w-[216px] focus:outline-none hover:brightness-110 bg-no-repeat bg-center border-none"
                  style={{
                    backgroundImage: `url(${MenuBackImage})`,
                    backgroundSize: 'cover',
                  }}
                ></button>
                <button
                  onClick={() => {
                    setBackgroundName('Help');
                    setIsOpen(false);
                  }}
                  className="2xl:h-[83px] h-[62px] 2xl:w-[286px] w-[216px] focus:outline-none hover:brightness-110 bg-no-repeat bg-center border-none"
                  style={{
                    backgroundImage: `url(${MenuHelpImage})`,
                    backgroundSize: 'cover',
                  }}
                ></button>
                <button
                  className="2xl:h-[83px] h-[62px] 2xl:w-[286px] w-[216px] focus:outline-none hover:brightness-110 bg-no-repeat bg-center border-none"
                  style={{
                    backgroundImage: `url(${MenuAudioOffImage})`,
                    backgroundSize: 'cover',
                  }}
                ></button>
                <button
                  className="2xl:h-[83px] h-[62px] 2xl:w-[286px] w-[216px] focus:outline-none hover:brightness-110 bg-no-repeat bg-center border-none"
                  style={{
                    backgroundImage: `url(${MenuShakeImage})`,
                    backgroundSize: 'cover',
                  }}
                ></button>
                <button
                  className="2xl:h-[83px] h-[62px] 2xl:w-[286px] w-[216px] focus:outline-none hover:brightness-110 bg-no-repeat bg-center border-none"
                  style={{
                    backgroundImage: `url(${MenuLogoutImage})`,
                    backgroundSize: 'cover',
                  }}
                ></button>
                {/*  */}
              </div>
            </div>
          </div>
        </div>
        {/* content */}
        <div className="flex 2xl:mt-[102px] mt-[82px] 2xl:gap-[19.2px] gap-[14.2px]">
          <div className="flex gap-[3px]">
            <div
              className="2xl:w-[64px] 2xl:h-[628px] 2xl:mt-[-11px] w-[47px] h-[468px] mt-[-11px]"
              style={{
                backgroundImage: `url(${sideLeft})`,
                backgroundSize: 'cover',
              }}
            ></div>
            <Slot
              count={9}
              isSpinning={isSpinning}
              setResult={setResult1}
              onSpinEnd={handleSpinEnd}
              spinID={1}
              suceessID={allSuccessIDs[0]}
              payline={payline}
            />
          </div>
          <Slot
            count={12}
            isSpinning={isSpinning}
            setResult={setResult2}
            onSpinEnd={handleSpinEnd}
            spinID={2}
            suceessID={allSuccessIDs[1]}
            payline={payline}
          />
          <Slot
            count={15}
            isSpinning={isSpinning}
            setResult={setResult3}
            onSpinEnd={handleSpinEnd}
            spinID={3}
            suceessID={allSuccessIDs[2]}
            payline={payline}
          />
          <Slot
            count={18}
            isSpinning={isSpinning}
            setResult={setResult4}
            onSpinEnd={handleSpinEnd}
            spinID={4}
            suceessID={allSuccessIDs[3]}
            payline={payline}
          />
          <div className="flex gap-[4px]">
            <Slot
              count={21}
              isSpinning={isSpinning}
              setResult={setResult5}
              onSpinEnd={handleSpinEnd}
              spinID={5}
              suceessID={allSuccessIDs[4]}
              payline={payline}
            />
            <div
              className="2xl:w-[64px] 2xl:h-[628px] 2xl:mt-[-12px] w-[47px] h-[468px] mt-[-12px]"
              style={{
                backgroundImage: `url(${sideRight})`,
                backgroundSize: 'cover',
              }}
            ></div>
          </div>
        </div>
        {/* bottom */}
        <div className="flex mt-[2px]">
          <div className="2xl:w-[374px] w-[280px]">
            <p className="gradient-text 2xl:pt-[55px] pt-[30px] bg-[#300E0C] text-[36px] font-bold">
              {balance}
            </p>
          </div>
          <div className="2xl:w-[373px] w-[280px]">
            <p className="gradient-text 2xl:text-[36px] text-[30px] font-bold 2xl:pl-[76px] pl-[50px] 2xl:mt-[-4px] mt-[-8px]">
              {line}
            </p>
            <div className="flex 2xl:mt-[2px] mt-[1px]">
              <button
                type="submit"
                onClick={handleDecrementLine}
                className="2xl:h-[81px] 2xl:w-[173px] h-[55px] w-[130px] focus:outline-none hover:brightness-125 bg-no-repeat bg-center border-none"
                style={{
                  backgroundImage: isSpinning ? '' : `url(${MinusImage})`,
                  backgroundSize: 'cover',
                }}
              ></button>
              <button
                type="submit"
                onClick={handleIncrementLine}
                className="2xl:h-[81px] 2xl:w-[172px] h-[55px] w-[130px] focus:outline-none hover:brightness-125 bg-no-repeat bg-center border-none ml-[-2px]"
                style={{
                  backgroundImage: isSpinning ? '' : `url(${PlusImage})`,
                  backgroundSize: 'cover',
                }}
              ></button>
            </div>
          </div>
          <div className="2xl:w-[373px] w-[280px]">
            <p className="gradient-text 2xl:text-[36px] text-[30px] font-bold 2xl:pl-[76px] pl-[25px] 2xl:mt-[-4px] mt-[-8px]">
              {(line * betValueArray[betValue - 1]).toFixed(2)}
            </p>
            <div className="flex 2xl:mt-[2px] mt-[1px] 2xl:ml-[7px] ml-[3px]">
              <button
                type="submit"
                onClick={handleDecrementBet}
                className="2xl:h-[81px] 2xl:w-[173px] h-[55px] w-[130px] focus:outline-none hover:brightness-125 bg-no-repeat bg-center border-none"
                style={{
                  backgroundImage: isSpinning ? '' : `url(${MinusImage})`,
                  backgroundSize: 'cover',
                }}
              ></button>
              <button
                type="submit"
                // onMouseEnter={handleIncrementBet}
                onClick={handleIncrementBet}
                className="2xl:h-[81px] 2xl:w-[172px] h-[55px] w-[130px] focus:outline-none hover:brightness-125 bg-no-repeat bg-center border-none ml-[-2px]"
                style={{
                  backgroundImage: isSpinning ? '' : `url(${PlusImage})`,
                  backgroundSize: 'cover',
                }}
              ></button>
            </div>
          </div>
          <div className="w-auto">
            <p className="gradient-text 2xl:text-[36px] text-[30px] font-bold 2xl:pl-[76px] pl-[90px] 2xl:mt-[-4px] mt-[-8px]">
              {winning.toFixed(2)}
            </p>
            <div className="flex gap-[6px] 2xl:mt-[2px] ml-[7px]">
              <button
                type="submit"
                // onClick={handleDecrementLine}
                onClick={handleAutoSpinClick}
                className="2xl:h-[81px] h-[60px] 2xl:w-[243px] w-[180px] focus:outline-none hover:brightness-125 bg-no-repeat bg-center border-none"
                style={{
                  backgroundImage: isSpinning ? `` : `url(${AutoStartImage})`,
                  backgroundSize: 'cover',
                }}
              ></button>
              <button
                type="submit"
                onClick={handleSpinClick}
                className="focus:outline-none hover:brightness-125 border-none 2xl:w-[234px] w-[180px] 2xl:h-[79px] h-[56px] bg-opacity-0 aspect-auto object-cover"
                style={{
                  backgroundImage: isSpinning
                    ? `url(${StopSpinImage})`
                    : `url(${SpinImage})`,
                  backgroundSize: 'cover',
                }}
              ></button>
            </div>
          </div>
        </div>
        <img
          src={GambleImage}
          onClick={() => {
            setGamble(winning);
            setBackgroundName('Gamble');
            setCardName('card');
            setIsGamble(false);
          }}
          className={`${
            isGamble ? '' : 'hidden'
          } absolute gamble-image right-[1%] 2xl:bottom-[127px] bottom-[100px] 2xl:w-[250px] w-[200px] cursor-pointer hover:brightness-125`}
        />
      </div>
      {/* Help */}
      <div
        className={`${
          backgroundName != 'Help' ? 'hidden' : ''
        } flex flex-col justify-end 2xl:w-[1602px] w-[1200px] 2xl:h-[906px] h-[674px]
        `}
        style={{
          backgroundImage: `url(${helpBackground})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="flex justify-between px-[8px]">
          <div className="2xl:pl-[59px] pl-[43px]">
            <img
              onClick={() => setBackgroundName('Main')}
              src={Back}
              className="2xl:w-auto w-[200px] cursor-pointer mb-0.5 hover:brightness-110 bg-cover"
            />
            {/* </button> */}
          </div>
          <div
            className={`${
              pageNumber != 4
                ? '2xl:mr-[152px] mr-[116px]'
                : '2xl:mr-[470px] mr-[359px]'
            } `}
          >
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
              className="2xl:h-[81px] h-[62px] 2xl:w-[636px] w-[465px] focus:outline-none hover:brightness-105 bg-no-repeat bg-center border-none bg-cover"
              style={{
                backgroundImage:
                  pageNumber != 4
                    ? `url(${PaylineButton})`
                    : `url(${HidePaylineImage})`,
              }}
            ></button>
          </div>
          <div
            className={`flex 2xl:gap-[8px] gap-[6px] 2xl:mt-[35px] mt-[30px] ${
              pageNumber == 4 ? 'hidden' : ''
            }`}
          >
            <button
              onClick={() => {
                setHelpBackground(HelpBackground1);
                setPageNumber(1);
              }}
              className={`2xl:h-[40px] h-[27px] 2xl:w-[50px] w-[24px] focus:outline-none hover:brightness-110 bg-no-repeat bg-center border-none bg-cover`}
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
              className={`2xl:h-[40px] h-[27px] 2xl:w-[49px] w-[24px] focus:outline-none hover:brightness-110 bg-no-repeat bg-center border-none bg-cover`}
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
              className={`2xl:h-[38px] h-[27px] 2xl:w-[48px] w-[24px]  focus:outline-none hover:brightness-110 bg-no-repeat bg-center border-none bg-cover`}
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
      {/* Gamble */}
      <div
        className={`${
          backgroundName != 'Gamble' ? 'hidden' : ''
        } flex flex-col  2xl:w-[1602px] w-[1200px] 2xl:h-[906px] h-[674px] 2xl:pt-[278px] pt-[208px] 2xl:gap-[20px] 
        `}
        style={{
          backgroundImage: `url(${GambleBackgroundImage})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="flex 2xl:pl-[270px] pl-[202px] pr-[275px] gap-[36px] justify-between">
          <img
            onClick={() => {
              // setCardName('red');
              generateCardRandomValue();
              {
                cardRandomValue == false
                  ? setCardName('red')
                  : setCardName('black');
              }
              {
                if (cardRandomValue == false) {
                  setWinningString(true);
                  setGamble((previous) => previous * 2);
                } else {
                  isWinningGamble = false;
                  sendGamble();
                  setTimeout(() => {
                    setBackgroundName('Main');
                  }, 1500);
                }
              }
              setTimeout(() => {
                setCardName('card');
                setWinningString(false);
              }, 1500);
            }}
            src={RedButtonImage}
            className="2xl:w-[339px] w-[250px] 2xl:h-auto h-[200px] cursor-pointer hover:brightness-125 bg-cover"
          />
          <img
            src={`${
              cardName == 'card'
                ? Card
                : cardName == 'black'
                ? BlackCard
                : Redcard
            }`}
            className={`${
              cardName == 'card' ? 'gamble-image' : ' '
            } 2xl:w-[269px] w-[200px] ml-[12px]`}
          />
          <img
            onClick={() => {
              // setCardName('black');
              generateCardRandomValue();
              {
                cardRandomValue == false
                  ? setCardName('red')
                  : setCardName('black');
              }
              {
                if (cardRandomValue == true) {
                  setWinningString(true);
                  setGamble((previous) => previous * 2);
                } else {
                  isWinningGamble = false;
                  sendGamble();
                  setTimeout(() => {
                    setBackgroundName('Main');
                  }, 1500);
                }
              }
              setTimeout(() => {
                setCardName('card');
                setWinningString(false);
              }, 1500);
            }}
            src={BlackButtonImage}
            className="2xl:w-[339px] w-[250px] 2xl:h-auto h-[200px] cursor-pointer hover:brightness-125"
          />
        </div>
        <div className="h-[48px]">
          <p
            className={`${
              winingString ? '' : 'hidden'
            } text-white text-center font-bold 2xl:text-[32px] 2xl:pt-[0px] text-[26px] pt-[10px]`}
          >
            YOU WIN {(gamble * 2).toFixed(2)}
          </p>
        </div>

        <div className="grid grid-cols-2 2xl:px-[442px] px-[340px] gap 2xl:mt-[28px] mt-[36px] 2xl:text-[32px] text-[26px]">
          <p className="text-white text-center font-bold">
            {gamble.toFixed(2)}
          </p>
          <p className="text-white text-center font-bold">
            {(gamble * 2).toFixed(2)}
          </p>
        </div>
        <div className="flex justify-center">
          <img
            onClick={() => {
              isWinningGamble = true;
              sendGamble();
              setBackgroundName('Main');
              setCardName('card');
              setIsGamble(false);
            }}
            src={CollectButtonImage}
            className="2xl:mt-[26px] mt-[32px] ml-[12px] 2xl:w-[290px] 2xl:h-auto w-[220px] h-[80px] bg-cover cursor-pointer hover:brightness-105"
          />
        </div>
      </div>
    </>
  );
};

export default Safari;
