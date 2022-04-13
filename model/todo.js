import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    todo: {
        type: String,
        require: true,
    },
    email_: {
        type: String,
        required: true,
    },
    done: {
        type: String,
        require: true,
    },
});

const todoModel = mongoose.model("todo", TodoSchema);

export { todoModel };