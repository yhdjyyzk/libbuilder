async function hello(){
  const data = await getData()
  return data
}

async function getData(){
  return 5
}

hello().then(d => {
  console.log(d)
})