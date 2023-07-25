import { GlobalProvider } from "./contexts/Global";
import Router from './router/Router';

export default function App() {
	return (
		<GlobalProvider>
			<Router />
		</GlobalProvider>
	);
}
