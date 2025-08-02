import Note from '../models/Note.js';

export async function getNotes(_, res) {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.status(200).json(notes);
    }
    catch (err) {
        console.error("Error fetching notes:", err);
        res.status(500).json({ message: 'Error fetching notes', error: err.message });
    }
}

export async function getNoteById(req, res) {
    try{
        const note = await Note.findById(req.params.id);
        if(!note) res.status(404).json({ message: 'Note not found' });
        res.json(note)
    }
    catch(err){
        console.error("Error fetching note by ID:", err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export async function createNote(req, res) {
    try {
        const { title, content } = req.body;
        const note = new Note({ title, content })

        const savedNote = await note.save();
        res.status(201).json(savedNote);
    }
    catch (err) {
        console.error("Error creating note:", err);
        res.status(500).json({ message: 'Error creating note', error: err.message });
    }
}

export async function updateNote(req, res) {
    try {
        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { title, content },
            {
                new: true
            }
        )
        if (!updatedNote) return res.status(404).json({ message: 'Note not found' });

        res.status(200).json(updatedNote);
    }
    catch (err) {
        console.log("Error updating note:", err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function deleteNote(req, res) {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) return res.status(404).json({ message: 'Note not found' });
        res.json({ message: 'Note deleted successfully' });
        res.status(200).json({ message: 'Note deleted successfully' });
    }
    catch (err) {
        console.log("Error deleting note:", err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

