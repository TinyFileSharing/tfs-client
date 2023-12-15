import './styles.css'
import { useAuth0 } from '@auth0/auth0-react'
import LogoutIcon from '@mui/icons-material/Logout'

export const LogoutButton = () => {
   const { logout } = useAuth0()

   const handleLogout = () => {
      logout({ logoutParams: { returnTo: window.location.origin } })
   }

   return (
      <div className='logout-btn'>
         <input type='button' className='bare-bone-input' value='Logout' onClick={handleLogout} />
         <LogoutIcon style={{ fontSize: 20 }} />
      </div>
   )
}
