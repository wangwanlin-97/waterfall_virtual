### :smile:waterfall_virtual :smile:
------
This is a typescript module, which is used for rendering a waterfall layout of items in an HTML container. The class has several properties and methods, including container (the HTML container element), datas (an array of data to be rendered), generateFun (a function that generates the data for rendering), render (a method that renders the data in the container using the waterfall layout algorithm), refreshAble (a method that binds the resize and scroll events to update the rendering), getRange (a method that gets the rendering range based on the current scroll position), update (a method that updates the rendering by adding or removing items based on the current rendering range), and pushData (a method that adds more data to the rendering).

The Render class uses the WaterFallItem type, which represents an item in the waterfall layout and contains the HTML element (ele), height (height), and translation values (translateX and translateY). The GenerateDataFun type represents a function that generates the data for rendering, and takes an array of data and an item width as input, and returns a promise that resolves to an array of WaterFallItem objects.

The Render class also uses a debounce function to limit the frequency of rendering or updating the rendering, by wrapping the rendering or updating function in a timer that delays its execution by a specified amount of time.

Overall, this module provides a flexible and customizable way to render a waterfall layout of items in an HTML container, with support for dynamic data loading and adaptive layout based on the container size.
 
 ### :thumbsup:usage
 to use this tool,you should install it first
 
 ```shell
      npm i waterfall_virtual
 ```
 
 ​:leaves:then import it in the file where you need use wv
 
 ​:leaves:here is a demo for react
 ```typescript
      import Render, { WaterFallItem } from 'waterfall_virtual'
      
      
      

      let r = new Render(wraper.current, data,generateData, 200, 300, 30)
      
      //when arriving at the bottom of page,lode more datas 
      
      r.onReachBottom = () => {
        r.fetching = true
        axios.get('/20data').then(async res => {
         
          await r.pushData(res.data.datas)
          r.fetching = false
          
        }).catch(error => {

        })
      }

 
 ```
 
 
 :rabbit::rabbit:the only thing you need to do is write the `generateData`function ,it should processes `data` you pass to `Render`, and returns a object like fllowing
 ```js
    {
      ele:HTMLDivElement, //the element will be rendered to the page as an item
      height:number,//the height of ele ,you shoule calculate it in "generateData"
      translateY:number,//just make it 0 is ok
      translateX:number,//just make it 0 is ok
    }
 ```
 
 :sunny::sunny:An example of `generateData` , in this demo ,each item contains an image and a description
 
 ```ts
 function generateData(datas: any[], itemWidth: number): Promise<WaterFallItem[]> {


    return new Promise((resove, rej) => {

      let res: WaterFallItem[] = []
      let count = 0
      let total = datas.length

      function checkOver() {
        count++
        if (count === total) {
          resove(res)
        }
      }

      for (let i = 0; i < datas.length; i++) {
        let img = new Image()
        img.src = datas[i].img
        img.style.width = '100%'

        img.onload = () => {

          img.style.borderRadius = '10px'
          let imgHeight = img.height * itemWidth / img.width

          let desc = document.createElement('p')
          desc.innerText = datas[i].desc
          let dl = datas[i].desc.length * 16
          let dh
          if (dl > itemWidth) {
            dh = 42
            desc.style.webkitLineClamp = '2'
            desc.style.display = '-webkit-box'
            desc.style.webkitBoxOrient = 'vertical'
            desc.style.overflow = 'hidden'
            desc.style.textOverflow = 'ellipsis'
          } else {
            dh = 21
          }
          desc.style.width = itemWidth + 'px'
          desc.style.padding = '0 2px 0 5px'
          desc.style.marginTop = '5px'

          let itemContainer = document.createElement('div')
          itemContainer.style.width = itemWidth + 'px'

          itemContainer.appendChild(img)
          itemContainer.appendChild(desc)
          let o = {
            id: datas[i].id,
            ele: itemContainer,
            height: imgHeight + dh + 5,
            user: datas[i].user,
            translateX: 0,
            translateY: 0
          }
          res[i] = o

          checkOver()


        }

        img.onerror = () => {
          console.log('image lode failed')
        }
      }
    })
  }
 ```
