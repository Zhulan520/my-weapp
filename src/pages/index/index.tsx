import { View, Text } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import ChatPanel from "../components/ChatPanel";
import styles from "./index.module.scss";

export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  return (
    <View className={styles.body}>
      <ChatPanel />
    </View>
  );
}
