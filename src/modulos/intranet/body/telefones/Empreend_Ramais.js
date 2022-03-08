import React, { useState } from 'react'
import { FaPhone } from 'react-icons/fa'

import './Empreend_Ramais.css'

const Empreend_Ramais = () => {

    const [mostrar, setMostrar] = useState(false)

    return (
        <div>

            <div className="intra-ramais__button" onClick={() => setMostrar(!mostrar)}

            >  <span style = {{marginRight: '20px'}}>Ramais</span>  <FaPhone size={25} color='white'/>

            </div>

            {
                mostrar
                    ? <div style={{ marginTop: '10px' }}>
                        <ul class="intra-ramais__items">
                            <li>250 - Amilton</li>
                            <li>246 - Antônio</li>
                            <li>203 - Cinira</li>
                            <li>224 - Copa</li>
                            <li>252 - David</li>
                            <li>208 - Eugênio</li>
                            <li>215 - Fabio</li>
                            <li>201 - Heliane</li>
                            <li>248 - Lidia</li>
                            <li>211 - Liliane</li>
                            <li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;9 - Luize</li>
                            <li>210 - Marco</li>
                            <li>213 - Michelli</li>
                            <li>212 - Paulão</li>
                            <li>214 - Sala de Reuniões</li>
                            <li>255 - Sueli</li>
                            <li>202 - Tânia</li>
                            {/* <li>207 - Vanessa</li>
                            <li>210 - Zezo</li>
                            <li>239 - Grasy</li>
                            <li>237 - Eugênio</li>
                            <li>246 - Marco</li> */}
                        </ul>

                    </div>
                    : null
            }
        </div>
    )
}

export default Empreend_Ramais