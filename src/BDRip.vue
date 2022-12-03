<script lang="ts" setup>
import { computed, ref } from 'vue'
import { HTML2BBCode } from 'html2bbcode'

type PublishPlatform = 'bangumi' | 'other'

const specialStylesOther = {
  '*[titl]': '  <li><h4 style="margin: 2px 0; font-size: 20px;">REPLACE</h4></li>',
  '*[bold]': '  <li><strong>REPLACE</strong></li>',
  '*[blue]': '  <li><span style="color: rgb(33, 66, 115);">REPLACE</span></li>',
}

const specialStylesBangumi = {
  '*[titl]': '  <h4 style="margin: 2px 0; font-size: 20px;">REPLACE</h4>',
  '*[bold]': '  <b>REPLACE</b>',
  '*[blue]': '  <span style="color: rgb(33, 66, 115);">REPLACE</span>',
}

const imgSrc = ref('')
const texts = ref(`*[titl]离谱Sub
*[blue]白金终局 / プラチナエンド / Platinum End
---
*[blue]本 BDRip 由 AI-Raws 编写脚本/参数
*[blue]本字幕由 离谱Sub 制作

*[blue]The script and encode parameter were written by AI-Raws.
*[blue]The subtitles were produced by LPSub.

巴拉巴拉
*[bold]pp: denoise, rescacle, aa, adaptive-sharpen, deband
---
IMAGES COMPARE
https://img.2222.moe/images/2022/10/14/PE.01.png https://img.2222.moe/images/2022/10/14/PE.01.enced.png
---`)
const mediaInfo = ref('')
const platform = ref<PublishPlatform>('other')
const outputOther = computed(() => {
  const sections: string[] = []
  for (const s of texts.value.split('---')) {
    if (s.trim() !== '') {
      sections.push(s.trim())
    }
  }
  const sectionsHtml = []
  for (const s of sections) {
    const sHtml = [`<ul style="font-family: 'Sarasa Gothic SC', 'Source Han Sans CN', 'Noto Sans SC', 'Source Han Sans SC', 'Noto Sans CJK SC', sans-serif; color: rgb(60, 60, 60); font-size: 14px; margin-top: 20px; font-size: 12px; padding: 9px 18px; border-left: 4px solid rgb(33, 66, 115); background-color: #fafafa; list-style: none; word-break: break-all; position: relative; overflow: hidden;">`]
    const lines = s.split('\n')
    for (const l of lines) {
      if (lines[0] === 'IMAGES COMPARE') {
        if (l === lines[0]) {
          sHtml.push('  <li>_______________________source___________________________________encode_______________________</li>')
          sHtml.push('  <li></li>')
        } else {
          sHtml.push(`  <li><img src="${l.split(' ')[0]}" width="350" height="197" align="textTop" hspace="5" vspace="5" alt=""><img src="${l.split(' ')[1]}" width="350" height="197" align="textTop" hspace="5" vspace="5" alt=""></li>`)
        }
        continue
      }
      if (l.startsWith('*[')) {
        // @ts-ignore
        sHtml.push(specialStylesOther[l.substring(0, 7)].replace('REPLACE', l.substring(7).replace('\n', '<br>')))
      } else {
        sHtml.push(`  <li><span>${l === '' ? '<br>' : l.replace('\n', '<br>')}</span></li>`)
      }
    }
    sHtml.push('</ul>')
    sectionsHtml.push(sHtml.join('\n'))
  }

  return `<div lang="zh-CN">
<div style="display: flex; justify-content: center;margin-bottom: 10px;"><img alt="封面" style="margin-left: 10px; margin-bottom: 10px; width: 720px; margin: 0 auto;" id="wr-cover" src="${imgSrc.value}"></div>
<span style="font-family: 'Sarasa Gothic SC', 'Source Han Sans CN', 'Noto Sans SC', 'Source Han Sans SC', 'Noto Sans CJK SC', sans-serif; color: rgb(60, 60, 60); font-size: 14px;" id="wr-info">
</span>
${sectionsHtml.join('\n')}
<ul style="font-family: 'Sarasa Gothic SC', 'Source Han Sans CN', 'Noto Sans SC', 'Source Han Sans SC', 'Noto Sans CJK SC', sans-serif; color: rgb(60, 60, 60); font-size: 13px; margin-top: 20px; font-size: 12px; padding: 9px 18px; border-left: 4px solid rgb(33, 66, 115); background-color: #fafafa; list-style: none; word-break: break-all; position: relative; overflow: hidden;">
  <li><h4 style="margin: 2px 0; font-size: 20px;">交流 / 报错 / 加入我们 欢迎加入</h4></li>
  <li><strong>QQ群：</strong><span>690716401</span></li>
  <li><strong>Telegram频道：</strong><span><a href="https://t.me/lpsub_ch" target="_blank" style="color: rgb(5, 58, 255); text-decoration-line: none;"><em>@lpsub_ch</em></a></span></li>
  <li><strong>Telegram群组：</strong><span><a href="https://t.me/lpsub_chat" target="_blank" style="color: rgb(5, 58, 255); text-decoration-line: none;"><em>@lpsub_chat</em></a></span></li>
  <li><strong>邮箱：</strong><span><a style="color: rgb(5, 58, 255); text-decoration-line: none; height: 1px;" href="mailto:lpsub@yunyize.com">lpsub@yunyize.com</a></span></li>
</ul>
<ul style="font-family: 'Sarasa Gothic SC', 'Source Han Sans CN', 'Noto Sans SC', 'Source Han Sans SC', 'Noto Sans CJK SC', sans-serif; color: rgb(60, 60, 60); font-size: 13px; margin-top: 20px; font-size: 12px; padding: 9px 18px; border-left: 4px solid rgb(33, 66, 115); background-color: #fafafa; list-style: none; word-break: break-all; position: relative; overflow: hidden;">
  <details>
    <summary>MediaInfo（点击展开）</summary>
    <span>${mediaInfo.value}</span>
  </details>
</ul>
</div>`
})

