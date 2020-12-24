const LADDERHEIGHT = 400 // 사다리 높이

const LEFTBLANKVALUE = 10 // 왼쪽 여백공간 크기

const DIVBODYWIDTH = 1600

const Sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const ColorCreate = (colorList, number) => { // 컬러리스트의 컬러를 사다리 인원수만큼 반복해서 저장
    let arrayColor = []
    let colorListNumber = 0
    let color = ''

    try {
        for (let i = 0; i < number; i++) {
            if (colorList[colorListNumber]) {
                color = colorList[colorListNumber]
            } else {
                colorListNumber = 0
                color = colorList[colorListNumber]
            }
            arrayColor.push(color)
            colorListNumber++
        }
        return arrayColor
    } catch (e) {
        console.error(e + 'ColorCreate 오류')
    }
}

const ArrayValueShuffle = (array) => { // 배열 요소값을 랜덤하게 셔플
    try {
        let count = array.length

        while (count) {
            let temporary = ''
            let randomIndex = Math.floor(array.length * Math.random())
            let randomIndex2 = Math.floor(array.length * Math.random())

            temporary = array[randomIndex]
            array[randomIndex] = array[randomIndex2]
            array[randomIndex2] = temporary

            count--
        }
        return array
    } catch (e) {
        console.error(e + 'ArrayValueShuffle 오류')
    }
}

const ItemListShuffle = (itemList, userListLength) => { // 당첨상품을 랜덤하게 셔플
    try {
        let fillLength = userListLength - itemList.length

        while (fillLength) {
            itemList.push('꽝')

            fillLength--
        }

        const shuffleItemList = ArrayValueShuffle(itemList)

        return shuffleItemList
    } catch (e) {
        console.error(e + 'ItemListShuffle 오류')
    }
}

const getElementId = (stringId) => { // 태그 검색시 예외처리 부분
    if (document.getElementById) {
        return document.getElementById(stringId)
    } else {
        console.error('getElementId 오류')
    }
}

const getDiv = (getWidth, getHeight, getBackgroundColor) => { // div생성
    try {
        let div = document.createElement('div')

        if (getWidth) {
            div.style.width = getWidth
        }
        if (getHeight) {
            div.style.height = getHeight
        }
        if (getBackgroundColor) {
            div.style.backgroundColor = getBackgroundColor
        }
        div.style.position = 'absolute'
        div.style.display = 'inline-block'
        div.style.overflow = 'hidden'

        return div
    } catch (e) {
        console.error(e + 'getDiv 오류')
    }
}

const BasicScreen = (shuffleItemList, randomUserList, number) => { // 가로사다리 없는 화면 생성
    const verticalDiv = [] //수직선
    const topDiv = [] //위 div
    const bottomDiv = [] //아래 div

    try {
        let memberDivWidthMax = parseInt(DIVBODYWIDTH / number) > 200 ? 200 : parseInt(DIVBODYWIDTH / number) // 최대 넓이 200px 설정
        let memberDivWidth = memberDivWidthMax < 100 ? 100 : memberDivWidthMax // 최소 넓이 100px 설정
        
        const leftValue = randomUserList.length % 2 === 1 ? memberDivWidth * Math.floor(randomUserList.length / 2) + (memberDivWidth / 2) : memberDivWidth * (randomUserList.length / 2) // 가운데 정렬시 홀수 짝수 여백값 계산
        const leftSpace = randomUserList.length < 9 ? DIVBODYWIDTH / 2 - leftValue : 0 // 가운데 정렬 여백값 

        for (let i = 0; i < number; i++) {
            topDiv[i] = getDiv(memberDivWidth + 'px', '50px', '')
            bottomDiv[i] = getDiv(memberDivWidth + 'px', '50px', '')

            topDiv[i].style.left = i * memberDivWidth + LEFTBLANKVALUE + leftSpace + 'px'
            topDiv[i].style.top = '20px'

            bottomDiv[i].style.left = i * memberDivWidth + LEFTBLANKVALUE + leftSpace + 'px'
            bottomDiv[i].style.top = LADDERHEIGHT + 110 + 'px'

            topDiv[i].style.fontSize = '12px'
            bottomDiv[i].style.fontSize = '12px'

            topDiv[i].style.textAlign = 'center'
            bottomDiv[i].style.textAlign = 'center'

            bottomDiv[i].innerHTML = `<input type="text" id="inp_bot_${i}" value="${shuffleItemList[i]}" style="width:90%;" tabindex="${i + 1 + 50}" />` // 처음 하단 입력값을 받는 input 태그생성
            getElementId('div_body').appendChild(topDiv[i])
            getElementId('div_body').appendChild(bottomDiv[i])

            verticalDiv[i] = getDiv('2px', LADDERHEIGHT + 'px', '#aaaaaa') // 수직선 생성

            verticalDiv[i].style.left = i * memberDivWidth + LEFTBLANKVALUE + leftSpace + parseInt(memberDivWidth / 2) + 'px'
            verticalDiv[i].style.top = '100px'

            getElementId('div_body').appendChild(verticalDiv[i])
        }

        return [verticalDiv, memberDivWidth, topDiv, bottomDiv, leftSpace]
    } catch (e) {
        console.error(e + 'BasicScreen 오류')
    }
}

