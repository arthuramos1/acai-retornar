import { useEffect } from "react";
import useGlobal from "../../contexts/Global";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";
import { Clock, Shop, Trash } from "iconsax-react";

import Header from "../../components/Header";

import Morango from "../../assets/images/morango.png";
import Banana from "../../assets/images/banana.png";
import Kiwi from "../../assets/images/kiwi.png";

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

export default function Home() {
	const navigate = useNavigate();

	const { cart, setItemCart }: any = useGlobal();

	useEffect(() => {
		if (!cart.item) navigate("/home");
	}, []);

	const removeItemCart = () => {
		setItemCart();
		navigate("/home");
	};

	return (
		<>
			{cart ? (
				<motion.section
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						type: "spring",
						duration: 0.5,
						delay: 0.1,
					}}
					className="relative overflow-hidden h-[100vh]"
				>
					<Header />
					<nav className="flex flex-col w-full items-center justify-center mt-14">
						<h1 className="font-normal px-4 py-2 bg-zinc-300 text-zinc-600 rounded mt-4">SACOLA</h1>

						<div className="relative flex flex-col w-4/12 items-center justify-center bg-white px-6 py-4 rounded-lg shadow-xl mt-4">
							<div className="flex justify-start gap-4 w-full">
								<img className="h-28 rounded-md shadow-md" src={dicionary[cart?.item]} alt="imagem produto" />
								<div>
									<h1 className="font-bold">{firstLetter(cart?.item)}</h1>
									<p className="text-sm">{cart?.size?.description}</p>
									<p className="text-sm">{cart?.optional}</p>
								</div>
							</div>
							<div className="flex items-center justify-between w-full mt-4">
								<div className="flex items-center gap-2">
									<p>Hoje, {cart?.size?.time / 60} min</p>
									<Clock size="16" color="#727272" />
								</div>

								<b>R$ {cart?.size?.price}</b>
							</div>

							<div title="Excluir item" className="flex h-[30x] w-[30px]">
								<Trash onClick={removeItemCart} className="cursor-pointer absolute top-2 right-2" size="18" color="#d84242" />
							</div>
						</div>

						<button className="flex items-center justify-center px-6 py-4 gap-6 bg-[#d84242] text-white rounded-md shadow-xl mt-16">
							<p>Continuar</p>
							<Shop size="16" color="white" />
						</button>
					</nav>
				</motion.section>
			) : (
				""
			)}
		</>
	);
}
