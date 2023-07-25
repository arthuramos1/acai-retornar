import "./style.css";

import { useCallback, useEffect, useState, useRef } from "react";
import useGlobal from "../../../contexts/Global";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import Morango from "../../../assets/images/morango.png";
import Banana from "../../../assets/images/banana.png";
import Kiwi from "../../../assets/images/kiwi.png";

import { Back, ShoppingCart } from "iconsax-react";

interface Dictionary {
	[key: string]: string;
}

const dicionary: Dictionary = {
	morango: Morango,
	banana: Banana,
	kiwi: Kiwi,
};

function firstLetter(str: any): string {
	if (!str) return str;
	return str.charAt(0).toUpperCase() + str.slice(1);
}

interface ConfirmationModalProps {
	isVisible: string | boolean;
	onCancel: () => void;
	onConfirm?: () => void;
}

export default function Modal({ isVisible = false, onCancel, onConfirm }: ConfirmationModalProps) {
	const navigate = useNavigate();

	const { getSizes, getOptionals, setItemCart } = useGlobal();

	const [mySizes, setMySize] = useState<
		{
			title: string;
			description: string;
			time: number;
			price: number;
		}[]
	>([]);
	const [selected, setSelected] = useState(-1);

	const [myOptionals, setMyOptionals] = useState<Object[]>([]);
	const [optSelected, setOptSelected] = useState(-1);

	const getData = useCallback(async () => {
		const [sizesResponse, optionalsResponse] = await Promise.all([getSizes(), getOptionals()]);

		setMySize(sizesResponse);
		setMyOptionals(optionalsResponse);
	}, []);

	useEffect(() => {
		getData();
	}, []);

	const handleSizeSelected = (option: number, size: boolean) => {
		if (size) setSelected(option);
		else setOptSelected(option);
	};

	const closeModal = () => {
		setSelected(-1);
		setOptSelected(-1);
		onCancel();
	};

	const addItemToCart = () => {
		setItemCart({
			item: isVisible,
			optional: myOptionals[optSelected],
			size: {
				title: mySizes[selected]?.title,
				description: mySizes[selected]?.description,
				time: mySizes[selected]?.time,
				price: mySizes[selected]?.price,
			},
		});

		closeModal();

		setTimeout(() => {
			navigate("/checkout");
		}, 300);
	};

	const indexImage = isVisible.toString();

	return (
		<>
			{isVisible ? (
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						type: "spring",
						duration: 0.5,
						delay: 0.1,
					}}
					className="flex items-center justify-center modal__cover"
				>
					<div onClick={closeModal} className="cover"></div>

					<nav className="h-4/5 w-3/4 bg-white rounded-md shadow-lg max-w-xl overflow-auto z-10">
						<div className="w-full flex items-center justify-center relative mt-4 drop-shadow">
							<Back onClick={closeModal} className="absolute left-4 cursor-pointer" size="22" color="#0d0d0d" />
							<h1 className="font-bold">Detalhes do item</h1>
						</div>

						<div className="divider mt-4"></div>

						<div className="flex items-center justify-between px-6 py-4">
							<div className="flex flex-col">
								<h1 className="text-lg font-semibold">{firstLetter(isVisible)}</h1>
								<p className="text-sm">Lorem ipsum dolor at.</p>
							</div>
							<img className="h-20 drop-shadow rounded-sm sm:h-32" src={dicionary[indexImage]} alt="flavor image" />
						</div>

						<div className="header__option px-6 py-4 bg-zinc-300 text-black w-full drop-shadow">
							Escolha o tamanho do copo <b className="text-[#e45151]">*</b>
						</div>
						<nav>
							{mySizes.map((option: any, pos) => (
								<div key={pos}>
									<div className="flex w-full items-center justify-between px-6 py-6">
										<div>
											<h2 className="font-bold">{firstLetter(option.title)}</h2>
											<p className="text-sm">
												{option.description} - Est. {option.time / 60}min
											</p>
										</div>

										<div
											onClick={() => handleSizeSelected(pos, true)}
											className={`h-[20px] w-[22px] bg-[${selected == pos ? "#ffde96" : "#e7e7e7"}] rounded-full cursor-pointer mr-4`}
											style={{
												backgroundColor: selected == pos ? "#ffde96" : "#e7e7e7",
											}}
										></div>
									</div>

									<div className="divider"></div>
								</div>
							))}
						</nav>

						<div className="header__option px-6 py-4 bg-zinc-300 text-black w-full drop-shadow mt-6">Escolha um acompanhamento</div>
						<nav className="relative mb-4">
							{myOptionals.map((option: any, pos) => (
								<div key={pos}>
									<div className="flex w-full items-center justify-between px-6 py-4">
										<p className="text-sm">{firstLetter(option)}</p>
										<div
											onClick={() => handleSizeSelected(pos, false)}
											className={`h-[20px] w-[22px] bg-[${optSelected == pos ? "#ffde96" : "#e7e7e7"}] rounded-full cursor-pointer mr-4`}
											style={{
												backgroundColor: optSelected == pos ? "#ffde96" : "#e7e7e7",
											}}
										></div>
									</div>

									<div className="divider"></div>
								</div>
							))}

							{selected == -1 && <div className="cover__optionals absolute"></div>}
						</nav>

						<div className="flex items-center justify-center px-6">
							<div>
								<p className="text-sm">Total com a entrega</p>
								<b>R$ {selected == -1 ? "-" : mySizes[selected]?.price}</b>
							</div>
							<motion.button
								whileTap={{ scale: 0.85 }}
								whileHover={{ scale: 1.02 }}
								onClick={addItemToCart}
								className={`
					${selected == -1 ? "cursor-default bg-[#dddddd]" : "cursor-pointer bg-[#d84242] text-white"}
					flex items-center justify-center gap-4 w-6/12 py-4 my-4 ml-auto mr-0 shadow-xl rounded-md`}
							>
								<p className="font-normal">Adicionar</p>
								<ShoppingCart size="20" color={`${selected == -1 ? "black" : "white"}`} />
							</motion.button>
						</div>
					</nav>
				</motion.div>
			) : (
				""
			)}
		</>
	);
}