const numberFloat = (n) => (parseInt(Number.parseFloat(n).toFixed(3))) // 소수점 3자리 까지보정

const topLeftLocationMake = (memberDivWidth, number, leftSpace) => { // 가로사다리 생성
    const topArray = []
    const topLeftArray = []
    let nRndTop = 120

    try {
        while (nRndTop <= LADDERHEIGHT + 80) { // top 위치 생성 30+ px 간격 최대 560
            topArray.push(nRndTop)
            nRndTop += Math.floor(Math.random() * 10) + 30
        }

        for (let j = 0; j < number - 1; j++) { // 세로사다리 개수 -1 만큼 반복
            for (let i = 0; i < 10; i++) { // 가로 사다리 개수
                let width = memberDivWidth
                let left = numberFloat(parseInt(j * memberDivWidth) + parseInt(memberDivWidth / 2) + (LEFTBLANKVALUE + leftSpace)) // 가로사다리의 시작 위치
                let top = topArray[Math.floor(Math.random() * topArray.length)]

                if (topLeftArray.some(v => v.left === (left - width) && v.top === top)) { // 결과 당첨 중복 오류 걸러내기

                    top += 11
                }

                topLeftArray.push({
                    width,
                    left,
                    top,
                })
            }
        }
        return topLeftArray
    } catch (e) {
        console.error(e + 'topLeftLocationMake 오류')
    }
}

const createLadderHorizon = (memberDivWidth, number, leftSpace) => { // 가로사다리 그리기
    const horizonDiv = [] // 수평선

    try {
        const topLeftArray = topLeftLocationMake(memberDivWidth, number, leftSpace) // 가로사다리 좌표 배열 만듬

        for (let topLeftObject of topLeftArray) { // 가로사다리를 하나씩 그려나감
            let horizonDivLength = horizonDiv.length

            horizonDiv[horizonDivLength] = getDiv(topLeftObject.width + 'px', '2px', '#aaaaaa')

            horizonDiv[horizonDivLength].style.left = topLeftObject.left + 'px'
            horizonDiv[horizonDivLength].style.top = topLeftObject.top + 'px'

            getElementId('div_body').appendChild(horizonDiv[horizonDivLength])
        }

        return horizonDiv
    } catch (e) {
        console.error(e + 'createLadderHorizon 오류')
    }
}

