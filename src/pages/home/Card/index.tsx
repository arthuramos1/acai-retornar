import "./style.css";
import { motion } from "framer-motion";

import Morango from "../../../assets/images/morango.png";
import Banana from "../../../assets/images/banana.png";
import Kiwi from "../../../assets/images/kiwi.png";

interface Dictionary {
	[key: string]: string;
}

const dicionary: Dictionary = {
	morango: Morango,
	banana: Banana,
	kiwi: Kiwi,
};

function firstLetter(str: string): string {
	if (!str) return str;
	return str.charAt(0).toUpperCase() + str.slice(1);
}

interface CardProps {
	title: string;
	handleSelected: () => void;
}

export default function Header({ title, handleSelected }: CardProps) {
	return (
		<motion.div
			whileTap={{ scale: 0.85 }}
			whileHover={{ scale: 1.02 }}
			onClick={() => handleSelected()}
			className="flex items-center justify-between drop-shadow-xl card gap-8 px-6 py-4 rounded-lg w-[90vw] max-w-[560px] cursor-pointer"
		>
			<nav>
				<h1 className="text-lg font-semibold">{firstLetter(title) || "-"}</h1>
				<p className="text-sm">{title && "Lorem ipsum dolor at."}</p>
			</nav>
			<img className="h-20 drop-shadow rounded-sm" src={dicionary[title]} alt="flavor image" />
		</motion.div>
	);
}
