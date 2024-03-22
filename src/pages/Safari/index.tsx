import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Socket, io } from 'socket.io-client';
import Slot from '../../component/Slots';
import get_winning_paylines from '../../utils/get_winning_paylines';
import { PAYLINES } from '../../constants/paylines';
import { BASE_URL, SOCKET_SERVER_URL } from '../../config/config.tsx';
import './index.css';
//@ts-ignore
import { AuthContext } from '../../context/AuthContext.jsx';
import Background from '../../assets/main/back.jpg';
import MinusImage from '../../assets/main/minus.jpg';
import PlusImage from '../../assets/main/plus.jpg';
import AutoStartImage from '../../assets/main/auto_start.jpg';
import SpinImage from '../../assets/main/spin.jpg';
import StopSpinImage from '../../assets/main/stop.jpg';

import MenuBtnImage from '../../assets/menubar/menu_btn.jpg';
import MenuImage from '../../assets/menubar/menu.jpg';
import MenuBackImage from '../../assets/menubar/menu_back.jpg';
import MenuHelpImage from '../../assets/menubar/menu_help.jpg';
import MenuAudioOffImage from '../../assets/menubar/menu-audio-off.jpg';
import MenuAudioOnImage from '../../assets/menubar/menu_audio_on.jpg';
import MenuLogoutImage from '../../assets/menubar/menu_logout.jpg';

import SideLeft1 from '../../assets/sider/left-1.jpg';
import SideLeft2 from '../../assets/sider/left-2.jpg';
import SideLeft3 from '../../assets/sider/left-3.jpg';
import SideLeft4 from '../../assets/sider/left-4.jpg';
import SideLeft5 from '../../assets/sider/left-5.jpg';
import SideLeft10 from '../../assets/sider/left-10.jpg';
import SideLeft11 from '../../assets/sider/left-11.jpg';
import SideLeft12 from '../../assets/sider/left-12.jpg';
import SideLeft13 from '../../assets/sider/left-13.jpg';
import SideRight1 from '../../assets/sider/right-1.jpg';
import SideRight2 from '../../assets/sider/right-2.jpg';
import SideRight3 from '../../assets/sider/right-3.jpg';
import SideRight6 from '../../assets/sider/right-6.jpg';
import SideRight7 from '../../assets/sider/right-7.jpg';
import SideRight8 from '../../assets/sider/right-8.jpg';
import SideRight9 from '../../assets/sider/right-9.jpg';
import SideRight14 from '../../assets/sider/right-14.jpg';
import SideRight15 from '../../assets/sider/right-15.jpg';

import HelpBackground1 from '../../assets/help/background1.jpg';
import HelpBackground2 from '../../assets/help/background2.jpg';
import HelpBackground3 from '../../assets/help/background3.jpg';
import Back from '../../assets/help/back.png';
import PaylineButton from '../../assets/help/paylines.jpg';
import PaylineImage from '../../assets/help/payline.jpg';
import HidePaylineImage from '../../assets/help/hidepayline.jpg';
import HelpImage1 from '../../assets/help/help1.jpg';
import HelpImageClick1 from '../../assets/help/help1_click.jpg';
import HelpImage2 from '../../assets/help/help2.jpg';
import HelpImageClick2 from '../../assets/help/help2_click.jpg';
import HelpImage3 from '../../assets/help/help3.jpg';
import HelpImageClick3 from '../../assets/help/help3_click.jpg';

