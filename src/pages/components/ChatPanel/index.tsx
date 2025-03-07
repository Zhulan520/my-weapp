// src/components/fixed-input/index.tsx
import Taro from '@tarojs/taro'
import { Message } from '@/type'
import { handleRequest } from '@/services/utils'
import { View, Input, ScrollView, Button, Text, Icon, } from '@tarojs/components'
import { useRef, useState, } from 'react'

import styles from './index.module.scss'
import { getUserAvatar } from './utils'


export default function FixedInput() {
  const [inputFocusHeight, setInputFocusHeight] = useState(0)
  const [inputMsg, setInputMsg] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const scrollViewRef = useRef<any>(null)
  const [scrollTop, setScrollTop] = useState(10000)


  // 键盘高度变化监听
  Taro.onKeyboardHeightChange(res => {
    setInputFocusHeight(res.height)
  })

  // 发送消息
  const handleSend = async () => {
    // 获取用户头像
    const avatarUrl = await getUserAvatar();


    if (!inputMsg.trim() || isLoading) return

    try {
      setIsLoading(true)
      const newMessages: Message[] = [...messages, { role: 'user', content: inputMsg }]
      setMessages(newMessages)
      setInputMsg('')

      const response: any = await handleRequest(newMessages)
      setMessages(prev => [...prev, { role: 'assistant', content: response?.data?.message?.content }])
      setScrollTop(newMessages.length * 10000)
    } catch (error) {
      console.error('API错误详情:', error.response?.data || error.message)

    } finally {
      setIsLoading(false)
    }
  }


  return (
    <View className={styles.wrapper}>
      <View className={styles.header}  >
        <Icon size={20} type='waiting' color='#6CBAA7' onClick={() => { }} />
        <Icon size={20} type='clear' color='#6CBAA7' onClick={() => { setMessages([]) }} />
      </View>
      {/* 消息滚动区域 */}
      <ScrollView
        className={styles.scrollView}
        ref={scrollViewRef}
        scrollWithAnimation
        scrollTop={scrollTop}
        scrollY
        enhanced
        showScrollbar
      >
        {messages.map((msg, index) => (
          <View
            key={index}
            className={msg.role === 'user' ? styles.userBubble : styles.aiBubble}
          >
            <Text className={styles.messageText}>{msg.content}</Text>
          </View>
        ))}
        {isLoading && (
          <View className={styles.loading}>
            <Text className={styles.loadingText}>AI正在思考中...</Text>
          </View>
        )}
      </ScrollView>

      {/* 固定在底部的输入框 */}
      <View
        className={styles.inputContainer}
        style={{ marginBottom: inputFocusHeight }}
      >
        <Input
          className={styles.input}
          placeholder='请输入消息'
          adjustPosition={false}
          cursorSpacing={40}
          placeholderClass={styles.placeholder}
          onConfirm={handleSend}
          value={inputMsg}
          onInput={e => setInputMsg(e.detail.value)}

          disabled={isLoading}
        />
        <Button className={styles.sendBtn} onClick={handleSend}  > {isLoading ? '发送中...' : '发送'}</Button>
      </View>
    </View>
  )
}