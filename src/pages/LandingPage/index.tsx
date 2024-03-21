import { useNavigate } from 'react-router-dom';
import './index.css';
import { useState, useContext, useEffect } from 'react';
import { BASE_URL } from '../../config/config';
//@ts-ignore
import { AuthContext } from '../../context/AuthContext.jsx';
const Background = 'https://i.postimg.cc/yx3Bkh9B/login.gif';
const CheckboxDisable = 'https://i.postimg.cc/kMLNZqfp/disable-check.png';
const CheckboxEnable = 'https://i.postimg.cc/TYmjvFsY/enable-check.png';
const LoginImage = 'https://i.postimg.cc/KjcsJrKz/login_btn.png';
const HideExit = 'https://i.postimg.cc/G28HGdLG/exit_hide.png';
const Version = 'https://i.postimg.cc/FRxSKkSP/hide_versioin.png';
const ContentImage = 'https://i.postimg.cc/rwPwhPwq/Snag_12ccac4f.png';
const ErrorPanel = 'https://i.postimg.cc/nVwsyc2t/error.png';

const LandingPage = () => {
  const navigate = useNavigate();
  //@ts-ignore
  const { dispatch, user, accessToken } = useContext(AuthContext);
  const [checkImage, setCheckImage] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const [isAutoPassword,setIsAutoPassword]=useState("off")
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [modalText, setModalText] = useState('');
  useEffect(()=>{
    setIsAutoPassword(checkImage?"on":"off")
    console.log(isAutoPassword)
  },[checkImage])
  useEffect(() => {
    const verify = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/auth/verify?username=${user}&token=${accessToken}`,
          {
            method: 'post',
            headers: {
              'content-type': 'application/json',
            },
          }
        );
        const { success } = await res.json();
        console.log(success);
        setIsValid(success);
        if (success) {
          navigate('/safari');
        }
      } catch (error) {
        console.log(error);
      }
    };
    verify();
  }, [user, accessToken]);
  const handleChange = (e: { target: { id: string; value: string } }) => {
    if (e.target.id == 'username') {
      setUsername(() => e.target.value);
    } else if (e.target.id == 'password') {
      setPassword(() => e.target.value);
    }
  };

  const login = async () => {
    try {
      const res = await fetch(
        `${BASE_URL}/auth/login?username=${username}&password=${password}`,
        {
          method: 'post',
          headers: {
            'content-type': 'application/json',
          },
        }
      );
      const result = await res.json();
      if (result.success == false) {
        setModalText(result.message);
        setPwdModal(true);
      } else {
        dispatch({
          type: 'LOGIN_SUCCESS',
          username: username,
          token: result.accessToken,
        });
        navigate('/safari');
      }
    } catch (err) {
      console.log(err);
    }
    if (checkImage) {
      localStorage.setItem('paasword', password);
    } else {
      localStorage.removeItem('password');
    }
  };
  const [pwdModal, setPwdModal] = useState(false);
  return (
    !isValid && (
      <div
        className="relative flex flex-col 2xl:w-[1602px] xl:w-[1200px] w-[657px] 2xl:h-[906px] xl:h-[674px] h-[371px] bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url(${Background})`,
        }}
      >
        <div className="flex justify-end">
          <img
            src={HideExit}
            className="xl:w-[80px] xl:h-[80px] w-[40px] h-[40px]"
          />
        </div>
        <div
          style={{
            backgroundImage: `url(${ContentImage})`,
          }}
          className="2xl:w-[862px] 2xl:h-[497px] 2xl:mt-[166px] 2xl:ml-[375px] xl:w-[638px] xl:h-[371px] xl:mt-[103px] xl:ml-[279px] w-[348px] h-[206px] mt-[61px] ml-[153px] bg-no-repeat bg-cover"
        >
          <div className="flex flex-col justify-center 2xl:gap-[61px] xl:gap-[45px] gap-[27px] 2xl:mt-[39px] 2xl:px-[81px] xl:mt-[30px] xl:px-[56px] mt-[17px] px-[24px]">
            <input
              id="username"
              onChange={handleChange}
              autoComplete={isAutoPassword}
              className="2xl:ml-[232px] xl:ml-[176px] ml-[105px] pl-2 2xl:h-[62px] xl:h-[46px] h-[24px] 2xl:text-[32px] xl:text-[22px] text-white xl:rounded-xl rounded-md border-2 border-black bg-[#0C0142]"
            />
            <input
              id="password"
              type="password"
              onChange={handleChange}
              autoComplete={isAutoPassword}
              className="2xl:ml-[232px] xl:ml-[176px] ml-[105px] pl-2 2xl:h-[62px] xl:h-[46px] h-[24px] 2xl:text-[32px] xl:text-[22px] text-white xl:rounded-xl rounded-md border-2 border-black bg-[#0C0142]"
            />
          </div>
          <div className="flex items-center xl:gap-6 gap-2 2xl:mt-[129px] 2xl:pl-[197px] xl:mt-[88px] xl:pl-[140px] mt-[57px] pl-[74px]">
            <div
              onClick={() => {
                setCheckImage(!checkImage);
              }}
              className="2xl:w-[59px] 2xl:h-[59px] xl:w-[40px] xl:h-[40px] w-[26px] h-[26px] cursor-pointer "
              style={{
                backgroundImage: checkImage
                  ? `url(${CheckboxEnable})`
                  : `url(${CheckboxDisable})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
              }}
            />
            <p className="text-white 2xl:text-[38px] xl:text-[30px]">
              REMEMBER PASSWORD
            </p>
          </div>
          <div className="2xl:mt-[140px] 2xl:ml-[12px] xl:mt-[111px] xl:ml-[16px] mt-[51px] ml-[9px] justify-end">
            <button
              type="button"
              onClick={login}
              className="text-white 2xl:w-[348px] 2xl:h-[97px] xl:w-[260px] xl:h-[72px] w-[140px] h-[40px] hover:brightness-110 bg-no-repeat border-none bg-cover"
              style={{
                backgroundImage: `url(${LoginImage})`,
              }}
            ></button>
          </div>
        </div>
        <div
          style={{
            backgroundImage: `url(${ErrorPanel})`,
          }}
          className={`${
            pwdModal ? '' : 'hidden'
          } absolute text-center 2xl:w-[862px] 2xl:h-[438px] 2xl:mt-[266px] 2xl:ml-[375px] xl:w-[648px] xl:h-[330px] xl:mt-[203px] xl:ml-[278px] w-[348px] h-[176px] mt-[118px] ml-[156px]  bg-no-repeat bg-cover`}
        >
          <p className="2xl:mt-[180px] 2xl:mb-[115px] xl:mt-[130px] xl:mb-[85px] mt-[80px] mb-[32px] text-white 2xl:text-[32px] xl:text-[26px]">
            {modalText}
          </p>
          <button
            type="submit"
            onClick={() => setPwdModal(false)}
            className="2xl:w-[205px] 2xl:h-[62px] xl:w-[155px] xl:h-[52px] w-[85px] h-[32px] rounded-full hover:brightness-125 focus:outline-none border-none"
          ></button>
        </div>

        <div className="flex justify-end">
          <img
            src={Version}
            className="absolute left-0 bottom-0 2xl:w-[176px] 2xl:h-[57px] xl:w-[131px] xl:h-[41px] w-[73px] h-[24px]"
          />
        </div>
        {/* <Outlet /> */}
      </div>
    )
  );
};
export default LandingPage;
