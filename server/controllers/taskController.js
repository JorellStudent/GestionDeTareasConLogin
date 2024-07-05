const db = require('../db');

exports.getAllTasks = (req, res) => {
    db.query('SELECT * FROM tasks', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

exports.createTask = (req, res) => {
    const { title, description, status, due_date } = req.body;
    db.query(
        'INSERT INTO tasks (title, description, status, due_date) VALUES (?, ?, ?, ?)',
        [title, description, status, due_date],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({
                id: results.insertId,
                title,
                description,
                status,
                due_date
            });
        }
    );
};

exports.updateTask = (req, res) => {
    const { id } = req.params;
    const { title, description, status, due_date } = req.body;
    db.query(
        'UPDATE tasks SET title = ?, description = ?, status = ?, due_date = ? WHERE id = ?',
        [title, description, status, due_date, id],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ id, title, description, status, due_date });
        }
    );
};

exports.deleteTask = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM tasks WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(204).send();
    });
};
