module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      title: String,
      author: String,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Wish = mongoose.model("wish", schema);
  return Wish;
};
