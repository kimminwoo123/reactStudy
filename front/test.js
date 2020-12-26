const parametersObject = {
  idTag: '123',
  nameTag: '홍길동',
  imageTag: 'imgafesfse',
}

const crawling = (parametersObject) => {
  console.log(parametersObject.idTag)
  console.log(parametersObject.nameTag)
  console.log(parametersObject.imageTag)
}

crawling(parametersObject)
