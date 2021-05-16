const mongoose = require('mongoose');

const commonUtils = require('../utils/common');
const NotesModel = require('../model/notes.model');

const notesController = {};

notesController.add = async (req, res) => {
  try {
    await NotesModel.create(req.body);
    return res.status(200).json({ message: 'Notes added successfully.' });
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

notesController.update = async (req, res) => {
  try {
    let { notesId } = req.body
    notesId = mongoose.Types.ObjectId(notesId);
    await NotesModel.findOneAndUpdate({ _id: notesId }, { $set: req.body });
    return res.status(200).json({ message: 'Notes updated successfully.' });
  } catch (err) {
    return res.status(400).json(err);
  }
};

notesController.remove = async (req, res) => {
  try {
    let { notesId } = req.params;
    notesId = mongoose.Types.ObjectId(notesId);
    await NotesModel.findOneAndRemove({ _id: notesId });
    return res.status(200).json({ message: 'Notes remove successfully.' });
  } catch (err) {
    return res.status(400).json(err);
  }
};

function pagination(page = 1, limit = 10) {
  const skipLimitQuery = {
    limit: +limit,
  };
  if (Number(+page) >= 1) {
    skipLimitQuery.skip = skipLimitQuery.limit * page - skipLimitQuery.limit;
  } else {
    skipLimitQuery.skip = 0;
  }
  return skipLimitQuery;
}



notesController.getAll = async (req, res) => {
  try {
    skipLimitQuery = pagination(req.query && req.query.page || 1, req.query && req.query.limit || 10);

    const [allNotes, count] = await Promise.all([
      NotesModel.find({})
        .skip(skipLimitQuery.skip)
        .limit(skipLimitQuery.limit),
      NotesModel.count({})
    ])
    return res.status(200).json({data:allNotes, count });
  } catch (err) {
    return res.status(400).json(err);
  }
};


module.exports = notesController;
