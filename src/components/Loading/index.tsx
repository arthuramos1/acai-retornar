import "./style.css";

type Props = {
	text?: string;
};

const Loading = ({ text = "Carregando..." }: Props) => {
	return (
		<div className="flex flex-col gap-2 items-center justify-center">
			<div className="loader"></div>
			<b>{text}</b>
		</div>
	);
};

export default Loading;
