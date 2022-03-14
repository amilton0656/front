import { useSelector } from 'react-redux'

import Login from '../login/Login'
import ErpLayout from './ErpLayout'

const Erp = () => {

    const { auth } = useSelector(state => state.login.login)

    return ( 
        <>
            {!auth && <Login />}
            {auth && <ErpLayout />}
        </>
     )
}
 
export default Erp