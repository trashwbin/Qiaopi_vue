<template>
  <!-- 这里放置你的侨宝图标 -->
  <div class="qiaobao" ref="qiaobao" v-show="isTokenAvailable">
    <img class="qiaobao_icon" src="../../assets/ai/qiaobao8.gif" alt="侨宝" @mousedown="startDrag" @mousemove="dragImage"
      @mouseup="endDrag" @click="clickQiaobao" />
    <transition name="trivia">
      <div class="hp_trivia_inner" v-show="openDialog" :class="{ focusin: openDialog }">
        <!-- <el-collapse-transition> -->
        <div class="trivia" v-show="openDialog">
          <div id="k-chat-segments" class="outContainer___COldu">
            <div id="scroll-list" ref="chatContainer" @scroll="onScroll" class="scrollContainer___yynON"
              style="flex-direction: column-reverse; max-height: 100%">
              <div class="header___X8m95">
                <div class=" css-13wylk3" style="height: 12px"></div>
              </div>
              <div>
                <div class="chatItemBox___WntvB  css-jdjpte">
                  <div class="segmentItem" style="visibility: visible">
                    <div class="QiaoBaoZone___oXTWt zone-container normal normal">
                      <div class="conetntleft-hole">
                        <div class=" css-yxq2hw">
                          <div class=" css-yxq2hw" style="cursor: auto; position: relative">
                            <div class="aiAvatar___CdLiA  css-5nczy5">
                              <img src="../../assets/ai/avatar.png" class="image___tZVx_ loaded___iq7pZ loaded"
                                alt="" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="main-content">
                        <div class="pop-container">
                          <div class="popcontent-hole">
                            <div class="pop-content">
                              <div class="textContent___fo8HH  css-13wylk3">
                                <p class="MuiTypography-root MuiTypography-text css-p94avn">
                                  Hi，我是侨宝，是侨缘信使的AI小助手，负责侨批文化的传播工作。很高兴认识你！🌟
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="contentright-hole">
                        <div class=" css-yxq2hw"></div>
                      </div>
                    </div>
                  </div>
                  <div style="padding-top: 24px;" v-for="segment in segments" :key="segment.id">
                    <div v-if="segment.user" class="segmentItem  " :id="'chat-segment-user-' + segment.id">
                      <div class=" css-1r9wej0">
                        <div class="user-default-segment-component segmentComponent___NiCMo right___a75c4"
                          data="[object Object]">
                          <div class="segment-container">
                            <div class="main-container">
                              <div class="contentleft-hole">
                                <div class=" css-yxq2hw"></div>
                              </div>
                              <div class="main-content">
                                <div class="pop-container">
                                  <div class="popcontent-hole">
                                    <div class="pop-content">
                                      <div class="userContent___uG9aZ  ">
                                        <p class="MuiTypography-root MuiTypography-text css-p94avn">
                                          {{ segment.user.content }}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="actions">
                                    <div class="MuiStack-root chatSegmentActions___Len3_ css-1xhj18k">
                                      <button
                                        class="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium iconButton___3OzVF css-1uviwf"
                                        tabindex="0" type="button" data-testid="msh-chat-segment-copy" aria-label="复制">
                                        <span role="img" class="anticon icon___N21Rh  "><svg t="1731317284899"
                                            class="icon" viewBox="0 0 1024 1024" version="1.1"
                                            xmlns="http://www.w3.org/2000/svg" p-id="15577" width="16" height="16">
                                            <path
                                              d="M672 832 224 832c-52.928 0-96-43.072-96-96L128 160c0-52.928 43.072-96 96-96l448 0c52.928 0 96 43.072 96 96l0 576C768 788.928 724.928 832 672 832zM224 128C206.368 128 192 142.368 192 160l0 576c0 17.664 14.368 32 32 32l448 0c17.664 0 32-14.336 32-32L704 160c0-17.632-14.336-32-32-32L224 128z"
                                              fill="#8a8a8a" p-id="15578"></path>
                                            <path
                                              d="M800 960 320 960c-17.664 0-32-14.304-32-32s14.336-32 32-32l480 0c17.664 0 32-14.336 32-32L832 256c0-17.664 14.304-32 32-32s32 14.336 32 32l0 608C896 916.928 852.928 960 800 960z"
                                              fill="#8a8a8a" p-id="15579"></path>
                                            <path
                                              d="M544 320 288 320c-17.664 0-32-14.336-32-32s14.336-32 32-32l256 0c17.696 0 32 14.336 32 32S561.696 320 544 320z"
                                              fill="#8a8a8a" p-id="15580"></path>
                                            <path
                                              d="M608 480 288.032 480c-17.664 0-32-14.336-32-32s14.336-32 32-32L608 416c17.696 0 32 14.336 32 32S625.696 480 608 480z"
                                              fill="#8a8a8a" p-id="15581"></path>
                                            <path
                                              d="M608 640 288 640c-17.664 0-32-14.304-32-32s14.336-32 32-32l320 0c17.696 0 32 14.304 32 32S625.696 640 608 640z"
                                              fill="#8a8a8a" p-id="15582"></path>
                                          </svg></span><span
                                          class="MuiTouchRipple-root css-w0pj6f"></span></button><span class=" "></span>
                                      <!-- <button
                                      class="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium iconButton___3OzVF css-1uviwf"
                                      tabindex="0" type="button" data-testid="msh-prompt-edit-button" aria-label="修改">
                                      <span role="img" class="anticon icon___N21Rh  "><svg width="1em" height="1em"
                                          fill="currentColor" aria-hidden="true" focusable="false" class="">
                                          <use xlink:href="#mshd-ask-again"></use>
                                        </svg></span><span class="MuiTouchRipple-root css-w0pj6f"></span></button><span
                                      class=" "></span><button
                                      class="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium iconButton___3OzVF css-1uviwf"
                                      tabindex="0" type="button" aria-label="分享">
                                      <span role="img" class="anticon icon___N21Rh  "><svg width="1em" height="1em"
                                          fill="currentColor" aria-hidden="true" focusable="false" class="">
                                          <use xlink:href="#mshd-chat-share"></use>
                                        </svg></span><span class="MuiTouchRipple-root css-w0pj6f"></span></button><span
                                      class=" "></span><button
                                      class="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium iconButton___3OzVF css-1uviwf"
                                      tabindex="0" type="button" aria-label="设为常用语">
                                      <span role="img" class="anticon icon___N21Rh  "><svg width="1em" height="1em"
                                          fill="currentColor" aria-hidden="true" focusable="false" class="">
                                          <use xlink:href="#mshd-changyong"></use>
                                        </svg></span><span class="MuiTouchRipple-root css-w0pj6f"></span>
                                    </button> -->
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="contentright-hole">
                                <div class=" css-yxq2hw">
                                  <div class=" css-5nczy5">
                                    <div class="img____tAMC">
                                      <div class="lowImage___hU90c">
                                        <img
                                          src="https://avatar.moonshot.cn/avatar/crgk03egi3pthlog35og/1726038062.jpeg"
                                          class="image___tZVx_ loaded___iq7pZ loaded" alt="" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-if="segment.qiaobao" class="segmentItem " :id="'chat-segment-ai-' + segment.id">
                      <div class=" css-1r9wej0">
                        <div
                          class="QiaoBao-default-segment-component segmentComponent___NiCMo QiaoBaoSegmentComponent___sp0qB left___ajVdg">
                          <div class="segment-container">
                            <div class="main-container">
                              <div class="QiaoBaoZone___oXTWt zone-container normal">
                                <div class="conetntleft-hole">
                                  <div class=" css-yxq2hw">
                                    <div class=" css-yxq2hw" style="cursor: auto; position: relative">
                                      <div class="aiAvatar___CdLiA  css-5nczy5">
                                        <img src="../../assets/ai/avatar.png"
                                          class="image___tZVx_ loaded___iq7pZ loaded" alt="" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="main-content">
                                  <div class="pop-container">
                                    <div class="popcontent-hole">
                                      <div class="pop-content">
                                        <div class="normal___qxduM">
                                          <div class="" style="height: auto">
                                            <div id="chat-markdown-csor1mlvfrpjg392ko10-0-0">
                                              <div class="markdown___vuBDJ">
                                                <div class="markdown___vuBDJ"
                                                  :id="'chat-segment-ai-content-' + segment.id"
                                                  v-html="segment.qiaobao.content">
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div class="chatSegmentBottomActions___NZ_V8" v-if="segment.qiaobao.status != 1">
                                        <div class=" css-v48vqp" v-if="segment.qiaobao.status === 0">
                                          <span class="thinking-style">🤔侨宝正在思考中</span>🥰
                                        </div>
                                        <div class=" css-v48vqp" v-else-if="segment.qiaobao.status > 1">
                                          <button @click="copyContent"
                                            class="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium iconButton___3OzVF css-1uviwf"
                                            tabindex="0" type="button" data-testid="msh-chat-segment-copy">
                                            <span role="img" class="anticon icon___N21Rh  "><svg t="1731317284899"
                                                class="icon" viewBox="0 0 1024 1024" version="1.1"
                                                xmlns="http://www.w3.org/2000/svg" p-id="15577" width="16" height="16">
                                                <path
                                                  d="M672 832 224 832c-52.928 0-96-43.072-96-96L128 160c0-52.928 43.072-96 96-96l448 0c52.928 0 96 43.072 96 96l0 576C768 788.928 724.928 832 672 832zM224 128C206.368 128 192 142.368 192 160l0 576c0 17.664 14.368 32 32 32l448 0c17.664 0 32-14.336 32-32L704 160c0-17.632-14.336-32-32-32L224 128z"
                                                  fill="#8a8a8a" p-id="15578"></path>
                                                <path
                                                  d="M800 960 320 960c-17.664 0-32-14.304-32-32s14.336-32 32-32l480 0c17.664 0 32-14.336 32-32L832 256c0-17.664 14.304-32 32-32s32 14.336 32 32l0 608C896 916.928 852.928 960 800 960z"
                                                  fill="#8a8a8a" p-id="15579"></path>
                                                <path
                                                  d="M544 320 288 320c-17.664 0-32-14.336-32-32s14.336-32 32-32l256 0c17.696 0 32 14.336 32 32S561.696 320 544 320z"
                                                  fill="#8a8a8a" p-id="15580"></path>
                                                <path
                                                  d="M608 480 288.032 480c-17.664 0-32-14.336-32-32s14.336-32 32-32L608 416c17.696 0 32 14.336 32 32S625.696 480 608 480z"
                                                  fill="#8a8a8a" p-id="15581"></path>
                                                <path
                                                  d="M608 640 288 640c-17.664 0-32-14.304-32-32s14.336-32 32-32l320 0c17.696 0 32 14.304 32 32S625.696 640 608 640z"
                                                  fill="#8a8a8a" p-id="15582"></path>
                                              </svg></span><span
                                              class="MuiTypography-root MuiTypography-body1 label___TPWYH css-17cnyc1">复制</span><span
                                              class="MuiTouchRipple-root css-w0pj6f"></span>
                                          </button>
                                          <button
                                            class="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium iconButton___3OzVF css-1uviwf"
                                            tabindex="0" type="button" data-testid="msh-chat-segment-reAnswer">
                                            <span role="img" class="anticon icon___N21Rh  "><svg t="1731317437585"
                                                class="icon" viewBox="0 0 1024 1024" version="1.1"
                                                xmlns="http://www.w3.org/2000/svg" p-id="17977" width="200"
                                                height="200">
                                                <path
                                                  d="M512 837.339429c179.687619 0 325.339429-145.67619 325.339429-325.339429 0-31.451429-4.486095-61.878857-12.8-90.672762h60.708571c7.021714 29.086476 10.752 59.440762 10.752 90.672762 0 212.065524-171.934476 384-384 384-111.835429 0-212.48-47.786667-282.672762-124.099048V853.333333H170.666667v-192h192v58.660572h-100.839619A324.656762 324.656762 0 0 0 512 837.339429zM794.672762 252.099048V170.666667H853.333333v192h-192v-58.660572h100.839619A324.656762 324.656762 0 0 0 512 186.660571C332.312381 186.660571 186.660571 332.312381 186.660571 512c0 31.451429 4.461714 61.878857 12.8 90.672762h-60.708571A384.975238 384.975238 0 0 1 128 512c0-212.065524 171.934476-384 384-384 111.835429 0 212.48 47.786667 282.672762 124.099048z"
                                                  p-id="17978" fill="#8a8a8a"></path>
                                              </svg></span><span
                                              class="MuiTypography-root MuiTypography-body1 label___TPWYH css-17cnyc1">再试一次</span><span
                                              class="MuiTouchRipple-root css-w0pj6f"></span>
                                          </button>
                                          <!-- <button
                                          class="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium iconButton___3OzVF css-1uviwf"
                                          tabindex="0" type="button">
                                          <span role="img" class="anticon icon___N21Rh  "><svg t="1731317470468"
                                              class="icon" viewBox="0 0 1024 1024" version="1.1"
                                              xmlns="http://www.w3.org/2000/svg" p-id="19213" width="16" height="16">
                                              <path
                                                d="M354.986667 219.428571v73.142858H195.047619v536.380952h585.142857V548.571429h73.142857V828.952381a73.142857 73.142857 0 0 1-73.142857 73.142857H195.047619a73.142857 73.142857 0 0 1-73.142857-73.142857V292.571429a73.142857 73.142857 0 0 1 73.142857-73.142858h159.939048z m383.829333-100.473904l172.397714 172.373333-181.00419 181.028571-51.736381-51.712L757.784381 341.333333H670.47619c-139.068952 0-252.245333 110.884571-255.902476 249.07581L414.47619 597.333333v97.52381h-73.142857v-97.52381C341.333333 415.548952 488.69181 268.190476 670.47619 268.190476h114.127239l-97.499429-97.523809 51.712-51.712z"
                                                p-id="19214" fill="#8a8a8a"></path>
                                            </svg></span><span
                                            class="MuiTypography-root MuiTypography-body1 label___TPWYH css-17cnyc1">分享</span><span
                                            class="MuiTouchRipple-root css-w0pj6f">
                                          </span>
                                        </button>-->
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="contentright-hole">
                                  <div class=" css-yxq2hw"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button v-show="isScrollButtonVisible"
                class="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium btn___frwKo css-c80amz"
                tabindex="0" type="button" variant="circle" @click="scrollToBottom">
                <span role="img" class="anticon MuiBox-root css-0">
                  <svg t="1731339633590" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    p-id="21343" width="16" height="16">
                    <path
                      d="M108.332568 19.273983L511.908176 440.318458 915.547774 19.273983a61.684935 61.684935 0 0 1 89.583931 0 68.211765 68.211765 0 0 1 0 93.551219L556.700142 580.581298a61.556958 61.556958 0 0 1-89.583931 0L18.62066 112.953179a68.211765 68.211765 0 0 1 0-93.551219 61.684935 61.684935 0 0 1 89.583931 0zM1005.259682 443.389907a68.211765 68.211765 0 0 1 0 93.551219L556.700142 1004.697222a61.620947 61.620947 0 0 1-89.583931 0L18.556671 536.941126a68.211765 68.211765 0 0 1 0-93.551219 61.684935 61.684935 0 0 1 89.583931 0L511.908176 864.242417l403.639598-420.85251a61.620947 61.620947 0 0 1 89.583931 0z"
                      fill="#1296db" p-id="21344"></path>
                  </svg>
                </span>
                <span class="MuiTouchRipple-root css-w0pj6f"></span>
              </button>
            </div>
          </div>
        </div>
        <!-- </el-collapse-transition> -->
        <!-- <el-collapse-transition> -->
        <div v-show="openDialog" class="chatBottom___jS9Jd  css-jdjpte">
          <div class="chatInput___bMC0h">
            <div class="container___hM5mM  css-1satmpw">
              <div class="inputInner___ybWEr  css-1qeoss9">
                <div class="editor___KShcc editor___DSPKC">
                  <div class="editorContentEditable" contenteditable="true" data-testid="msh-chatinput-editor"
                    id="msh-chateditor" role="textbox" spellcheck="true" data-lexical-editor="true" style="
                    user-select: text;
                    white-space: pre-wrap;
                    word-break: break-word;
                 " @input="handleInput" @keydown="Keydown">
                    <p><br /></p>
                  </div>
                  <div v-show="isEmpty" class="placeholder___a_Pns">
                    快来和我聊天吧🥳
                  </div>
                </div>
                <div class="toolbarContainer___luEAj  css-ri750l">
                  <div class="switchContainer___Rh7mQ checked___qXNHW  css-1ok549f"
                    data-testid="msh-chatinput-net-button" aria-label="已接入互联网，QiaoBao 会在需要时通过互联网搜集资料">
                    <div class="switch___Ih0Wl">
                      <div class="circle___rDXMK"></div>
                    </div>
                    <div class="netSwitchText___kyYlZ">联网搜索</div>
                  </div>
                  <div class="toolbar___WUSec  css-jf4p5b">
                    <button
                      class="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium icon___zTPKp css-e5woe5"
                      tabindex="0" type="button" data-testid="msh-chatinput-common-button"
                      aria-label="输入常用语标题，可快捷调用常用语">
                      <span role="img" class="anticon  "><svg width="1em" height="1em" fill="currentColor"
                          aria-hidden="true" focusable="false" class="">
                          <use xlink:href="#mshd-changyong"></use>
                        </svg></span><span class="MuiTouchRipple-root css-w0pj6f"></span>
                    </button>
                    <div class=" ">
                      <label
                        class="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium btn___tpdor uploadButton___Ix9hl css-1uviwf"
                        tabindex="0" role="button" data-testid="msh-chatinput-upload-button"><span role="img"
                          class="anticon  "><svg width="1em" height="1em" fill="currentColor" aria-hidden="true"
                            focusable="false" class="">
                            <use xlink:href="#mshd-wenjian"></use>
                          </svg></span>
                        <div class="MuiFormControl-root MuiTextField-root MuiFileInput-TextField css-1n1n3u1">
                          <div
                            class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-formControl MuiInputBase-adornedStart MuiInputBase-adornedEnd css-1l5u3yp">
                            <div
                              class="MuiInputAdornment-root MuiInputAdornment-positionStart MuiInputAdornment-outlined MuiInputAdornment-sizeMedium css-1a6giau">
                              <span class="notranslate"></span><svg
                                class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv" focusable="false"
                                aria-hidden="true" viewBox="0 0 24 24" data-testid="AttachFileIcon">
                                <path
                                  d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6z">
                                </path>
                              </svg>
                            </div>
                            <label for=":rj7:" class="css-1fel157"><input aria-invalid="false" id=":rj7:" type="file"
                                multiple=""
                                accept="image/*, .md, .pdf, .txt, .csv, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation, .pdf, .csv, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .jpg, .jpeg, .png, .bmp, .gif, .webp, .sh, .bash, .bats, .cgi, .command, .fcgi, .ksh, .tmux, .tool, .zsh, .vb, .bas, .cls, .frm, .frx, .vba, .vbhtml, .vbs, .bat, .cmd, .c, .cats, .h, .idc, .cs, .cake, .cshtml, .csx, .cpp, .c++, .cc, .cp, .cxx, .h++, .hh, .hpp, .hxx, .inc, .inl, .ino, .ipp, .re, .tcc, .tpp, .coffee, ._coffee, .cjsx, .iced, .clj, .boot, .cl2, .cljc, .cljs, .cljscm, .cljx, .hic, .css, .d, .di, .dart, .diff, .patch, .dockerfile, .erb, .erl, .app.src, .es, .escript, .hrl, .xrl, .yrl, .src, .f90, .f, .f03, .f08, .f77, .f95, .for, .fpp, .go, .graphql, .gql, .groovy, .grt, .gtpl, .gvy, .hs, .hsc, .http, .icn, .ini, .cfg, .lektorproject, .prefs, .pro, .properties, .java, .js, ._js, .cjs, .bones, .es6, .frag, .gs, .jake, .jsb, .jscad, .jsfl, .jsm, .jss, .mjs, .njs, .pac, .sjs, .ssjs, .xsjs, .xsjslib, .json, .avsc, .geojson, .gltf, .JSON-tmLanguage, .jsonl, .tfstate, .topojson, .webapp, .webmanifest, .yy, .yyp, .kt, .ktm, .kts, .tex, .aux, .bbx, .bib, .cbx, .dtx, .ins, .lbx, .ltx, .mkii, .mkiv, .mkvi, .sty, .toc, .less, .liquid, .lisp, .asd, .cl, .l, .lsp, .ny, .podsl, .sexp, .ls, ._ls, .lua, .nse, .p8, .pd_lua, .rbxs, .wlua, .mak, .make, .mk, .mkfile, .md, .markdown, .mdown, .mdwn, .mkd, .mkdn, .mkdown, .ronn, .workbook, .apib, .blade, .chem, .ecr, .eex, .ejs, .html, .htm, .ipynb, .kit, .latte, .marko, .mask, .mtml, .phtml, .pic, .raml, .rhtml, .vue, .xht, .xhtml, .matlab, .m, .mel, .monkey, .monkey2, .n4jsd, .nasm, .nginxconf, .vhost, .pas, .dfm, .dpr, .lpr, .pascal, .pp, .pl, .al, .perl, .ph, .plx, .pm, .psgi, .t, .php, .aw, .ctp, .php3, .php4, .php5, .phps, .phpt, .pls, .bdy, .ddl, .fnc, .pkb, .pks, .plb, .plsql, .prc, .spc, .sql, .tpb, .tps, .trg, .vw, .ps1, .psd1, .psm1, .proto, .jade, .pug, .py, .bzl, .gyp, .gypi, .lmi, .py3, .pyde, .pyi, .pyp, .pyt, .pyw, .rpy, .spec, .tac, .wsgi, .xpy, .q, .r, .rd, .rsx, .jsx, .tsx, .rst, .rest, .rb, .builder, .eye, .gemspec, .god, .jbuilder, .mspec, .pluginspec, .podspec, .rabl, .rake, .rbuild, .rbw, .rbx, .ru, .ruby, .thor, .watchr, .rs, .sass, .scss, .scala, .kojo, .sbt, .sc, .scm, .sch, .sld, .sls, .sps, .ss, .st, .tpl, .cql, .mysql, .tab, .udf, .viw, .swift, .tcl, .adp, .tm, .textile, .ts, .mts, .cts, .vim, .wast, .wat, .yml, .mir, .reek, .rviz, .sublime-syntax, .syntax, .yaml, .yaml-tmlanguage, .jsp, .asp, .xml, .a, .out, .hql, .sv, .awk, .config, .lib, .war, .ear, .txt, .md, .mobi, .log, .cxx, .cc, .cs, .ini, .conf, .epub"
                                class="MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputAdornedStart MuiInputBase-inputAdornedEnd css-137xkys"
                                value="" /></label>
                            <div
                              class="MuiInputAdornment-root MuiInputAdornment-positionEnd MuiInputAdornment-outlined MuiInputAdornment-sizeMedium css-1nvf7g0"
                              style="visibility: hidden">
                              <span
                                class="MuiTypography-root MuiTypography-caption MuiFileInput-Typography-size-text css-1a8yg0f"></span><button
                                class="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall MuiFileInput-IconButton css-1ocw34v"
                                tabindex="0" type="button" aria-label="Clear" title="Clear">
                                <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall css-1k33q06" focusable="false"
                                  aria-hidden="true" viewBox="0 0 24 24" data-testid="CloseIcon">
                                  <path
                                    d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
                                  </path>
                                </svg><span class="MuiTouchRipple-root css-w0pj6f"></span>
                              </button>
                            </div>
                            <fieldset aria-hidden="true" class="MuiOutlinedInput-notchedOutline css-igs3ac">
                              <legend class="css-ihdtdm">
                                <span class="notranslate"></span>
                              </legend>
                            </fieldset>
                          </div>
                        </div>
                        <span class="MuiTouchRipple-root css-w0pj6f"></span>
                      </label>
                    </div>
                    <div class="sendButton___gubKW  " aria-label="请输入你的问题">
                      <button class=" css-1uviwf" tabindex="-1" type="button" data-testid="msh-chatinput-send-button"
                        id="send-button" :class="{ 'Mui-disabled': isEmpty }" :disabled="isEmpty" @click="handleSend">
                        <span role="img" class="anticon  ">
                          <svg t="1731315518743" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="13629" width="200" height="200" v-if="isEmpty">
                            <path
                              d="M867.84 397.653333l-597.333333-298.666666a128 128 0 0 0-174.08 166.4l102.4 229.12a45.226667 45.226667 0 0 1 0 34.986666l-102.4 229.12A128 128 0 0 0 213.333333 938.666667a133.973333 133.973333 0 0 0 57.6-13.653334l597.333334-298.666666a128 128 0 0 0 0-228.693334h-0.426667z m-37.973333 152.32l-597.333334 298.666667a42.666667 42.666667 0 0 1-57.6-55.466667l101.973334-229.12a85.333333 85.333333 0 0 0 3.413333-9.386666h293.973333a42.666667 42.666667 0 0 0 0-85.333334H280.32a85.333333 85.333333 0 0 0-3.413333-9.386666L174.933333 230.826667a42.666667 42.666667 0 0 1 57.6-55.466667l597.333334 298.666667a42.666667 42.666667 0 0 1 0 75.946666z"
                              fill="#bfbfbf" p-id="13630"></path>
                          </svg>
                          <svg v-else t="1731316134079" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="14480" id="mx_n_1731316134080" width="16"
                            height="16">
                            <path
                              d="M867.84 397.653333l-597.333333-298.666666a128 128 0 0 0-174.08 166.4l102.4 229.12a45.226667 45.226667 0 0 1 0 34.986666l-102.4 229.12A128 128 0 0 0 213.333333 938.666667a133.973333 133.973333 0 0 0 57.6-13.653334l597.333334-298.666666a128 128 0 0 0 0-228.693334h-0.426667z m-37.973333 152.32l-597.333334 298.666667a42.666667 42.666667 0 0 1-57.6-55.466667l101.973334-229.12a85.333333 85.333333 0 0 0 3.413333-9.386666h293.973333a42.666667 42.666667 0 0 0 0-85.333334H280.32a85.333333 85.333333 0 0 0-3.413333-9.386666L174.933333 230.826667a42.666667 42.666667 0 0 1 57.6-55.466667l597.333334 298.666667a42.666667 42.666667 0 0 1 0 75.946666z"
                              fill="#ffffff" p-id="14481"></path>
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="footerMark___cWT6F  css-1yjrar4">
            <article class="msh-typography text___fWKcN css-23bs09 css-var-r1">
              内容由 AI 大模型生成，请仔细甄别
            </article>
          </div>
        </div>
        <!-- </el-collapse-transition> -->
      </div>
    </transition>
  </div>
