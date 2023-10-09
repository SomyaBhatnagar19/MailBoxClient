import React, { useState } from "react";
import { Container, Card, Button, Form } from "react-bootstrap";
import { RiSearch2Line, RiStarFill, RiStarLine } from "react-icons/ri";
import { FaTrash, FaCheckSquare } from 'react-icons/fa';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toggleMessageDetail } from "../Store/dataStore";
import { toggleStarred } from "../Store/dataStore";
import InboxMessagesDetail from "./InboxMessagesDetail";

const Inbox = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [starredMessages, setStarredMessages] = useState([]);

  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const isMessageDetailOpen = useSelector((state) => state.dataStore.isMessageDetailOpen);


  //using redux
  const dispatch = useDispatch();
  const inbox = useSelector((state)=>state.dataStore.inboxMessages);

  const handleListItemClick = (messageId) => {
    setSelectedMessageId(messageId);
    dispatch(toggleMessageDetail());
  };

  const toggleMessageSelection = (messageId) => {
    const updatedSelection = selectedMessages.includes(messageId)
      ? selectedMessages.filter((id) => id !== messageId)
      : [...selectedMessages, messageId];
    setSelectedMessages(updatedSelection);
  };

  const toggleStar = (messageId, event) => {
    event.stopPropagation();
    // Dispatch the action to toggle message starred status
    dispatch(toggleStarred(messageId));
  };

  const handleDeleteMessage = (messageId) => {
    // Dispatch the action to delete the message
    dispatch(deleteMessage(messageId));
  };

  const preventListGroupClick = (event) => {
    event.stopPropagation();
  };

  // const toggleMessageStar = (messageId) => {
  //   const isStarred = starredMessages.includes(messageId);
  //   if (isStarred) {
  //     setStarredMessages(starredMessages.filter((id) => id !== messageId));
  //   } else {
  //     setStarredMessages([...starredMessages, messageId]);
  //   }
  // };

  const filteredMessages = inbox.filter((message) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      message.from.toLowerCase().includes(searchTerm) ||
      message.subject.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <>
      <div
        style={{
          backgroundColor: "#674ea7",
          boxShadow: "0 2px 9px rgba(0, 0, 0, 0.15)",
          padding: "0.4rem",
        }}
      >
        <Form.Group controlId="search" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <div style={{ position: 'relative', width: '300px' }}>
    <Form.Control
      type="text"
      placeholder="Search messages"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      style={{
        backgroundColor: 'white',
        border: '1px solid #ccc',
        borderRadius: '5px',
        paddingRight: '2em',
        width: '100%',
      }}
    />
    <div
      style={{
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        right: '10px',
      }}
    >
      <RiSearch2Line style={{ fontSize: '1.2em', color: '#888' }} />
    </div>
  </div>

  <div style={{ display: 'flex', alignItems: 'center' }}>
  <div 
  style={{ 
    backgroundColor: '#d32213', 
    borderRadius: '50%', 
    padding: '5px', 
    marginRight: '40px', 
    boxShadow: '0px 4px 7px', 
    cursor: 'pointer' 
  }}
  onClick={(event) => {
    event.stopPropagation();
    handleDeleteMessage(message.id);
  }}
>
  <FaTrash style={{ fontSize: '1.5em', color: 'black' }} />
</div>
    <div style={{ backgroundColor: '#00d062', borderRadius: '50%', padding: '5px', boxShadow: '0px 4px 7px' }}>
    <FaCheckSquare style={{ fontSize: '1.5em', cursor: 'pointer' }} />
    
    </div>
  </div>
</Form.Group>

      </div>

      <Container>
      {selectedMessageId && isMessageDetailOpen && (
        <InboxMessagesDetail messageId={selectedMessageId} />
      )}
        {!isMessageDetailOpen && filteredMessages.map((message) => (
          <div 
            key={message.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyItems: "space-around",
              padding: "10px",
              borderBottom: "1px solid #ccc",
            }}
            onClick={() => handleListItemClick(message.id)}
          >
            {/* Checkbox for selection */}
            <input
              type="checkbox"
              checked={selectedMessages.includes(message.id)}
              onChange={() => toggleMessageSelection(message.id)}
              style={{ marginRight: "10px" }}
            />

            {/* Star icon for marking as starred */}
            <div style={{ marginRight: "2rem", marginLeft: "2rem" }}  onClick={(event) => toggleStar(message.id, event)}>
              {message.starred ? (
                <RiStarLine
                style={{ cursor: "pointer" }}
              />
              ) : (
                <RiStarFill
                  style={{ cursor: "pointer", color: "gold" }}
                />
                
              )}
            </div>

            <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ fontWeight: "bold", textAlign: "center" }}>
          {message.from}
        </div>
        <div style={{ textAlign: "center" }}>{message.subject}</div>
        <div style={{ textAlign: "right" }}>{message.date}</div>
      </div>
          </div>
        ))}
      </Container>
    </>
  );
};

export default Inbox;
