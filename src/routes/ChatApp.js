import React, { useRef, useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth, firestore } from "../components/firebase.config";
import firebase from "firebase/compat/app";
import Chat from "../assets/chat.webp";
import ChatRoom from "../components/ChatRoom";
import SignOut from "../components/SignOut";
import SignIn from "../components/SignIn";

const ChatApp = () => {
  const [user] = useAuthState(auth);

  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState([]);
  const [otherUser, setOtherUser] = useState(null);
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);
  const [messages] = useCollectionData(query, { idField: "id" });
  const handleTyping = (e) => {
    const value = e.target.value;
    setIsTyping(value !== "");
    updateTypingStatus(value !== "");
  };

  useEffect(() => {
    const unsubscribe = firestore
      .collection("typingStatus")
      .onSnapshot((snapshot) => {
        const users = snapshot.docs
          .filter(
            (doc) =>
              doc.id !== auth.currentUser?.displayName && doc.data().isTyping
          )
          .map((doc) => doc.id);
        setTypingUsers(users);
      });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const usersRef = firestore.collection("users");
    const otherUserRef = usersRef.doc(typingUsers[0]);
    otherUserRef.get().then((doc) => {
      if (doc?.exists) {
        setOtherUser(doc?.data().name);
      }
    });
  }, []);

  const updateTypingStatus = (isTyping) => {
    const typingRef = firestore
      .collection("typingStatus")
      .doc(auth.currentUser.displayName);
    if (isTyping) {
      typingRef.set({ isTyping: true });
    } else {
      typingRef.delete();
    }
  };

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <div className="App">
      <header>
        <img className="logo" src={Chat} alt="chat" />
        {user && <p> {user.displayName}</p>}
        {typingUsers.length > 0 && (
          <p>
            {typingUsers.slice(1, 100).join(", ")}{" "}
            {typingUsers.length === 1 ? "" : " typing..."}
          </p>
        )}
        <SignOut auth={auth} />
      </header>
      <section>
        {user ? (
          <ChatRoom
            user={user}
            setIsTyping={setIsTyping}
            handleTyping={handleTyping}
          />
        ) : (
          <>
            <SignIn signInWithGoogle={signInWithGoogle} />
          </>
        )}
      </section>
    </div>
  );
};

export default ChatApp;
