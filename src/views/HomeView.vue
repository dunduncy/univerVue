<template>
  <div class="outer">
  <!-- <div class="btns">
    <input type="file" @change="importExcel"/>
    <button>保存</button>
  </div> -->
  <div ref="container">
  </div>
</div>
</template>
 
<script>
import { createUniver, defaultTheme, LocaleType, merge } from '@univerjs/presets';
import { UniverSheetsCorePreset } from '@univerjs/presets/preset-sheets-core';
import UniverPresetSheetsCoreZhCN from '@univerjs/presets/preset-sheets-core/locales/zh-CN';
 
import { UniverSheetsAdvancedPreset } from '@univerjs/presets/preset-sheets-advanced';
import UniverPresetSheetsAdvancedZhCN from '@univerjs/presets/preset-sheets-advanced/locales/zh-CN';
import { UniverSheetsDrawingPreset } from '@univerjs/presets/preset-sheets-drawing'
import UniverPresetSheetsDrawingZhCN from '@univerjs/presets/preset-sheets-drawing/locales/zh-CN'

import '@univerjs/presets/lib/styles/preset-sheets-core.css'
import '@univerjs/presets/lib/styles/preset-sheets-drawing.css'
import '@univerjs/presets/lib/styles/preset-sheets-advanced.css'
 
export default {
  data() {
    return {
      univerAPI: null,
    };
  },
  mounted() {
    const { univerAPI } = createUniver({
      locale: LocaleType.ZH_CN,
      locales: {
        [LocaleType.ZH_CN]: merge(
          {},
          UniverPresetSheetsCoreZhCN,
          UniverPresetSheetsDrawingZhCN,
          UniverPresetSheetsAdvancedZhCN,
        ),
      },
      theme: defaultTheme,
      presets: [
        UniverSheetsCorePreset({
          container: this.$refs.container,
        }),
        UniverSheetsDrawingPreset(),
        UniverSheetsAdvancedPreset({
          universerEndpoint: 'http://localhost:3000',
        }),
      ],
    });
    
    univerAPI.createWorkbook({ name: 'Test Sheet1' });
 
    this.univerAPI = univerAPI;
  },
  methods:{
    async importExcel(value){
      console.log(value);
      // 接受 File 对象
      const snapshot = await univerAPI.importXLSXToSnapshotAsync();
      // 或者接受远程文件的 URL
      // const snapshot = await univerAPI.importXLSXToSnapshotAsync('https://example.com/filename.xlsx');
      console.log('Snapshot created:', snapshot); // 了解更多: https://docs.univer.ai/zh-CN/guides/sheets/getting-started/workbook-data
      
      // 通过快照创建一个新的工作簿
      this.univerAPI.createWorkbook(snapshot);
    }
  },
  beforeDestroy() {
    this.univerAPI.dispose();
    this.univerAPI = null;
  },
}
</script>
<style scoped lang="scss">
@import '@univerjs/presets/lib/styles/preset-sheets-core.css';
@import '@univerjs/presets/lib/styles/preset-sheets-drawing.css';
@import '@univerjs/presets/lib/styles/preset-sheets-advanced.css';

.outer{
   height: 100%;
}
.btns{
  height: 40px;
  line-height: 40px;
  padding: 0 20px;
}
.univer-theme{
  height: calc(100% - 40px);
  overflow: hidden;
}
</style>