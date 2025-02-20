// src/components/fixed-input/index.tsx
import Taro from '@tarojs/taro'
import { View, Input, ScrollView, Button } from '@tarojs/components'
import { useState,  } from 'react'
import styles from './index.module.scss'

export default function FixedInput() {
  const [inputFocusHeight, setInputFocusHeight] = useState(0)

  Taro.onKeyboardHeightChange(res => {
    console.log(res.height, 'keyboardHeight')
    setInputFocusHeight(res.height)
  })
  return (
    <View className={styles.wrapper}>
      {/* 消息滚动区域 */}
      <ScrollView
        className={styles.scrollView}

      >
        <Button className='btn-max-w' plain type='primary'>按钮</Button>
        <Button className='btn-max-w' plain type='primary'>按钮</Button>
        <Button className='btn-max-w' plain type='primary'>按钮</Button>
 

      </ScrollView>

      {/* 固定输入框 */}
      <View 
        className={styles.inputContainer}
        style={{marginBottom:inputFocusHeight}}
      >
        <Input
          className={styles.input}
          placeholder='请输入消息'
          adjustPosition={false}
          cursorSpacing={40}
          placeholderClass={styles.placeholder}
        />
        <Button className={styles.sendBtn}  >发送</Button>
      </View>
    </View>
  )
}