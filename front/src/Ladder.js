import React, { useEffect, useState } from "react"
// import { Modal, Button } from 'antd'
import '../node_modules/antd/dist/antd.css'

import { Main, ScreenShot } from './main'


const Ladder = () => {

    // const [visible, setVisible] = useState(false)

    useEffect(() => {

        // const divBody = document.createElement('div')

        // divBody.setAttribute('id', 'div_body')

        // const divParent = document.getElementsByName('div_body_parents')

        // divParent.appendChild(divBody)

        const ladderLogic = async () => { // 사다리 로직
            await Main()
        }

        ladderLogic().then(() => {
            ScreenShot()
        })

        // window.onbeforeunload = () => { // 새로고침 방지
        //     return false
        // }
    }, [])

    return (
        <>
            <div id="div_body_parents">
                <div id="div_body"></div>
            </div>
            {/* <Button type="primary" onClick={() => setVisible(true)}>
                Open Modal of 1000px width
            </Button>
            <Modal
                title="Modal 1000px width"
                centered
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                width={1000}
            >
            </Modal> */}
        </>
    )
}

export default Ladder