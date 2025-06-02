import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Badge, Button } from "react-native-paper";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { firestore } from "../../configs/firebase";
import useUser from "../../hooks/useUser";
import Styles, { color, defaultAvatar } from "../../styles/Styles";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

export default function ChatListScreen({ navigation }) {
  const currentUser = useUser();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(firestore, "chats"),
      where("status", "in", ["waiting", "in_progress"]),
      orderBy("lastMessageTime", "desc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setChats(list);
    });

    return () => unsub();
  }, [currentUser]);

  // Accept a chat as staff
  async function acceptChat(chatId) {
    const chatDocRef = doc(firestore, "chats", chatId);
    await updateDoc(chatDocRef, {
      "staff.id": currentUser.id,
      status: "in_progress",
    });
    const messagesRef = collection(firestore, "chats", chatId, "messages");
    await addDoc(messagesRef, {
      senderId: "system",
      text:
        "Đã kết nối với nhân viên tư vấn " +
        currentUser.last_name +
        " " +
        currentUser.first_name,
      timestamp: serverTimestamp(),
    });
    navigation.navigate("Chat", { chatId });
  }

  async function resetUnreadCount(chatId) {
    const chatDocRef = doc(firestore, "chats", chatId);
    const userIndex = currentUser.is_staff ? "staff" : "user";
    await updateDoc(chatDocRef, {
      [`${userIndex}.unread`]: 0,
    });
  }

  const renderItem = ({ item }) => {
    let otherParticipant, user;
    if (currentUser.is_staff) {
      otherParticipant = item.user;
      user = item.staff;
    } else {
      otherParticipant = item.staff;
      user = item.user;
    }
    const unreadCount = user?.unread || 0;
    return (
      <TouchableOpacity
        style={styles.chatItem}
        onPress={() => {
          resetUnreadCount(item.id);
          if (currentUser.is_staff && item.status === "waiting") {
            acceptChat(item.id);
          } else {
            navigation.navigate("Chat", { chatId: item.id });
          }
        }}
      >
        <Image
          source={{ uri: otherParticipant?.avatar || defaultAvatar }}
          style={{ width: 50, height: 50, borderRadius: 25 }}
        />
        <View
          style={{
            width: "80%",
            borderBottomWidth: 0.5,
            borderBottomColor: "#ccc",
            paddingBottom: 15,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={unreadCount > 0 ? styles.unreadTitle : styles.chatTitle}
              >
                {otherParticipant?.name || "Unknown"}
              </Text>
              <Badge
                size={20}
                style={{
                  marginLeft: 10,
                  backgroundColor:
                    item.status === "waiting" ? color.primary : color.primary2,
                  paddingHorizontal: 7,
                  fontSize: 10,
                  fontWeight: "bold",
                }}
              >
                {item.status === "waiting" ? "Chờ tư vấn" : "Đang tư vấn"}
              </Badge>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={
                  unreadCount > 0 ? styles.unreadLastMsg : styles.chatLastMsg
                }
                numberOfLines={1}
              >
                {item.lastSenderId === currentUser.id
                  ? "Bạn: " + item.lastMessage
                  : item.lastMessage}
              </Text>
              <Text style={styles.chatTime}>
                {item.lastMessageTime &&
                  " - " +
                    formatDistanceToNow(item.lastMessageTime.toDate(), {
                      addSuffix: true,
                      locale: vi,
                    })}
              </Text>
            </View>
          </View>
          {unreadCount > 0 && (
            <Badge
              size={20}
              style={{
                backgroundColor: "red",
                paddingHorizontal: 7,
              }}
            >
              <Text style={styles.unreadText}>{unreadCount}</Text>
            </Badge>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  btn1: {
    backgroundColor: color.primary,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  chatItem: {
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    width: "100%",
    flex: 1,
  },
  unreadTitle: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
  unreadLastMsg: {
    color: "#555",
    marginTop: 4,
    fontWeight: "bold",
    color: "black",
  },
  chatTitle: { fontSize: 16 },
  chatLastMsg: { color: "#555", marginTop: 4, maxWidth: "70%" },
  chatTime: { color: "#555", marginTop: 4 },
  unreadBadge: {
    backgroundColor: color.primary,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    position: "absolute",
    right: 10,
    top: 10,
  },
  unreadText: {
    color: "white",
    fontWeight: "bold",
  },
  chatStatus: {
    color: color.primary,
    fontWeight: "bold",
    marginLeft: 10,
    fontSize: 16,
  },
});
