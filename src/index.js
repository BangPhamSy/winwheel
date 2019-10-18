import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { ConnectedRouter } from "connected-react-router"
import { createBrowserHistory } from "history"
import { initialize, addTranslation } from "react-localize-redux"

import App from "./views/App"
import registerServiceWorker from "./registerServiceWorker"

import translations from "./resources/Translations"
import configureStore from "./redux/configureStore"
import { languages } from "./configs/Settings"
import "react-select/dist/react-select.css"
import "./scss/main.css"
import { refreshToken } from "./redux/modules/Auth"
import WebFont from "webfontloader"

WebFont.load({
	google: {
		families: ["Montserrat:300,500,600,700", "sans-serif"],
	},
})

// Create browser history to use in the Redux store
const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href")
const history = createBrowserHistory({ basename: baseUrl })

// Get the application-wide store instance, prepopulating with state from the server where available.
const initialState = window.initialReduxState
const store = configureStore(history, initialState)

//Init multiple languages
store.dispatch(initialize(languages))
store.dispatch(addTranslation(translations))

//refresh and validate token
store.dispatch(refreshToken())

const rootElement = document.getElementById("root")

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<App />
		</ConnectedRouter>
	</Provider>,
	rootElement
)

registerServiceWorker()
