<template>
  <div ref="container"></div>
</template>
 
<script>
import { createUniver, defaultTheme, LocaleType, merge } from '@univerjs/presets';
import { UniverSheetsCorePreset } from '@univerjs/presets/preset-sheets-core';
import UniverPresetSheetsCoreZhCN from '@univerjs/presets/preset-sheets-core/locales/zh-CN';
 
import '@univerjs/presets/lib/styles/preset-sheets-core.css';
 
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
        ),
      },
      theme: defaultTheme,
      presets: [
        UniverSheetsCorePreset({
          container: this.$refs.container,
        }),
      ],
    });
    
    univerAPI.createWorkbook({ name: 'Test Sheet' });
 
    this.univerAPI = univerAPI;
  },
  beforeDestroy() {
    this.univerAPI.dispose();
    this.univerAPI = null;
  },
}
</script>