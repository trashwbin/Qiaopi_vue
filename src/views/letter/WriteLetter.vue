<template>
  <div class="banner">

    <div class="selectPage" @click="showSend" :class="{ 'active': currentView === 'send' }">
      <el-select v-model="currentView" style="width: 90px;" @change="handleChangePage">
        <el-option v-for="item in pageList" :key="item.value" :label="item.name" :value="item.value" />
      </el-select>
    </div>
    <div v-if="currentView === 'write'">
      <div class="left">
        <el-form :model="letterGen" :inline="true" label-width="55px" :rules="rules" ref="letterGen"
          :hide-required-asterisk="true">
          <el-form-item label="信纸" prop="paperId" style="margin-left: -10px;">
            <el-select v-model="letterGen.paperId" placeholder="信纸" style="width: 200px; height: 10px;margin-top:10px;"
              height="10">
              <el-option v-for="item in repository.papers" :key="item.id" :label="item.name" :value="item.id"
                @change="handleChange" />
            </el-select>
          </el-form-item>
          <div style="display: flex;">
            <el-form-item label="字体" prop="fontId" style="margin-left: -10px; flex: 1;">
              <el-select v-model="letterGen.fontId" placeholder="字体" style="width: 85px; margin-top:10px;">
                <el-option v-for="item in repository.fonts" :key="item.id" :label="item.name" :value="item.id"
                  @change="handleChange" />
              </el-select>
            </el-form-item>
            <el-form-item label="颜色" prop="fontColorId" style="margin-left: -10px; flex: 1;">
              <el-select v-model="letterGen.fontColorId" placeholder="颜色" style="width: 85px; margin-top:10px;">
                <el-option v-for=" item in repository.fontColors" :key="item.id" :label="item.description"
                  :value="item.id" @change="handleChange" />
              </el-select>
            </el-form-item>
          </div>
          <el-form-item label="寄信人" prop="senderName" style="margin-left: -10px; " label-width="65px">
            <el-input v-model="letterGen.senderName" placeholder="请输入寄信人" @input="handleChange"
              style="margin-top:10px;" />
          </el-form-item>
          <el-form-item label="收信人" prop="recipientName" style="margin-left: -10px;" label-width="65px">
            <el-input v-model="letterGen.recipientName" placeholder="请输入收信人" @input="handleCheckFriend"
              style="margin-top:10px;" />
          </el-form-item>
          <el-popover placement="right" width="250" trigger="manual" v-model="showFriend">
            <el-table :data="selectFriend" style="width: 100%" :show-header="false" highlight-current-row
              @current-change="handleCurrentChange" ref="singleTable">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="left" class="demo-table-expand" label-width="50px">
                    <el-form-item label="昵称:">
                      <span>{{ props.row.name }}</span>
                    </el-form-item>
                    <el-form-item label="性别:">
                      <span> {{ props.row.sex }}</span>
                    </el-form-item>
                    <el-form-item label="邮箱:">
                      <span style="overflow: hidden;">{{ props.row.email }}</span>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column prop="name">
              </el-table-column>
            </el-table>
            <!-- <el-tree :data="selectFriend" :props="props" accordion @node-click="handleNodeClick">
            </el-tree> -->
          </el-popover>
          <div class="text">
            <el-form-item label="信的内容：" prop="letterContent" style=" text-align: center;" label-width="100px">
              <el-input v-model="letterGen.letterContent" placeholder="请开始写信吧" required type="textarea"
                :autosize="{ minRows: 10, maxRows: 12 }" style="width: 120%;margin-left: -10px;" resize="none"
                @input="handleChange"></el-input>
            </el-form-item>
          </div>
        </el-form>
        <el-row style="margin: 20px auto 0; text-align: center;">
          <el-button type="warning" :disabled="disabled" @click="generateLetter('letterGen')">生成</el-button>
          <el-tooltip content="请生成后再确认" placement="bottom" effect="light" :disabled="!showTip">
            <el-button type="primary" @click="handleShowConfirmDialog" :disabled="showTip">确认</el-button>
          </el-tooltip>
        </el-row>
      </div>
      <div class="right">
        <el-image v-loading="loading" @error="handleError" @load="handleLoad" crossorigin="anonymous"
          :src="letter.letterLink" style="max-width: 100%; ">
          <div slot="placeholder"
            style="border-radius: 20px; width: 700px; height: 450px; text-align: center; align-items: center;">
          </div>
        </el-image>
      </div>

      <!-- 确认信件信息 -->
      <el-dialog title="确认信件信息" :visible.sync="showConfirmDialog" width="400px" append-to-body>
        <el-form :model="letter" :inline="true" label-width="100px" :rules="rules" ref="letter"
          hide-required-asterisk="true">
          <el-form-item label="收信人邮箱" prop="recipientEmail">
            <el-input v-model="letter.recipientEmail" placeholder="请输入收信人邮箱"></el-input>
          </el-form-item>
          <el-form-item label="收信人地址" prop="recipientAddress">
            <avue-input-map :params="params" :autosize="{ minRows: 1, maxRows: 4 }" placeholder="请选择收信地址"
              v-model="recipientAddress"></avue-input-map>
          </el-form-item>
          <el-form-item label="我的地址" prop="senderAddress">
            <avue-input-map :params="params" :autosize="{ minRows: 1, maxRows: 4 }" placeholder="请选择寄信地址"
              v-model="senderAddress"></avue-input-map>
          </el-form-item>
        </el-form>

        <template #footer>
          <div class="dialog-footer">
            <el-button type="primary" @click="submitPre">发 送</el-button>
            <el-button @click="cancel">取 消</el-button>
          </div>
        </template>
      </el-dialog>

    </div>
    <div v-else-if="currentView === 'send'">

      <div class="content" v-if="showContent">
        <!-- <p>
          <label style="margin-right: 16px;">切换 Loading</label>
          <el-switch v-model="loading" />
        </p> -->
        <el-row class="row-bg" justify="space-around">
          <el-col :span="6" v-for="item in mySendList" :key="item.id">
            <el-skeleton style="width: 250px ;margin:0 auto" :loading="loading" animated>
              <template slot="template">
                <el-skeleton-item variant="image" style="width: 250px; height: 250px;" />
                <div style="padding: 2px 10px 0">
                  <el-skeleton-item variant="text" style="margin-right: 16px; " />
                </div>
              </template>
              <template>
                <!-- 启用懒加载 -->
                <el-image class="image-hover" v-if="item.coverLink !== undefined"
                  style="width: 250px; height: 250px; cursor: pointer;transition: transform .3s ease; " lazy
                  @click="openImageViewerPre($event, item)" :src="item.coverLink">
                  <div slot="placeholder" class="image-slot" style=" background:transparent">
                    <i class="el-icon-loading" style="line-height: 250px; color: #A52328; font-size: 30px;"></i>

                  </div>
                  <div slot="error" class="image-slot" style="width: 100%; height: 100%; color: #A52328;">
                    <i class="el-icon-picture-outline" style="line-height: 250px; "></i>
                    加载失败
                  </div>
                </el-image>
                <p style="color: #A52328; margin: -15px 0 0; ">
                  {{ formatDate(item.createTime) }},
                  <span
                    style="margin: -20px 0 -14px;max-width: 100px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; display: inline-block;">
                    {{ item.senderName }}</span>记
                </p>
              </template>
            </el-skeleton>
          </el-col>
        </el-row>
      </div>
      <transition name="zoom-in">
        <div v-if="isVisible" class="el-image-viewer__wrapper" :style="{ zIndex: 2002 }">
          <div class="el-image-viewer__mask" @click="closeImageViewer"></div>
          <span class="el-image-viewer__btn el-image-viewer__close" @click="closeImageViewer">
            <i class="el-icon-close"></i>
          </span>
          <div class="el-image-viewer__btn el-image-viewer__actions">
            <div class="el-image-viewer__actions__inner">
              <div><i class="el-icon-zoom-out" @click="zoomOut"></i></div>
              <div><i class="el-icon-zoom-in" @click="zoomIn"></i></div>
              <div><i class="el-image-viewer__actions__divider"></i></div>
              <div><i class="el-icon-full-screen" :class="{ 'toggle-icon': isFullscreen }"
                  @click="toggleFullScreen"></i>
              </div>
              <div><i class="el-image-viewer__actions__divider"></i></div>
              <div><i class="el-icon-refresh-left" @click="rotateLeft"></i></div>
              <div><i class="el-icon-refresh-right" @click="rotateRight"></i></div>
            </div>
          </div>
          <div class="el-image-viewer__canvas" @mousedown="startDrag" @mousemove="dragImage" @mouseup="endDrag"
            @wheel.prevent="zoomWithWheel">
            <img :src="imageUrl" class="el-image-viewer__img" :class="{ fullscreen: isFullscreen }" :style="{
              transform: `scale(${scale}) rotate(${rotation}deg)`,
              marginLeft: `${marginLeft}px`,
              marginTop: `${marginTop}px`,
            }" style="max-width: 100%; max-height: 100%;  transition: transform 0.3s ease;">
          </div>
          <!-- 侧边栏 -->
          <div class="aside">
            <el-card class="box-card">
              <div class="card_item">
                <i class="el-icon-s-custom"></i>
                收信人：{{ letterVo.recipientName }}
              </div>
              <div class="card_item">
                <i class="el-icon-message"></i>
                收信人邮箱：{{ letterVo.email }}
              </div>
              <div class="card_item">
                <i class="el-icon-map-location"></i>
                收信人地址：{{ letterVo.recipientAddress.formattedAddress }}
              </div>
              <div class="card_item">
                <i class="el-icon-position"></i>
                信件状态：{{ getLetterStatusLabel(letterVo.status) }}
              </div>
              <div class="card_item">
                <i class="el-icon-date"></i>
                写信时间：{{ formatDate(letterVo.createTime) }}
              </div>
              <div class="card_item">
                <i class="el-icon-s-home"></i>
                我的地址：{{ letterVo.senderAddress.formattedAddress }}
              </div>
              <div class="card_item">
                <i class="el-icon-user"></i>
                寄信人：{{ letterVo.senderName }}
              </div>
              <div>

                <i class="el-icon-postcard"></i>
                <el-button type="text">使用卡片</el-button>
                <el-divider direction="vertical"></el-divider>
                <i class="el-icon-document-add"></i>
                <el-button type="text">再写一封</el-button>
                <el-divider direction="vertical"></el-divider>
                <i class="el-icon-delete"></i>
                <el-button type="text">忍痛</el-button>
              </div>
            </el-card>

            <div class="aside_close" @click="handleShowDetail">
              <i v-if="showLetterDetail" class="el-icon-arrow-left"></i>
              <i v-else class="el-icon-arrow-right"></i>
            </div>
          </div>

          <div class="progress">
            // TODO
            <el-progress :text-inside="true" :stroke-width="24" :percentage="100" status="warning"
              style="height: 100px; width: 80%; line-height: 100px;"></el-progress>
          </div>

        </div>
      </transition>
      <!-- 使用transition组件来添加动画 -->
      <transition name="fade">
        <div v-if="showMask" class="el-image-viewer__wrapper" :style="{ zIndex: 999 }">
          <div class="el-image-viewer__mask" @click="closeImageViewer"></div>
        </div>
      </transition>

    </div>

  </div>