const CreateLadder = (randomUserList, memberDivWidth, number, topDiv, bottomDiv, leftSpace) => { // 가로사다리 생성 및 위 아래 div생성
    try {
        const [moveLineSave, progressCheck, bottomDiv1] = createLadderBlock(randomUserList, number, topDiv, bottomDiv) // 사다리 위아래 블럭과 버튼 생성
        const horizonDiv = createLadderHorizon(memberDivWidth, number, leftSpace) // 가로사다리 생성

        return [moveLineSave, progressCheck, horizonDiv, bottomDiv1]
    } catch (e) {
        console.error(e + 'CreateLadder 오류')
    }
}

const createLadderBlock = (randomUserList, number, topDiv, bottomDiv) => { // 사다리 위아래 블럭과 버튼 생성(값 입력 한 뒤 생성되는 블럭)
    const moveLineSave = []
    const progressCheck = [] // 진행여부 체크

    try {
        for (let i = 0; i < number; i++) {
            topDiv[i].innerHTML = i + 1 + `<br><div id="member${i}" style="width:90%; height:50%; display:inline-block; border:1px solid #333" tabindex="${i + 1}">${randomUserList[i]}</div>`
            bottomDiv[i].innerHTML = getElementId('inp_bot_' + i).value

            topDiv[i].style.overflow = 'auto'
            bottomDiv[i].style.overflow = 'auto'

            progressCheck[i] = false

            moveLineSave[i] = []
        }
        return [moveLineSave, progressCheck, bottomDiv]
    } catch (e) {
        console.error(e + 'createLadderBlock 오류')
    }
}

