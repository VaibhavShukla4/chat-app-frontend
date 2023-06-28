import React, { useState, useEffect } from "react";

const ChatMessage = ({ auth, message, user }) => {
  const { text, uid, photoURL, createdAt } = message;
  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  const timestamp = createdAt ? createdAt.toDate() : null;

  const formattedDate = timestamp
    ? new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(timestamp)
    : "";

  const formattedTime = timestamp
    ? timestamp.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })
    : "";

  const [displayDate, setDisplayDate] = useState(false);

  useEffect(() => {
    const previousMessage = user?.previousMessage;
    if (previousMessage) {
      const previousTimestamp = previousMessage.createdAt.toDate();
      const currentTimestamp = timestamp.toDate();
      const isSameDay =
        previousTimestamp.toDateString() === currentTimestamp.toDateString();
      setDisplayDate(!isSameDay);
    } else {
      setDisplayDate(true);
    }
  }, [timestamp, user]);
  console.log(typeof formattedDate);
  return (
    <>
      {displayDate && (
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <span style={{ color: "white", fontSize: "12px" }}>
            {formattedDate}
          </span>
        </div>
      )}
      <div className={`message ${messageClass}`}>
        <img
          src={
            photoURL || "https://api.adorable.io/avatars/23/abott@adorable.png"
          }
          alt="User Avatar"
        />
        <p>{text}</p>&nbsp;
        <span style={{ color: "white", fontSize: "12px" }}>
          {formattedTime}
        </span>
      </div>
    </>
  );
};

export default ChatMessage;
