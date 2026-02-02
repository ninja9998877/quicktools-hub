# QuickTools Hub - 部署、测试和调试工作流

## 第一步：Vercel身份验证
您需要在浏览器中完成身份验证：
1. 访问 https://vercel.com/oauth/device?user_code=TBLG-DWCP
2. 或运行 `npx vercel login` 并按照提示操作

## 第二步：部署后端API服务

```bash
# 进入后端目录
cd backend

# 安装依赖
npm install

# 构建项目
npm run build

# 部署到Vercel（生产环境）
npx vercel --prod --token [YOUR_VERCEL_TOKEN]
```

## 第三步：部署前端应用

```bash
# 进入前端目录
cd ../frontend

# 安装依赖
npm install

# 构建项目
npm run build

# 部署到Vercel（生产环境）
npx vercel --prod --token [YOUR_VERCEL_TOKEN]
```

## 第四步：配置环境变量

在Vercel仪表板中为前端项目设置环境变量：
- `REACT_APP_API_URL`: 您的后端API URL

## 第五步：测试部署

### API端点测试
- GET `/api/health` - 健康检查
- POST `/api/video/download` - 视频下载
- POST `/api/pdf/convert` - PDF转换
- POST `/api/image/compress` - 图像压缩

### 前端功能测试
- 访问主页并验证导航
- 测试视频下载功能
- 测试PDF转换功能
- 测试图像压缩功能

## 调试常见问题

### 1. CORS错误
- 确保后端允许来自前端域名的请求
- 检查环境变量中的API URL设置

### 2. 构建失败
- 验证package.json中的脚本
- 检查依赖项版本兼容性
- 查看构建日志中的具体错误

### 3. 文件上传/下载问题
- 检查服务器超时设置
- 验证文件大小限制
- 确认临时文件夹权限

### 4. API响应缓慢
- 检查服务器资源使用情况
- 验证外部API调用（如视频下载服务）
- 考虑实施缓存策略

## 重新发布流程

如果需要修复问题并重新发布：

1. 修改代码
2. 提交更改到GitHub
3. 在Vercel仪表板中触发新的部署
4. 或使用CLI重新部署：
   ```bash
   npx vercel --prod
   ```

## 监控和维护

### 性能监控
- 页面加载时间
- API响应时间
- 错误率

### 日志查看
- Vercel仪表板中的部署日志
- 运行时错误日志
- 用户错误报告

### 安全检查
- 定期更新依赖项
- 验证文件上传安全
- 检查API访问控制

## 回滚流程

如果部署出现问题：

1. 在Vercel仪表板中找到之前的正常部署
2. 使用"Promote"功能将旧版本设为生产版本
3. 调查并修复导致问题的代码
4. 重新部署修复后的版本