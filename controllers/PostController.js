import PostModel from '../models/Post.js';

export const getLastTags = async (req,res) => { 
 try{
        const posts = await PostModel.find().limit(5).exec();

        const tags = posts.map((obj) => obj.tags).flat().slice(0, 5);
        res.json(tags);

    }catch(err){
        console.log(err);
       res.status(500).json({
           message: 'Couldnt access Tags',
       });
    }
};

export const getAll = async (req,res) => {
    try{
        const posts = await PostModel.find().populate('user').exec();
        res.json(posts);
    }catch(err){
        console.log(err);
       res.status(500).json({
           message: 'Couldnt access Posts',
       });
    }
};

export const getOne = async (req, res) => {
    try {
      const postId = req.params.id;
  
      PostModel.findOneAndUpdate(
        {
          _id: postId,
        },
        {
          $inc: { viewsCount: 1 },
        },
        {
          returnDocument: 'after',
        },
        (err, doc) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              message: 'Could Not return the Post',
            });
          }
  
          if (!doc) {
            return res.status(404).json({
              message: 'The Post was not Found',
            });
          }
  
          res.json(doc);
        },
      ).populate('user');
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'Could not access the Post',
      });
    }
  };

export const remove = async (req, res) => {
    try {
      const postId = req.params.id;
  
      PostModel.findOneAndDelete(
        {
          _id: postId,
        }, (err,doc) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                  message: 'Could Not delete the Post',
                });
            }

            if (!doc) {
                return res.status(404).json({
                  message: 'The Post was not Found',
                });
              }
      
             res.json({
                success:true,
             });

        });
        
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'Could not access the Post',
      });
    }
  };

export const create = async (req,res) => {
    try{
        const doc = new PostModel({
            title:req.body.title,
            text:req.body.text,
            imageUrl:req.body.imageUrl,
            tags: req.body.tags.split(','),
            user: req.userId,
        });

        const post = await doc.save();
        res.json(post);
    }catch(err){
        console.log(err);
       res.status(500).json({
           message: 'Couldnt create a Post',
       });
    }
};

export const update = async (req, res) => {
    try {
      const postId = req.params.id;
  
      await PostModel.updateOne(
        {
          _id: postId,
        },
        {
          title: req.body.title,
          text: req.body.text,
          imageUrl: req.body.imageUrl,
          user: req.userId,
          tags: req.body.tags.split(','),
        },
      );
  
      res.json({
        success: true,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'Не удалось обновить статью',
      });
    }
  };