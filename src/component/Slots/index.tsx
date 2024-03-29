import { FC, useState, useEffect } from 'react';
import './index.css';
import {
  get_initial_items,
  get_slot_items,
} from '../../utils/get_slot_items.js';
import {
  SET_RESULT_ITEM,
  INITIAL_ITEMS_GIF,
} from '../../constants/iinitial_items.js';
export interface Props {
  count: number;
  isSpinning: boolean; // New prop to control spinning
  setResult: (result: string[]) => void;
  onSpinEnd: () => void;
  spinID: number;
  suceessID: Array<number>;
  payline: number;
  // paylineID?: number;
}
let isSpinEnd=false
let items = new Array();
const paylineColor = [
  `border-[5px] xl:border-[8px] 2xl:border-[10px] border-[#FFF516]`,
  `border-[5px] xl:border-[8px] 2xl:border-[10px] border-[#DF398E]`,
  `border-[5px] xl:border-[8px] 2xl:border-[10px] border-[#2586C5]`,
  `border-[5px] xl:border-[8px] 2xl:border-[10px] border-[#AD03DD]`,
  `border-[5px] xl:border-[8px] 2xl:border-[10px] border-[#1B4CA4]`,
  `border-[5px] xl:border-[8px] 2xl:border-[10px] border-[#D5C023]`,
  `border-[5px] xl:border-[8px] 2xl:border-[10px] border-[#7EA60C]`,
  `border-[5px] xl:border-[8px] 2xl:border-[10px] border-[#0ABA48]`,
  `border-[5px] xl:border-[8px] 2xl:border-[10px] border-[#E63009]`,
  `border-[5px] xl:border-[8px] 2xl:border-[10px] border-[#FBBD00]`,
  `border-[5px] xl:border-[8px] 2xl:border-[10px] border-[#C2E21A]`,
  `border-[5px] xl:border-[8px] 2xl:border-[10px] border-[#FBBD00]`,
  `border-[5px] xl:border-[8px] 2xl:border-[10px] border-[#03D78E]`,
  `border-[5px] xl:border-[8px] 2xl:border-[10px] border-[#810792]`,
  `border-[5px] xl:border-[8px] 2xl:border-[10px] border-[#1E0FA6]`,
  `border-[5px] xl:border-[8px] 2xl:border-[10px] border-[#04BC45]`,
];
const Slot: FC<Props> = ({
  count,
  isSpinning,
  setResult,
  onSpinEnd,
  spinID,
  suceessID,
  payline,
}) => {
  const [currentImages, setCurrentImages] = useState<string[]>(() => []);
  const [initial_items, setInitialItems] = useState<string[]>(() => []);
  
  useEffect(() => {
    if (isSpinning) {
      isSpinEnd=false
      items = get_slot_items(count);
      items.push(...initial_items);
      setCurrentImages(items);

      items = [];
    }else if(isSpinEnd===false){
      setInitialItems([currentImages[4], currentImages[5], currentImages[6]]);
      setResult([
        SET_RESULT_ITEM[currentImages[4]],
        SET_RESULT_ITEM[currentImages[5]],
        SET_RESULT_ITEM[currentImages[6]],
      ]);
    }
  }, [isSpinning]);
  useEffect(() => {
    let items = get_initial_items();
    setInitialItems(() => items);
  }, []);

  const spinEnd = () => {
    isSpinEnd=true
    setInitialItems([currentImages[0], currentImages[1], currentImages[2]]);
    setResult([
      SET_RESULT_ITEM[currentImages[0]],
      SET_RESULT_ITEM[currentImages[1]],
      SET_RESULT_ITEM[currentImages[2]],
    ]);
  };
  return (
    <div>
      <div className="overflow-hidden 2xl:w-[280px] xl:w-[208px] 2xl:h-[618px] xl:h-[459px] h-[255px]">
        {isSpinning
          ? currentImages.map((imageSrc, index) => (
              <img
                key={index}
                src={`https://i.postimg.cc/${imageSrc}`}
                className={`2xl:w-[280px] 2xl:h-[206px] xl:w-[208px] xl:h-[153px] w-[132px] h-[85px] spinning${count}-2xl spinning${count} spinning${count}-xl`}
                alt={`Slot ${index}`}
                onAnimationEnd={() => {
                  if (spinID == 5) {
                    spinEnd();
                    onSpinEnd();
                    
                  } else {
                    spinEnd();
                  }
                }}
              />
            ))
          : initial_items.map((imageSrc, index) => (
              <img
                key={index}
                src={
                  suceessID[index] === 0
                    ? `https://i.postimg.cc/${imageSrc}`
                    : `https://i.postimg.cc/${INITIAL_ITEMS_GIF[imageSrc]}.gif`
                }
                className={`relative 2xl:w-[280px] ${suceessID[index] === 0?'z-[0]':'z-[30]'} 2xl:h-[206px] xl:w-[208px] xl:h-[153px] w-[132px] h-[85px]  ${
                  suceessID[index] === 0 ? '' : paylineColor[payline]
                }`}
                alt={`Slot ${suceessID[index]}`}
              />
              
            ))}
      </div>
    </div>
  );
};
export default Slot;
