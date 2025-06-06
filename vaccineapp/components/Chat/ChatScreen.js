// ChatScreen.js
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  FlatList,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
  where,
  increment,
} from "firebase/firestore";
import { firestore } from "../../configs/firebase";
import useUser from "../../hooks/useUser";
import { color, defaultAvatar } from "../../styles/Styles";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";

export default function ChatScreen({ route }) {
  const [chatId, setChatId] = useState(route?.params?.chatId || null);
  const currentUser = useUser();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const flatListRef = useRef(null);
  const navigation = useNavigation();

  async function createChat() {
    try {
      const timestamp = serverTimestamp();
      const chatRef = await addDoc(collection(firestore, "chats"), {
        user: {
          id: currentUser.id,
          name: currentUser.last_name + " " + currentUser.first_name,
          avatar: currentUser.avatar,
          unread: 0,
        },
        staff: {
          id: null,
          name: "Nhân viên tư vấn",
          avatar: defaultAvatar,
          unread: 0,
        },
        status: "waiting",
        createdAt: timestamp,
        lastMessage:
          "Bạn đang cần tư vấn về loại vaccine bạn muốn mua hay các thông tin về trung tâm của chúng tôi, hãy nhắn tin để kết nối với nhân viên tư vấn của chúng tôi?",
        lastSender: "staff",
        lastMessageTime: timestamp,
      });
      const messagesRef = collection(
        firestore,
        "chats",
        chatRef.id,
        "messages"
      );
      await addDoc(messagesRef, {
        sender: "staff",
        text: "Bạn đang cần tư vấn về loại vaccine bạn muốn mua hay các thông tin về trung tâm của chúng tôi, hãy nhắn tin để kết nối với nhân viên tư vấn của chúng tôi?",
        timestamp: timestamp,
      });
      setChatId(chatRef.id);
    } catch (error) {
      console.error("Failed to create chat:", error);
    }
  }

  useEffect(() => {
    if (!chatId) {
      const q = query(
        collection(firestore, "chats"),
        where("user.id", "==", currentUser.id),
        orderBy("lastMessageTime", "desc")
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        if (list.length > 0) {
          setChatId(list[0].id);
        } else {
          createChat();
        }
      });
      return unsubscribe;
    }

    if (chatId) {
      resetUnreadCount(chatId);
      const messagesRef = collection(firestore, "chats", chatId, "messages");
      const q = query(messagesRef, orderBy("timestamp", "asc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const msgs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(msgs);
      });
      return unsubscribe;
    }
  }, [chatId]);

  async function sendMessage() {
    if (!inputText.trim()) return;

    const messagesRef = collection(firestore, "chats", chatId, "messages");
    await addDoc(messagesRef, {
      sender: currentUser.is_staff ? "staff" : "user",
      text: inputText.trim(),
      timestamp: serverTimestamp(),
    });

    const chatDocRef = doc(firestore, "chats", chatId);
    await updateDoc(chatDocRef, {
      lastMessage: inputText.trim(),
      lastMessageTime: serverTimestamp(),
      lastSender: currentUser.is_staff ? "staff" : "user",
    });

    if (currentUser.is_staff) {
      await updateDoc(chatDocRef, {
        "user.unread": increment(1),
      });
    } else {
      await updateDoc(chatDocRef, {
        "staff.unread": increment(1),
      });
    }

    setInputText("");
  }

  async function resetUnreadCount(chatId) {
    const chatDocRef = doc(firestore, "chats", chatId);
    const userIndex = currentUser.is_staff ? "staff" : "user";
    await updateDoc(chatDocRef, {
      [`${userIndex}.unread`]: 0,
    });
  }

  async function resetChat() {
    const chatDocRef = doc(firestore, "chats", chatId);
    await updateDoc(chatDocRef, {
      status: "waiting",
      staff: {
        id: null,
        name: "Nhân viên tư vấn",
        avatar: defaultAvatar,
        unread: 0,
      },
    });
    navigation.goBack();
  }

  async function handleResetChat() {
    Alert.alert("Xác nhận", "Bạn có muốn kết thúc tư vấn ?", [
      { text: "Hủy", style: "cancel" },
      { text: "Kết thúc", onPress: () => resetChat() },
    ]);
  }

  useEffect(() => {
    if (messages.length > 0) {
      flatListRef.current?.scrollToEnd({ animated: true });
    }
  }, [messages]);

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        ref={flatListRef}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <>
            {item.sender === "system" ? (
              <Text style={styles.systemMsg}>{item.text}</Text>
            ) : (
              <Text
                style={
                  (item.sender === "staff" && currentUser.is_staff) ||
                  (item.sender === "user" && !currentUser.is_staff)
                    ? styles.myMsg
                    : styles.otherMsg
                }
              >
                {item.text}
              </Text>
            )}
          </>
        )}
        showsVerticalScrollIndicator={false}
        style={styles.messagesList}
      />
      <View style={styles.inputContainer}>
        {currentUser.is_staff && (
          <TouchableOpacity
            style={{ paddingBottom: 8, paddingHorizontal: 8 }}
            onPress={() => handleResetChat()}
          >
            <FontAwesome5 name="times-circle" solid size={24} color={"red"} />
          </TouchableOpacity>
        )}
        <TextInput
          style={styles.input}
          placeholder="Nhập tin nhắn..."
          value={inputText}
          onChangeText={setInputText}
          multiline={true}
        />
        <TouchableOpacity style={styles.btnSend} onPress={sendMessage}>
          <FontAwesome5
            name="telegram-plane"
            solid
            size={24}
            color={color.primary}
            style={{ paddingBottom: 8 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 10, backgroundColor: "white" },
  messagesList: { flex: 1, paddingTop: 10 },
  myMsg: {
    alignSelf: "flex-end",
    backgroundColor: color.primary,
    padding: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderBottomRightRadius: 5,
    marginVertical: 1,
    color: "white",
    maxWidth: "70%",
  },
  otherMsg: {
    alignSelf: "flex-start",
    backgroundColor: color.bg,
    padding: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderBottomLeftRadius: 5,
    marginVertical: 1,
    maxWidth: "70%",
  },
  input: {
    borderWidth: 0,
    backgroundColor: color.secondary,
    padding: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: 8,
    flexWrap: "wrap",
    minHeight: 40,
    maxHeight: 100,
    flex: 1,
  },
  btnSend: {
    padding: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 5,
    paddingVertical: 10,
  },
  systemMsg: {
    alignSelf: "center",
    color: "gray",
    fontStyle: "italic",
    textAlign: "center",
    marginVertical: 1,
    maxWidth: "60%",
  },
});
