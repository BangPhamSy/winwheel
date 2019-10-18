import { applyMiddleware, compose, createStore } from "redux"
import thunk from "redux-thunk"
import logger from "redux-logger"
import { routerMiddleware, connectRouter } from "connected-react-router"
import callAPIMiddleware from "./middleware/callAPIMiddleware"
import rootReducer from "./modules/Reducers"

export default function configureStore(history, initialState) {
	const middleware = [thunk, callAPIMiddleware, routerMiddleware(history)]

	// In development, use the browser's Redux dev tools extension if installed
	const enhancers = []
	const isDevelopment = process.env.NODE_ENV === "development"
	if (isDevelopment && typeof window !== "undefined" && window.devToolsExtension) {
		enhancers.push(window.devToolsExtension())
	}
	if (isDevelopment) {
		middleware.push(logger)
	}

	return createStore(
		connectRouter(history)(rootReducer),
		initialState,
		compose(applyMiddleware(...middleware), ...enhancers)
	)
}
