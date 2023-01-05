<template>
	<div>{{ data }}</div>
</template>

<script setup lang="ts">
import { defineComponent, getCurrentInstance, onMounted, reactive } from "vue";
import { getStockMinLineData, getStockInfo } from '@/api/api'
// const data = reactive([])

</script>

<script lang="ts">
export default {
  data() {
    return {
      data: [],
    };
  },
  mounted() {
    // 挂载全局变量
    const {
      appContext: {
        config: { globalProperties },
      },
    } = getCurrentInstance();
    this.g = globalProperties;
    this.init();
    const symbol = 'sz300750'
    // sh600006
    getStockMinLineData(symbol)
    getStockInfo(symbol)
      .then(res => {
        console.log(0, res)
        const keys = [
          { key: '', label: 'useless1', value: '' },
          { key: '', label: 'name', value: '' },
          { key: '', label: 'symbol', value: '' },
          { key: '', label: '股价', value: '' },
          { key: '', label: '昨收', value: '' },
          { key: '', label: '今开', value: '' },
          { key: '', label: '成交量', value: '' },
          { key: '', label: '成交额', value: '' },
          { key: '', label: '未知', value: '' },
          { key: '', label: '买1价', value: '' },
          { key: '', label: '买1量', value: '' },
          { key: '', label: '买2价', value: '' },
          { key: '', label: '买2量', value: '' },
          { key: '', label: '买3价', value: '' },
          { key: '', label: '买3量', value: '' },
          { key: '', label: '买4价', value: '' },
          { key: '', label: '买4量', value: '' },
          { key: '', label: '买5价', value: '' },
          { key: '', label: '买5量', value: '' },
          { key: '', label: '卖1价', value: '' },
          { key: '', label: '卖1量', value: '' },
          { key: '', label: '卖2价', value: '' },
          { key: '', label: '卖2量', value: '' },
          { key: '', label: '卖3价', value: '' },
          { key: '', label: '卖3量', value: '' },
          { key: '', label: '卖4价', value: '' },
          { key: '', label: '卖4量', value: '' },
          { key: '', label: '卖5价', value: '' },
          { key: '', label: '卖5量', value: '' },
          { key: '', label: 'useless2', value: '' },
          { key: '', label: 'useless3', value: '' },
          { key: '', label: '跌价', value: '' },
          { key: '', label: '跌幅', value: '' },
          { key: '', label: '最高', value: '' },
          { key: '', label: '最低', value: '' },
          { key: '', label: '价/量/额', value: '' },
          { key: '', label: '成交量', value: '' },
          { key: '', label: '成交额', value: '' },
          { key: '', label: '换手率', value: '' },
          { key: '', label: 'PE/TTM', value: '' },
          { key: '', label: '最高？', value: '' },
          { key: '', label: '最低？', value: '' },
          { key: '', label: '振幅', value: '' },
          { key: '', label: '流通值', value: '' },
          { key: '', label: '总市值', value: '' },
          { key: '', label: '市净率', value: '' },
          { key: '', label: '涨停', value: '' },
          { key: '', label: '跌停', value: '' },
          { key: '', label: 'useless4', value: '' },
          { key: '', label: '委买委卖差', value: '' },
          { key: '', label: '均价', value: '' },
          { key: '', label: 'unknown2', value: '' },
          { key: '', label: 'unknown3', value: '' },
          { key: '', label: 'useless5', value: '' },
          { key: '', label: 'useless6', value: '' },
          { key: '', label: 'unknown4', value: '' },
          { key: '', label: '成交额/万', value: '' },
          { key: '', label: '盘后成交额', value: '' },
          { key: '', label: '盘后成交量', value: '' },
          { key: '', label: 'unknown5', value: '' },
          { key: '', label: 'unknown6', value: '' },
          { key: '', label: 'unknown7', value: '' },
          { key: '', label: 'unknown8', value: '' },
          { key: '', label: 'unknown9', value: '' },
          { key: '', label: 'unknown10', value: '' },
          { key: '', label: 'unknown11', value: '' },
          { key: '', label: 'unknown12', value: '' },
          { key: '', label: 'unknown13', value: '' },
          { key: '', label: 'unknown14', value: '' },
        ]
        if (typeof res === 'string') {
          const data: Array = res.split('~')
          // const main = data.slice(1, 1+8)
          // const jingjia = data.slice(9, 9+20)

          // const o = data.slice(29+2)
          console.log(1, data)
          for (let i = 0; i < keys.length; i++) {
            const e = keys[i]
            e.value = data[i]
            console.log(e.label, e.value);
          }
        }

      })
  },
  methods: {
    async init() {
      const html: string = await this.getHtml("002487");
      const el = document.createElement("div");
      el.innerHTML = html;
      const table: HTMLTableElement | null = el.querySelector(
        ".fr.yjyc .m_table.m_hl"
      );

      if (table) {
        const keys: Array<string> | undefined = this.getTableHead(table);
        const list: Array<Map<string, string> | undefined> | undefined =
          this.getTableData(table, keys);
        if (list?.length) {
          this.data = list
        }
      }
    },

    getTableHead(el: HTMLTableElement): Array<string> {
      const rows = el.rows;
      if (!rows.length) {
        return [];
      }
      const keys: Array<string> = [];
      const headCells = rows?.item(0)?.cells;
      // LOOP THROUGH EACH CELL
      if (headCells) {
        for (let j = 0; j < headCells.length; j++) {
          const innerHTML = headCells.item(j)?.innerHTML
          keys.push(innerHTML)
        }
      }
      return keys;
    },

    getTableData(el: HTMLTableElement, keys: Array<string>) {
      const rows = el.rows;
      if (!rows.length) {
        return;
      }

      const list = [];
      // LOOP ROW AFTER HEADER.
      for (let i = 1; i < rows.length; i++) {
        const objCells: HTMLCollectionOf<HTMLTableCellElement> | undefined =
          rows.item(i)?.cells;
        const data = new Map();
        if (objCells) {
          // LOOP THROUGH EACH CELL
          for (let j = 0; j < objCells.length; j++) {
            const key: string = keys[j] || "";
            data.set(key, objCells.item(j)?.innerHTML);
          }
        }
        list.push(data);
      }
      return list;
    },

    getHtml(code: string): Promise<string, any> {
      return new Promise((resolve, reject) => {
        this.g
          .$axios({
            method: "get",
            url: `/api/stockanalysor/worth/${code}/worth.html`,
            responseType: "arraybuffer", // 关键步骤
            responseEncoding: "utf8",
          })
          .then((res: any) => {
            const { data } = res
            const utf8decoder = new TextDecoder("GBK"); // 关键步骤
            const html: string = utf8decoder.decode(data);
            resolve(html);
          })
          .catch((err: any) => {
            console.warn(err);
            reject(err);
          });
      });
    },
  },
};
</script>

<style scoped>
.read-the-docs {
	color: #888;
}
</style>
