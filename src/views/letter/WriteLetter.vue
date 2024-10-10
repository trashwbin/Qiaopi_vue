<template>
  <div class="banner">

    <div class="selectPage" @click="showSend" :class="{ 'active': currentView === 'send' }">
      <el-select v-model="currentView" style="width: 90px;">
        <el-option v-for="item in pageList" :key="item.value" :label="item.name" :value="item.value" />
      </el-select>
    </div>
    <div v-if="currentView === 'write'">
      <div class="left">
        <el-form :model="letterGen" :inline="true" label-width="55px" :rules="rules" ref="letterGen"
          hide-required-asterisk="true">
          <el-form-item label="信纸" prop="paperId" style="margin-left: -10px;">
            <el-select v-model="letterGen.paperId" placeholder="信纸" style="width: 200px; height: 10px;" height="10">
              <el-option v-for="item in repository.papers" :key="item.id" :label="item.name" :value="item.id"
                @change="handleChange" />
            </el-select>
          </el-form-item>
          <div style="display: flex;">
            <el-form-item label="字体" prop="fontId" style="margin-left: -10px; flex: 1;">
              <el-select v-model="letterGen.fontId" placeholder="字体" style="width: 85px;">
                <el-option v-for="item in repository.fonts" :key="item.id" :label="item.name" :value="item.id"
                  @change="handleChange" />
                :value="item.id" />
              </el-select>
            </el-form-item>
            <el-form-item label="颜色" prop="fontColorId" style="margin-left: -10px; flex: 1;">
              <el-select v-model="letterGen.fontColorId" placeholder="颜色" style="width: 85px; " @change="handleChange">
                <el-option v-for="item in repository.fontColors" :key="item.id" :label="item.description"
                  :value="item.id" />
              </el-select>
            </el-form-item>
          </div>
          <el-form-item label="寄信人" prop="senderName" style="margin-left: -10px; " label-width="65px">
            <el-input v-model="letterGen.senderName" placeholder="请输入寄信人" @input="handleChange" />
          </el-form-item>
          <el-form-item label="收信人" prop="recipientName" style="margin-left: -10px;" label-width="65px">
            <el-input v-model="letterGen.recipientName" placeholder="请输入收信人" @input="handleCheckFriend" />
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
                :autosize="{ minRows: 10, maxRows: 12 }" style="width: 120%;" resize="none"
                @input="handleChange"></el-input>
            </el-form-item>
          </div>
        </el-form>
        <el-row style="margin: 20px auto 0; text-align: center;">
          <el-button type="warning" @click="generateLetter('letterGen')">生成</el-button>
          <el-tooltip content="请生成后再确认" placement="bottom" effect="light" :disabled="!showTip">
            <el-button type="primary" @click="hanleShowConfirmDialog" :disabled="showTip">确认</el-button>
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
        <!-- 已写信的内容 -->
        <h2>已写的信</h2>
        <p>这里是您已经写的信件...</p>
      </div>
      <div class="content" v-if="showContent">

      </div>
    </div>
  </div>
</template>

<script>
import { getUserRepository, getUserFriends, getFriendAddress, getMyAddress } from '@/api/user'
import { generateLetter, sendLetter } from '@/api/letter'
import useUserStore from '@/store/modules/user'

export default {
  name: 'WriteLetter',
  data() {
    // eslint-disable-next-line
    var validateAddress = (rule, value, callback) => {
      // 定义市级以上城市列表
      const cities = [
        '北京', '上海', '天津', '重庆',
        '广州', '深圳', '成都', '武汉', '南京', '杭州', '西安', '沈阳', '长沙', '济南', '青岛', '大连', '苏州', '宁波', '厦门', '福州',
        '哈尔滨', '长春', '合肥', '南昌', '郑州', '昆明', '贵阳', '南宁', '海口', '太原', '石家庄', '呼和浩特', '乌鲁木齐', '银川', '兰州', '西宁', '拉萨', '长春', '杭州', '福州', '济南', '青岛', '郑州', '武汉', '长沙', '广州', '南宁', '海口', '成都', '贵阳', '昆明', '西安', '兰州', '西宁', '银川', '乌鲁木齐',
        '香港', '澳门', '台湾'
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
      loading: true,
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
      showTip: true

    }
  },
  methods: {
    handleChange() {
      this.showTip = true
    },
    generateLetter(letterGen) {
      this.showTip = false
      this.$refs[letterGen].validate((valid) => {
        if (valid) {
          // 生成信件
          // console.log('生成信件:', this.letterGen)
          generateLetter(this.letterGen).then(res => {
            this.letter.letterLink = res.data.letterLink
            this.showTip = false
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

      this.submitForm('letter')
    },
    /** 提交按钮 */
    submitForm(letter) {
      this.$refs[letter].validate((valid) => {
        if (valid) {
          // 提交表单
          // console.log('提交表单:', this.letter)
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
    hanleShowConfirmDialog() {
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
      this.showContent = true
      this.currentView = 'send'
    }
  },
  mounted() {
    this.showWrite()// 页面加载时自动触发
    this.getUserRepository()
    this.getUserFriends()
    this.getMyAddress()
  }
}
</script>

<style scoped>
.banner {
  position: relative;
  margin-top: 40px;
  width: 1200px;
  height: 700px;
  background-color: blanchedalmond;
  background-image: url(../../assets/imgs/writebgd3.jpg);
  display: flex;
  /* 使用 Flexbox 布局 */
  align-items: flex-start;
  /* 垂直对齐子元素 */
}

.selectPage {
  position: absolute;
  top: 20px;
  right: 50px;
  border: 0;
  cursor: pointer;
  /* 将鼠标指针设置为手型 */
  outline: none;
  /* 移除焦点时的边框 */
}

.content {
  flex-grow: 1;
  /* 占据剩余空间 */
  padding: 20px;
  border-left: 2px solid #ccc;
  /* 添加边框 */
}

.left {
  position: absolute;
  width: 320px;
  top: 30px;
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

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 80%;
  padding: 8px;
  border-radius: 4px;
  resize: none;
  outline: none;
  border: 0;
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

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.modal-content input {
  width: 80%;
  height: 10px;
  padding: 8px;
  border-radius: 4px;
  resize: none;
  outline: none;
}

.close {
  position: absolute;
  top: 30px;
  right: 30px;
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

::v-deep .el-loading-mask {
  background-color: rgba(222, 201, 162, .5) !important;
  border-radius: 30px;
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
</style>
