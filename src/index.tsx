import './styles/index.css'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import { Dashboard } from './pages/Dashboard'

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<Auth0Provider
		domain='dev-unodm5dngxg4hqwm.eu.auth0.com'
		clientId='UmUEFly5Zu4OvKr5axHsTYVG6hpBXPU6'
		authorizationParams={{
			audience: 'https://tinyfilesharing.com/',
			redirect_uri: window.location.origin,
			scope: 'openid profile email',
		}}
	>
		<Dashboard />
	</Auth0Provider>,
)
