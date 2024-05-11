import mongoose from "mongoose"

const contactShema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  // owner: {
  //   type: Schema.Types.ObjectId,
  //   ref: "user",
  // },
})
export default mongoose.model("Contact", contactShema)