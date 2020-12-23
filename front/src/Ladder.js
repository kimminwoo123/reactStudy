import React, { useEffect, useState } from "react"
import { Modal, Button, Alert } from 'antd'
import '../node_modules/antd/dist/antd.css'

import { Main, ScreenShot } from './main'


const Ladder = () => {

    const [visible, setVisible] = useState(false)

    const handleClose = () => {
        setVisible(false)
    }

    useEffect(() => {
        const ladderLogic = async () => { // 사다리 로직
            await Main()
        }

        ladderLogic().then(() => {
            ScreenShot()
            setVisible(true)
        })

    }, [])

    return (
        <>
            <div id="div_body_parents">
                <div id="div_body"></div>
            </div>
            {visible ? (
                <Alert message="Success" type="success" closable afterClose={handleClose} />
            ) : null}
        </>
    )
}

export default Ladder