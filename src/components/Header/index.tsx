import "./style.css";

import { Clock, Star } from "iconsax-react";
import Logo from "../../assets/images/logo.png";

export default function Header() {
	return (
		<header className="flex flex-col items-center justify-center">
			<div className="header__sorvetes drop-shadow-md"></div>

			<section className="flex flex-col items-center drop-shadow-lg rounded-lg gap-4 px-8 py-4 sm:px-4 sm:gap-2">
				<nav className="flex items-center justify-between w-full">
					<div>
						<h1 className="font-bold">Açai - Digital</h1>
						<p>Aberto 24h, para toda a cidade.</p>
					</div>

					<img className="h-20 rounded-md drop-shadow-md" src={Logo} alt="imagem da logo" />
				</nav>

				<div className="divider"></div>

				<div className="flex items-center justify-center text-xs gap-2 w-full">
					<Clock size="16" color="#727272" />
					<p>Est. 7min</p>

					<div className="flex items-center gap-1 absolute right-11">
						<Star size="13" color="#E7A74E" variant="Bold" />
						<p className="text-[#FCBB00] font-normal">4.5</p>
					</div>
				</div>
			</section>
		</header>
	);
}
