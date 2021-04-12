document.addEventListener('DOMContentLoaded', () => {
  // console.log('DOM has been fully loaded')
  // console.table(gifts)

  fetch('http://localhost:3000/gifts')
  .then(resp => resp.json())
  .then(data => {
    createGifts(data)
    search(data)
  })

  function button(li) {
    const button = document.createElement('button')
    button.innerText = 'x'
    li.appendChild(button)

    button.addEventListener('click', () => {
      giftList.removeChild(li)
    })
  }

  const giftList = document.querySelector('.gift-list')
  giftList.innerHTML = ""

  function createGifts(arr) {
    arr.forEach(e => {
      const li = document.createElement('li')
      const img = document.createElement('img')
  
      img.src = e['image']
      img.alt = e['name']
      li.innerText = e['name'] + ' '
      button(li)
      li.appendChild(img)
      giftList.appendChild(li)
    })
  }
  
  // createGifts(gifts)

  const form = document.querySelector('#new-gift-form')
  const name = document.querySelector('#gift-name-input')
  const image = document.querySelector('#gift-image-input')
  

  form.addEventListener('submit', function(e) {
    e.preventDefault()

    const li = document.createElement('li')
    const img = document.createElement('img')

    img.src = image.value
    img.alt = name.value
    li.innerText = name.value + ' '
    button(li)
    li.appendChild(img)
    giftList.appendChild(li)

    const newData = {
      name: name.value,
      image: image.value
    }

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(newData)
    }

    fetch('http://localhost:3000/gifts', config)

    // gifts.push({name: name.value, image: image.value})
    e.target.reset()
  })

  const input = document.querySelector('#filter-input')

  function search(array) {
    input.addEventListener('keyup', function() {
      const arr = array.filter(e => e.name.includes(input.value))
      
      giftList.innerHTML = ""
      createGifts(arr)
    })
  }

  //search(gifts)

})
