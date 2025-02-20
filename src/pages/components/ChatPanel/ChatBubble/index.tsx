// src/components/chat-bubble.tsx
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import  styles from './index.module.scss'

export default function ChatBubble({ message, onCopy }: {
  message: {
    text: string
    isUser: boolean
    timestamp?: number
  }
  onCopy: (text: string) => void
}) {
  const [showTime, setShowTime] = useState(false)

  // 2025年时间格式化规范
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
  }

  return (
    <View 
      className={styles.bubbleContainer}
      hoverStayTime={100}
    >
      {/* 时间戳提示（2025悬浮设计） */}
      {message.timestamp && (
        <View 
          className={`time-tip ${showTime ? 'visible' : ''}`}
          onTouchStart={() => setShowTime(true)}
          onTouchEnd={() => setShowTime(false)}
        >
          {formatTime(message.timestamp)}
        </View>
      )}

      {/* 消息主体 */}
      <View className={styles.bubbleBody}>
        <Text 
          selectable 
          className={styles.contentText}
          userSelect
          onLongPress={() => onCopy(message.text)}
        >
          {message.text}
        </Text>
        
        {/* 复制按钮（2025悬浮操作设计） */}
        <View 
          className={styles.copyBtn}
          onClick={() => {
            onCopy(message.text)
            Taro.vibrateShort({ type: 'light' })
          }}
        >
          <Text className={styles.iconFont} />
        </View>
      </View>
    </View>
  )
}