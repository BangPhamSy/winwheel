import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { ConnectedRouter } from "connected-react-router"
import { createBrowserHistory } from "history"
import { initialize, addTranslation } from "react-localize-redux"

import App from "./views/App"

import Translations from "./resources/Translations"
import configureStore from "./redux/configureStore"
import { languages } from "./configs/Settings"
import "react-select/dist/react-select.css"
import "./scss/main.css"

// Create browser history to use in the Redux store
const baseUrl = "/"
const history = createBrowserHistory({ basename: baseUrl })

// Get the application-wide store instance, prepopulating with state from the server where available.
const initialState = window.initialReduxState
const store = configureStore(history, initialState)

//Init multiple languages
store.dispatch(initialize(languages))
store.dispatch(addTranslation(Translations))

it("renders without crashing", () => {
	const div = document.createElement("div")
	div.setAttribute("id", "root")
	ReactDOM.render(
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<App />
			</ConnectedRouter>
		</Provider>,
		div
	)
})