</template>

<script>
import useUserStore from '@/store/modules/user'
import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/foundation.css'
// import 'highlight.js/styles/monokai-sublime.css'
const rendererMD = new marked.Renderer()
marked.setOptions({
  renderer: rendererMD,
  highlight: function (code) {
    return hljs.highlightAuto(code).value
  },
  pedantic: false,
  gfm: true,
  tables: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
})

// 自定义节流函数
function throttle(func, limit) {
  let inThrottle
  return function () {
    const args = arguments
    const context = this
    if (!inThrottle) {
      func.apply(context, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

export default {
  name: 'QiaoBaoAI',
  data() {
    return {
      openDialog: false,
      isDragging: false,
      startX: 0,
      startY: 0,
      initialX: 0,
      initialY: 0,
      marginLeft: 0,
      marginTop: 0,
      isEmpty: true,
      userAvatar: useUserStore().avatar,
      segments: [],
      text: '',
      nowAnswer: '',
      timeOutCount: 0,
      chatCount: 0,
      linked: false,
      isScrollButtonVisible: false,
      statusTimeout: null
    }
  },
  methods: {
    async copyContent() {
      try {
        // 获取内容
        const content = this.$refs.qiaobao.querySelector('#chat-segment-ai-content-2').innerText
        // 复制到剪贴板
        await navigator.clipboard.writeText(content)
        alert('内容已复制到剪贴板')
      } catch (err) {
        console.error('复制失败:', err)
        alert('复制失败，请重试')
      }
    },
    handleInput() {
      const editorContentEditable = this.$refs.qiaobao.querySelector(
        '.editorContentEditable'
      )
      this.text = editorContentEditable.innerText.trim()
      this.isEmpty = this.text === ''
    },
    Keydown(e) {
      if (!e.shiftKey && e.keyCode === 13) {
        e.cancelBubble = true // ie阻止冒泡行为
        e.stopPropagation()// Firefox阻止冒泡行为
        e.preventDefault() // 取消事件的默认动作*换行
        // 以下处理发送消息代码
        this.handleSend()
      }
    },
    handleSend() {
      if (this.text === '') {
        return
      }
      const newSegment = {
        id: this.segments.length + 1,
        user: {
          content: this.text,
          // 0: 思考中 1: 回复中 2: 回复成功 3: 回复失败
          status: 0
        },
        qiaobao: {
          content: ''
        }
      }
      if (!this.isLinked) {
        this.initWebSocket()
        return
      }
      this.segments.push(newSegment)
      this.setLastSegmentStatus(0)
      // 清空输入框 以及设置为空
      this.$refs.qiaobao.querySelector('.editorContentEditable').innerText = ''
      this.isEmpty = true
      this.nowAnswer = ''
      // 之后处理指令也写在这里
      this.send()
    },
    setLastSegmentStatus(status) {
      const lastSegment = this.segments[this.segments.length - 1]
      if (lastSegment && lastSegment.qiaobao) {
        if (this.statusTimeout && status !== 0) {
          clearTimeout(this.statusTimeout)
        }
        this.$set(lastSegment.qiaobao, 'status', status)
      }
    },
    // 点击小侨宝图标
    clickQiaobao() {
      // 点击小侨宝图标后的操作
      if (!this.linked && this.websocket) {
        this.websocket.close()
      } else {
        this.initWebSocket()
      }
      if (!this.isDragging) {
        this.openDialog = !this.openDialog
      }
    },
    startDrag(event) {
      event.preventDefault()
      this.startX = event.clientX
      this.startY = event.clientY

      this.initialX = parseFloat(this.$refs.qiaobao.style.left) || 0
      this.initialY =
        parseFloat(this.$refs.qiaobao.style.top) || window.innerHeight * 0.8
      setTimeout(() => {
        this.isDragging = true
      }, 100)

      window.addEventListener('mousemove', this.dragImage)
      window.addEventListener('mouseup', this.endDrag)
    },
    dragImage(event) {
      if (!this.isDragging) return

      const newX = this.initialX + (event.clientX - this.startX)
      const newY = this.initialY + (event.clientY - this.startY)

      this.$refs.qiaobao.style.left = `${newX}px`
      this.$refs.qiaobao.style.top = `${newY}px`
    },
    endDrag(event) {
      setTimeout(() => {
        this.isDragging = false
      }, 100)
      window.removeEventListener('mousemove', this.dragImage)
      window.removeEventListener('mouseup', this.endDrag)
    },

    initWebSocket() {
      if ('WebSocket' in window) {
        // 这里记得要改成你自己的ip
        if (!this.linked) {
          // this.websocket = new WebSocket('ws://110.41.58.26:8080/ws/chat', useUserStore().token)
          this.websocket = new WebSocket('ws://localhost:8080/ws/chat', useUserStore().token)
          this.websocket.onerror = this.onError
          this.websocket.onopen = this.onOpen
          this.websocket.onmessage = this.onMessage
          this.websocket.onclose = this.onClose
          this.websocketTimeout = setTimeout(() => {
            if (this.websocket.readyState !== WebSocket.OPEN) {
              this.websocket.close()
            }
          }, 2000) // 设置超时时间为3000毫秒
        }
        // setTimeout(() => {
        //   if (!this.linked) {
        //     this.websocket = new WebSocket('ws://localhost:8080/ws/chat', useUserStore().token)
        //     // 为了方便写了这一坨屎删代码，有效解决各环境下不能调用的问题
        //     this.websocket.onerror = this.onError
        //     this.websocket.onopen = this.onOpen
        //     this.websocket.onmessage = this.onMessage
        //     this.websocket.onclose = this.onClose
        //     this.websocketTimeout = setTimeout(() => {
        //       if (this.websocket.readyState !== WebSocket.OPEN) {
        //         this.websocket.close()
        //         this.onError()
        //       }
        //     }, 2000)
        //   } // 设置超时时间为3000毫秒
        // }, 2500)
      } else {
        alert('Not support websocket')
      }
    },
    addUnloadListener() {
      window.addEventListener('beforeunload', this.handleBeforeUnload)
    },
    removeUnloadListener() {
      window.removeEventListener('beforeunload', this.handleBeforeUnload)
    },
    handleBeforeUnload() {
      if (this.websocket) {
        this.websocket.close()
      }
    },
    onError() {
      if (!this.linked) {
        this.$message.error('连接超时,请刷新页面重试!')
        this.websocket = null
      }
    },
    onOpen() {
      this.linked = true
    },
    onClose() {
      this.$message.warning('连接已断开')
      this.initWebSocket()
      // this.linked = false
    },
    setMessageInner(message) {
      this.setLastSegmentStatus(1)
      this.statusTimeout = setTimeout(() => {
        this.setLastSegmentStatus(0)
      }, 100)
      if (this.segments.length === 0) return
      const nowSegment = this.segments[this.segments.length - 1]
      if (!nowSegment.qiaobao) return
      this.nowAnswer += message
      nowSegment.qiaobao.content = marked(this.nowAnswer)
      // console.log(nowSegment.qiaobao.content);
      this.scrollToBottom()
    },
    onMessage(event) {
      try {
        const response = JSON.parse(event.data)
        if (response.code === 200) {
          this.$message.success(response.msg)
          switch (response.data.code) {
            case '[DONE]':
              this.setLastSegmentStatus(2)
              break
            case 'image':
              break
            case 'file':
              break
            default:
              return
          }
          return
        } else if (response.code === 500) {
          this.$message.error(response.msg)
          return
        }
        console.log(response)
      } catch (e) {
        // event.data is not JSON, handle accordingly if needed
      }
      this.setMessageInner(event.data)
    },
    send: throttle(function () {
      this.websocket.send(JSON.stringify({
        message: this.text
      }))
      this.scrollToBottom()
      // 做了一个50ms的节流,防止频繁发送,这里可以根据实际情况调整,缓解服务器压力
    }, 50),
    closeWebSocket() {
      if (this.websocket) {
        this.websocket.close()
      }
    },
    onScroll() {
      this.checkScrollButtonVisibility()
    },
    checkScrollButtonVisibility() {
      this.$nextTick(() => {
        const chatContainer = this.$refs.chatContainer
        if (chatContainer) {
          // console.log(Math.abs(chatContainer.scrollTop), chatContainer.clientHeight, chatContainer.scrollHeight)
          const isAtBottom = Math.abs(chatContainer.scrollTop) < 200
          this.isScrollButtonVisible = !isAtBottom && chatContainer.scrollHeight > 700
        }
      })
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const chatContainer = this.$refs.chatContainer
        if (chatContainer) {
          chatContainer.scrollTo({
            top: chatContainer.scrollHeight,
            behavior: 'smooth'
          })
        }
      })
    }
  },
  beforeDestroy() {
    this.removeUnloadListener()
    this.closeWebSocket()
  },
  created() {
    // this.initWebSocket()
  },
  computed: {
    isTokenAvailable() {
      // 登录了
      return !!useUserStore().token
    },
    isLinked() {
      return this.linked && this.websocket
    }
  },
  watch: {
    isLinked(newVal) {
      if (!newVal && this.isTokenAvailable) {
        setTimeout(() => {
          this.initWebSocket()
        }, 1000)
      }
    }
  }
}
</script>

<style scoped>
html,
body,
a,
div,
main,
span,
table,
tr,
td,
strong,
ul,
ol,
li,
h1,
h2,
h3,
p,
input {
  font-weight: inherit;
  font-size: inherit;
  list-style: none;
  border-spacing: 0;
  border: 0;
  border-collapse: collapse;
  text-decoration: none;
  padding: 0;
  margin: 0;
}

* {
  --react-pdf-annotation-layer: 1;
  /* --annotation-unfocused-field-background: url(data:image/svg+xml;charset=UTF-8,<svg width='1px' height='1px' xmlns='http://www.w3.org/2000/svg'><rect width='100%' height='100%' style='fill:rgba(0, 54, 255, 0.13);
  '></rect></svg>); */
  --input-focus-border-color: Highlight;
  --input-focus-outline: 1px solid Canvas;
  --input-unfocused-border-color: transparent;
  --input-disabled-border-color: transparent;
  --input-hover-border-color: black;
  --link-outline: none;
  --react-pdf-text-layer: 1;
  --highlight-bg-color: rgba(180, 0, 170, 1);
  --highlight-selected-bg-color: rgba(0, 100, 0, 1);
  --msh-spacing-unit: 4px;
  --main-1: var(--light-main-1);
  --main-2: var(--light-main-2);
  --main-3: var(--light-main-3);
  --main-4: var(--light-main-4);
  --main-5: var(--light-main-5);
  --main-3-50: var(--light-main-3-50);
  --main-6: var(--light-main-6);
  --secondary-2: var(--light-secondary-2);
  --text-1: var(--light-text-1);
  --text-2: var(--light-text-2);
  --text-3: var(--light-text-3);
  --text-4: var(--light-text-4);
  --text-5: var(--light-text-5);
  --text-6: var(--light-text-6);
  --border-width: var(--light-border-width);
  --border-1: var(--light-border-1);
  --border-2: var(--light-border-2);
  --border-3: var(--light-border-3);
  --border-4: var(--light-border-4);
  --border-5: var(--light-border-5);
  --border-6: var(--light-border-6);
  --border-7: var(--light-border-7);
  --fill-1: var(--light-fill-1);
  --fill-2: var(--light-fill-2);
  --fill-2-70: var(--light-fill-2-70);
  --fill-3: var(--light-fill-3);
  --fill-4: var(--light-fill-4);
  --fill-5: var(--light-fill-5);
  --fill-6: var(--light-fill-6);
  --fill-7: var(--light-fill-7);
  --fill-8: var(--light-fill-8);
  --fill-9: var(--light-fill-9);
  --fill-10: var(--light-fill-10);
  --fill-11: var(--light-fill-11);
  --fill-12: var(--light-fill-12);
  --button-fill-1: var(--light-button-fill-1);
  --visited-1: var(--light-visited-1);
  --error-1: var(--light-error-1);
  --success-1: var(--light-success-1);
  --box-border-color: var(--light-box-border-color);
  --box-border-color1: var(--light-box-border-color1);
  --line-color: var(--light-line-color);
  --chat-info-bg: var(--light-chat-info-bg);
  --chat-info-bg-small: var(--light-chat-info-bg-small);
  --shadow-1: var(--light-shadow-1);
  --shadow-3: var(--light-shadow-3);
  --nav-bg: var(--light-nav-bg);
  --nav-layout: var(--light-nav-layout);
  --nav-shadow: var(--light-nav-shadow);
  --nav-download: var(--light-nav-download);
  --transparent: transparent;
  --common-white: #fff;
  --common-black: #000;
  --font-bold: 700;
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-md: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 20px;
  --border-radius: 8px;
  --z-index-component-xs: 10;
  --z-index-component-s: 20;
  --z-index-component-m: 30;
  --z-index-component-l: 40;
  --z-index-component-xl: 50;
  --z-index-page-xs: 100;
  --z-index-page-s: 200;
  --z-index-page-m: 300;
  --z-index-page-l: 400;
  --z-index-page-xl: 500;
  --z-index-mask: 1000;
  --z-index-nav: 1020;
  --z-index-popup: 1050;
  --animation-duration: 0.3s;
  --animation-timing-function: ease-in-out;
  --animation-transition: cubic-bezier(0.36, 0.66, 0.04, 1);
  --dark-main-1: #66a1ff;
  --dark-main-2: #2672ed;
  --dark-main-3: #29499d;
  --dark-main-4: #143466;
  --dark-main-5: #3665b0;
  --dark-main-3-50: #29499d80;
  --dark-main-6: rgba(54, 101, 176, 0.3);
  --dark-secondary-2: #475366;
  --dark-text-1: #f5f9fff2;
  --dark-text-2: #e0ecffcc;
  --dark-text-3: #c3d0e580;
  --dark-text-4: #e0ecff4d;
  --dark-text-5: #ffffff;
  --dark-text-6: rgba(224, 236, 255, 0.8);
  --dark-border-width: 1px;
  --dark-border-1: #45454e;
  --dark-border-2: #595965;
  --dark-border-3: #7a7a84;
  --dark-border-4: #282c34;
  --dark-border-5: #e5e5e5;
  --dark-border-6: #45454e;
  --dark-border-7: #31313a;
  --dark-fill-1: #1e1e26;
  --dark-fill-2: #262630;
  --dark-fill-2-70: #262630b2;
  --dark-fill-3: #2b2b35;
  --dark-fill-4: #31313a;
  --dark-fill-5: #3a3a44;
  --dark-fill-6: #45454e;
  --dark-fill-7: #535767;
  --dark-fill-8: #31313a;
  --dark-fill-9: #31313a;
  --dark-fill-10: #31313a;
  --dark-fill-11: #45454e;
  --dark-fill-12: #ffffff;
  --dark-button-fill-1: #5280fd;
  --dark-visited-1: #cf87ff;
  --dark-error-1: #e55968;
  --dark-success-1: #3cd278;
  --dark-box-border-color: #45454e;
  --dark-box-border-color1: #45454e;
  --dark-line-color: #595965;
  --dark-chat-info-bg: #262630;
  --dark-chat-info-bg-small: #262630;
  --dark-shadow-1: 0px 8px 25px 0px rgba(0, 0, 0, 0.05);
  --dark-shadow-3: 0px 3px 6px -4px rgba(0, 0, 0, 0.12),
    0px 6px 16px 0px rgba(0, 0, 0, 0.08), 0px 9px 28px 8px rgba(0, 0, 0, 0.05);
  --dark-nav-bg: #3a3a44;
  --dark-nav-layout: #292932;
  --dark-nav-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.25),
    0px 0px 1px 1px rgba(255, 255, 255, 0.2) inset;
  --dark-nav-download: #1e1e26;
  --dark-chat-recommend-bg: transparent;
  --dark-chat-recommend-bg-hover: transparent;
  --dark-chat-recommend-border-hover: #45454e;
  --dark-nav-history-bg: #272730;
  --dark-table-border-color: #61616e;
  --dark-table-header-bg: #45454e;
  --dark-table-header-copy-hover: #66a1ff;
  --dark-img-loading-from: rgba(255, 255, 255, 0.12);
  --dark-img-loading-to: rgba(255, 255, 255, 0.18);
  --dark-blur-mask: rgba(61, 62, 71, 0.6);
  --light-main-1: #2e67fa;
  --light-main-2: #2e67fa;
  --light-main-3: #2d65f7;
  --light-main-4: #1850e4;
  --light-main-5: #a2bcff;
  --light-main-3-50: #2d65f780;
  --light-main-6: #e6f1fe;
  --light-secondary-2: #f4f4f5;
  --light-text-1: #060607;
  --light-text-2: #5e6772;
  --light-text-3: #b5b5b5;
  --light-text-4: #c6c6c6;
  --light-text-5: #2672ed;
  --light-text-6: #5e6772;
  --light-border-1: #e5e5e5;
  --light-border-2: #adadad;
  --light-border-3: #7e7e7e;
  --light-border-4: #282c34;
  --light-border-5: #ffffff;
  --light-border-6: #ffffff;
  --light-border-7: #cccfd3;
  --light-border-width: 0px;
  --light-fill-1: #ffffff;
  --light-fill-2: #f3f5fc;
  --light-fill-2-70: #f3f5fcb2;
  --light-fill-3: #f4f4f5;
  --light-fill-4: #e5e7ed;
  --light-fill-5: #e5e7ed;
  --light-fill-6: #e5e7ed;
  --light-fill-7: #f1f2f9;
  --light-fill-8: #f5f8ff;
  --light-fill-9: #fafbff;
  --light-fill-10: #f3f5fc;
  --light-fill-11: #c6c6c6;
  --light-fill-12: #45454e;
  --light-button-fill-1: #356bfd;
  --light-visited-1: #7214af;
  --light-error-1: #e55968;
  --light-success-1: #0a9d57;
  --light-box-border-color: #e5e5e5;
  --light-box-border-color1: #ffffff;
  --light-line-color: #9b9eab;
  --light-chat-info-bg: #fdfeff;
  --light-chat-info-bg-small: #fdfeff;
  --light-shadow-1: 0px 8px 25px 0px rgba(0, 0, 0, 0.05);
  --light-shadow-3: 0px 3px 6px -4px rgba(0, 0, 0, 0.12),
    0px 6px 16px 0px rgba(0, 0, 0, 0.08), 0px 9px 28px 8px rgba(0, 0, 0, 0.05);
  --light-nav-bg: #e7ebf6;
  --light-nav-layout: #f3f5fa;
  --light-nav-shadow: 2px 2px 7.7px 0px rgba(146, 159, 202, 0.19),
    0px 0px 1px 1px rgba(255, 255, 255, 0.45) inset;
  --light-nav-download: #f5f8ff;
  --light-chat-recommend-bg: #fff;
  --light-chat-recommend-bg-hover: #d2deff;
  --light-chat-recommend-border-hover: #d2deff;
  --light-nav-history-bg: #f3f5fc;
  --light-table-border-color: #c6c6d0;
  --light-table-header-bg: #e5e7ed;
  --light-table-header-copy-hover: #2672ed;
  --light-img-loading-from: rgba(0, 0, 0, 0.06);
  --light-img-loading-to: rgba(0, 0, 0, 0.15);
  --light-blur-mask: rgba(57, 129, 246, 0.06);
  --input-focus-border-color: Highlight;
  --input-focus-outline: 1px solid Canvas;
  --input-unfocused-border-color: transparent;
  --input-disabled-border-color: transparent;
  --input-hover-border-color: black;
  --link-outline: none;
  --react-pdf-text-layer: 1;
  --highlight-bg-color: rgba(180, 0, 170, 1);
  --highlight-selected-bg-color: rgba(0, 100, 0, 1);
  --msh-spacing-unit: 4px;
  --main-1: var(--light-main-1);
  --main-2: var(--light-main-2);
  --main-3: var(--light-main-3);
  --main-4: var(--light-main-4);
  --main-5: var(--light-main-5);
  --main-3-50: var(--light-main-3-50);
  --main-6: var(--light-main-6);
  --secondary-2: var(--light-secondary-2);
  --text-1: var(--light-text-1);
  --text-2: var(--light-text-2);
  --text-3: var(--light-text-3);
  --text-4: var(--light-text-4);
  --text-5: var(--light-text-5);
  --text-6: var(--light-text-6);
  --border-width: var(--light-border-width);
  --border-1: var(--light-border-1);
  --border-2: var(--light-border-2);
  --border-3: var(--light-border-3);
  --border-4: var(--light-border-4);
  --border-5: var(--light-border-5);
  --border-6: var(--light-border-6);
  --border-7: var(--light-border-7);
  --fill-1: var(--light-fill-1);
  --fill-2: var(--light-fill-2);
  --fill-2-70: var(--light-fill-2-70);
  --fill-3: var(--light-fill-3);
  --fill-4: var(--light-fill-4);
  --fill-5: var(--light-fill-5);
  --fill-6: var(--light-fill-6);
  --fill-7: var(--light-fill-7);
  --fill-8: var(--light-fill-8);
  --fill-9: var(--light-fill-9);
  --fill-10: var(--light-fill-10);
  --fill-11: var(--light-fill-11);
  --fill-12: var(--light-fill-12);
  --button-fill-1: var(--light-button-fill-1);
  --visited-1: var(--light-visited-1);
  --error-1: var(--light-error-1);
  --success-1: var(--light-success-1);
  --box-border-color: var(--light-box-border-color);
  --box-border-color1: var(--light-box-border-color1);
  --line-color: var(--light-line-color);
  --chat-info-bg: var(--light-chat-info-bg);
  --chat-info-bg-small: var(--light-chat-info-bg-small);
  --shadow-1: var(--light-shadow-1);
  --shadow-3: var(--light-shadow-3);
  --nav-bg: var(--light-nav-bg);
  --nav-layout: var(--light-nav-layout);
  --nav-shadow: var(--light-nav-shadow);
  --nav-download: var(--light-nav-download);
  --chat-recommend-bg: var(--light-chat-recommend-bg);
  --chat-recommend-bg-hover: var(--light-chat-recommend-bg-hover);
  --chat-recommend-border-hover: var(--light-chat-recommend-border-hover);
  --nav-history-bg: var(--light-nav-history-bg);
  --table-border-color: var(--light-table-border-color);
  --table-header-bg: var(--light-table-header-bg);
  --table-header-copy-hover: var(--light-table-header-copy-hover);
  --img-loading-from: var(--light-img-loading-from);
  --img-loading-to: var(--light-img-loading-to);
  --blur-mask: var(--light-blur-mask);
  --primary-hover: var(--main-1);
  --primary-main: var(--main-2);
  --primary-active: var(--main-4);
  --primary-hover-shadow: var(--main-3-50);
  --primary-disabled: var(--main-5);
  --success-main: var(--success-1);
  --error-main: var(--error-1);
  --border-main: var(--border-1);
  --border-disable: var(--border-4);
  --text-primary: var(--text-1);
  --text-secondary: var(--text-2);
  --text-tertiary: var(--text-3);
  --text-disabled: var(--text-4);
  --background-even: var(--fill-1);
  --background-default: var(--fill-2);
  --background-default70: var(--fill-2-70);
  --background-disabled: var(--fill-3);
  --background-pop: var(--fill-4);
  --background-hover: var(--fill-5);
  --msh-chat-fb-bg: var(--background-even);
  --msh-chat-fb-rate-bg: var(--background-default);
  --msh-chat-header-bg: var(--background-default70);
  --msh-chat-footer-text: var(--text-secondary);
  --msh-chat-history-bg: var(--background-default70);
  --msh-chat-history-itme-bg: var(--background-even);
  --msh-chat-history-item-border: var(--border-1);
  --msh-chat-history-item-border-hover: var(--border-2);
  --msh-chat-history-btn-color: var(--common-white);
  --msh-chat-list-user-bg: var(--main-3);
  --msh-chat-list-user-color: var(--common-white);
  --msh-chat-list-QiaoBao-bg: var(--background-even);
  --msh-chat-list-url-dot-failed: var(--text-tertiary);
  --msh-chat-list-action-border: var(--border-main);
  --msh-chat-list-action-bg: var(--background-even);
  --msh-chat-list-action-btn: var(--text-secondary);
  --msh-chat-list-action-btn-hover: var(--text-primary);
  --msh-chat-list-action-brand: var(--main-3);
  --msh-chat-list-bottom-action-hover: var(--background-default);
  --msh-chat-list-bottom-bg: var(--background-even);
  --msh-chat-list-bottom-bg-hover: var(--background-even);
  --msh-chat-list-bottom-color: var(--main-3);
  --msh-chat-list-file-bg: var(--background-even);
  --msh-chat-list-file-border: var(--background-even);
  --msh-chat-list-file-border-hover: var(--border-1);
  --msh-chat-list-search-bg: var(--fill-2);
  --msh-chat-list-search-bg-hover: var(--fill-3);
  --msh-chat-list-search-content-bg: var(--fill-2);
  --msh-chat-list-search-content-color: var(--text-primary);
  --msh-chat-list-prompts-bg: var(--fill-1);
  --msh-chat-list-prompts-hover-border: var(--border-2);
  --msh-chat-list-prompts-hover-bg: var(--fill-4);
  --msh-chat-list-md-tb-border: var(--border-1);
  --msh-chat-input-bg: var(--fill-6);
  --msh-chat-input-border: var(--border-1);
  --msh-chat-input-border-hover: var(--border-2);
  --msh-chat-input-inner: var(--fill-1);
  --msh-chat-input-color: var(--text-primary);
  --msh-chat-input-thumb: var(--background-default);
  --msh-chat-input-file-thumb: var(--background-even);
  --msh-chat-input-image-bg: var(--fill-3);
  --msh-chat-input-image-error-bg: var(--background-even);
  --msh-chat-segment-rag-bg-1: var(--fill-2);
  --msh-chat-segment-rag-bg-2: var(--fill-1);
  --msh-chat-segment-rag-bg-3: var(--fill-3);
  --msh-chat-segment-rag-bg-index: var(--fill-4);
  --msh-chat-segment-rag-bg-index-high: var(--main-2);
  --msh-chat-list-search-content-link: #1587e5;
  --msh-chat-list-file-shadow: 0px 8px 16px 0px #0000000d;
  --msh-chat-avatar-me-bg: #78788f;
  --msh-chat-history-close-bg: #cc525f;
  --msh-chat-history-close-bg-hover: #cd3c4b;
  --msh-chat-list-url-dot-success: #19ebd0;
  --msh-chat-list-bottom-bg-shadow: 0px 9px 28px 8px #0000000d;
  --msh-chat-input-shadow: 0px 8px 25px 0px #0000000d;
  --msh-chat-input-file-del: #eb3d47;
  --msh-chat-login-content-top-bg: #d8edff;
  --msh-chat-share-text-button: #eca266;
  --msh-chat-share-text-button-hover: #d39c6f;
  --msh-chat-copy-img-button: #45affc;
  --msh-chat-copy-img-button-hover: #2f9be9;
  --msh-chat-share-link-button: #4c79f4;
  --msh-chat-share-link-button-hover: #6886d8;
  --msh-chat-share-button-disabled: undefined;
  --msh-chat-share-img-button: #726df1;
  --msh-chat-share-img-button-hover: #817ed6;
  --msh-chat-share-cancel-button: #fff;
  --msh-chat-share-cancel-button-hover: #e5e7ed;
  --msh-chat-share-cancel-button-border: #cccfd3;
  --msh-chat-input-create-new-button-bg: #2d65f7;
  --msh-chat-input-create-new-button-hover: #4c7bf8;
  --msh-chat-input-current-QiaoBaoplus-bg: #f3f5fc;
  --msh-chat-prompts-default-background: linear-gradient(90deg,
      rgba(0, 0, 0, 0.06) 25%,
      #d7d9e1 37%,
      rgba(0, 0, 0, 0.06) 63%);
  --msh-chat-mega-token-modal-Bg: rgba(114, 182, 245, 0.2);
  --msh-chat-prompts-welcome-background: #dfecff;
  --msh-chat-prompts-emoji-background: rgba(39, 39, 49, 0.1);
  --msh-chat-prompts-operation-icon-hover-bg: #d3d4db;
  --msh-chat-prompts-editor-bg: #ffffff;
  --msh-chat-prompts-editor-input-bg: #ffffff;
  --msh-chat-prompts-editor-name-bg: #f3f5fc;
  --msh-chat-prompts-editor-tips: #5e6772;
  --msh-chat-screenshot-divider: rgba(0, 0, 0, 0.04);
  --msh-chat-screenshot-bg: #eef0f6;
  --msh-chat-screenshot-content-bg: #fff;
  --msh-chat-video-note-bg: conic-gradient(from 180deg at 50% 50%,
      #f8ffcf 72.0000010728836deg,
      #c4fffb 201.60000085830688deg,
      #ffdefe 295.3893184661865deg),
    #f3f5f9;
  --msh-chat-video-note-text-color: #356bfd;
  --msh-chat-video-note-arrow-icon-color: #fff;
  --msh-chat-video-note-arrow-icon-bg: linear-gradient(126deg,
      #76beff 22.93%,
      #ab8dff 92.48%);
  --msh-chat-video-note-button-border-bg: conic-gradient(from 90deg at 50% 50%,
      #debdff -122.4deg,
      #b9f2ff 50.4deg,
      #a5d4ff 129.6deg,
      #debdff 237.6deg,
      #b9f2ff 410.4deg);
  --msh-chat-video-note-button-shadow: 0px 4px 7px 0px #0000000d;
  --msh-chat-video-note-blur-top: calc(100% + 9.3vw);
  --msh-chat-video-note-blur-top-hover: calc(100% + 9.3vw - 70px);
  --msh-chat-video-note-blur-opacity: 0.4;
  --msh-chat-video-note-blur-opacity-hover: 1;
  --msh-chat-screenshot-title-bg: #eef0f6;
  --msh-chat-screenshot-content-border: #e5e5e5;
  --msh-chat-screenshot-content-segment-name: rgba(0, 0, 0, 0.6);
  --msh-chat-img-preview-scroll-background: #7e7e7e;
  --msh-chat-sidebar-large-text-note-bg: #f4f6fd;
  --msh-chat-sidebar-large-text-note-color: #2d65f7;
  --msh-chat-sidebar-large-text-note-icon-color: #356bfd;
  --msh-chat-search-middle-bg: rgba(194, 204, 255, 0.41);
  --msh-chat-search-large-bg: rgba(198, 207, 255, 0.28);
  --msh-chat-search-link: #2672ed;
  --msh-chat-search-target: #5e6772;
  --msh-chat-search-background: linear-gradient(0deg, #f3f5fc, #f3f5fc),
    linear-gradient(196.75deg,
      rgba(248, 250, 255, 0.7) 38.16%,
      rgba(243, 245, 252, 0.7) 96.85%);
  --msh-chat-search-background-hover: linear-gradient(0deg,
      rgba(0, 0, 0, 0.03) 0%,
      rgba(0, 0, 0, 0.03) 100%),
    linear-gradient(197deg,
      rgba(248, 250, 255, 0.7) 38.16%,
      rgba(243, 245, 252, 0.7) 96.85%),
    #f3f5fc;
  --msh-chat-search-loading-out: #bed5ff;
  --msh-chat-console-close-hover-bg: rgba(229, 231, 237, 0.5);
  --msh-chat-console-main-QiaoBaoplus-border-hover: #cccfd3;
  --msh-chat-console-main-QiaoBaoplus-collect: rgba(255, 255, 255, 0.5);
  --msh-chat-console-main-QiaoBaoplus-single: linear-gradient(90deg,
      rgba(243, 245, 252, 0) 0.02%,
      #f3f5fc 44.26%);
  --msh-chat-console-main-QiaoBaoplus-double: linear-gradient(180deg,
      rgba(243, 245, 252, 0) 15%,
      #f3f5fc 73%);
  --msh-chat-console-main-QiaoBaoplus-multi: linear-gradient(180deg,
      rgba(243, 245, 252, 0) 10%,
      #f3f5fc 64%);
  --msh-chat-console-QiaoBao-header-sticky-bg: rgba(255, 255, 255, 0.6);
  --msh-chat-console-QiaoBao-avatar-box: 0px 0px 62.143px 0px rgba(255, 255, 255, 0.5);
  --msh-chat-console-file-bg: #f3f5fc;
  --msh-chat-console-ref-bg-blue: rgba(236, 238, 245, 0.5);
  --msh-chat-console-ref-bg-purple: rgba(241, 236, 245, 0.5);
  --msh-chat-console-ref-bg-green: rgba(236, 242, 226, 0.35);
  --msh-chat-console-ref-bg-yellow: rgba(244, 242, 223, 0.35);
  --msh-chat-console-ref-quote-bg-blue: #f1f4ff;
  --msh-chat-console-ref-quote-bg-purple: #f5e9fd;
  --msh-chat-console-ref-quote-bg-green: #eaf2e0;
  --msh-chat-console-ref-quote-bg-yellow: #f2f2dc;
  --msh-chat-console-ref-quote-color-blue: #356bfd;
  --msh-chat-console-ref-quote-color-purple: #b152f0;
  --msh-chat-console-ref-quote-color-green: #83c416;
  --msh-chat-console-ref-quote-color-yellow: #eca722;
  --msh-chat-console-ref-highlight-background: #d4dfff;
  --msh-chat-console-common-remove-button-bg: rgba(229, 231, 237, 0.6);
  --msh-chat-console-common-remove-button-border: #fff;
  --msh-chat-console-search-url-title: #1c0cb2;
  --msh-chat-user-guide-border: #e5e5e5;
  --msh-chat-user-guide-background: #ffffff;
  --msh-chat-boundary-button-bg: #2d65f7;
  --msh-chat-product-img-bg: #f4f4f5;
  --msh-chat-product-box-shadow: 0px 4px 8px 0px rgba(72, 75, 85, 0.1);
  --msh-chat-product-box-shadow-hover: 0px 4px 12px 0px rgba(72, 75, 85, 0.2);
  --msh-chat-QiaoBao-plus-bubble-bg: #f3f5fc;
  --msh-chat-QiaoBao-plus-bubble-bg-hover: #e5e7ed;
  --msh-chat-composer-bg: #ffffff;
  --msh-chat-QiaoBao-plus-bubble-talking-text-target: #5e6772;
  --msh-chat-QiaoBao-plus-bubble-name-target: #060607;
  --msh-chat-QiaoBao-plus-bubble-close: #5e6772;
  --msh-chat-net-switch-disabled-bg: #f4f4f5;
  --msh-chat-net-switch-disabled-circle: #c6c6c680;
  --msh-chat-net-switch-disabled-text: #c6c6c6;
  --msh-chat-net-switch-border: #e5e5e5;
  --msh-chat-net-switch-checked-circle: #356bfd;
  --msh-chat-net-switch-bg: #fff;
  --msh-chat-net-switch-circle: #5e6772;
  --msh-chat-icon-button-background: #e5e7ed;
  --msh-chat-icon-color: #5e6772;
  --msh-chat-icon-color-hover: #060607;
  --msh-chat-send-button-bg: #356bfd;
  --msh-chat-send-button-color: #ffffff;
  --msh-chat-send-button-hover-bg: #356bfd99;
  --msh-chat-send-button-disabled-bg: #f4f4f5;
  --msh-chat-send-button-disabled-color: #c6c6c6;
  --msh-chat-home-case-emoji-bg: #e5e7ed;
  --msh-chat-home-case-bg: #fff;
  --msh-chat-home-case-hover-bg: #fff;
  --msh-chat-home-case-border: #e5e5e5;
  --msh-chat-home-case-schoolborder: rgba(53, 107, 253, 0.6);
  --msh-chat-home-case-schoolbg: linear-gradient(91deg,
      #daedff -1.87%,
      #f3f8ff 31.49%,
      #f3f8ff 57.15%,
      #eaecff 100.77%),
    linear-gradient(90deg, #d4e0ff 0%, #fceff8 100%);
  --msh-chat-home-case-schoolbg-hover: linear-gradient(91deg,
      rgba(201, 228, 253, 0.6) -1.87%,
      rgba(218, 231, 251, 0.6) 31.49%,
      rgba(219, 234, 255, 0.6) 57.15%,
      rgba(206, 211, 255, 0.6) 100.77%);
  --msh-chat-file-list-bg: #f3f5f9;
  --msh-chat-input-box-shadow: 0px 8px 24px -4px #5b6f971f;
  --msh-chat-input-border-focus: var(--border-1);
  --msh-chat-aippt-generate-button-bg: #fff;
  --msh-chat-aippt-generate-button-color: #9957fe;
  --msh-chat-carousel-default-arrow-bg: #fff;
  --msh-chat-carousel-bubble-arrow-mask: linear-gradient(90deg,
      #fff 0%,
      rgba(251, 252, 255, 0) 80%);
  --msh-chat-carousel-default-arrow-mask: linear-gradient(90deg,
      #fafbff 0%,
      rgba(251, 252, 255, 0) 100%);
  --msh-chat-console-bottom-mask: linear-gradient(180deg,
      rgba(251, 252, 255, 0) 0%,
      #fcfdff 80%);
  --msh-chat-console-QiaoBao-mask: linear-gradient(180deg,
      rgba(255, 255, 255, 0.35) 0%,
      #ffffff 100%);
  --msh-chat-share-mark: linear-gradient(180deg,
      rgba(238, 240, 246, 0) 0%,
      rgba(238, 240, 246, 0.65) 34.92%,
      #eef0f6 66.67%,
      #eef0f6 100%);
  --msh-chat-1m-welcome-bg: #72b6f532;
  --msh-chat-hard-tip-bg: #f5ddca;
  --msh-chat-hard-tip-border: #ff7d00;
  --msh-chat-segment-reflect-fullbg: linear-gradient(180deg,
      rgba(199, 212, 255, 0.2) 0%,
      rgba(255, 255, 255, 0) 24.77%),
    radial-gradient(84.23% 67.17% at 46.91% 27.45%,
      rgba(255, 255, 255, 0.24) 0%,
      rgba(255, 255, 255, 0) 100%),
    radial-gradient(61.07% 82.85% at 1.74% 52.31%,
      rgba(249, 233, 255, 0.26) 0%,
      rgba(249, 237, 255, 0.11) 30.5%,
      rgba(255, 255, 255, 0) 60.5%),
    radial-gradient(123.34% 110.14% at 100% 51.65%,
      rgba(176, 217, 255, 0.15) 0%,
      rgba(200, 229, 255, 0.1) 36.05%,
      rgba(255, 255, 255, 0) 77%),
    linear-gradient(180deg, #f1f4ff 0%, #f8faff 49.5%, #fff 100%);
  --msh-chat-segment-reflect-bg: linear-gradient(180deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(199, 212, 255, 0.2) 24.77%),
    radial-gradient(84.23% 67.17% at 46.91% 27.45%,
      rgba(255, 255, 255, 0.24) 0%,
      rgba(255, 255, 255, 0) 100%),
    radial-gradient(61.07% 82.85% at 1.74% 52.31%,
      rgba(249, 233, 255, 0.26) 0%,
      rgba(249, 237, 255, 0.11) 30.5%,
      rgba(255, 255, 255, 0) 60.5%),
    radial-gradient(123.34% 110.14% at 100% 51.65%,
      rgba(176, 217, 255, 0.35) 0%,
      rgba(200, 229, 255, 0.24) 36.05%,
      rgba(255, 255, 255, 0) 77%),
    linear-gradient(180deg, #f1f4ff 0%, #f8faff 49.5%, #fff 100%);
  --msh-chat-segment-rag-bg: #1587e533;
  --msh-chat-segment-rag-color: #1587e5;
  --msh-chat-segment-rag-highlight: #3f60d7;
  --msh-chat-segment-rag-shadow: 0px 2px 10px 0px #0000001a;
  --msh-chat-segment-code-bg: hsl(230, 1%, 98%);
  --msh-chat-segment-quote-color: #647ede;
  --msh-chat-segment-quote-bg: #dde2f3;
  --msh-chat-segment-quoteIcon-color: #8f909a;
  --msh-chat-segment-quoteIcon-bg: #eef0f6;
  --msh-chat-segment-quoteIcon-highlight-color: #356bfd;
  --msh-chat-segment-quoteIcon-highlight-bg: #f1f4ff;
  --msh-chat-battle-modal-bg: #ffffff;
  --msh-chat-battle-modal-title-bg: rgba(176, 192, 233, 0.2);
  --msh-chat-battle-modal-answer-bg: rgba(188, 188, 188, 0.15);
  --msh-chat-battle-feedback: #f3f5fc;
  --msh-chat-battle-tip-button-hover: rgba(0, 0, 0, 0.04);
  --msh-chat-research-loading-bg: linear-gradient(180deg,
      #f3f5fc 21.69%,
      #fff 100%);
  --msh-chat-research-bar-bg: #cccfd3;
  --msh-chat-research-step-title-hover-bg: #eaedf6;
  --msh-chat-research-step-target-hover-bg: #dadde6;
  --msh-chat-research-reflect-title-color: #356bfd99;
  --msh-chat-research-toptip-bg: #f6f9fd;
  --msh-chat-research-toptip-trybg-hover: #afb4c633;
  --msh-chat-research-modal-bg: linear-gradient(0deg,
      #fff 0%,
      rgba(255, 255, 255, 0) 100%),
    linear-gradient(90deg,
      rgba(255, 237, 72, 0.07) 0%,
      rgba(0, 102, 255, 0.07) 100%);
  --msh-chat-research-pane-bg: linear-gradient(0deg,
      #fff 0%,
      rgba(255, 255, 255, 0) 100%),
    linear-gradient(90deg,
      rgba(255, 237, 72, 0.07) 0%,
      rgba(0, 102, 255, 0.07) 100%);
  --msh-chat-loading-text: #b5b5b5;
  --msh-chat-loading-block: #060607;
  --msh-button-primary-bg: var(--primary-main);
  --msh-button-primary-color: var(--common-white);
  --msh-button-primary-hover-bg: var(--primary-main);
  --msh-button-primary-hover-shadow: var(--primary-hover-shadow);
  --msh-button-primary-disabled-bg: var(--primary-disabled);
  --msh-button-primary-disabled-color: var(--text-disabled);
  --msh-button-default-bg: var(--secondary-2);
  --msh-button-default-border: var(--secondary-2);
  --msh-button-default-color: var(--text-primary);
  --msh-button-default-hover-bg: var(--secondary-2);
  --msh-button-default-hover-border: var(--secondary-2);
  --msh-button-default-hover-shadow: var(--primary-hover-shadow);
  --msh-button-default-hover-color: var(--common-white);
  --msh-button-default-disabled-bg: var(--secondary-2);
  --msh-button-default-disabled-border: var(--secondary-2);
  --msh-button-default-disabled-color: var(--text-disabled);
  --msh-button-secondary-bg: var(--primary-main);
  --msh-button-secondary-border: var(--primary-main);
  --msh-button-secondary-color: var(--text-primary);
  --msh-button-secondary-hover-bg: var(--primary-main);
  --msh-button-secondary-hover-border: var(--primary-main);
  --msh-button-secondary-hover-shadow: var(--primary-hover-shadow);
  --msh-button-secondary-hover-color: var(--common-white);
  --msh-button-secondary-disabled-bg: var(--primary-main);
  --msh-button-secondary-disabled-border: var(--primary-main);
  --msh-button-secondary-disabled-color: var(--text-disabled);
  --msh-input-bg: var(--fill-6);
  --msh-paper-bg: var(--background-even);
  --msh-paper-border: var(--border-main);
  --msh-paper-bg-hover: var(--background-hover);
  --msh-thumb-bg: var(--border-3);
  --msh-segmented-itemSelectedBg: var(--fill-1);
  --msh-tooltip-bg: #1d2129;
  --msh-selected-bg: #f0f7ff;
  --msh-modal-bg: #24242e4d;
  --msh-segmented-trackBg: #f5f6f9;
  --msh-border-whitetrans: var(--transparent);
}

.qiaobao {
  position: fixed;
  left: 3%;
  top: 80%;
  width: 10vw;
  height: 15vh;
  z-index: 1000;
  max-width: 100px;
  max-height: 150px;

  color: rgba(0, 0, 0, 0.87);
  font-family: "PingFang SC", "Microsoft YaHei", SimHei;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  /* letter-spacing: 0px; */
}

.qiaobao:hover {
  cursor: pointer;
}

.qiaobao .qiaobao_icon {
  width: 100px;
  height: 120px;
  z-index: 1001;
  position: absolute;
  left: 5px;
  bottom: 25%;
}

.editor___KShcc::-webkit-scrollbar-thumb {
  background: var(--msh-chat-input-thumb);
}

::-webkit-scrollbar-thumb {
  background: var(--msh-thumb-bg);
  border-radius: 3px;
}

/* 滑动轨道按钮 */
::-webkit-scrollbar-button {
  width: 10px;
  height: 10px;
  display: none;
}

.qiaobao .hp_trivia_inner {
  border-radius: 2%;
  opacity: 0;
  width: 100px;
  height: 120px;
  /* overflow: hidden; */
  position: absolute;
  /* 使用绝对定位 */
  bottom: 0;
  /* 初始位置在容器的左下角 */
  left: 5%;
  transition: all 2s;
  /* 设置变换原点为左下角 */
  transform-origin: left bottom;
}

/* 过渡效果 */
.trivia-enter-active,
.trivia-leave-active {
  transition: all 2s;
}

.trivia-enter,
.trivia-leave-to {
  opacity: 1;
  width: 100px;
  height: 120px;
}

.trivia-enter-to,
.trivia-leave {
  opacity: 1;
  width: 680px;
  height: 520px;
}

.qiaobao .hp_trivia_inner.focusin,
.qiaobao .hp_trivia_inner.show {
  background-color: hsl(240 31% 95% / 1);
  opacity: 1;
  height: 520px;
  width: 680px;
}

.chatBottom___jS9Jd {
  margin: 0 auto;
  padding: 0 calc(var(--msh-spacing-unit) * 4);
  position: absolute;
  right: 0;
  bottom: 0;
  text-align: left;
  opacity: 0;
  transition: all 2s;
  width: 550px;
  transform-origin: bottom left;
}

.qiaobao .hp_trivia_inner.focusin .chatBottom___jS9Jd {
  opacity: 1;
}

.chatInput___bMC0h {
  position: relative;
  z-index: 1;
}

.footerMark___cWT6F {
  margin-top: calc(var(--msh-spacing-unit) * 1.5);
  min-height: 26px;
}

.css-1yjrar4 {
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
}

.chatInput___bMC0h .container___hM5mM {
  position: relative;
  border: 1px solid var(--msh-chat-input-border-focus);
  overflow: hidden;
  border-radius: 16px;
  transition: all var(--animation-duration) var(--animation-transition);
  box-shadow: none;
  background-color: var(--msh-chat-file-list-bg);
}

.chatInput___bMC0h .container___hM5mM .inputInner___ybWEr {
  background-color: var(--msh-chat-input-inner);
  padding: 5px 12px 8px 16px;
}

.css-1qeoss9 {
  display: flex;
  flex-flow: column wrap;
}

.editor___DSPKC {
  flex-grow: 1;
  max-height: 120px;
  color: var(--msh-chat-input-color);
  padding-right: 16px;
  margin-right: -12px;
  min-height: 40px;
}

.editor___KShcc {
  overflow: auto;
  position: relative;
  padding: 7px 0 0;
}

.editorContentEditable {
  height: 100%;
  outline: none;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.25px;
  word-break: break-all;
  padding: 3px 0 10px;
  min-height: 40px;
}

.placeholder___a_Pns {
  position: absolute;
  top: 8px;
  left: 0;
  pointer-events: none;
  width: 100%;
  max-width: 100%;
  display: block;
  opacity: 0.333;
  user-select: none;
  text-decoration: none;
}

.toolbarContainer___luEAj {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-top: 4px;
}

.switchContainer___Rh7mQ {
  user-select: none;
  cursor: pointer;
  font-size: 12px;
  height: 20px;
  align-items: flex-end;
}

.css-1ok549f {
  display: flex;
  gap: 4px;
  -webkit-box-align: center;
  align-items: center;
}

.switchContainer___Rh7mQ .switch___Ih0Wl {
  width: 32px;
  border-radius: 15px;
  cursor: pointer;
  border: 1px solid var(--border-2);
  height: 20px;
  padding: 3px;
  box-sizing: border-box;
  border-color: var(--msh-chat-net-switch-border);
  background: var(--msh-chat-net-switch-bg);
}

.checked___qXNHW .circle___rDXMK {
  background: var(--msh-chat-net-switch-checked-circle);
  transform: translate(12px);
}

.switchContainer___Rh7mQ .circle___rDXMK {
  width: 12px;
  height: 12px;
  border-radius: 18px;
  background: #848a99;
  transition: all 0.2s ease-in-out;
}

.switchContainer___Rh7mQ .netSwitchText___kyYlZ {
  line-height: 20px;
  color: var(--msh-chat-icon-color);
}

.chatInput___bMC0h .container___hM5mM .inputInner___ybWEr .toolbar___WUSec {
  margin-left: auto;
  display: flex;
  gap: 8px;
  align-items: center;
}

.toolbar___WUSec {
  color: var(--text-secondary);
}

.icon___zTPKp {
  box-sizing: border-box;
  padding: 4px;
  font-size: 24px;
  cursor: pointer;
  color: var(--msh-chat-icon-color);
}

.css-e5woe5 {
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  background-color: transparent;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  appearance: none;
  text-align: center;
  color: rgba(0, 0, 0, 0.54);
  font-size: 24px;
  width: 36px;
  height: 36px;
  outline: 0px;
  border-width: 0px;
  border-style: initial;
  border-color: initial;
  border-image: initial;
  margin: 0px;
  text-decoration: none;
  flex: 0 0 auto;
  overflow: visible;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 8px;
  padding: 8px;
}

.anticon {
  display: inline-flex;
  align-items: center;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.anticon svg {
  display: inline-block;
}

.anticon svg {
  display: inline-block;
}

.anticon>* {
  line-height: 1;
}

.anticon>* {
  line-height: 1;
}

.css-w0pj6f {
  overflow: hidden;
  pointer-events: none;
  position: absolute;
  z-index: 0;
  inset: 0px;
  border-radius: inherit;
}

.uploadButton___Ix9hl {
  height: 36px;
  width: 36px;
  color: var(--msh-chat-icon-color);
  font-size: 26px;
}

.css-1n1n3u1 {
  display: inline-flex;
  flex-direction: column;
  min-width: 0px;
  padding: 0px;
  margin: 0px;
  border: 0px;
  vertical-align: top;
  clip: rect(0px, 0px, 0px, 0px);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0px;
  left: 0px;
  white-space: nowrap;
  width: 1px;
}

.sendButton___gubKW button[disabled] {
  background-color: var(--msh-chat-send-button-disabled-bg) !important;
  color: var(--msh-chat-send-button-disabled-color);
}

.css-1uviwf.Mui-disabled {
  color: var(--text-disabled);
}

.css-1uviwf.Mui-disabled {
  background-color: transparent;
  color: rgba(0, 0, 0, 0.26);
}

.css-1uviwf.Mui-disabled {
  pointer-events: none;
  cursor: default;
}

.sendButton___gubKW button {
  border-radius: 8px;
  color: var(--msh-chat-send-button-color);
  background-color: var(--msh-chat-send-button-bg);
  height: 36px;
  width: 36px;
}

.css-1uviwf {
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  background-color: transparent;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  appearance: none;
  text-align: center;
  color: rgba(0, 0, 0, 0.54);
  font-size: 24px;
  outline: 0px;
  border-width: 0px;
  border-style: initial;
  border-color: initial;
  border-image: initial;
  margin: 0px;
  text-decoration: none;
  flex: 0 0 auto;
  overflow: visible;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 8px;
  padding: 8px;
}

.footerMark___cWT6F {
  margin-top: calc(var(--msh-spacing-unit) * 1.5);
  min-height: 26px;
}

.css-1yjrar4 {
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
}

.footerMark___cWT6F .text___fWKcN {
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  opacity: 0.7;
  color: var(--msh-chat-footer-text);
}

.qiaobao .hp_trivia_inner .trivia {
  width: 96%;
  height: 70%;
  padding: 14px;
  /* color: #ddd; */
  position: absolute;
  top: 0;
  bottom: 0;
  opacity: 0;
  text-align: left;
  transition: all 1.5s linear;
}

.qiaobao .hp_trivia_inner.focusin .trivia {
  opacity: 1;
}

.outContainer___COldu {
  position: relative;
  overflow: hidden;
  height: 100%;
  width: 100%;
}

.outContainer___COldu .scrollContainer___yynON {
  display: flex;
  flex-direction: column-reverse;
  max-height: 100%;
  margin-right: 6px;
  overflow-y: scroll;
  overflow-x: hidden;
}

.outContainer___COldu .scrollContainer___yynON:hover::-webkit-scrollbar {
  display: inline
}

.outContainer___COldu .scrollContainer___yynON::-webkit-scrollbar {
  width: 6px;
  display: none;
}

/* 滚动条轨道样式 */
.outContainer___COldu .scrollContainer___yynON::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 10px;
}

/* 滚动条轨道悬停样式 */
.outContainer___COldu .scrollContainer___yynON::-webkit-scrollbar-track:hover {
  background: transparent;
}

.outContainer___COldu .scrollContainer___yynON:hover {
  margin-right: 0;
}

.chatItemBox___WntvB {
  margin: 0 auto;
  padding-left: calc(var(--msh-spacing-unit) * 4);
  padding-right: calc(var(--msh-spacing-unit) * 4);
}

.css-jdjpte {
  max-width: 100%;
}

.QiaoBaoZone___oXTWt {
  display: flex;
  gap: 8px;
  width: 100%;
}

.css-yxq2hw {
  width: 40px;
  height: 40px;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
}

.css-yxq2hw {
  width: 40px;
  height: 40px;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
}

.aiAvatar___CdLiA {
  width: 54px;
  height: 54px;
  flex-shrink: 0;
  position: absolute;
}

.css-5nczy5 {
  width: 40px;
  height: 40px;
  border-radius: 6px;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
}

.aiAvatar___CdLiA img {
  width: 100%;
  height: 100%;
}

img {
  -webkit-user-drag: none;
}

.QiaoBaoZone___oXTWt .main-content {
  flex: 1 1;
}

.QiaoBaoZone___oXTWt .main-content {
  align-items: flex-start;
}

.QiaoBaoZone___oXTWt .main-content,
.QiaoBaoZone___oXTWt .contenttop-hole,
.QiaoBaoZone___oXTWt .pop-container,
.QiaoBaoZone___oXTWt .contentbottom-hole {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.QiaoBaoZone___oXTWt.normal .main-content .popcontent-hole {
  background-color: var(--msh-chat-list-QiaoBao-bg);
  border: 1px solid var(--msh-chat-list-QiaoBao-bg);
}

.QiaoBaoZone___oXTWt .main-content .popcontent-hole {
  display: flex;
  position: relative;
  padding: 10px 16px;
  border-radius: 12px;
  flex-flow: column;
  gap: 8px;
  min-height: 46px;
}

.QiaoBaoZone___oXTWt .main-content .popcontent-hole .pop-content {
  padding: 2px 0;
}

.textContent___fo8HH {
  white-space: pre-wrap;
  overflow-wrap: break-word;
  word-break: break-word;
}

.textContent___fo8HH p {
  font-size: 14px;
  letter-spacing: 0.25px;
  line-height: 24px;
}

.css-p94avn {
  margin: 0px;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0.5px;
}

.segmentItem:not(:first-child) {
  padding-top: 24px;
}

.css-1r9wej0 {
  align-items: flex-start;
  display: flex;
}

.segmentComponent___NiCMo.right___a75c4 .main-container .main-content {
  align-items: flex-end;
}

.segmentComponent___NiCMo.right___a75c4 .main-container .main-content {
  align-items: flex-end;
}

.segmentComponent___NiCMo .main-content {
  flex: 1 1;
  min-width: 0;
}

.segmentComponent___NiCMo .main-content,
.segmentComponent___NiCMo .contenttop-hole,
.segmentComponent___NiCMo .pop-container,
.segmentComponent___NiCMo .contentbottom-hole {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}

.segmentComponent___NiCMo .pop-container {
  max-width: 100%;
  position: relative;
}

.segmentComponent___NiCMo.right___a75c4 .main-container .main-content .pop-container .popcontent-hole {
  background-color: var(--msh-chat-list-user-bg);
  color: var(--msh-chat-list-user-color);
  border: 1px solid var(--msh-chat-list-user-bg);
  display: flex;
  align-items: flex-end;
  gap: 10px;
  align-self: stretch;
}

.segmentComponent___NiCMo .main-content .popcontent-hole {
  padding: 10px 16px;
  display: flex;
  position: relative;
  border-radius: 12px;
  flex-flow: column;
  gap: 8px;
  /* min-height: 46px; */
}

.segmentComponent___NiCMo .main-content .popcontent-hole .pop-content {
  padding: 2px 0;
}

.userContent___uG9aZ {
  white-space: pre-wrap;
  overflow-wrap: break-word;
  word-break: break-word;
}

.userContent___uG9aZ p {
  font-size: 14px;
  letter-spacing: 0.25px;
  line-height: 24px;
}

.css-p94avn {
  margin: 0px;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0.5px;
}

.segmentComponent___NiCMo.right___a75c4 .main-container .main-content .pop-container .actions {
  left: -15px;
}

.segmentComponent___NiCMo .pop-container .actions {
  position: absolute;
  bottom: -12px;
  right: -15px;
  flex-shrink: 0;
  display: flex;
  align-self: flex-start;
  transition: all 0.2s;
  z-index: 1;
  visibility: hidden;
  opacity: 0;
}

.chatSegmentActions___Len3_ {
  padding: 4px;
  gap: 4px;
  border-radius: 4px;
  border: 1px solid var(--msh-chat-list-action-border);
  background: var(--msh-chat-list-action-bg);
  align-items: center;
}

.css-1xhj18k {
  display: flex;
  flex-direction: row;
}

.chatSegmentActions___Len3_ .iconButton___3OzVF {
  padding: 0;
}

.css-1uviwf {
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  background-color: transparent;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  appearance: none;
  text-align: center;
  color: rgba(0, 0, 0, 0.54);
  font-size: 24px;
  outline: 0px;
  border-width: 0px;
  border-style: initial;
  border-color: initial;
  border-image: initial;
  margin: 0px;
  text-decoration: none;
  flex: 0 0 auto;
  overflow: visible;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 8px;
  padding: 8px;
}

.css-yxq2hw {
  width: 40px;
  height: 40px;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
}

.css-5nczy5 {
  width: 40px;
  height: 40px;
  border-radius: 6px;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
}

.css-1r9wej0 {
  align-items: flex-start;
  display: flex;
}

.segmentComponent___NiCMo {
  display: flex;
  width: 100%;
  gap: 8px;
  position: relative;
}

.segmentComponent___NiCMo .main-container {
  display: flex;
  gap: 8px;
}

.segmentComponent___NiCMo .segment-container {
  display: flex;
  gap: 8px;
  width: 100%;
  flex-grow: 1;
  flex-direction: column;
  min-width: 0;
}

.img____tAMC {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
}

.segmentComponent___NiCMo .segment-container {
  display: flex;
  gap: 8px;
  width: 100%;
  flex-grow: 1;
  flex-direction: column;
  min-width: 0;
}

.segmentComponent___NiCMo .pop-container:hover .actions {
  opacity: 1 !important;
  visibility: visible;
}

.lowImage___hU90c {
  width: 100%;
  height: 100%;
  position: relative;
}

.lowImage___hU90c .image___tZVx_.loaded___iq7pZ {
  visibility: visible;
  display: blockd;
}

.lowImage___hU90c img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

*,
::before,
::after {
  box-sizing: inherit;
}

div {
  display: block;
  unicode-bidi: isolate;
}

.chatSegmentBottomActions___NZ_V8 {
  display: flex;
  flex-wrap: wrap;
  transition: height 0.3s cubic-bezier(0.4, 0, 0.1, 1),
    opacity 0.3s cubic-bezier(0.4, 0, 0.1, 1);
  margin-top: -8px;
  padding-top: 8px;
  overflow: hidden;
  box-sizing: border-box;
  height: 36px;
  opacity: 1;
  max-width: 100%;
}

.css-v48vqp {
  margin-right: var(--sm, 8px);
  display: flex;
  flex: 1 1 0%;
  height: 100%;
  gap: var(--sm, 4px);
  -webkit-box-align: center;
  align-items: center;
}

.chatSegmentBottomActions___NZ_V8 .iconButton___3OzVF {
  padding: 2px 4px;
}

.css-1uviwf {
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  background-color: transparent;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  appearance: none;
  text-align: center;
  color: rgba(0, 0, 0, 0.54);
  font-size: 24px;
  outline: 0px;
  border-width: 0px;
  border-style: initial;
  border-color: initial;
  border-image: initial;
  margin: 0px;
  text-decoration: none;
  flex: 0 0 auto;
  overflow: visible;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 8px;
  padding: 8px;
}

.chatSegmentBottomActions___NZ_V8 .iconButton___3OzVF .icon___N21Rh {
  font-size: 20px;
  flex-shrink: 0;
  padding: 0;
  transition: all 0.3s;
  color: var(--msh-chat-list-action-btn);
  opacity: 0.7;
  margin-right: 2px;
}

.chatSegmentBottomActions___NZ_V8 .iconButton___3OzVF .label___TPWYH {
  font-size: 12px;
  color: var(--msh-chat-list-action-btn);
}

.css-17cnyc1 {
  margin: 0px;
  font-family: "PingFang SC", "Microsoft YaHei", SimHei;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0px;
}

.sendButton___gubKW button {
  border-radius: 8px;
  color: var(--msh-chat-send-button-color);
  background-color: var(--msh-chat-send-button-bg);
  height: 36px;
  width: 36px;
}

.css-w0pj6f {
  overflow: hidden;
  pointer-events: none;
  position: absolute;
  z-index: 0;
  inset: 0px;
  border-radius: inherit;
}

.icon {
  width: 1em;
  height: 1em;
}

.markdown___vuBDJ {
  max-width: 100%;
  color: var(--text-primary);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: .5px;
  position: relative;
  word-break: break-word;
}

.markdown___vuBDJ>>>p {
  margin-bottom: .859em;
  overflow-y: hidden;
}

.markdown___vuBDJ>>>p,
.markdown___vuBDJ>>>code {
  max-width: 100%;
  white-space: pre-wrap !important;
  word-break: break-word !important;
  overflow: auto;
}

.markdown___vuBDJ>>>p {
  font-size: 14px;
  line-height: 24px;
  margin: 0;
  letter-spacing: .25px;
}

.markdown___vuBDJ>>>pre {
  margin: 0;
}

.markdown___vuBDJ>>>pre {
  margin: 12px 0 0;
}

.markdown___vuBDJ>>>p:last-child {
  margin-bottom: 0;
}

.markdown___vuBDJ h1+p,
.markdown___vuBDJ h2+p,
.markdown___vuBDJ h3+p,
.markdown___vuBDJ h4+p,
.markdown___vuBDJ h5+p,
.markdown___vuBDJ h6+p,
.markdown___vuBDJ ul+p,
.markdown___vuBDJ ol+p {
  margin-top: .859em;
}

.markdown___vuBDJ .codeBlock___D3KDO {
  position: relative;
  margin: calc(var(--msh-spacing-unit)* 2) 0;
  background: var(--msh-chat-segment-code-bg);
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

.markdown___vuBDJ .codeBlock___D3KDO .codeType___Z1h6N {
  height: 40px;
  background-color: var(--fill-6);
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  position: sticky;
  top: 0;
  left: 0;
}

.markdown___vuBDJ .codeBlock___D3KDO .codeType___Z1h6N+div {
  margin: 0 !important;
  border-radius: 0 0 12px 12px !important;
}

.css-c80amz {
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  background-color: transparent;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  appearance: none;
  text-align: center;
  color: rgba(0, 0, 0, 0.54);
  font-size: 24px;
  text-transform: none;
  outline: 0px;
  border-width: 0px;
  border-style: initial;
  border-color: initial;
  border-image: initial;
  margin: 0px;
  text-decoration: none;
  flex: 0 0 auto;
  overflow: visible;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1);
  padding: 8px;
  border-radius: 50%;
}

.btn___frwKo {
  width: 40px;
  height: 40px;
  position: absolute;
  bottom: 24px;
  right: 16px;
  border: 1px solid var(--border-main);
  background: var(--msh-chat-list-bottom-bg);
  color: var(--msh-chat-list-bottom-color);
  transition: all .3s;
}

@keyframes thinkingAnimation {
  0% {
    content: '...';
  }

  33% {
    content: '.';
  }

  67% {
    content: '..';
  }

  100% {
    content: '...';
  }
}

.thinking-style::after {
  content: '...';
  animation: thinkingAnimation 1.5s infinite;
}
</style>
