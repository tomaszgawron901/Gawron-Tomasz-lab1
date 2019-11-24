const board = new Board()
board.addNote(new Note("first note", "to jest description pierwszej notatki", {x:500, y:500}, [255,200,200]))
board.addNote(new Note("first note", "to jest description pierwszej notatki", {x:300, y:300}, [200,255,200]))
board.display()