import { useGameStore } from "../state/store";
import { MusicTracks } from "../data/music";
import { useEffect } from "react";
import { setAudioRef } from "../state/audioStoreFunctions";
import useSound from "use-sound";

export const MusicManager = () => {
	const muted = useGameStore((state) => state.muted);
	useEffect(() => {
		const audio = document.getElementById("musicTag");

		setAudioRef(audio);
	}, []);
	const { track, volume, playing } = useGameStore((state) => state.audio);

	const trackPath = Object.values(MusicTracks)[track].path;

	if (playing) {
		// console.log("playing");
	}
	return (
		<div>
			<audio
				id='musicTag'
				src={trackPath}
				autoPlay={playing}
				loop
				muted={muted}
				volume={volume}
			/>
		</div>
	);
};
