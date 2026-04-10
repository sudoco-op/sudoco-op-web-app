import React, { useState, useEffect } from 'react';


const GameTimer= ({ startTime }:{startTime:number}) => {
    const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
    console.log(startTime)

    useEffect(() => {
        // Initial time diffrence calculation
        const calculateElapsed = () => {
            const now = Date.now();
            const difference = Math.floor((now - startTime) / 1000);
            setElapsedSeconds(difference > 0 ? difference : 0);
        };

        calculateElapsed();

        // Seting up interval to update every second
        const interval = setInterval(calculateElapsed, 1000);

        return () => clearInterval(interval);
    }, [startTime]);

    // function to format seconds into MM:SS
    const formatTime = (totalSeconds: number) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div>
            <span className="text-2xl font-bold">{formatTime(elapsedSeconds)}</span>
        </div>
    );
};

export default GameTimer;