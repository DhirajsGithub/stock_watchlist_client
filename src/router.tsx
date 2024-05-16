import { createBrowserRouter } from "react-router-dom";
import Wrapper from "./pages/Wrapper";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import WatchList from "./pages/WatchList";
import StockDetail from "./pages/StockDetail";

const router = createBrowserRouter([

	{
		path: "/",
		element: <Wrapper />,
		children: [
			{
				path: "/",
				element: <Dashboard />
			},
			{
				path: "/watchlist/:watchlistName/:id",
				element: <WatchList />
			},
			{
				path: "/stockDetail/:symbol",
				element: <StockDetail />
			}

		]
	},
	{ path: "/login", element: <Login /> },
	{ path: "/signup", element: <Signup /> },
	{ path: "*", element: <NotFound /> }

])

export default router;