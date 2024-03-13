import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import HelpBackground from '../../assets/help/background.png';
import Back from '../../assets/help/back.png';
import PaylineButton from '../../assets/help/paylines.png';
import PaylineImage from '../../assets/help/payline.png';
import Pagination1 from '../../assets/help/pagination1.png';
import Pagination2 from '../../assets/help/pagination2.png';
import Pagination3 from '../../assets/help/pagination3.png';

const SafariHelp = () => {
  const [helpBackground, setHelpBackground] = useState(HelpBackground);

  const navigate = useNavigate();
  return (
    <div>
      <div
        className="flex flex-col justify-end w-[1602px] h-[906px]"
        style={{
          backgroundImage: `url(${helpBackground})`,
          backgroundSize: 'cover',
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
          <div className="ml-[-149px]">
            <button
              onClick={() => setHelpBackground(PaylineImage)}
              className="h-[81px] w-[636px] focus:outline-none hover:brightness-105 bg-no-repeat bg-center border-none"
              style={{ backgroundImage: `url(${PaylineButton})` }}
            ></button>
          </div>
          <div className="mt-[35px]">
            <button
              onClick={() => setHelpBackground(PaylineImage)}
              className="h-[40px] w-[163px] focus:outline-none bg-no-repeat bg-center border-none"
              style={{ backgroundImage: `url(${Pagination1})` }}
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafariHelp;
