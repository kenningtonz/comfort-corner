import { useGameStore } from "@gameStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faMusic,
	faHouse,
	faEarthAmericas,
	faDeleteLeft,
	faVolumeXmark,
	faVolumeHigh,
	faCheck,
} from "@fortawesome/free-solid-svg-icons";
import useSound from "use-sound";
import EnvironmentUI from "@ui/EnvironmentUI";
import InsideUI from "@ui/InsideUI";
import MusicUI from "@ui/MusicUI";
import { motion } from "framer-motion";
import { useState } from "react";
import PopUp from "./PopUp";

import ViewUI from "@ui/ViewUI";

export const UI = () => {
	const gameState = useGameStore((state) => state.gameState);
	const setGameState = useGameStore((state) => state.setGameState);
	const goToHome = useGameStore((state) => state.goToHome);
	const setMuted = useGameStore((state) => state.setMuted);
	const soundMuted = useGameStore((state) => state.muted);
	const [clickSound] = useSound("/soundEffects/click.mp3", {
		volume: soundMuted ? 0 : 0.5,
	});
	const [confirmationSound] = useSound("/soundEffects/confirmation.mp3", {
		volume: soundMuted ? 0 : 0.5,
	});
	const [questionSound] = useSound("/soundEffects/question.mp3", {
		volume: soundMuted ? 0 : 0.5,
	});
	const [selectSound] = useSound("/soundEffects/select.mp3", {
		volume: soundMuted ? 0 : 0.5,
	});
	const [popUp, setPopUp] = useState(false);

	return (
		<main className='absolute top-0 inset-4 flex flex-col pointer-events-none justify-between items-center overflow-hidden'>
			<section
				className={` p-4 ${
					popUp ? `pointer-events-non` : `pointer-events-auto`
				} self-start justify-self-start w-full`}
			>
				<div className=' flex w-full justify-between flex-wrap sm:flex-nowrap gap-y-4 '>
					<motion.button
						onClick={() => {
							setPopUp(true);
							questionSound();
						}}
						aria-label='back'
						whileTap={{ scale: 0.95 }}
						className={`iconBtn red sm:order-1 order-2`}
					>
						<FontAwesomeIcon size='xl' icon={faDeleteLeft} />
					</motion.button>

					<div className='rainbowBorder sm:order-2 order-1 sm:w-auto w-full'>
						<div className='flex  rainbowInner p-1 gap-2 justify-self-center'>
							<button
								onClick={() => {
									clickSound();
									gameState != "music" ? setGameState("music") : setGameState(null);
								}}
								className='uiBtn'
								data-active={gameState == "music"}
							>
								<FontAwesomeIcon size='2xl' icon={faMusic} />
								<p className='text-sm'>Music</p>
							</button>
							<button
								onClick={() => {
									clickSound();
									gameState != "outside" ? setGameState("outside") : setGameState(null);
								}}
								className='uiBtn'
								data-active={gameState == "outside"}
							>
								<FontAwesomeIcon size='2xl' icon={faEarthAmericas} />
								<p className='text-sm'>Outside</p>
							</button>
							<button
								onClick={() => {
									clickSound();
									gameState != "inside" ? setGameState("inside") : setGameState(null);
								}}
								className='uiBtn'
								data-active={gameState == "inside"}
							>
								<FontAwesomeIcon size='2xl' icon={faHouse} />
								<p className='text-sm'>Inside</p>
							</button>
							<button
								onClick={() => {
									clickSound();
									gameState != "view" ? setGameState("view") : setGameState(null);
								}}
								className='uiBtn'
								data-active={gameState == "view"}
							>
								<FontAwesomeIcon size='2xl' icon={faCheck} />
								<p className='text-sm'>Done</p>
							</button>
						</div>
					</div>

					<motion.button
						onClick={() => {
							setMuted(!soundMuted);
							clickSound();
						}}
						aria-label='mute'
						whileTap={{ scale: 0.95 }}
						whileHover={{ scale: 1.05 }}
						className={`iconBtn sm:order-3 order-2`}
					>
						<FontAwesomeIcon
							size='xl'
							icon={soundMuted ? faVolumeXmark : faVolumeHigh}
						/>
					</motion.button>
				</div>
			</section>
			<PopUp isOpen={popUp} setIsOpen={setPopUp}>
				<>
					<p className='text-center text-xl font-bold '>
						Are you sure you want to go back to the home screen?
					</p>
					<p className='text-center text-lg'>
						If you haven't saved this will reset your corner.
					</p>
					<div className='flex my-2 gap-4 justify-center'>
						<button
							onClick={() => {
								goToHome();
								setPopUp(false);
							}}
							className='btn red px-4 py-2'
						>
							Back to Home
						</button>
						<button
							onClick={() => {
								setPopUp(false);
							}}
							className='btn green px-4 py-2'
						>
							Stay in Corner
						</button>
					</div>
				</>
			</PopUp>
			<section
				className={`flex items-center justify-center self-end justify-self-end w-full  transition ${
					popUp ? `pointer-events-none` : ``
				} `}
			>
				{gameState === "inside" ? <InsideUI muted={soundMuted} /> : null}
				{gameState === "music" ? <MusicUI selectSound={selectSound} /> : null}
				{gameState === "outside" ? (
					<EnvironmentUI selectSound={selectSound} />
				) : null}
				{gameState === "view" ? <ViewUI sound={confirmationSound} /> : null}
			</section>
		</main>
	);
};
