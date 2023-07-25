import shopSetup from "./constants";
import { ReactNode, createContext, useContext, useState } from "react";

type ProviderContextProps = {
	cart: any;
	setItemCart: (item: any) => void;
	getFlavors: () => Promise<Object[]>;
	getSizes: () => Promise<
		{
			title: string;
			description: string;
			time: number;
			price: number;
		}[]
	>;
	getOptionals: () => Promise<Object[]>;
};

const GlobalContext = createContext({} as ProviderContextProps);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
	const [cart, setCart] = useState<{}>({});

	const setItemCart = (item: any) => {
		setCart(item);
	};

	const getFlavors = async () => {
		await new Promise((resolve) => setTimeout(resolve, 1800));

		return shopSetup.flavors;
	};

	const getSizes = async () => {
		await new Promise((resolve) => setTimeout(resolve, 500));

		return shopSetup.sizes;
	};

	const getOptionals = async () => {
		await new Promise((resolve) => setTimeout(resolve, 500));

		return shopSetup.optionals;
	};

	return (
		<GlobalContext.Provider
			value={{
				cart,
				setItemCart,
				getFlavors,
				getSizes,
				getOptionals,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export const useGlobal = () => {
	const context = useContext(GlobalContext);
	if (!context) throw new Error("Provider inserido de maneira errada");
	return context;
};

export default useGlobal;
