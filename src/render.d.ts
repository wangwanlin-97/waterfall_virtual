export type WaterFallItem = {
    ele: HTMLDivElement;
    height: number;
    translateY: number;
    translateX: number;
};
/**
 * @param datas   the origin datas need to be processed,which shoule be passed to Render constructor
 * @param itemWidth   the width of each item calculated based on the width range passed in
 * @returns  a  WaterFallItem like Obj
 * }
 */
export type GenerateDataFun = (datas: any[], itemWidth: number) => Promise<WaterFallItem[]>;
declare const Render: {
    new (container: HTMLDivElement | null, datas: any[], generatorFun: GenerateDataFun, min: number, max: number, gap: number): {
        container: HTMLDivElement | null;
        datas: any[];
        trueDatas: WaterFallItem[];
        heights: number[];
        generateFun: GenerateDataFun | undefined;
        containerHeight: number;
        column: number;
        columnWidth: number;
        min: number;
        max: number;
        gap: number;
        showing: boolean;
        reachBottom: boolean;
        fetching: boolean;
        onReachBottom: () => void;
        renderedList: Set<number>;
        debounced: () => void;
        /**
         * 渲染数据
         */
        render(): Promise<any | undefined>;
        /**
         * 绑定resize
         */
        refreshAble(): void;
        /**
         * 获取渲染范围
         */
        getRange(): number[];
        /**
         * 更新页面
         */
        update(): void;
        /**
         * 获取更多数据
         */
        pushData(datas: any[]): Promise<void>;
        /**
         * debounce
         */
        debounce(f: Function, t: number): () => void;
    };
};
export default Render;
