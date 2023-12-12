import Tour from '../models/tourModel.js';
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";


//GET ALL TOURS

export const getAllTours = catchAsync(async (req, res, next) => {
    const tours = await Tour.find();
    res.status(200).json({
        status: "success",
        results: tours.length,
        data: {
            tours,
        },
    });
});


//GET A TOUR

export const getTour = catchAsync(async (req, res, next) => {
    const tour = await Tour.findById(req.params.id);
    if (!tour) {
        return next(new AppError("No tour found with that ID", 404));
    }
    res.status(200).json({
        status: "success",
        data: {
            tour,
        },
    });
})


//CREATE A TOUR

export const createTour = catchAsync(async (req, res, next) => {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
        status: "success",
        data: {
            tour: newTour,
        },
    });
})


//UPDATE A TOUR

export const updateTour = catchAsync(async (req, res, next) => {
  const tour=await Tour.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
    runValidators:true
  })
    if(!tour){
        return next(new AppError("No tour found with that ID",404));
    }

})

//DELETE A TOUR

export const deleteTour = catchAsync(async (req, res, next) => {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    if (!tour) {
        return next(new AppError("No tour found with that ID", 404));
    }
    res.status(204).json({
        status: "success",
        data: null,
    });
});







