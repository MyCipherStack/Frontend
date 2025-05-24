// components/Timer.tsx
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useEffect, useState } from 'react';
import { startTimer, resetTimer } from '../features/timerSlice';

const Timer = ({timerControler}) => {
  const dispatch = useDispatch();
  const { startTime, isRunning } = useSelector((state: RootState) => state.timer);
  const [elapsed, setElapsed] = useState('00:00:00');

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && startTime) {
      interval = setInterval(() => {
        const secondsPassed = Math.floor((Date.now() - startTime) / 1000);
        const h = String(Math.floor(secondsPassed / 3600)).padStart(2, '0');
        const m = String(Math.floor((secondsPassed % 3600) / 60)).padStart(2, '0');
        const s = String(secondsPassed % 60).padStart(2, '0');
        setElapsed(`${h}:${m}:${s}`);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, startTime]);

  return (
    <div className="inline">
      <span className="text-sm text-gray-400">Session Time: </span>
      <span className="neon-text">{elapsed}</span>
    {timerControler && (

        <span className="ml-2 space-x-2">
        <button onClick={() => dispatch(startTimer())} className="bg-green-600 px-2 py-0.5 rounded">Start</button>
        <button onClick={() => dispatch(resetTimer())} className="bg-red-500 px-2 py-0.5 rounded">Reset</button>
        </span> 
        )}
    </div>
  );
};

export default Timer;
