<script lang="ts" setup>
import { computed, ref } from 'vue'

type CCType = 'by-nc-nd' | 'by-nc-sa'

const workInfo = ref('')
const staffTextArea = ref('')
const CC = ref<CCType>('by-nc-sa')
const output = computed(() => {
  const staffTemplate = '<li><strong>JOB：</strong><span>NAME</span></li>'
  let staff: string[] = []
  for (const line of staffTextArea.value.split('\n')) {
    const args = line.split(': ')
    staff.push(staffTemplate.replace('JOB', args[0]).replace('NAME', args.splice(1).join(': ')))
  }

  const workInfoLines = workInfo.value.split('\n')
  let workInfoHtml: string[] = []
  let imgSrc = ''
  for (const line of workInfoLines) {
    if (line.startsWith('[img]')) {
      imgSrc = line.replace('[img]', '').replace('[/img]', '')
    } else if (line !== '' && !line.includes('◎简　　介')) {
      workInfoHtml.push(`<div>${line}</div>`)
    } else if (line !== '' && line.includes('◎简　　介')) {
      workInfoHtml.push(`<div>${line}</div>`)
      workInfoHtml.push(`<span>${workInfoLines[workInfoLines.length - 1]}</div>`)
      break
    }
  }

  return `<div style="text-align: left;">
<img alt="封面" style="margin-left: 10px; margin-bottom: 10px;" id="wr-cover" src="${imgSrc}">
<span style="font-family: arial, tahoma, verdana; color: rgb(60, 60, 60); font-size: 14px;" id="wr-info">
  ${workInfoHtml.join('\n  ')}
</span>
<ul style="font-family: arial, tahoma, verdana; color: rgb(60, 60, 60); font-size: 14px; margin-top: 20px; font-size: 12px; padding: 9px 18px; border-left: 4px solid rgb(33, 66, 115); background-color: #fafafa; list-style: none; word-break: break-all; position: relative; overflow: hidden;">
  <li><h4 style="margin: 2px 0; font-size: 20px;">离谱Sub</h4></li>
  ${staff.join('\n  ')}
  <div style="margin-top: 8px;">
    <li>本作品采用 <a href="https://creativecommons.org/licenses/${CC.value}/4.0/deed.zh" target="_blank" style="color: rgb(5, 58, 255); text-decoration-line: none;">知识共享署名-非商业性使用-${CC.value === 'by-nc-nd' ? '禁止演绎' : '相同方式共享'} 4.0 国际许可协议</a> 进行许可</li>
    <li><a href="https://creativecommons.org/licenses/${CC.value}/4.0/deed.zh" target="_blank"><img style="margin-top: 4px;" src="https://i.creativecommons.org/l/${CC.value}/4.0/88x31.png" alt="Creative Commons"></a></li>
  </div>
</ul>
<ul style="font-family: arial, tahoma, verdana; color: rgb(60, 60, 60); font-size: 13px; margin-top: 20px; font-size: 12px; padding: 9px 18px; border-left: 4px solid rgb(33, 66, 115); background-color: #fafafa; list-style: none; word-break: break-all; position: relative; overflow: hidden;">
  <li><h4 style="margin: 2px 0; font-size: 20px;">交流 / 报错 / 加入我们 欢迎加入</h4></li>
  <li><strong>QQ群：</strong><span>690716401</span></li>
  <li><strong>Telegram频道：</strong><span><a href="https://t.me/lpsub_ch" target="_blank" style="color: rgb(5, 58, 255); text-decoration-line: none;"></a><em>@lpsub_ch</em></a></span></li>
  <li><strong>Telegram群组：</strong><span><a href="https://t.me/lpsub_chat" target="_blank" style="color: rgb(5, 58, 255); text-decoration-line: none;"><em>@lpsub_chat</em></a></span></li>
  <li><strong>邮箱：</strong><span><a style="color: rgb(5, 58, 255); text-decoration-line: none;" height: 1px; border-top: 1px dashed rgb(60, 60, 60);ef="mailto:lpsub@yunyize.com">lpsub@yunyize.com</a></span></li>
</ul>
<ul style="font-family: arial, tahoma, verdana; color: rgb(60, 60, 60); font-size: 13px; margin-top: 20px; font-size: 12px; padding: 9px 18px; border-left: 4px solid rgb(33, 66, 115); background-color: #fafafa; list-style: none; word-break: break-all; position: relative; overflow: hidden;">
  <li><h4 style="margin: 2px 0; font-size: 20px;">字幕组招募：翻译 校对 时轴 压制 繁化</h4></li>
  <li><strong>翻译：</strong><span>能正确听译动画即可，同时有一定语文水平（虽然不一定文笔要多好，但是至少不能写出病句）；</span></li>
  <li><strong>校对：</strong><span>能对翻译稿的错误进行校正，同时有一定语文水平（当然也是至少不能写出病句）；</span></li>
  <li><strong>压制：</strong><span>要求有一定的压制设备（10代i5及以上水平），使用 VapourSynth 进行压制（能写脚本最好，不会也行）（当然我们实际使用的是 OKEGui 进行压制，详见 <a href="https://github.com/lpsub-114514/Encode-Tools" target="_blank" style="text-decoration-line: none;"><strong>GitHub</strong></a>；</span></li>
  <li><strong>时轴：</strong><span>能使用 Aegisub 打轴，同时能利用 Advanced SubStation Alpha 和 Aegisub 等的特性写一些特效，同时能设置合适的样式；</span></li>
  <li><strong>繁化：</strong><span>如果您生活在或曾经生活在中国香港或其周边地区，对当地用语习惯比较熟悉，那么欢迎加入我们，进行字幕繁化工作；</span></li>
  <hr>
  <li><span>我们长期提供 <strong>时轴</strong> / <strong>压制</strong> 教学</span></li>
  <li><strong>字幕组所收集字体包：</strong><span>详见 <strong><a href="https://bbs.acgrip.com/thread-9396-1-1.html" target="_blank" style="text-decoration-line: none; color: #3d3e5b;">Anime 字幕论坛</a></strong></span></li>
</ul>
</div>`
})
</script>

<template>
  <main>
    <div class="preview" v-html="output"></div>
    <div class="input">
      <div class="work-info">
        <el-input
          v-model="workInfo"
          type="textarea"
          placeholder="输入动画信息"
        />
      </div>

      <div class="staff">
        <el-input
          v-model="staffTextArea"
          type="textarea"
          placeholder="输入 Staff，一行一个，空格或冒号区分。例如：嵌字：甲乙丙丁"
        />
      </div>

      <div class="cc-type">
        <span>署名-非商业性使用-</span><br/>
        <el-radio-group v-model="CC">
          <el-radio label="by-nc-nd">禁止演绎</el-radio>
          <el-radio label="by-nc-sa">相同方式共享</el-radio>
        </el-radio-group>
      </div>
      
      <div class="output">
        <el-input
          v-model="output"
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
  }
}

main {
  display: flex;
  height: calc(100vh - var(--body-padding) * 2);
  gap: 16px;
  
  .preview {
    flex: 4;
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

    .work-info {
      flex: 2
    }

    .staff {
      flex: 2
    }
    
    .cc-type {
      span {
        color: #606266;
        font-size: 14px;
      }
    }

    .output {
      flex: 4;
    }
  }
}
</style>