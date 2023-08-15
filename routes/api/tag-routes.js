// Import necessary modules
const express = require('express');
const router = express.Router();
const db = require('../../models');

// Get all tags
router.get('/', (req, res) => {
  db.Tag.findAll({
    include: [db.Product] // Include associated Product data
  })
  .then((tagData) => {
    res.json(tagData);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Get a single tag by its ID
router.get('/:id', (req, res) => {
  db.Tag.findByPk(req.params.id, {
    include: [db.Product] // Include associated Product data
  })
  .then((tagData) => {
    if (!tagData) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }
    res.json(tagData);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Create a new tag
router.post('/', (req, res) => {
  db.Tag.create(req.body)
  .then((newTag) => {
    res.json(newTag);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Update a tag's name by its ID
router.put('/:id', (req, res) => {
  db.Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then((updatedTag) => {
    res.json(updatedTag);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Delete a tag by its ID
router.delete('/:id', (req, res) => {
  db.Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then((deletedTag) => {
    res.json(deletedTag);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
