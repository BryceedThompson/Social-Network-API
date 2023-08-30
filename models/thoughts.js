const { Schema, Types, model} = require('mongoose');



const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    reactions: [reactionSchema],
},
{
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const reactionSchema = new Schema({
    username: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    reactionID: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
       },
    reactionBody: { type: String, required: true, maxlength: 280}
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
  );


thoughtSchema.virtual('reactionCount')
.get(function() {
    return this.reactions.length;
})

  // Initialize the Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;