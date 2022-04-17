import { useState, useEffect, useRef } from 'react';

const Counter = () => {
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
	}, []);

	const secStart = () => {
		secRef.current = setInterval(() => {
			setSecond(prev => prev + 1);
		}, 1000);
	};

	const milStart = () => {
		milRef.current = setInterval(() => {
			setMilliSecond(prev => {
				if (prev === 99) {
					return 0;
				}
				return prev + 1;
			});
		}, 10);
	};

	const handleClear = () => {
		clearInterval(secRef.current);
		clearInterval(milRef.current);
	};

	return (
		<div className='stop_watch'>
			<h1>Stop Watch</h1>

			<input
				type='Number'
				id='second'
				placeholder='enter seconds'
				onChange={e => setSecond(Number(e.target.value))}
			/>
			<h1>
				<span className='sec'>{second}</span>s
				<span className='mil'> {milliSecond}</span>
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

export default Counter;
