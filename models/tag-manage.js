const Tag = require("./Tag");

module.exports.getTags = async () => {
  try {
    return await Tag.find({}).select("-__v").lean();
  } catch (err) {
    throw err;
  }
};
module.exports.createTag = async (tagData) => {
  try {
    let newTag = new Tag(tagData);
    await newTag.save();
    return newTag._id;
  } catch (err) {
    throw err;
  }
};

module.exports.updateTag = async (_id, updateData) => {
  try {
    await Tag.findByIdAndUpdate(_id, updateData);
  } catch (err) {
    throw err;
  }
};

module.exports.deleteTag = async (_id) => {
  try {
    await Tag.findByIdAndDelete(_id);
  } catch (err) {
    throw err;
  }
};
