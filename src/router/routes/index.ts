import { lazy } from "react";

export const PagesRoutes = [
	{
		path: "/home",
		component: lazy(() => import('../../pages/home')),
	},
	{
		path: "/checkout",
		component: lazy(() => import('../../pages/checkout')),
	},
];

export default PagesRoutes;