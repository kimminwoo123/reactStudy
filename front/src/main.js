// import { BasicScreen, CreateLadder, ArrayValueShuffle, ItemListShuffle, ColorCreate, PaintLadder } from './util/common.js'
// import { ColorList, UserList, ItemList } from './util/publicConst.js'
// import domToImage from 'dom-to-image'
// import './util/style.css'
// import pMap from 'p-map'

// const Main = async () => {
//   const totalWinList = []

//   const randomUserList = ArrayValueShuffle(UserList) // 랜덤유저 리스트
//   const shuffleItemList = ItemListShuffle(ItemList, randomUserList.length) // 랜덤 상품리스트

//   let number = randomUserList.length // 사다리 수 가져옴
//   const arrayColor = ColorCreate(ColorList, number) // 사다리 수 만큼 색상 배열 생성

//   const [verticalDiv, memberDivWidth, topDiv, bottomDiv, leftSpace] = BasicScreen(shuffleItemList, randomUserList, number) // 가로사다리 없는 기본화면 생성

//   const [moveLineSave, progressCheck, horizonDiv, bottomDiv1] = CreateLadder(randomUserList, memberDivWidth, number, topDiv, bottomDiv, leftSpace) // 가로사다리 생성 및 위 아래 div생성

//   const bodyDiv = document.getElementById('div_body')

//   bodyDiv.addEventListener('click', async (e) => { // 멤버 이름 클릭시 선택 멤버 사다리

//     const memberIndex = parseInt(e.target.id.slice(6))
//     const memberName = e.target.innerText

//     if (memberIndex || memberIndex === 0) {
//       const memberDiv = document.getElementById(e.target.id)
//       memberDiv.style.backgroundColor = '#fff5ee' // 선택한 멤버 div 색을 바꿈

//       randomUserList[memberIndex] = '' // 선택 사용자 삭제

//       const winResult = await PaintLadder(memberIndex, memberName, verticalDiv, moveLineSave, arrayColor, horizonDiv, progressCheck, bottomDiv1, shuffleItemList)

//       memberDiv.style.backgroundColor = '' // 색상 초기화

//       totalWinList.push(winResult)

//       if (!randomUserList.some(a => a)) { // 사다리가 전부 실행되었을 시
//         const winResultList = totalWinList.filter(a => Object.hasOwnProperty.call(a, 'name'))

//         return winResultList
//       }
//     }
//   })

//   const allStart = document.getElementById('allStart')

//   allStart.addEventListener('click', async () => { // 전체버튼 클릭시

//     const winList = await multiPaintLadders(randomUserList, verticalDiv, moveLineSave, arrayColor, horizonDiv, progressCheck, bottomDiv1, shuffleItemList)

//     totalWinList.push(winList)

//     const totalWinList1 = totalWinList.flat()

//     const winResultList = await totalWinList1.filter(a => a && Object.hasOwnProperty.call(a, 'name')) // 당첨자만 [{당첨자 : 상품}, {당첨자 : 상품}]형식으로 반환

//     return winResultList
//   })
// }

// const multiPaintLadders = async (randomUserList, verticalDiv, moveLineSave, arrayColor, horizonDiv, progressCheck, bottomDiv1, shuffleItemList) => {

//   const mapper = async (randomUser) => {

//     if (randomUser) { // 사다리가 실행되지 않은 것들만 실행
//       const winObject = await PaintLadder(randomUserList.indexOf(randomUser), randomUser, verticalDiv, moveLineSave, arrayColor, horizonDiv, progressCheck, bottomDiv1, shuffleItemList)

//       return winObject
//     }
//   }

//   const winList = await pMap(randomUserList, mapper, {
//     concurrency: randomUserList.length
//   })

//   return winList
// }

// const ScreenShot = () => {
//   domToImage.toPng(document.getElementById('div_body')).then((dataUrl) => { // dataUrl : base64의 이미지 값
//     //console.log(dataUrl)
//     let img = new Image()
//     img.src = dataUrl
//     document.body.appendChild(img)
//   })
// }

// export { Main, ScreenShot }