const outputBangumi = computed(() => {
  const sections: string[] = []
  for (const s of texts.value.split('---')) {
    if (s.trim() !== '') {
      sections.push(s.trim())
    }
  }
  const sectionsHtml = []
  for (const s of sections) {
    const sHtml = [`<br><b>-------------------------------------------------------------------</b><br>`]
    const lines = s.split('\n')
    for (const l of lines) {
      if (lines[0] === 'IMAGES COMPARE') {
        if (l === lines[0]) {
          sHtml.push('_______________________source___________________________________encode_______________________<br>')
        } else {
          sHtml.push(`<img src="${l.split(' ')[0]}" width="350" height="197" align="textTop" hspace="5" vspace="5" alt=""><img src="${l.split(' ')[1]}" width="350" height="197" align="textTop" hspace="5" vspace="5" alt=""><br>`)
        }
        continue
      }
      if (l.startsWith('*[')) {
        // @ts-ignore
        sHtml.push(specialStylesBangumi[l.substring(0, 7)].replace('REPLACE', l.substring(7).replace('\n', '<br>')))
      } else {
        sHtml.push(`${l === '' ? '<br>' : l.replace('\n', '<br>')}<br>`)
      }
    }
    sHtml.push('<br><b>-------------------------------------------------------------------</b><br>')
    sectionsHtml.push(sHtml.join('\n'))
  }

  return `<p><img alt="封面" src="${imgSrc.value}"></p>
${sectionsHtml.join('\n')}
<b>-------------------------------------------------------------------</b><br>
<strong>离谱Sub</strong><br>
交流/报错/加入我们 欢迎加入<br>
<strong>QQ群</strong>:<strong> </strong><b>690716401</b><br>
<b>Telegram频道: <a href="https://t.me/lpsub_ch" target="_blank"><em>@lpsub_ch</em></a></b><br>
<b>Telegram群组: <a href="https://t.me/lpsub_chat" target="_blank"><em>@lpsub_chat</em></a></b><br>
邮箱: <a href="mailto:lpsub@yunyize.com">lpsub@yunyize.com</a><br>
<b>-------------------------------------------------------------------</b><br>
<details>
  <summary>MediaInfo（点击展开）</summary>
  <span>${mediaInfo.value}</span>
</details>`
})

const outputBBCode = computed(() => new HTML2BBCode().feed(outputBangumi.value).toString())

function changePlatform(index: string) {
  // @ts-ignore
  platform.value = index
}
</script>

<template>
  <main>
    <div class="preview">
      <div class="control">
        <el-menu :default-active="platform" mode="horizontal" @select="changePlatform">
          <el-menu-item index="other">其他</el-menu-item>
          <el-menu-item index="bangumi">萌番组</el-menu-item>
        </el-menu>
        <el-button @click="$router.push('/')">常规</el-button>
      </div>
      <div class="view" v-html="platform === 'other' ? outputOther : outputBangumi"></div>
    </div>
    <div class="input"> 
      <el-input v-model="imgSrc" placeholder="填入图片链接" />

      <div class="con">
        <el-input
          v-model="texts"
          type="textarea"
          placeholder="输入自定义文本"
        />
      </div>

      <div class="mediainfo">
        <el-input
          v-model="mediaInfo"
          type="textarea"
          placeholder="输入 MediaInfo"
        />
      </div>
      
      <div class="output">
        <el-input
          v-model="outputOther"
          v-show="platform === 'other'"
          type="textarea"
        />
        <el-input
          v-model="outputBangumi"
          v-show="platform === 'bangumi'"
          type="textarea"
        />
        <el-input
          v-model="outputBBCode"
          type="textarea"
        />
      </div>
    </div>
  </main>
</template>

<style lang="scss">
body {
  --body-padding: 20px;
  padding: var(--body-padding);
  margin: 0;
  box-sizing: border-box;
}

@media (max-width: 768px) {
  main {
    flex-direction: column;

    .input {
      .output {
        flex-direction: column;
      }
    }
  }
}

main {
  display: flex;
  height: calc(100vh - var(--body-padding) * 2);
  gap: 16px;
  
  .preview {
    flex: 4;
    
    .control {
      width: 100%;
      display: flex;
      gap: 6px;

      .el-menu {
        flex: auto;
        height: 40px;
        margin-bottom: 10px;
      }
    }
  }

  .input {
    flex: 6;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .el-textarea {
      height: 100%;

      .el-textarea__inner {
        height: 100%
      }
    }

    .con {
      flex: 3
    }

    .mediainfo {
      flex: 1;
    }
    
    .cc-type {
      span {
        color: #606266;
        font-size: 14px;
      }
    }

    .output {
      flex: 2;
      display: flex;
      gap: 16px;
    }
  }
}
</style>