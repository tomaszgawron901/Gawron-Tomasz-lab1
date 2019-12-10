class NoteReminder
{
    constructor(divNote)
    {
        this.divNote = divNote
    }

    manageNotifications()
    {
        const miliSecondsInDay = 86400000
        if(this.divNote.note.reminder == null)
            return
        if(this.divNote.note.created == null)
            return
        let secBetween = (new Date(this.divNote.note.reminder) - new Date())
        if(secBetween< 0 )
        {
            this.divNote.note.reminder = null
            return          
        }
        if(secBetween/miliSecondsInDay>1)
            return
        this.displayReminderNotification(this.divNote)
        this.divNote.note.pinned = true
    }

    displayReminderNotification(dn)
    {
        if (Notification.permission !== 'denied' || Notification.permission === "default") {
            Notification.requestPermission(function (permission) {
              if (permission === "granted") {
                let notification = new Notification(dn.note.title, {body: dn.note.description+"\n"+new Date(dn.note.reminder).toLocaleDateString()});
                notification.onclick = ()=>{
                    if(board.dragging!=null)
                        board.dragging.dragingCancel()
                    if(board.editing!=null)
                        board.editing.exitEdition()
                    dn.edit()
                }
              }
            });
          }
    }

    onClick
}