const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String, 
  ingredientes: [String] 
});
