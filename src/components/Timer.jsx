import { useState, useEffect, useRef } from 'react';

const Timer = () => {
	const [second, setSecond] = useState(0);
	const [milliSecond, setMilliSecond] = useState(0);
	const [act, setAct] = useState(false);
	const secRef = useRef(null);
	const milRef = useRef(null);

	useEffect(() => {
		if (act) {
			secStart();
			milStart();
		}

		return () => {
			handleClear();
		};
	}, []);

	const secStart = () => {
		secRef.current = setInterval(() => {
			setSecond(prev => prev + 1);
		}, 60000);
	};

	const milStart = () => {
		milRef.current = setInterval(() => {
			setMilliSecond(prev => {
				if (prev >= 60) {
					return 0;
				}
				return prev + 1;
			});
		}, 1000);
	};

	const handleClear = () => {
		clearInterval(secRef.current);
		clearInterval(milRef.current);
	};

	return (
		<div className='stop_watch'>
			<h1>Masai Timer</h1>

			<input
				type='Number'
				id='minute'
				placeholder='enter minute'
				onChange={e => setSecond(Number(e.target.value))}
			/>

			<input
				type='Number'
				id='second'
				placeholder='enter seconds'
				onChange={e => setMilliSecond(Number(e.target.value))}
			/>
			<h1>
				<span className='sec'>{second}</span>m
				<span className='mil'> {milliSecond}s</span>
			</h1>
			<div className='buttons'>
				<button
					onClick={() => {
						handleClear();
					}}
				>
					stop
				</button>
				<button
					onClick={() => {
						secStart();
						milStart();
						setAct(!act);
					}}
				>
					start
				</button>
				<button
					onClick={() => {
						handleClear();
						setSecond(0);
						setMilliSecond(0);
					}}
				>
					reset
				</button>
			</div>
		</div>
	);
};

export default Timer;
