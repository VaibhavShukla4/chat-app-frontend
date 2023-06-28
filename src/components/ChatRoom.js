import React, { useRef, useState } from "react";
import { auth, firestore } from "./firebase.config";
import firebase from "firebase/compat/app";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { AiOutlineSend } from "react-icons/ai";
import ChatMessage from "./ChatMessage";

const ChatRoom = ({ user, handleTyping, setIsTyping }) => {
  const dummy = useRef();
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });
  const [formValue, setFormValue] = useState("");
  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = user || {};

    if (formValue.trim() !== "") {
      await messagesRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL,
      });
    }

    setFormValue("");
    setIsTyping(false);
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  console.log(messagesRef);
  console.log(formValue);
  console.log(auth?.currentUser);

  return (
    <>
      <main>
        {messages &&
          messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} user={user} auth={auth} />
          ))}

        <span ref={dummy}></span>
      </main>

      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => {
            handleTyping(e);
            setFormValue(e.target.value);
          }}
          placeholder="Say something nice"
        />

        <button className="send-button" type="submit" disabled={!formValue}>
          <AiOutlineSend fontSize={60} />
        </button>
      </form>
    </>
  );
};

export default ChatRoom;
