import React from "react";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";

const StarredMessages = () => {
  const starred = useSelector((state) => state.starredMessages);
  return (
    <Container>
       
      {starred.map((message) => (
        
        <div key={message.id}>
             <div
         style={{
           display: "flex",
           justifyContent: "space-between",
           alignItems: "center",
           borderBottom: "1px solid #ccc",
           padding: "10px",
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
    
  );
};

export default StarredMessages;
