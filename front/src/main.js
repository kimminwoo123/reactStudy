import { BasicScreen, CreateLadder, ArrayValueShuffle, ItemListShuffle, ColorCreate, PaintLadder } from './util/common.js'
import { ColorList, UserList, ItemList } from './util/publicConst.js'
import domToImage from 'dom-to-image'
import './util/style.css'
import pMap from 'p-map'

const Main = async () => {
  const randomUserList = ArrayValueShuffle(UserList) // 랜덤유저 리스트
  const shuffleItemList = ItemListShuffle(ItemList, randomUserList.length) // 랜덤 상품리스트

  let number = randomUserList.length // 사다리 수 가져옴
  const arrayColor = ColorCreate(ColorList, number) // 사다리 수 만큼 색상 배열 생성

  const [verticalDiv, ladderWidth, topDiv, bottomDiv, leftSpace] = BasicScreen(shuffleItemList, randomUserList, number) // 가로사다리 없는 기본화면 생성

  const [moveLineSave, progressCheck, horizonDiv, bottomDiv1] = CreateLadder(randomUserList, ladderWidth, number, topDiv, bottomDiv, leftSpace) // 가로사다리 생성 및 위 아래 div생성

  const winResultList = await multiPaintLadder(randomUserList, verticalDiv, moveLineSave, arrayColor, horizonDiv, progressCheck, bottomDiv1, shuffleItemList)

  return winResultList
}

const multiPaintLadder = async (randomUserList, verticalDiv, moveLineSave, arrayColor, horizonDiv, progressCheck, bottomDiv1, shuffleItemList) => {

  const mapper = async (randomUser) => {
    const winObject = await PaintLadder(randomUserList.indexOf(randomUser), randomUser, verticalDiv, moveLineSave, arrayColor, horizonDiv, progressCheck, bottomDiv1, shuffleItemList)

    return winObject
  }

  const winList = await pMap(randomUserList, mapper, {
    concurrency: randomUserList.length
  })

  const winResultList = winList.filter(a => Object.hasOwnProperty.call(a, 'name')) // 당첨된 사람만 리턴

  return winResultList
}

const ScreenShot = () => {
  domToImage.toPng(document.getElementById('div_body')).then((dataUrl) => { // dataUrl : base64의 이미지 값
    //console.log(dataUrl)
    let img = new Image()
    img.src = dataUrl
    document.body.appendChild(img)
  })
}

export { Main, ScreenShot }