package schema

import (
	"io"
	"os"
)

type Command struct {
	Stdin  io.Reader
	Stdout io.Writer
	Stderr io.Writer
}

// NewCommand returns a new instance of Command.
func NewCommand() *Command {
	return &Command{
		Stdin:  os.Stdin,
		Stdout: os.Stdout,
		Stderr: os.Stderr,
	}
}

func (cmd *Command) Run(args []string) (err error) {
	return nil
}