import GambleBackgroundImage from '../../assets/gamble/background.jpg';
import GambleImage from '../../assets/gamble/gamble.png';
import CollectButtonImage from '../../assets/gamble/collect.jpg';
import BlackButtonImage from '../../assets/gamble/black_button.png';
import RedButtonImage from '../../assets/gamble/red_button.png';
import BlackCard from '../../assets/gamble/black_card.jpg';
import Redcard from '../../assets/gamble/red_card.jpg';
import Card from '../../assets/gamble/card.jpg';
import SpinAudio from '../../assets/reels-run.mp3';
import WinAudio from '../../assets/coins.mp3';
const betValueArray = [
  0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09, 0.1, 0.25, 0.5, 1.0,
  2.5, 5.0, 10.0, 20.0, 30.0, 40.0,
];
let freeSpinCount = 15;
let freeSpinWinning = 0.0;
let isAutoSpin = false;
const Safari = () => {
  //@ts-ignore
  const { user, dispatch } = useContext(AuthContext);
  const [line, setLine] = useState(15);
  const [betValue, setBetValue] = useState(1);
  const [balance, setBalance] = useState(10000.0);
  const [winning, setWinning] = useState<number>(0.0);
  const [spin_type, setSpinType] = useState<number>(1);
  const [isFreeSpin, setIsFreeSpin] = useState(false);
  const [minor, setMinor] = useState(0.0);
  const [major, setMajor] = useState(0.0);
  const [jackpot, setJackpot] = useState(0.0);
  const [payline, setPayline] = useState<number>(15);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(false);
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
  const [result6, setResult6] = useState<String[]>(() => []);
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
  const [winingString, setWinningString] = useState(false);
  const [isGamble, setIsGamble] = useState(false);
  const [gamble, setGamble] = useState<number>(0.0);
  // const [isWinningGamble, setIsWinningGamble] = useState(true);
  let isWinningGamble: boolean;
  let cardRandomValue = false;
  const [socket, setSocket] = useState<Socket | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const newSocket = io(SOCKET_SERVER_URL);
    setSocket(newSocket);
    newSocket.emit('username', user);
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
    if (intervalID.current && isSpinning === true) {
      clearInterval(intervalID.current);
    }
  }, [isSpinning]);
  const generateCardRandomValue = () => {
    const newValue = Math.floor(Math.random() * 2) % 2 === 0;

    cardRandomValue = newValue;
  };
  const showWinningCombinations = (
    scatter_winning: any,
    winningCombos: any
  ) => {
    let count = 0;
    if (scatter_winning.count >= 2) {
      setAllSuccessIDs(scatter_winning.locations);
      setPayline(15);
    } else if (count < winningCombos.length) {
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
    const { scatter_winning, general_winning, result, isJackpot } =
      get_winning_paylines(
        result1,
        result2,
        result3,
        result4,
        result5,
        line,
        betValueArray[betValue - 1] * line
      );
    setWinning(result);
    if (isJackpot) {
      if (betValue == 19) {
        socket?.emit(
          'jackpot_success',
          JSON.stringify({ jackpot: jackpot, win_username: 'test1' })
        );
      } else if (betValue == 18 || betValue == 17) {
        socket?.emit(
          'jackpot_success',
          JSON.stringify({ jackpot: major, win_username: 'test1' })
        );
      } else {
        socket?.emit(
          'jackpot_success',
          JSON.stringify({ jackpot: minor, win_username: 'test1' })
        );
      }
    }
    if (scatter_winning.count >= 3) {
      setAllSuccessIDs(scatter_winning.locations);
      setPayline(15);
      setIsFreeSpin(true);
      isAutoSpin = false;
      freespin();
    } else {
      if (
        (general_winning.length > 0 || scatter_winning.count > 1) &&
        isAutoSpin === false &&
        isFreeSpin === false
      ) {
        setIsGamble(true);
        if (winAudio.current !== null) {
          winAudio.current.play();
        }
      }
      let paylines: number[] = [];
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
    }
  }, [result5]);

  const freespin = async () => {
    for (let i = 0; i < freeSpinCount; i++) {
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          setIsSpinning(true);
          setSpinType(1);
          setPayline(15);
          setAllSuccessIDs(() => [
            [0, 0, 0], // Initial state for successID1
            [0, 0, 0], // Initial state for successID2
            [0, 0, 0], // Initial state for successID3
            [0, 0, 0], // Initial state for successID4
            [0, 0, 0], // Initial state for successID5
          ]);
          resolve();
        }, 1800);
      });
    }
    setTimeout(() => {
      setIsGamble(true);
      let paylines:number[] = []
      if (socket) {
        socket.emit(
          'spinresult',
          JSON.stringify({
            lines: line,
            bet: betValueArray[betValue - 1] * line,
            spin_type: spin_type,
            pay_lines: paylines,
            winning: freeSpinWinning,
          })
        );
      }
      setIsFreeSpin(false);
      freeSpinCount = 15;
      freeSpinWinning = 0.0;
    }, 1500);
  };
  useEffect(() => {
    const { scatter_winning, general_winning, result } = get_winning_paylines(
      result1,
      result2,
      result3,
      result4,
      result6,
      line,
      betValueArray[betValue - 1] * line
    );
    freeSpinWinning += parseFloat((result * 3).toFixed(2));
    setWinning((previous) => previous + parseFloat((result * 3).toFixed(2)));
    if (scatter_winning.count >= 3) {
      freeSpinCount += 15;
    } else {
      setTimeout(() => {
        showWinningCombinations(scatter_winning, general_winning);
      }, 0);
    } // Wait for 2 seconds
  }, [result6]);
  const winAudio = useRef<HTMLAudioElement>(null);
  const spinAudio = useRef<HTMLAudioElement>(null);
  const handleIncrementLine = () => {
    if (isSpinning === false && isFreeSpin === false && isAutoSpin === false) {
      setLine((prevLine) => (prevLine < 15 ? prevLine + 1 : 1));
    }
  };

  const handleDecrementLine = () => {
    if (isSpinning === false && isFreeSpin === false && isAutoSpin === false) {
      setLine((prevLine) => (prevLine > 1 ? prevLine - 1 : 15));
    }
  };
  const handleIncrementBet = () => {
    if (isSpinning === false && isFreeSpin === false && isAutoSpin === false) {
      setBetValue((prevBetValue) => (prevBetValue < 19 ? prevBetValue + 1 : 1));
    }
  };

  const handleDecrementBet = () => {
    if (isSpinning === false && isFreeSpin === false && isAutoSpin === false) {
      setBetValue((prevBetValue) => (prevBetValue > 1 ? prevBetValue - 1 : 19));
    }
  };
  const handleSpinClick = () => {
    if (isSpinning === false) {
      setPayline(15);
      setSpinType(1);
      if (socket && isSpinning === false) {
        socket.emit(
          'bet',
          JSON.stringify({
            bet: (line * betValueArray[betValue - 1]).toFixed(2),
          })
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
      if (spinAudio.current !== null) {
        spinAudio.current.play();
      }
      if (winAudio.current !== null) {
        winAudio.current.pause();
        winAudio.current.currentTime = 0;
      }
    } else {
      setIsSpinning(false);
      if (spinAudio.current !== null) {
        spinAudio.current.pause();
        spinAudio.current.currentTime = 0;
      }
    }
  };
  const handleAutoSpinClick = () => {
    setPayline(15);
    setIsGamble(false);
    setSpinType(0);
    if (socket && isSpinning === false) {
      socket.emit(
        'bet',
        JSON.stringify({
          bet: (line * betValueArray[betValue - 1]).toFixed(2),
        })
      );
      setIsSpinning(true);
      setWinning(0.0);
      setAllSuccessIDs(() => [
        [0, 0, 0], // Initial state for successID1
        [0, 0, 0], // Initial state for successID2
        [0, 0, 0], // Initial state for successID3
        [0, 0, 0], // Initial state for successID4
        [0, 0, 0], // Initial state for successID5
      ]);
      isAutoSpin = true;
      autoSpin();
    } else {
      isAutoSpin = false;
    }
  };
  const autoSpin = () => {
    setTimeout(() => {
      if (isAutoSpin === true) {
        setSpinType(0);
        setPayline(15);
        if (socket && isSpinning === false) {
          socket.emit(
            'bet',
            JSON.stringify({
              bet: (line * betValueArray[betValue - 1]).toFixed(2),
            })
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
        autoSpin();
      }
    }, 2500);
  };
  const handleSpinEnd = () => {
    setIsSpinning(false);
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  const sendGamble = () => {
    const value = isWinningGamble ? gamble - winning : -winning;
    if (socket) {
      socket.emit('gamble', JSON.stringify({ gamble: value.toFixed(2) }));
    }
    setWinning(isWinningGamble ? gamble : 0.0);
    setGamble(0.0);
    isWinningGamble = true;
  };
  const logout = async () => {
    await fetch(`${BASE_URL}/auth/logout?username=${user}`, {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
    });
    navigate('/');
    dispatch({ type: 'LOGOUT' });
  };
  return (
    <div>
      {/* Main */}
      <div
        className={`${
          backgroundName != 'Main' ? 'hidden' : ''
        } flex flex-col mx-auto 2xl:w-[100%] xl:w-[98.8%] w-[675px]  bg-no-repeat inset-0 2xl:h-[906px] xl:h-[674px] h-[380px] bg-cover rotate`}
        style={{
          backgroundImage: `url(${Background})`,
        }}
      >
        <div className="relative">
          {/* header */}
          <div className="flex justify-between 2xl:h-[50px] xl:h-[34px] h-[24px]">
            <div className="flex 2xl:mt-[4px] mt-0">
              <p className="text-white text-center xl:font-extrabold font-semibold xl:text-[24px] text-[14px] 2xl:w-[493px] xl:w-[360px] w-[205px] 2xl:pl-[275px] xl:pl-[200px] pl-[115px]">
                {major}
              </p>
              <p className="text-white xl:font-extrabold font-semibold text-center xl:text-[24px] text-[14px] 2xl:pl-[157px] 2xl:w-[450px] xl:pl-[125px] xl:w-[335px] pl-[68px] w-[190px]">
                {jackpot}
              </p>
              <p className="text-white xl:font-extrabold font-semibold xl:text-[24px] text-[14px] text-center 2xl:pl-[150px] 2xl:w-[365px] xl:pl-[115px] xl:w-[283px] pl-[62px] w-[156px]">
                {minor}
              </p>
            </div>
            <div className="relative">
              <button
                onClick={toggleDrawer}
                className="2xl:w-[71px] xl:w-[50px] 2xl:h-[91px] xl:h-[70px] w-[30px] h-[40px] focus:outline-none hover:brightness-125 bg-no-repeat bg-center border-none p-0"
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
                className={`absolute top-[0px] z-40 2xl:w-[326px] xl:w-[245px] 2xl:h-[906px] xl:h-[675px] w-[141px] h-[379px] shadow-lg transform ease-in-out duration-300 ${
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
                <div className="flex flex-col 2xl:gap-[37.5px] xl:gap-[29px] 2xl:pt-[162px] xl:pt-[121px] 2xl:px-[21px] xl:px-[16px] gap-[17.5px] pt-[70px] px-[10px] ">
                  <button
                    onClick={() => navigate('/')}
                    className="2xl:h-[83px] xl:h-[62px] 2xl:w-[286px] xl:w-[216px] h-[35px] w-[123px] focus:outline-none hover:brightness-110 bg-no-repeat bg-center border-none"
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
                    className="2xl:h-[83px] xl:h-[62px] 2xl:w-[286px] xl:w-[216px] h-[35px] w-[123px] focus:outline-none hover:brightness-110 bg-no-repeat bg-center border-none"
                    style={{
                      backgroundImage: `url(${MenuHelpImage})`,
                      backgroundSize: 'cover',
                    }}
                  ></button>
                  <button
                    className="2xl:h-[83px] xl:h-[62px] 2xl:w-[286px] xl:w-[216px] h-[35px] w-[123px] focus:outline-none hover:brightness-110 bg-no-repeat bg-center border-none"
                    style={{
                      backgroundImage: `url(${
                        isAudioOn ? MenuAudioOnImage : MenuAudioOffImage
                      })`,
                      backgroundSize: 'cover',
                    }}
                    onClick={() => setIsAudioOn((previous) => !previous)}
                  ></button>
                  <button
                    className="2xl:h-[83px] xl:h-[62px] 2xl:w-[286px] xl:w-[216px] h-[35px] w-[123px] focus:outline-none hover:brightness-110 bg-no-repeat bg-center border-none"
                    style={{
                      backgroundImage: `url(${MenuLogoutImage})`,
                      backgroundSize: 'cover',
                    }}
                    onClick={logout}
                  ></button>
                  {/*  */}
                </div>
              </div>
            </div>
          </div>

          {payline !== 15 ? (
            <img
              src={`/src/assets/paylines/${payline}.png`}
              className={
                'absolute 2xl:ml-[55px] z-10 2xl:w-[1500px] 2xl:h-[560px] 2xl:mt-[135px] xl:w-[1120px] xl:h-[410px] xl:ml-[40px] xl:mt-[110px] h-[235px] w-[628px] ml-[25px] mt-[53px]'
              }
            />
          ) : (
            ''
          )}
          {/* content */}
          <div className="flex 2xl:mt-[102px] xl:mt-[82px] 2xl:gap-[19.2px] xl:gap-[14.2px] mt-[42px] gap-[8.2px] ">
            <div className="flex xl:gap-[3px] gap-[4px]">
              <div
                className="2xl:w-[64px] 2xl:h-[628px] 2xl:mt-[-11px] xl:w-[47px] xl:h-[468px] mt-[-8px] w-[27px] h-[265px]"
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
                setResult={isFreeSpin ? setResult6 : setResult5}
                onSpinEnd={handleSpinEnd}
                spinID={5}
                suceessID={allSuccessIDs[4]}
                payline={payline}
              />
              <div
                className="2xl:w-[64px] 2xl:h-[628px] 2xl:mt-[-11px] xl:w-[47px] xl:h-[468px] mt-[-8px] w-[27px] h-[265px]"
                style={{
                  backgroundImage: `url(${sideRight})`,
                  backgroundSize: 'cover',
                }}
              ></div>
            </div>
          </div>
          {/* bottom */}
          <div className="flex mt-[2px]">
            <div className="2xl:w-[374px] xl:w-[280px] w-[157px] ">
              <p className="gradient-text 2xl:pt-[55px] xl:pt-[30px] pt-[22px] bg-[#300E0C] xl:text-[36px] font-bold">
                {balance}
              </p>
            </div>
            <div className="2xl:w-[373px] xl:w-[280px] w-[144px] xl:mt-0 mt-[-3px]">
              <p className="gradient-text 2xl:text-[36px] xl:text-[30px] font-bold 2xl:pl-[76px] xl:pl-[50px] pl-[30px] 2xl:mt-[-4px] xl:mt-[-8px] mt-[0px]">
                {line}
              </p>
              <div className="flex 2xl:mt-[2px] xl:mt-[1px] mt-[1px]">
                <button
                  type="submit"
                  onClick={handleDecrementLine}
                  className="2xl:h-[81px] 2xl:w-[173px] xl:h-[55px] xl:w-[130px] h-[29px] w-[73px] focus:outline-none hover:brightness-125 bg-no-repeat bg-center border-none"
                  style={{
                    backgroundImage:
                      isAutoSpin || isFreeSpin
                        ? ''
                        : isSpinning
                        ? ''
                        : `url(${MinusImage})`,
                    backgroundSize: 'cover',
                  }}
                ></button>
                <button
                  type="submit"
                  onClick={handleIncrementLine}
                  className="2xl:h-[81px] 2xl:w-[173px] xl:h-[55px] xl:w-[130px] h-[29px] w-[73px] focus:outline-none hover:brightness-125 bg-no-repeat bg-center border-none ml-[-2px]"
                  style={{
                    backgroundImage:
                      isAutoSpin || isFreeSpin
                        ? ''
                        : isSpinning
                        ? ''
                        : `url(${PlusImage})`,
                    backgroundSize: 'cover',
                  }}
                ></button>
              </div>
            </div>
            <div className="2xl:w-[373px] xl:w-[280px] w-[166px] xl:mt-[-1px] mt-[-3px]">
              <p className="gradient-text 2xl:text-[36px] xl:text-[30px] font-bold 2xl:pl-[76px] pl-[25px] 2xl:mt-[-4px] mt-[-8px]">
                {(line * betValueArray[betValue - 1]).toFixed(2)}
              </p>
              <div className="flex 2xl:mt-[2px] xl:mt-[1px] mt-[3px] 2xl:ml-[7px] xl:ml-[3px] ml-[8px]">
                <button
                  type="submit"
                  onClick={handleDecrementBet}
                  className="2xl:h-[81px] 2xl:w-[173px] xl:h-[55px] xl:w-[130px] h-[29px] w-[76px] focus:outline-none hover:brightness-125 bg-no-repeat bg-center border-none"
                  style={{
                    backgroundImage:
                      isAutoSpin || isFreeSpin
                        ? ''
                        : isSpinning
                        ? ''
                        : `url(${MinusImage})`,
                    backgroundSize: 'cover',
                  }}
                ></button>
                <button
                  type="submit"
                  // onMouseEnter={handleIncrementBet}
                  onClick={handleIncrementBet}
                  className="2xl:h-[81px] 2xl:w-[173px] xl:h-[55px] xl:w-[130px] h-[29px] w-[76px] focus:outline-none hover:brightness-125 bg-no-repeat bg-center border-none ml-[-2px]"
                  style={{
                    backgroundImage:
                      isAutoSpin || isFreeSpin
                        ? ''
                        : isSpinning
                        ? ''
                        : `url(${PlusImage})`,
                    backgroundSize: 'cover',
                  }}
                ></button>
              </div>
            </div>
            <div className="w-auto xl:mt-[0px] mt-[-3px]">
              <p className="gradient-text 2xl:text-[36px] xl:text-[30px] font-bold 2xl:pl-[76px] xl:pl-[90px] pl-[40px] 2xl:mt-[-4px] mt-[-8px]">
                {winning.toFixed(2)}
              </p>
              <div className="flex xl:gap-[6px] 2xl:mt-[2px] xl:ml-[7px]">
                <button
                  type="submit"
                  // onClick={handleDecrementLine}
                  onClick={handleAutoSpinClick}
                  className="2xl:h-[81px] xl:h-[58px] 2xl:w-[243px] xl:w-[180px] h-[32px] w-[103px] focus:outline-none hover:brightness-125 bg-no-repeat bg-center border-none"
                  style={{
                    backgroundImage: isAutoSpin
                      ? `url(${StopSpinImage})`
                      : isSpinning || isFreeSpin
                      ? ''
                      : `url(${AutoStartImage})`,
                    backgroundSize: 'cover',
                  }}
                ></button>
                <audio ref={spinAudio} src={SpinAudio}></audio>
                <button
                  type="submit"
                  onClick={handleSpinClick}
                  className="focus:outline-none hover:brightness-125 border-none 2xl:w-[234px] xl:w-[180px] 2xl:h-[79px] xl:h-[56px] w-[104px] h-[32px] bg-opacity-0 aspect-auto object-cover"
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
          <audio ref={winAudio} src={WinAudio}></audio>

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
            } absolute gamble-image right-[1%] z-[30] 2xl:bottom-[127px] xl:bottom-[100px] bottom-[57px] 2xl:w-[250px] xl:w-[200px] w-[130px] cursor-pointer hover:brightness-125`}
          />
        </div>
      </div>
      {/* Help */}
      <div
        className={`${
          backgroundName != 'Help' ? 'hidden' : ''
        } flex flex-col justify-end 2xl:w-[1602px] xl:w-[1200px] z-[40] w-[657px] 2xl:h-[906px] xl:h-[674px] h-[371px] 
        `}
        style={{
          backgroundImage: `url(${helpBackground})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="flex justify-between xl:px-[8px] px-[4px]">
          <div className="2xl:pl-[59px] xl:pl-[43px] pl-[20px]">
            <img
              onClick={() => setBackgroundName('Main')}
              src={Back}
              className="2xl:w-auto xl:w-[200px] w-[110px] cursor-pointer mb-0.5 hover:brightness-110 bg-cover"
            />
            {/* </button> */}
          </div>
          <div
            className={`${
              pageNumber != 4
                ? '2xl:mr-[152px] xl:mr-[116px] mr-[9px]'
                : '2xl:mr-[470px] xl:mr-[359px] mr-[193px]'
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
              className="2xl:h-[81px] xl:h-[62px] h-[33px] 2xl:w-[636px] xl:w-[465px] w-[260px] focus:outline-none hover:brightness-105 bg-no-repeat bg-center border-none bg-cover"
              style={{
                backgroundImage:
                  pageNumber != 4
                    ? `url(${PaylineButton})`
                    : `url(${HidePaylineImage})`,
              }}
            ></button>
          </div>
          <div
            className={`flex 2xl:gap-[8px] xl:gap-[6px] lg:gap-[1px] gap-0 2xl:mt-[35px] xl:mt-[30px] mt-[10px] ${
              pageNumber == 4 ? 'hidden' : ''
            }`}
          >
            <button
              onClick={() => {
                setHelpBackground(HelpBackground1);
                setPageNumber(1);
              }}
              className={`2xl:h-[40px] xl:h-[27px] h-[22px] 2xl:w-[50px] xl:w-[24px] w-[24px] focus:outline-none hover:brightness-110 bg-no-repeat border-none bg-cover`}
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
              className={`2xl:h-[40px] xl:h-[27px] h-[22px] 2xl:w-[49px] xl:w-[24px] w-[24px] focus:outline-none hover:brightness-110 bg-no-repeat border-none bg-cover`}
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
              className={`2xl:h-[38px] xl:h-[27px] h-[22px] 2xl:w-[48px] xl:w-[24px] w-[24px]  focus:outline-none hover:brightness-110 bg-no-repeat border-none bg-cover`}
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
        } flex flex-col 2xl:w-[1602px] xl:w-[1200px] z-[40] w-[657px] 2xl:h-[906px] xl:h-[674px] h-[371px] 2xl:pt-[278px] xl:pt-[208px] pt-[114px] 2xl:gap-[20px]  
        `}
        style={{
          backgroundImage: `url(${GambleBackgroundImage})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="flex 2xl:pl-[270px] xl:pl-[202px] xl:pr-[275px] pl-[110px] pr-[113px] xl:gap-[36px] gap-[2px] justify-between">
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
            className="2xl:w-[339px] xl:w-[250px] w-[139px] 2xl:h-auto xl:h-[200px] h-[105px] cursor-pointer hover:brightness-125 bg-cover"
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
            } 2xl:w-[269px] xl:w-[200px] w-[111px] ml-[12px]`}
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
            className="2xl:w-[339px] xl:w-[250px] w-[141px] 2xl:h-auto xl:h-[200px] h-[105px] cursor-pointer hover:brightness-125"
          />
        </div>
        <div className="h-[48px]">
          <p
            className={`${
              winingString ? '' : 'hidden'
            } text-white text-center font-bold 2xl:text-[32px] 2xl:pt-[0px] xl:text-[26px] xl:pt-[10px] pt-[4px]`}
          >
            YOU WIN {(gamble * 2).toFixed(2)}
          </p>
        </div>

        <div className="grid grid-cols-2 2xl:px-[442px] xl:px-[340px] px-[187px] gap 2xl:mt-[28px] xl:mt-[36px] mt-[-4px] 2xl:text-[32px] xl:text-[26px]">
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
            className="2xl:mt-[26px] xl:mt-[32px] xl:ml-[12px] 2xl:w-[290px] 2xl:h-auto xl:w-[220px] xl:h-[80px] mt-[18px] ml-[6px] h-[40px] bg-cover cursor-pointer hover:brightness-105"
          />
        </div>
      </div>
    </div>
  );
};
export default Safari;
