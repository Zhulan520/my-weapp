import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import styles from './index.module.scss' 

export default function Index () {
  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View  >
      <Text className={styles.color}>Hello world你好</Text>
    </View>
  )
}
