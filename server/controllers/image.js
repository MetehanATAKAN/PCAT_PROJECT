import express, { json } from 'express';
import Images from '../models/Images.js';
import { ObjectId } from 'mongodb';

export const getImages = async (req, res, next) => {
    try {
        const images = await Images.find({});
        res.status(200).json(images);
    } catch (error) {
        next(error);
    }
}

export const addImage = async (req, res, next) => {
    
    if (!req.file) {
        return res.status(400).json({error:'No files were uploaded.'});
    }
    const includesPhotos = await Images.findOne({title:req.body.title});
    
    if(includesPhotos) {
        return res.status(409).json({error:'There is data belonging to the same header.'})
    }
    const { title, description } = req.body;
    const image = req.file.filename;

    try {
        const newImage = new Images({ title, description, image });
        const savedImage = await newImage.save();
        res.status(201).json(savedImage);
    } catch (error) {
        next(error);
    }
}

export const getImage = async (req,res,next) => {
    const id = req.params.id;
    // const image = await Images.find({_id:id});
    // console.log(image);
    try {
        const image = await Images.find({_id:id});
        res.status(200).json(image[0]);
    } catch (error) {
        next(error);
    }
}

export const deleteImage = async (req,res,next) => {
    
    const id =new ObjectId(req.params.id) ;
   
    try {
        await Images.deleteOne({ _id: id });
        res.status(200).json('Image has been deleted.')
    } catch (error) {
        next(error);
    }
}

export const updateImage = async (req, res, next) => {
    console.log(req.file);

    if (!req.file) {
        return res.status(400).json({ error: 'No files were uploaded.' });
    }
    const { title, description } = req.body;
    const includesPhotos = await Images.findOne({ title: title });
    const image = req.file.filename;

    const id =new ObjectId(req.params.id) ;
    console.log(id);
    if (includesPhotos) {
        return res.status(409).json({ error: 'There is data belonging to the same header.' })
    }
    try {
        await Images.updateOne({_id:id},{$set :{title:title,description:description,image:image}});
        res.status(201).json({data:'Update Success'})
    } catch (error) {
        next(error);
    }
}