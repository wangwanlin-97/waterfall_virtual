
export type WaterFallItem = {
    ele: HTMLDivElement,
    height: number,
    translateY: number
    translateX: number
}
/**
 * @param datas   the origin datas need to be processed,which shoule be passed to Render constructor
 * @param itemWidth   the width of each item calculated based on the width range passed in
 * @returns  a  WaterFallItem like Obj  
 * }
 */
export type GenerateDataFun = (datas: any[], itemWidth: number) => Promise<WaterFallItem[]>

function getRender() {
    class Render {
        container: HTMLDivElement | null = null
        datas: any[] = []
        trueDatas: WaterFallItem[] = []
        heights: number[] = []
        generateFun
        containerHeight = 0
        column = 0
        columnWidth = 0
        min = 0
        max = 0
        gap = 0
        showing = false
        reachBottom = false
        fetching = false
        onReachBottom = () => { }
        renderedList: Set<number> = new Set<number>()
        debounced = () => { }

        constructor(container: HTMLDivElement | null, datas: any[], generatorFun: GenerateDataFun, min: number, max: number, gap: number) {

            if (instance) {
                instance.container = container
                instance.datas = datas
                instance.min = min
                instance.max = max
                instance.gap = gap
                instance.debounced()
                return instance

            }
            this.container = container
            this.datas = datas
            this.generateFun = generatorFun
            this.min = min
            this.max = max
            this.gap = gap

            this.showing = false
            this.render()
            this.debounced = this.debounce(this.render.bind(this), 200)
            this.refreshAble()
            instance = this

        }

        /**
         * 渲染数据
         */
        async render() {

            if (!this.container || this.showing) {
                return
            }
            if (!this.generateFun) {
                return
            }



            this.renderedList.clear()
            this.showing = true
            this.container.style.width = '100%'
            this.container.style.height = '100%'

            this.container.style.position = 'relative'
            this.container.style.paddingTop = '80px'

            this.container.style.paddingLeft = '10px'
            this.container.style.paddingRight = '10px'

            let w = this.container.offsetWidth - 20
            if (w < this.min) {
                w = this.min
            }
            let n = 3
            let iw = (w - (n - 1) * this.gap) / n
            let flag:boolean|null = null

            while (iw < this.min || iw > this.max) {

                if (iw < this.min) {
                    if (flag === true) {
                        break
                    }
                    n--
                    flag = false
                } else {
                    if (flag === false) {
                        break
                    }
                    n++
                    flag = true
                }
                iw = (w - (n - 1) * this.gap) / n

            }
            this.columnWidth = iw
            this.column = n

            // 调用外部传入的生成数据的函数
            this.trueDatas = await this.generateFun(this.datas, this.columnWidth)



            this.heights = []
            for (let i = 0; i < n; i++) {
                this.heights[i] = 80
            }
            this.container.innerHTML = ''

            let fragment = document.createDocumentFragment()
            for (let i = 0; i < this.trueDatas.length; i++) {
                let c = this.heights.indexOf(Math.min(...this.heights))
                let itembox = this.trueDatas[i].ele
                itembox.style.position = 'absolute'
                itembox.style.left = '0'
                itembox.style.top = '0'
                itembox.style.transform = `translate(${(iw + this.gap) * c + 10}px , ${this.heights[c]}px)`
                let scrollTop = this.container.parentElement?.scrollTop
                let containerHeight = this.container.parentElement?.clientHeight
                this.trueDatas[i].translateX = (iw + this.gap) * c + 10
                this.trueDatas[i].translateY = this.heights[c]
                if (scrollTop !== undefined && containerHeight !== undefined && (this.trueDatas[i].translateY + this.trueDatas[i].height + this.gap > scrollTop) && (this.trueDatas[i].translateY + scrollTop) <= containerHeight) {
                    this.renderedList.add(i)
                    fragment.appendChild(itembox)
                }
                this.heights[c] += this.trueDatas[i].height + this.gap
            }
            this.container.appendChild(fragment)
            if (this.container.parentElement)
                this.containerHeight = this.container.parentElement.clientHeight
            this.container.style.height = Math.max(...this.heights) + 'px'
            this.showing = false
            return this
        }


        /**
         * 绑定resize
         */
        refreshAble() {


            window.onresize = this.debounce(this.render.bind(this), 200)
            if (this.container?.parentElement) {
                this.container.parentElement.onscroll = this.debounce(this.update.bind(this), 16)


            }
        }

        /**
         * 获取渲染范围
         */


        getRange() {
            let scollTop = this.container?.parentElement?.scrollTop
            let start = 0, end = this.trueDatas.length - 1
            if (scollTop !== undefined) {
                let flag = false
                for (let i = 0; i < this.trueDatas.length; i++) {

                    if (!flag && this.trueDatas[i].translateY + this.trueDatas[i].height + 80 > scollTop) {

                        flag = true
                        start = i


                    }
                    if (this.trueDatas[i].translateY - 100 > this.containerHeight + scollTop) {
                        end = i
                        break
                    }
                }
            }
            return [start, end]
        }
        /**
         * 更新页面
         */
        update() {
            let container = this.container
            if (container) {
                let [start, end] = this.getRange()
                if (end === this.trueDatas.length - 1) {
                    this.reachBottom = true
                    !this.fetching && this.onReachBottom()
                } else {
                    this.reachBottom = false
                }
                let list = this.renderedList
                let candidate: number[] = []
                let deprecated: number[] = []
                let o: number[] = Array.from(list as unknown as ArrayLike<number>)

                let ele = container.childNodes


                for (let i = start; i <= end; i++) {

                    if (list.has(i)) {

                        list.delete(i)

                    } else {
                        candidate.push(i)
                    }

                }
                list.forEach((item) => {

                    deprecated.push(o.indexOf(item))
                })
                list.clear()
                for (let i = start; i <= end; i++) {
                    list.add(i)
                }


                if (deprecated[0] === 0) {
                    while (deprecated.length) {
                        let e = ele[0]

                        container.removeChild(e)
                        deprecated.pop()
                    }
                } else {
                    while (deprecated.length) {

                        let e = ele[ele.length - 1]

                        container.removeChild(e)
                        deprecated.pop()
                    }
                }

                let f = document.createDocumentFragment()
                candidate.map(item => {

                    f.appendChild(this.trueDatas[item].ele)
                })
                if (candidate[0] === start) {
                    let fe = container.firstChild

                    container.insertBefore(f, fe)

                } else {
                    container.appendChild(f)
                }


            }

        }

        /**
         * 获取更多数据
         */

        async pushData(datas: any[]) {
            if (this.container && this.generateFun) {
                let newDatas = await this.generateFun(datas, this.columnWidth)
                for (let i = 0; i < newDatas.length; i++) {
                    let c = this.heights.indexOf(Math.min(...this.heights))
                    let itembox = newDatas[i].ele
                    itembox.style.position = 'absolute'
                    itembox.style.left = '0'
                    itembox.style.top = '0'
                    itembox.style.cursor = 'pointer'
                    itembox.style.transform = `translate(${(this.columnWidth + this.gap) * c + 10}px , ${this.heights[c]}px)`
                    newDatas[i].translateX = (this.columnWidth + this.gap) * c + 10
                    newDatas[i].translateY = this.heights[c]
                    newDatas[i].ele = itembox
                    this.trueDatas.push(newDatas[i])
                    this.heights[c] += newDatas[i].height + this.gap
                }
                // 更新容器高度
                this.container.style.height = Math.max(...this.heights) + 'px'
            }
        }
        /**
         * debounce
         */
        debounce(f: Function, t: number) {
            let timer: any = null

            return function () {
                if (timer) {
                    clearTimeout(timer)
                }
                timer = setTimeout(() => {
                    f()
                    clearTimeout(timer)
                    timer = null

                }, t);
            }
        }


    }

    let instance: Render

    return Render

}

const Render = getRender()
export default Render