</template>

<script>
import { getUserRepository, getUserFriends, getFriendAddress, getMyAddress, getMyFunctionCard } from '@/api/user'
import { generateLetter, sendLetter, getMySendLetter } from '@/api/letter'
import { useCard } from '@/api/card'
import useUserStore from '@/store/modules/user'

export default {
  name: 'WriteLetter',
  data() {
    // eslint-disable-next-line
    var validateAddress = (rule, value, callback) => {
      // 定义市级以上城市列表,以及省、市、自治区、特别行政区等关键字列表
      const cities = [
        '北京', '上海', '天津', '重庆',
        '广州', '深圳', '成都', '武汉', '南京', '杭州', '西安', '沈阳', '长沙', '济南', '青岛', '大连', '苏州', '宁波', '厦门', '福州',
        '哈尔滨', '长春', '合肥', '南昌', '郑州', '昆明', '贵阳', '南宁', '海口', '太原', '石家庄', '呼和浩特', '乌鲁木齐', '银川', '兰州', '西宁', '拉萨',
        '香港', '澳门', '台湾', '河北', '山西', '黑龙江', '吉林', '辽宁', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '海南', '四川', '贵州', '云南', '陕西', '甘肃', '青海', '台湾', '内蒙古', '广西', '西藏', '宁夏', '新疆'
      ]

      // 定义需要包含的关键字列表
      const requiredKeywords = ['省', '市', '自治区', '特别行政区']

      const name = value.formattedAddress

      if (value.length === 0 || name === '') {
        callback(new Error('请选择地址'))
      }

      // 检查 name 是否包含市级以上城市之一
      if (!cities.some(city => name.includes(city))) {
        // throw new Error('地址必须包含市级以上城市之一')
        callback(new Error('请再次点击以获得详细地址'))
      }

      // 检查 name 是否包含需要包含的关键字之一
      if (!requiredKeywords.some(keyword => name.includes(keyword))) {
        callback(new Error('请再次点击以获得详细地址'))
        // throw new Error('地址必须包含省、市、自治区或特别行政区')
      }

      callback()
    }
    return {
      letterStatusMap: {
        0: '未发送',
        1: '已发送',
        2: '传递中',
        3: '已送达'
      },
      // 查课侨批大图组件
      showProgress: true,
      showLetterDetail: true,
      showMask: false,
      isVisible: false,
      letterVo: {
        letterId: '',
        senderName: '',
        recipientName: '',
        senderAddress: {
          formattedAddress: '',
          longitude: '',
          latitude: ''
        },
        recipientAddress: {
          formattedAddress: '',
          longitude: '',
          latitude: ''
        },
        recipientEmail: '',
        letterLink: '',
        coverLink: '',
        deliveryProgress: '',
        createTime: '',
        expectedDeliveryTime: '',
        status: ''
      },
      coverUrl: 'http://110.41.58.26:9000/qiaopi/qiaopi-images/cover/823eec55-0d12-41bd-a013-483892daf166.png',
      imageUrl: 'http://110.41.58.26:9000/qiaopi/qiaopi-images/letter/7780d647-ac9a-4ac0-9342-ad35e9e709d1.png',
      scale: 1,
      rotation: 0,
      marginLeft: 0,
      marginTop: 0,
      isDragging: false,
      initialX: 0,
      initialY: 0,
      startX: 0,
      startY: 0,
      isFullscreen: false,
      // 信件图片列表
      mySendList: [],

      // 图片加载状态
      loading: false,
      // 地图组件
      params: {
        zoom: 15, // 地图显示的缩放级别范围，在PC上，默认范围[3,18]，取值范围[3-18]；在移动设备上，默认范围[3-19]，取值范围[3-19]
        zoomEnable: true, // 地图是否可通过鼠标拖拽平移。
        dragEnable: true // 地图是否可缩放
      },
      pageList: [{
        name: '写信',
        value: 'write'
      }, {
        name: '忆往昔',
        value: 'send'
      }],
      showConfirmDialog: false, // 控制弹窗的显示
      senderAddress: [116.397455, 39.909187, '北京市东城区东华门街道天安门'],
      recipientAddress: [116.397455, 39.909187, '北京市东城区东华门街道天安门'],
      rules: {
        senderName: [
          { required: true, message: '请输入寄信人', trigger: 'blur' },
          { min: 1, max: 30, message: '最多输入30个字符', trigger: 'blur' }
        ],
        recipientName: [
          { required: true, message: '请输入收信人', trigger: 'blur' },
          { min: 1, max: 30, message: '最多输入30个字符', trigger: 'blur' }
        ],
        fontId: [
          { required: true, message: '请选择字体', trigger: 'change' }
        ],
        paperId: [
          { required: true, message: '请选择纸张', trigger: 'change' }
        ],
        fontColorId: [
          { required: true, message: '请选择颜色', trigger: 'change' }
        ],
        letterContent: [
          { required: true, message: '信件内容不能为空', trigger: 'blur' },
          { min: 1, message: '请至少输入 1 个字符', trigger: 'blur' }
        ],
        recipientEmail: [
          { required: true, message: '请输入收信人邮箱', trigger: 'blur' },
          { pattern: /^([a-zA-Z0-9]+[-_]?)+@[a-zA-Z0-9]+\.[a-z]+$/, message: '请输入正确的邮箱格式', trigger: 'blur' }
        ],
        senderAddress: [
          { required: true, validator: validateAddress, trigger: 'blur' }
        ],
        recipientAddress: [
          { required: true, validator: validateAddress, trigger: 'blur' }
        ],
        letterLink: [
          { required: true, message: '请先生成信件', trigger: 'blur' }
        ]
      },
      letterGen: {
        fontId: '',
        fontColorId: '',
        paperId: '',
        letterContent: '',
        senderName: '',
        recipientName: ''
      },
      letter: {
        letterContent: '',
        senderName: '',
        recipientName: '',
        senderAddress: {
          formattedAddress: '',
          longitude: '',
          latitude: ''
        },
        recipientAddress: {
          formattedAddress: '',
          longitude: '',
          latitude: ''
        },
        recipientEmail: '',
        recipientUserId: '',
        signetId: '',
        letterLink: ''
      },
      repository: {
        fonts: [],
        papers: [],
        fontColors: [],
        signets: []
      },
      friends: [],
      selectFriend: [],
      showFriend: false,
      showFriendDetail: false,
      showContent: false,
      currentView: '',
      newLayout: false, // 控制表单布局
      // currentRow: null,
      showTip: true,
      disabled: false
    }
  },

  methods: {
    handleShowProgress() {
      this.showProgress = !this.showProgress
      const progress = document.querySelector('.progress')
      if (this.showProgress) {
        progress.style.opacity = '1'
      } else {
        progress.style.opacity = '0'
      }
    },
    handleShowDetail() {
      this.showLetterDetail = !this.showLetterDetail
      const aside = document.querySelector('.aside')
      if (this.showLetterDetail) {
        aside.style.left = '0'
      } else {
        aside.style.left = '-270px'
        // aside.classList.toggle('aside_close')
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString)
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      return `${year}年${month}月${day}日`
    },
    // 查看大图函数开始
    openImageViewerPre(event, item) {
      // console.log(event)
      this.showMask = true
      const imageElement = document.createElement('img')
      imageElement.setAttribute('style', 'width: 250px; height:250px; position: absolute; top: 0; left: 0; z-index: 1000; ')
      imageElement.setAttribute('v-if', 'item.coverLink !== undefined')
      imageElement.setAttribute('src', item.coverLink)

      // 将新元素插入到当前点击的图片元素之上
      const targetElement = event.target
      targetElement.parentNode.insertBefore(imageElement, targetElement.nextSibling)

      // 设置新元素的样式
      imageElement.style.position = 'absolute'
      imageElement.style.top = '0'
      imageElement.style.left = '0'
      imageElement.style.zIndex = '1000'

      // 获取当前点击图片的位置
      const currentImageRect = targetElement.getBoundingClientRect()
      imageElement.style.left = `${currentImageRect.left}px`
      imageElement.style.top = `${currentImageRect.top}px`

      // 处理点击关闭事件
      // imageElement.addEventListener('click', () => {
      //   targetElement.parentNode.removeChild(imageElement)
      // })

      // 移到 .content 层中
      const contentElement = document.querySelector('.content')
      contentElement.appendChild(imageElement)

      // 计算当前图片在 .content 层中的位置
      const contentRect = contentElement.getBoundingClientRect()
      const newTop = currentImageRect.top - contentRect.top + 23
      const newLeft = currentImageRect.left - contentRect.left + 20

      // 设置新的位置
      imageElement.style.left = `${newLeft}px`
      imageElement.style.top = `${newTop}px`

      // 计算居中的位置
      const contentWidth = contentElement.offsetWidth
      const imageWidth = imageElement.offsetWidth
      const leftPosition = (contentWidth - imageWidth) / 2

      imageElement.style.setProperty('--pre-left', `${newLeft}px`)
      imageElement.style.setProperty('--pre-top', `${newTop}px`)
      imageElement.style.setProperty('--pre-transform', 'translateY(0)')
      // 设置目标位置
      imageElement.style.setProperty('--target-left', `${leftPosition}px`)
      imageElement.style.setProperty('--target-top', '50%')
      imageElement.style.setProperty('--target-transform', 'translateY(-50%)')

      // 触发动画
      imageElement.classList.add('animate-move-center')

      // 动画结束后清除动画类
      imageElement.addEventListener('animationend', () => {
        this.openImageViewer(item)
        // 监听 isVisible 变化
        this.$watch('isVisible', (newValue, oldValue) => {
          if (!newValue && imageElement.parentNode) {
            imageElement.classList.add('animate-back-to-original')
            imageElement.classList.remove('animate-move-center')
            this.showMask = false
            imageElement.addEventListener('animationend', () => {
              imageElement.classList.remove('animate-back-to-original')
              imageElement.parentNode.removeChild(imageElement)
            }, { once: true })
          }
        })
      }, { once: true })
    },
    openImageViewer(item) {
      this.isVisible = true

      this.imageUrl = item.letterLink
      // 设置 letterVo
      this.letterVo = item
      this.letterVo.deliveryProgress = (parseInt(item.deliveryProgress) / 100)
      // console.log(this.letterVo)

      setTimeout(() => {
        if (!this.showLetterDetail) {
          this.handleShowDetail()
        }
        if (!this.showProgress) {
          this.handleShowProgress()
        }
        this.scale = 0.9
      }, 100)
    },
    closeImageViewer() {
      // this.isVisible = false
      this.isFullscreen = false

      if (this.showLetterDetail) {
        this.handleShowDetail()
      }
      if (this.showProgress) {
        this.handleShowProgress()
      }
      this.scale = 0
      setTimeout(() => {
        this.isVisible = false
      }, 301) // 假设动画持续时间为300ms
      this.marginLeft = 0
      this.marginTop = 0
    },
    zoomIn() {
      this.scale += 0.1
      if (this.scale > 3) {
        this.scale = 3
      }
      // 如果缩放比例在 1.4 到 1.5 之间，且显示详情，则触发隐藏详情
      if (this.scale >= 1.4 && this.scale <= 1.5 && this.showLetterDetail) {
        this.handleShowDetail()
      }
      if (this.scale >= 1.2 && this.showProgress) {
        this.handleShowProgress()
      }
    },
    zoomOut() {
      this.scale -= 0.1
      if (this.scale < 0.1) {
        this.scale = 0.1
      }
      if (this.scale <= 1.2 && !this.showProgress) {
        this.handleShowProgress()
      }
    },
    toggleFullScreen() {
      this.isFullscreen = !this.isFullscreen
      // 非全屏状态下的设置
      this.scale = 1
      this.marginLeft = 0
      this.marginTop = 0
      if (this.showLetterDetail) {
        this.handleShowDetail()
      }
      if (this.showProgress) {
        this.handleShowProgress()
      }
    },
    rotateLeft() {
      this.rotation -= 90
    },
    rotateRight() {
      this.rotation += 90
    },
    startDrag(event) {
      event.preventDefault()
      // const imgElement = this.$el.querySelector('.el-image-viewer__img')
      // const imgRect = imgElement.getBoundingClientRect()

      this.startX = event.clientX
      this.startY = event.clientY

      this.initialX = this.marginLeft
      this.initialY = this.marginTop

      this.isDragging = true

      window.addEventListener('mousemove', this.dragImage)
      window.addEventListener('mouseup', this.endDrag)
    },
    dragImage(event) {
      if (!this.isDragging) return

      event.preventDefault()
      const newX = this.initialX + event.clientX - this.startX
      const newY = this.initialY + event.clientY - this.startY

      this.marginLeft = newX
      this.marginTop = newY
    },
    endDrag() {
      this.isDragging = false
      window.removeEventListener('mousemove', this.dragImage)
      window.removeEventListener('mouseup', this.endDrag)
    },
    zoomWithWheel(event) {
      event.preventDefault()
      const delta = -event.deltaY / 5000 // 调整缩放速度
      this.scale += delta
      if (this.scale < 0.1) {
        this.scale = 0.1
      }
      if (this.scale > 3) {
        this.scale = 3
      }
    },
    handleChange() {
      this.showTip = true
    },
    // 查看大图函数结束
    getLetterStatusLabel(statusId) {
      return this.letterStatusMap[statusId] || '未知状态'
    },
    getMySendLetter() {
      getMySendLetter().then(res => {
        this.mySendList = res.data
        this.loading = false
        // setTimeout(() => {
        //   this.loading = false
        // }, 1000)
      })
    },
    getMyFunctionCard() {
      getMyFunctionCard().then(res => {
        this.mySendList = res.data
      })
    },
    // 使用卡片
    useCard() {
      useCard().then(res => {
        this.mySendList = res.data
      })
    },
    handleChangePage(val) {
      // console.log(val)
      // 切换页面
      if (val === 'write') {
        this.showWrite()
      } else {
        this.showSend()
      }
    },
    generateLetter(letterGen) {
      this.showTip = false
      this.disabled = true
      setTimeout(() => {
        this.disabled = false
      }, 1500)
      this.$refs[letterGen].validate((valid) => {
        if (valid) {
          generateLetter(this.letterGen).then(res => {
            this.letter.letterLink = res.data
            this.showTip = false
            // 将生成的信件信息存储在数组和localStorage中
            this.generatedLetters.push({
              letterLink: this.letter.letterLink
            })
            localStorage.setItem('generatedLetters', JSON.stringify(this.generatedLetters))
          })
        } else {
          return false
        }
      })
    },
    submitPre() {
      this.letter.recipientAddress.longitude = this.recipientAddress[0]
      this.letter.recipientAddress.latitude = this.recipientAddress[1]
      this.letter.recipientAddress.formattedAddress = this.recipientAddress[2]

      this.letter.senderAddress.longitude = this.senderAddress[0]
      this.letter.senderAddress.latitude = this.senderAddress[1]
      this.letter.senderAddress.formattedAddress = this.senderAddress[2]

      this.letter.letterContent = this.letterGen.letterContent
      this.letter.senderName = this.letterGen.senderName
      this.letter.recipientName = this.letterGen.recipientName

      this.submitForm('letter')
    },
    /** 提交按钮 */
    submitForm(letter) {
      this.$refs[letter].validate((valid) => {
        if (valid) {
          // 提交表单
          console.log('提交表单:', this.letter)
          sendLetter(this.letter).then(res => {
            this.$message({
              message: '发送成功',
              type: 'success'
            })
            this.showConfirmDialog = false
          })
        } else {
          return false
        }
      })
    },
    cancel() {
      this.showConfirmDialog = false
    },
    getMyAddress() {
      // 获取我的地址
      getMyAddress().then(res => {
        const addresses = res.data
        for (let i = 0; i < addresses.length; i++) {
          if (addresses[i].isDefault) {
            this.letter.senderAddress = addresses[i]
          }
        }
      })
    },
    handleCurrentChange(val) {
      this.showFriend = false
      // this.currentRow = val
      this.letterGen.recipientName = val.name
      this.letter.recipientEmail = val.email
      this.letter.recipientUserId = val.userId
      getFriendAddress(val.id).then(res => {
        this.letterGen.recipientAddress = res.data.get[0]
      })
    },
    handleCheckFriend() {
      this.handleChange()
      // 每次输入收信人时，清空收信人信息
      this.$refs.singleTable.setCurrentRow()
      this.recipientAddress = [116.397455, 39.909187, '北京市东城区东华门街道天安门']
      this.letter.recipientEmail = ''
      this.letter.recipientUserId = ''

      // 检查收信人是否是好友
      const tempList = []
      for (const friend of this.friends) {
        if (friend.name.includes(this.letterGen.recipientName) && this.letterGen.recipientName !== '') {
          tempList.push(friend)
        }
      }
      if (tempList.length > 0) {
        this.selectFriend = tempList
        this.showFriend = true
      } else {
        this.showFriend = false
      }
    },
    handleShowConfirmDialog() {
      this.showConfirmDialog = true

      this.senderAddress[0] = this.letter.senderAddress.longitude
      this.senderAddress[1] = this.letter.senderAddress.latitude
      this.senderAddress[2] = this.letter.senderAddress.formattedAddress

      if (this.letter.recipientAddress !== null && this.letter.recipientAddress.formattedAddress !== '') {
        this.recipientAddress[0] = this.letter.recipientAddress.longitude
        this.recipientAddress[1] = this.letter.recipientAddress.latitude
        this.recipientAddress[2] = this.letter.recipientAddress.formattedAddress
      }
    },
    getUserRepository() {
      const userStore = useUserStore()
      // 通过pinia获取用户信息
      this.letterGen.senderName = userStore.name
      // 获取用户仓库
      getUserRepository().then(res => {
        this.repository = res.data
        this.letterGen.fontId = this.repository.fonts[0].id
        this.letterGen.fontColorId = this.repository.fontColors[0].id
        this.letterGen.paperId = this.repository.papers[0].id
        this.letter.letterLink = this.repository.papers[0].previewImage
        this.handleError()
      })
    },
    handleLoad() {
      // 图片加载成功后关闭加载状态
      this.loading = false
    },
    handleError() {
      // 图片加载失败时保持加载状态
      this.loading = true
    },
    getUserFriends() {
      // 获取用户好友列表
      getUserFriends().then(res => {
        this.friends = res.data
      })
    },
    showWrite() {
      this.showContent = true
      this.currentView = 'write'
    },
    showSend() {
      this.getMySendLetter()
      this.showContent = true
      this.currentView = 'send'
    }
  },
  mounted() {
    // this.showWrite()// 页面加载时自动触发
    this.showSend()
    this.getUserRepository()
    this.getUserFriends()
    this.getMyAddress()
  }
}
</script>

