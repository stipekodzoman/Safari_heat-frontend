import { FC, useState, useEffect } from 'react';
import './index.css';
import NumberNine from '../../assets/09.png';
import NumberTen from '../../assets/10.png';
import NumberEleven from '../../assets/11.png';
import NumberTwelve from '../../assets/12.png';
import NumberThirteen from '../../assets/13.png';
import NumberFourteen from '../../assets/14.png';
import FirstAnimal from '../../assets/animal (1).png';
import SecondAnimal from '../../assets/animal (2).png';
import ThirdAnimal from '../../assets/animal (3).png';
import FourthAnimal from '../../assets/animal (4).png';
import FifthAnimal from '../../assets/animal (5).png';
import Wild from '../../assets/wild.png';
import Scatter from '../../assets/scatter.png';

export interface Props {
  count: number;
  isSpinning: boolean; // New prop to control spinning
  onSpinEnd: () => void;
  speed: string;
}
const Slot: FC<Props> = ({ count, isSpinning, onSpinEnd, speed }) => {
  const images = [
    NumberNine,
    NumberTen,
    NumberEleven,
    NumberTwelve,
    NumberThirteen,
    NumberFourteen,
    FirstAnimal,
    SecondAnimal,
    ThirdAnimal,
    FourthAnimal,
    FifthAnimal,
    Wild,
    Scatter,
  ];
  const [currentImages, setCurrentImages] = useState<string[]>(() => []);
  useEffect(() => {
    if (isSpinning) {
      const newImages = generateRandomImages();
      setCurrentImages(newImages);
    }
    console.log(currentImages);
  }, [isSpinning]);

  // Helper function to generate an array of random image paths
  const generateRandomImages = (): string[] => {
    return Array.from(
      { length: count },
      () => images[Math.floor(Math.random() * images.length)]
    );
  };

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
