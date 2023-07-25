import ReactDOM from "react-dom/client";
import App from "./App";

import "./index.css";
import "./global.css";

import { BrowserRouter } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<BrowserRouter>
		<App />
		<ToastContainer position="bottom-right" pauseOnHover={false} />
	</BrowserRouter>
);
