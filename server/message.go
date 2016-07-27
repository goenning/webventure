package weenture

type Message struct {
    messageType int
}

type NewCharacterMessage struct {
    Message
}

func ParseMessage(content String) Message {
  var ms := Message(1)
  return ms
}
