import mongoose, { Schema, models } from "mongoose";

const ProgressSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    completedScenes: {
      type: [Number],
      default: [],
    },

    quizScore: {
      type: Number,
      default: 0,
    },

    quizCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Progress =
  models.Progress || mongoose.model("Progress", ProgressSchema);

export default Progress;