const PaintLadder = async (no, user, verticalDiv, moveLineSave, arrayColor, horizonDiv, progressCheck, bottomDiv, shuffleItemList) => { // 전체시작시 사다리가 그려지는 기능
    const moveHorizonDiv = [] // 이동선 div
    let winResult = {}
    let nx = 0
    let ny = 0
    let nw = 0
    let nh = 0

    await start(no, user)

    async function start(no, user) {
        try {
            if (progressCheck[no]) { // 초기사다리 회색
                for (let i = 0; i < moveLineSave.length; i++) {
                    for (let j = 0; j < moveLineSave[i].length; j++) {
                        moveHorizonDiv[moveLineSave[i][j]].style.backgroundColor = '#CCCCCC'
                        moveHorizonDiv[moveLineSave[i][j]].style.zIndex = 1
                    }
                }
                for (let i = 0; i < moveLineSave[no].length; i++) { // 결과 사다리 파란색 변환
                    moveHorizonDiv[moveLineSave[no][i]].style.backgroundColor = '#0000ff'
                    moveHorizonDiv[moveLineSave[no][i]].style.zIndex = 2
                }
            } else { // 첫 시작 시작자리일때
                let startX = parseInt(verticalDiv[no].style.left) // 시작자리의 left 값(x좌표)
                let startY = parseInt(verticalDiv[no].style.top) // 시작자리의 top 값 (y좌표)

                await moveStart('y', no, startX, startY, user)

                progressCheck[no] = true // 진행
            }
        } catch (e) {
            console.error(e + 'start 오류')
        }
    }

    async function moveStart(sXy, no, locationX, locationY, user) { // 사다리를 타면서 색이 바뀌는 기능
        await Sleep(20) // 사다리 그리는 속도 조절

        try {
            let nLen = moveHorizonDiv.length
            let nEx = locationX
            let nEy = locationY
            let bCk = false

            moveHorizonDiv[nLen] = getDiv('2px', '2px', arrayColor[no]) // 색이바뀐 div 생성
            moveLineSave[no].push(nLen)

            getElementId('div_body').appendChild(moveHorizonDiv[nLen])

            moveHorizonDiv[nLen].style.left = locationX + 'px'
            moveHorizonDiv[nLen].style.top = locationY + 'px'
            moveHorizonDiv[nLen].style.zIndex = 3

            if (sXy === 'y') {
                nEy = LADDERHEIGHT + 100
            }

            for (let i = 0; i < horizonDiv.length; i++) {
                nx = parseInt(horizonDiv[i].style.left) // x위치
                ny = parseInt(horizonDiv[i].style.top) // y위치
                nw = parseInt(horizonDiv[i].style.width) // 가로길이
                nh = parseInt(horizonDiv[i].style.height) // 세로길이

                if (sXy === 'x') {
                    if (ny === locationY) {
                        if (nx === locationX) { // 첫 시작점에서
                            nEx = nx + nw // x위치 + 가로길이
                            break
                        } else if (nx + nw === locationX) { // 다음 col의 위치가 시작위치 일때
                            nEx = nx
                            break
                        }
                    }
                } else { // 반복하면서 큰것중에서 제일 작은것으로
                    if (ny > locationY) { // 시작점이 아닐때
                        if (nx === nEx || nx + nw === nEx) {
                            if (bCk) {
                                if (ny < nEy) {
                                    nEy = ny
                                }
                            } else {
                                nEy = ny
                            }
                            bCk = true
                        }
                    }
                }
            }

            await move(nLen, no, locationX, locationY, nEx, nEy, user)
        } catch (e) {
            console.error(e + 'moveStart 오류')
        }
    }

    async function move(nLen, no, locationX, locationY, nEx, nEy, user) { // 경로를 그리는 곳
        let nSpeed = 10
        let bIng = true
        let np = ''
        let sXy = ''

        await Sleep(20) // 사다리 그리는 속도 조절
        try {
            nx = parseInt(moveHorizonDiv[nLen].style.left)
            ny = parseInt(moveHorizonDiv[nLen].style.top)
            nw = parseInt(moveHorizonDiv[nLen].style.width)
            nh = parseInt(moveHorizonDiv[nLen].style.height)

            if (locationX !== nEx) { // 사다리 그리는 과정
                np = nw + nSpeed
                if (nEx < locationX) {
                    if (locationX - np <= nEx) {
                        bIng = false
                        np = locationX - nEx
                    }
                    moveHorizonDiv[nLen].style.left = locationX - np + 'px'
                } else {
                    if (locationX + np >= nEx) {
                        bIng = false
                        np = nEx - locationX
                    }
                }

                moveHorizonDiv[nLen].style.height = '4px'
                moveHorizonDiv[nLen].style.width = np + 'px'
                sXy = 'x'
            } else {
                np = nh + nSpeed
                if (locationY + np >= nEy) {
                    bIng = false
                    np = nEy - locationY
                }

                moveHorizonDiv[nLen].style.width = '4px'
                moveHorizonDiv[nLen].style.height = np + 'px'
                sXy = 'y'
            }

            if (bIng) {
                await move(nLen, no, locationX, locationY, nEx, nEy, user, moveHorizonDiv, verticalDiv)
            } else {
                if (sXy === 'x') {
                    moveHorizonDiv[nLen].style.height = '2px'
                } else {
                    moveHorizonDiv[nLen].style.width = '2px'
                }

                if (nEy < LADDERHEIGHT + 100) {
                    await moveStart(sXy === 'x' ? 'y' : 'x', no, nEx, nEy, user)
                } else {
                    for (let i = 0; i < verticalDiv.length; i++) {
                        if (nEx === parseInt(verticalDiv[i].style.left)) { // 사다리 최종 도착시 확인버튼으로 변환
                            const item = bottomDiv[i].innerHTML

                            if (item === '꽝') {  // 꽝일시 멤버이름 출력 하지않음
                                user = ''
                            }

                            bottomDiv[i].innerHTML = `<b>${user}</b><br>` + bottomDiv[i].innerHTML

                            if (user) {
                                winResult = { name: user, item: shuffleItemList[i] }
                            }
                        }
                    }
                }
            }
        } catch (e) {
            console.error(e + 'move 오류')
        }
    }
    return winResult
}

export { BasicScreen, CreateLadder, getElementId, ArrayValueShuffle, ItemListShuffle, ColorCreate, PaintLadder, Sleep }
