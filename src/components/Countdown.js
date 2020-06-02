import React, { useEffect, useState } from 'react';

function Countdown(props) {
    const calculateTimeLeft = () => {
        const difference = +new Date(props.date) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
    });

    const timerComponents = [];

    Object.keys(timeLeft).forEach(interval => {
        if (!timeLeft[interval]) {
            return;
        }

        timerComponents.push(
            <span>
        {timeLeft[interval]} {interval}{" "}
      </span>
        );
    });

    return (
        <div className="px-3 py-2 font-medium text-sm leading-5 rounded-md text-gray-600 bg-gray-200">
            {timerComponents.length ? timerComponents : <span>:(</span>}
        </div>
    );
}

export default Countdown;