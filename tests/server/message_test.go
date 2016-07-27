package weenture_test

import (
  "testing"
  "server/message"
  "github.com/stretchr/testify/assert"
)

func TestParseMessage(t *testing.T) {
  ms := ParseMessage("1goenning")
  assert.Equal(t, ms.messageType, 1)
}
