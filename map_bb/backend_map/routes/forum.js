const router = require('express').Router();
const Post   = require('../models/Post');

// GET /api/forum/posts — tous les posts, du plus récent au plus ancien
router.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});

// POST /api/forum/posts — créer un post (username requis dans le body)
router.post('/posts', async (req, res) => {
    const { username, title, content } = req.body;
    if (!username || !title || !content) {
        return res.status(400).json('username, title et content sont requis');
    }
    try {
        const post = new Post({ username, title, content });
        const saved = await post.save();
        res.status(200).json(saved);
    } catch (err) {
        res.status(500).json(err);
    }
});

// POST /api/forum/posts/:id/reply — ajouter une réponse
router.post('/posts/:id/reply', async (req, res) => {
    const { username, content } = req.body;
    if (!username || !content) {
        return res.status(400).json('username et content sont requis');
    }
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json('Post introuvable');
        post.replies.push({ username, content });
        const saved = await post.save();
        res.status(200).json(saved);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE /api/forum/posts/:id — supprimer son propre post
router.delete('/posts/:id', async (req, res) => {
    const { username } = req.body;
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json('Post introuvable');
        if (post.username !== username) return res.status(403).json('Non autorisé');
        await post.deleteOne();
        res.status(200).json('Post supprimé');
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
