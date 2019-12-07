

const board = new Board(boardSpace, editSpace)
// board.addNote(new Note("first note", "to jest description pierwszej notatki", {position: {x: 100, y:100}, color: [255, 200,200], zIndex: 0}))
// board.addNote(new Note("first note", "to jest description pierwszej notatki", {position: {x: 300, y:300}, color: [200, 255,200], zIndex: 0}))
// board.addNote(new Note("first note", "to jest description pierwszej notatki", {position: {x: 500, y:500}, color: [200, 0, 255], zIndex: 0}))
// board.addNote(new Note("first note", "to jest description pierwszej notatki"))
// board.saveNotes()
board.loadNotes()
board.display()