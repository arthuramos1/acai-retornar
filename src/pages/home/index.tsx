import { useCallback, useEffect, useState } from "react";
import useGlobal from "../../contexts/Global";
import { motion } from "framer-motion";

import Header from "../../components/Header";
import Modal from "./Modal";
import Card from "./Card";

import Loading from "../../components/Loading";

export default function Home() {
	const { getFlavors } = useGlobal();

	const [flavorsData, setFlavorsData] = useState<Object[]>([]);

	const getData = useCallback(async () => {
		const flavorsResponse = await getFlavors();
		setFlavorsData(flavorsResponse);
	}, []);

	useEffect(() => {
		getData();
	}, []);

	const [modalVisible, setModalVisible] = useState(false);
	const toogleModal = (state?: boolean) => {
		setModalVisible(state || false);
	};

	return (
		<section className="relative overflow-hidden h-[100vh]">
			<Header />
			<nav className="flex flex-col gap-4 px-6 items-center mt-12">
				{flavorsData.length > 0 ? (
					<motion.div
						className="flex flex-col gap-4 items-center"
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							type: "spring",
							duration: 0.5,
							delay: 0.0,
						}}
					>
						<h1 className="font-normal px-4 py-2 bg-zinc-300 text-zinc-600 rounded mt-4">Todos os sabores:</h1>
						{flavorsData.map((option: any, pos) => (
							<Card key={pos} title={option} handleSelected={() => toogleModal(option)} />
						))}
					</motion.div>
				) : (
					<Loading />
				)}
			</nav>

			<Modal isVisible={modalVisible} onCancel={() => toogleModal(false)} />
		</section>
	);
}