<style scoped>
.row-bg {
  width: 1200px;
  height: 600px;

  position: relative;

  padding-top: 20px;
  padding-left: 20px;
  margin: 40px auto 0 auto;
  flex-wrap: wrap;
  border-radius: 20px;
  /* 明确允许换行 */
  overflow: hidden;
  overflow-y: scroll;
  /* z-index: 10; */
  background-color: rgba(255, 255, 255, 0.5);
}

.row-bg::-webkit-scrollbar-track {
  background-color: transparent !important;
}

.content {
  flex-grow: 1;
  /* 占据剩余空间 */
  padding: 20px;
  /* 添加边框 */
}

.banner {
  position: relative;
  margin-top: 40px;
  width: 1300px;
  height: 680px;
  /* height: 1200px; */
  background-color: blanchedalmond;
  background-image: url(../../assets/imgs/writebgd3.jpg);
  display: flex;
  /* 使用 Flexbox 布局 */
  align-items: flex-start;
  /* 垂直对齐子元素 */
  line-height: 40px;
}

.selectPage {
  position: absolute;
  z-index: 5;
  /*提高层级 */
  top: 20px;
  right: 50px;
  border: 0;
  cursor: pointer;
  /* 将鼠标指针设置为手型 */
  outline: none;
  /* 移除焦点时的边框 */
}

