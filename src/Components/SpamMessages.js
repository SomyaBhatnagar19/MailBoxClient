import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
// import { spamMessages } from "../Store/dataStore";

const SpamMessages = () => {
  const spam = useSelector((state)=>state.dataStore.spamMessages);

  return (
    <Container>
       
      {spam.map((message) => (
        
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

export default SpamMessages;
