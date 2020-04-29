<template>
    <div>
        <div class="ivu-table-wrapper" :style="{width: width+'px'}">
            <div class="ivu-table ivu-table-default">
                <div class="ivu-table-header">
                    <table cellspacing="0" cellpadding="0" border="0" style="width: 100%;">
                        <thead>
                            <tr>
                                <th class="table-cell" v-for="(th,index) in tableColemn" :key="'th'+index" :style="{width:th.width?`${th.width}px`:'auto'}">
                                    <div class="ivu-table-cell">
                                        <span>{{th.type === 'selection' ? '' : th.title}}</span>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div ref="scrollBox" class="ivu-table-body" @scroll="handleScroll" :style="{height: height-40+'px'}">
                    <div :style="{height:contentHeight}">
                        <table ref="content" style="width: 100%;">
                            <tbody class="ivu-table-tbody">
                                <template v-for="(td, index) in visbleData">
                                    <tr class="ivu-table-row" :key="'td_'+index" :style="{height:itemHeight+'px'}">
                                        <template v-for="(th,i) in tableColemn">
                                            <td class="table-cell" :key="`td_${index}_${i}`" :style="{width:th.width?`${th.width}px`:'auto'}">
                                                <div class="ivu-table-cell" v-if="th.type==='selection'">
                                                    <!-- <Checkbox :disabled="td._disabled" v-model="td._check" @on-change="selectRow(td)"></Checkbox> -->
                                                    <input type="checkbox" name="" id="">
                                                </div>
                                                <div class="ivu-table-cell" v-else>
                                                    <span>{{td[th.key]}}</span>
                                                </div>
                                            </td>
                                        </template>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const throttle = (fn, wait = 100) => {
    let lastTime = null
    return function () {
        let curTime = new Date()
        // 距离下次触发fn还需等待的时间(如果没有lastTime说明是第一次，可以表示执行，即等待时间为0
        let remainTime = lastTime ? wait - (curTime - lastTime) : 0
        if (remainTime <= 0 || remainTime > wait) {
            lastTime = curTime
            return fn.apply(this, arguments)
        }
    }
}
    export default {
        data() {
            return {
                visbleData: []
            }
        },
        props: {
            list: {
                type: Array,
                required: true,
            },
            tableColemn: {
                type: Array,
                require: true
            },
            itemHeight: {
                type: Number,
                default: 48
            },
            height: {
                type: Number,
                default: 500
            },
            width: {
                type: [Number, String],
                default: ''
            }
        },
        watch: {
            list(newVal) {
                if (newVal && newVal.length > 0) {
                    this.calculateVisibleData()
                }
            }
        },
        methods: {
            handleScroll: throttle(function () {
                // @todo考虑节流i防抖
                const scrollTop = this.$refs.scrollBox.scrollTop
                this.calculateVisibleData(scrollTop)
            }, 0),
            calculateVisibleData(scrollTop = 0) {
                // 根据偏移量，计算可见数据
                const visbleCount = Math.ceil(this.$refs.scrollBox.clientHeight / this.itemHeight)
                // 开始的索引
                // const start = (Math.floor(scrollTop / this.itemHeight) - visbleCount) < 0 ? 0 : Math.floor(scrollTop / this.itemHeight) - visbleCount
                const start = Math.floor(scrollTop / this.itemHeight)
                const end = start + visbleCount
                this.visbleData = this.list.slice(start, end)
                this.$refs.content.style.transform = `translate3d(0,${start * this.itemHeight}px,0)`
            },
            selectRow(row) {
                this.$emit('selectRow', row)
            }
        },
        mounted() {
            // 计算可视区域
            this.calculateVisibleData()
        },
        computed: {
            contentHeight() {
                // 整体内容的高度
                return (this.list.length * this.itemHeight) + 'px'
            }
        }
    }
</script>

<style scoped>
@import "./table.css";

.ivu-table-body {
    overflow: auto;
}
.ivu-checkbox-inner {
    transition: none;
}
</style>