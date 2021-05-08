import { Route, Switch } from 'react-router-dom'
import Landing from './Pages/Landing'
import Admin from './Pages/Admin/Admin'
import User from './Pages/User/User'

export default function App() {
	const BASE_URL = 'https://codelockr-api.herokuapp.com'

	return (
		<div className="App">
			<Switch>
				<Route path="/" exact component={Landing} />
				<Route path="/admin" component={Admin} />
				<Route path="/user" component={User} />
			</Switch>
		</div>
	);
}
