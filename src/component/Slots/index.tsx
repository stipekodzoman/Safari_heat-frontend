import { FC, useState, useEffect } from 'react';
import './index.css';
import nine from '../../assets/09.png';
import ten from '../../assets/10.png';
import jack from '../../assets/11.png';
import quene from '../../assets/12.png';
import king from '../../assets/13.png';
import ace from '../../assets/14.png';
import elephant from '../../assets/animal (1).png';
import bison from '../../assets/animal (2).png';
import rhino from '../../assets/animal (3).png';
import zebra from '../../assets/animal (4).png';
import falmingo from '../../assets/animal (5).png';
import lion from '../../assets/wild.png';
import tree from '../../assets/scatter.png';
import {get_initial_items, get_slot_items} from "../utils/get_slot_items.js";
export interface Props {
  count: number;
  isSpinning: boolean; // New prop to control spinning
  onSpinEnd: () => void;
}
const Slot: FC<Props> = ({ count, isSpinning, onSpinEnd}) => {
  const [currentImages, setCurrentImages] = useState<string[]>(() => []);
  useEffect(() => {
    const initial_items=get_initial_items()
    setCurrentImages(initial_items)
  }, []);
  if (isSpinning){
    const items=get_slot_items(count)
    setCurrentImages(items)
  }
  return (
    <div className="slot-machine">
      <div className="slot-container">
        {currentImages.map((imageSrc, index) => (
          <img
            key={index}
            src={imageSrc}
            className={`w-[280px] h-[206px] ${isSpinning && speed}`}
            alt={`Slot ${index}`}
            onAnimationEnd={() =>
              isSpinning &&
              index === currentImages.length * length &&
              onSpinEnd()
            }
            // onAnimationEnd={onSpinEnd}
          />
        ))}
      </div>
    </div>
  );
};
export default Slot;
