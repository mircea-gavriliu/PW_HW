const Product=require('../models/product.model')

exports.home=(req,res)=>{
    res.send("merge controllerul")
}

exports.about=(req,res)=>{
    res.send("merge about de pe controller")
}

exports.create=(req,res)=>{
    if(!req.body.name){
        return res.status(400).send({
            message: "Products must have a name"
        });
    }

    const product=new Product({
        name: req.body.name,
        image:req.body.image,
        price: req.body.price,
        description: req.body.description,
        quantity: req.body.quantity,
        category: req.body.category
    });

    product.save()
    .then(data => {
        res.status(204).send('Product was inserted succesfully');
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the product."
        });
    });
}

exports.getAll = async (req, res) => {
    const { page = 1, limit = 9 } = req.query;
    try {
      const products = await Product.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
      const count = await Product.countDocuments();
      res.json({
        products: products,
        totalPages: Math.ceil(count / limit),
        currentPage: page
      });
    } catch (err) {
      console.error(err.message);
    }
};

exports.search = async (req, res) => {
    const { page = 1, limit = 9, word="" } = req.query;
    try {
      const products = await Product.find({ name: { $regex: word, $options: "i" }})
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
      const count = await Product.countDocuments({ name: { $regex: word, $options: "i" }});
      res.json({
        products: products,
        totalPages: Math.ceil(count / limit),
        currentPage: page
      });
    } catch (err) {
      console.error(err.message);
    }
};

exports.getById = (req, res) => {
    Product.findById(req.params.productId)
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });            
        }
        res.send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving product with id " + req.params.productId
        });
    });
};


exports.update=(req, res) => {


    Product. findOneAndUpdate({_id: req.params.productId}, {
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        description: req.body.description,
        quantity: req.body.quantity,
        category: req.body.category
    }).then(()=>{
        res.status(204).send('Product was edit succesfully');
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });                
        }
        return res.status(500).send({
            message: "Error editing product with id " + req.params.productId
        });
    });

}

exports.getByCategory = async (req, res) => {
    const { page = 1, limit = 9 } = req.query;
    try {
        const products = await Product.find({category:req.params.category})
          .limit(limit * 1)
          .skip((page - 1) * limit)
          .exec();
        const count = await Product.countDocuments({category:req.params.category});
        res.json({
          products: products,
          totalPages: Math.ceil(count / limit),
          currentPage: page
        });
      } catch (err) {
        console.error(err.message);
      }
};

exports.delete = (req, res) => {
    Product.findByIdAndRemove(req.params.productId)
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.productId
            });
        }
        res.send({message: "Product deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });                
        }
        return res.status(500).send({
            message: "Could not delete product with id " + req.params.productId
        });
    });
};