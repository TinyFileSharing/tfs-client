import { useAuth0 } from '@auth0/auth0-react'

export const LoginButton = () => {
	const { loginWithRedirect, logout } = useAuth0()

	const handleLogout = () => {
		logout({ logoutParams: { returnTo: window.location.origin } })
	}

	const handleLogin = () => {
		loginWithRedirect()
	}

	return <input type='button' value='Login' onClick={handleLogin} />
}
