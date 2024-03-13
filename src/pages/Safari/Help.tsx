import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
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

const SafariHelp = () => {
  const navigate = useNavigate();
  const [helpBackground, setHelpBackground] = useState(HelpBackground1);
  const [pageNumber, setPageNumber] = useState(1);

  return (
    <div
      className={`flex flex-col justify-end w-[1602px] h-[906px]
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
            onClick={() => navigate('/safari')}
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
  );
};

export default SafariHelp;
