import { FirstName, LastName, MOCK_MODE, SecondName, ThirdName } from '@/constants'
import { Message } from '@/type'
import Taro from '@tarojs/taro'

const API_CONFIG = () => ({
  ENDPOINT: 'https://api.deepseek.com/v1/chat/completions', // 修正API路径
  SECRET: 'sk-f7d7c596e9544db08d5e29a0a35de113' + '_v2'
})

export const handleRequest = async (messages: Message[]) => {
  const { ENDPOINT, SECRET } = API_CONFIG()
 // 启用模拟模式
 if (MOCK_MODE) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockResponse = {
        data: {
            message: {
              content:generateRandomCombination()
            }
        }
      }
      console.log('[MOCK] 模拟响应:', mockResponse)
      resolve(mockResponse)
    }, 500) // 添加0.5秒延迟模拟网络请求
  })
}
  
  try {
    const res = await Taro.request({
      url: ENDPOINT,
      method: 'POST',
      header: {
        'Authorization': `Bearer ${SECRET.replace(/_v2$/, '')}`,
        'Content-Type': 'application/json'
      },
      data: {
        model: "deepseek-chat",
        messages: messages.slice(-3),
        temperature: 0.5,
        stream: false
      },
      timeout: 8000
    })

    console.log('完整API响应:', res) // 调试日志
    
    // 增强型结构校验
    if (!res.data?.choices?.[0]?.message?.content) {
      console.error('异常响应结构:', res.data)
      throw new Error('API响应结构异常')
    }
    return res
  } catch (error) {
    console.error('[DEBUG] 完整错误对象:', error) // 输出完整错误
  }
}

export function generateRandomCombination() {
  // 随机选择器
  const randomSelector = (arr) => arr[Math.floor(Math.random() * arr.length)];
  
  // 按顺序拼接四个部分
  return [
    randomSelector(FirstName),
    randomSelector(SecondName),
    randomSelector(ThirdName),
    randomSelector(LastName)
  ].join('');
}