// src/components/input-panel/index.tsx
import Taro from '@tarojs/taro'
import { View, Textarea, Button } from '@tarojs/components'
import { useState, useEffect, useRef } from 'react'
import classNames from 'classnames'
import styles from './index.module.scss'

interface Props {
  onSend: (content: string) => Promise<void>
  maxLength?: number
  placeholder?: string
}

export default function InputPanel(props: Props) {
  const [inputContent, setInputContent] = useState('')
  const [isComposing, setIsComposing] = useState(false) // 中文输入法状态
  const textareaRef = useRef(null)
  const systemInfo = Taro.getSystemInfoSync()



  // 兼容中文输入法（2025新增API）
  const handleComposition = (e) => {
    if (e.type === 'compositionend') {
      setIsComposing(false)
    } else {
      setIsComposing(true)
    }
  }

  // 发送消息逻辑
  const handleSend = async () => {
    if (!inputContent.trim()) {
      Taro.showToast({ title: '内容不能为空', icon: 'none' })
      return
    }

    try {
      await props.onSend(inputContent)
      setInputContent('')
    } catch (err) {
      Taro.showModal({
        title: '发送失败',
        content: err.message || '网络异常，请重试'
      })
    }
  }

  return (
    <View 
      className={classNames(styles.container, {
        [styles.ios]: systemInfo.platform === 'ios',
        [styles.android]: systemInfo.platform === 'android'
      })}
    >
      <Textarea
        ref={textareaRef}
        value={inputContent}
        className={styles.textarea}
        placeholder={props.placeholder || '输入消息...'}
        placeholderClass={styles.placeholder}
        maxlength={props.maxLength || 1000}
        cursorSpacing={20}

   
        onConfirm={!isComposing ? handleSend : undefined}
      />
      
      <Button
        className={styles.button}
        hoverClass={styles.buttonHover}
        onClick={handleSend}
        disabled={!inputContent.trim()}
      >
        {inputContent ? '发送' : '语音'}
      </Button>
    </View>
  )
}