.left {
  position: absolute;
  width: 320px;
  top: 10px;
  left: 80px;
  padding: 20px;
  box-sizing: border-box;
  background-color: rgb(222, 201, 162);
  border-radius: 25px;
  text-align: left;
}

.right {
  position: absolute;
  /* background-color: rgb(222, 201, 162); */
  padding: 20px;
  border-radius: 25px;
  left: 450px;
  top: 115px;
  width: 700px;
  height: 450px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.text {
  margin-left: -25px;
}

.text label {
  display: block;
  margin-bottom: 5px;
}

.text textarea {
  width: 350px;
  height: 400px;
  padding: 8px;
  border-radius: 4px;
  resize: none;
  outline: none;
  border: 0;
}

.left ::v-deep .el-input__inner {
  height: 35px;
  border: 1px solid #1296db;
  background-color: rgba(0, 0, 0, 0.1) !important;
  color: #666;
}

::v-deep .el-input__inner,
::v-deep .el-textarea__inner {
  height: 35px;
  border-radius: 10px;
  border: 1px solid #1296db;
  background-color: rgba(222, 201, 162, 0.6) !important;
  color: #b00f0f;
}

::v-deep .el-dialog {
  margin-top: 200px !important;
  border-radius: 10px;
  background-color: rgba(222, 201, 162, 1) !important;
}

::v-deep input::-webkit-input-placeholder {
  color: #666;
  font-size: 15px;
}

::v-deep .el-form-item {
  margin-bottom: 20px;
}

.demo-table-expand {
  font-size: 0;
}

.demo-table-expand>>>.el-form-item__content {
  margin-left: -5px !important;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.dialog-footer {
  text-align: center;
}

.fullscreen {
  transition: .3s ease;
  max-width: none !important;
  max-height: none !important;
  margin: 0 !important;
}

.el-icon-full-screen.toggle-icon::before {
  content: "\e7c6";
}

.el-image-viewer__actions__inner {
  display: block
}

.el-image-viewer__actions {
  left: 94%;
  bottom: 4%;
  transform: translateX(-12%);
  height: 210px;
  width: 40px;
  padding: 8px 9px;
  background-color: #606266;
  border-color: #fff;
  border-radius: 25px;
}

/* 定义动画效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s;
  /* 过渡属性和持续时间 */
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  /* 初始和结束时的透明度 */
}

/* 分割线· */
/* 定义动画效果 */
.zoom-in-enter-active,
.zoom-in-leave-active {
  transition: opacity .3s;
  /* 过渡属性和持续时间 */
}

.zoom-in-from,
.zoom-in-to {
  opacity: 0;
  /* 初始和结束时的透明度 */
}

.image-hover:hover,
.image-hover:focus,
.image-hover:active {
  transform: scale(1.1);
}

.aside {
  position: fixed;
  left: 0%;
  top: 0;
  height: 100%;
  display: flex;
  background-color: rgba(0, 0, 0, .7);
  transition: 1s ease-in-out;
  border-radius: 0 10px 10px 0;

}

.box-card {
  width: 280px;
  flex: 6;
  background: transparent;
  color: #fff;
  font-size: 12px;
  margin-top: 100px;
  border: none;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.aside_close {
  flex: 1;
  /* position: absolute;
  right: 0;
  top: 0; */
  width: 35px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 30px;
  text-align: center;
  cursor: pointer;
  color: #fff;
  transition: 1s ease-in-out;
  /* background: rgba(0, 0, 0, .7); */
}

.card_item {
  text-align: left;
}

.progress {
  position: fixed;
  left: 50%;
  bottom: 8%;
  transform: translate(-50%, 50%);
  width: 500px;
  height: 100px;
  background: rgba(0, 0, 0, .7);
  border-radius: 10px;
  transition: 1s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
}

/* 平移动画 */
/* 移至common.css */
</style>
