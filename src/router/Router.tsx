import { Route, Routes } from "react-router-dom";
import { motion } from "framer-motion";
import { Navigate } from "react-router-dom";
import { PagesRoutes } from "./routes";

export default function Router() {
	return (
		<Routes>
			{PagesRoutes.map((route) => {
				return (
					<Route
						key={route.path}
						path={route.path}
						element={
							<motion.div
								initial={{ opacity: 0, y: 50 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									type: "spring",
									duration: 0.5,
									delay: 0.5,
								}}
							>
								<route.component />
							</motion.div>
						}
					/>
				);
			})}

			<Route path={"*"} element={<Navigate to="/home" />} />
		</Routes>
	);
}
