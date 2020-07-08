const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({
  userfdb: {
    type: String,
    required: true,
  },
  taskname: {
    type: String,
    required: true,
  },
  tasktype: {
    type: String,
    required: true,
  },
  usertask: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Task', TaskSchema);
