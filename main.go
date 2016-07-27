package main

import (
  "log"
  "net/http"

  "github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader {
  CheckOrigin: func(r *http.Request) bool {
    return true
  },
}

func echo(w http.ResponseWriter, r *http.Request) {
  conn, err := upgrader.Upgrade(w, r, nil)
  if err != nil {
    log.Println("Error during upgrade:", err)
    return
  }
  defer conn.Close()

  messageType, message, err := conn.ReadMessage()
  if err != nil {
      return
  }
  log.Printf("New message: %s", message)
  conn.WriteMessage(messageType, message)
}

func main() {
  http.HandleFunc("/", echo)
  http.ListenAndServe(":8888", nil)
}
