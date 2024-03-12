import { FC, useState, useEffect } from 'react';
import './index.css';
import {get_initial_items, get_slot_items} from '../../utils/get_slot_items.js'
export interface Props {
  count: number;
  isSpinning: boolean; // New prop to control spinning
  onSpinEnd: () => void;
}

let items=new Array()
const Slot: FC<Props> = ({ count, isSpinning, onSpinEnd}) => {
    const [currentImages, setCurrentImages] = useState<string[]>(() => []);
    const [initial_items, setInitialItems] = useState<string[]>(() => []);
    useEffect(() =>{
      setInitialItems(get_initial_items())
    },[])

    useEffect(()=> {
      items=get_slot_items(count)
      items.push(...initial_items);
      setCurrentImages(items)
      console.log(currentImages)
      items=[]
    },[isSpinning])
    const spinEnd=()=>{
      setInitialItems([currentImages[0],currentImages[1],currentImages[2]])
    }
    return (
      <div className="slot-machine">
        <div className="slot-container">
          
          {
            isSpinning?currentImages.map((imageSrc, index) => (
              <img
                key={index}
                src={`src/assets/${imageSrc}.png`}
                className={`w-[280px] h-[206px] spinning${count}`}
                alt={`Slot ${index}`}
                onAnimationEnd={() =>{
                  onSpinEnd()
                  spinEnd()
                }
                }
                // onAnimationEnd={onSpinEnd}
              />
            ))
            :
            initial_items.map((imageSrc, index) => 
              <img
                key={index}
                src={`src/assets/${imageSrc}.png`}
                className={`w-[280px] h-[206px]`}
                alt={`Slot ${index}`}
                onAnimationEnd={() =>{
                    onSpinEnd()
                    spinEnd()
                  }
                }
              />
            )
          }
        </div>
      </div>
    );
};
export default Slot;
