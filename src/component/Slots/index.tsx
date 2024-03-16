import { FC, useState, useEffect } from 'react';
import './index.css';
import {
  get_initial_items,
  get_slot_items,
} from '../../utils/get_slot_items.js';
export interface Props {
  count: number;
  isSpinning: boolean; // New prop to control spinning
  setResult: (result: string[]) => void;
  onSpinEnd: () => void;
  spinID: number;
  suceessID: Array<number>;
  payline:number
  // paylineID?: number;
}

let items = new Array();
const paylineColor = [
  `w-[280px] h-[206px] border-[10px] border-[#FFF516]`,
  `w-[280px] h-[206px] border-[10px] border-[#DF398E]`,
  `w-[280px] h-[206px] border-[10px] border-[#2586C5]`,
  `w-[280px] h-[206px] border-[10px] border-[#AD03DD]`,
  `w-[280px] h-[206px] border-[10px] border-[#1B4CA4]`,
  `w-[280px] h-[206px] border-[10px] border-[#D5C023]`,
  `w-[280px] h-[206px] border-[10px] border-[#7EA60C]`,
  `w-[280px] h-[206px] border-[10px] border-[#0ABA48]`,
  `w-[280px] h-[206px] border-[10px] border-[#E63009]`,
  `w-[280px] h-[206px] border-[10px] border-[#C2E21A]`,
  `w-[280px] h-[206px] border-[10px] border-[#FBBD00]`,
  `w-[280px] h-[206px] border-[10px] border-[#FBBD00]`,
  `w-[280px] h-[206px] border-[10px] border-[#03D78E]`,
  `w-[280px] h-[206px] border-[10px] border-[#810792]`,
  `w-[280px] h-[206px] border-[10px] border-[#1E0FA6]`,
  `w-[280px] h-[206px] border-[10px] border-[#04BC45]`,
];
const Slot: FC<Props> = ({
  count,
  isSpinning,
  setResult,
  onSpinEnd,
  spinID,
  suceessID,
  payline
}) => {
  const [currentImages, setCurrentImages] = useState<string[]>(() => []);
  const [initial_items, setInitialItems] = useState<string[]>(() => []);
  useEffect(() => {
    let items = get_initial_items();
    setInitialItems(() => items);
  }, []);

  useEffect(() => {
    if (isSpinning) {
      items = get_slot_items(count);
      items.push(...initial_items);
      setCurrentImages(items);

      items = [];
    }
  }, [isSpinning]);
  const spinEnd = () => {
    setInitialItems([currentImages[0], currentImages[1], currentImages[2]]);
    setResult([currentImages[0], currentImages[1], currentImages[2]]);
  };
  return (
    <div className="slot-machine">
      <div className="slot-container">
        {isSpinning
          ? currentImages.map((imageSrc, index) => (
              <img
                key={index}
                src={`src/assets/${imageSrc}.png`}
                className={`w-[280px] h-[206px] spinning${count}`}
                alt={`Slot ${index}`}
                onAnimationEnd={() => {
                  if (spinID == 5) {
                    onSpinEnd();
                    spinEnd();
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
                    ? `src/assets/${imageSrc}.png`
                    : `src/assets/gif/${imageSrc}.gif`
                }
                className={suceessID[index] === 0?`w-[280px] h-[206px] `:paylineColor[payline]}
                alt={`Slot ${suceessID[index]}`}
              />
            ))}
      </div>
    </div>
  );
};
export default Slot;
