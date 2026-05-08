const AppError = require("../Middlewares/appError");
const services = require("../Models/service");
const {
  Types: {
    ObjectId: { createFromHexString },
  },
} = require("mongoose");
const uploadImage = require("../Utils/uploadImage");

async function GetServices(req, res) {
  try {
    const allServices = await services.find();
    return res.json({
      success: true,
      message: "Retrieved all services",
      data: allServices,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
}

async function AddService(req, res, next) {
  try {
    const { service_name, service_type, service_description } = req.body;
    const service_images = req.files;
    const service = await services.findOne({
      service_name: service_name.toLowerCase(),
      service_type: service_type.toLowerCase(),
    });

    console.log("service from add service handler:", service);

    if (service === null) {
      const serviceImagesPromises = service_images.map((serviceImage) =>
         uploadImage(serviceImage.buffer),
      );

      const serviceImages = await Promise.all(serviceImagesPromises);

      const newService = await new services({
        service_name: service_name.toLowerCase(),
        service_type: service_type.toLowerCase(),
        service_description,
        service_images: serviceImages,
      }).save();

      console.log("new service:", newService);

      res.json({
        success: true,
        message: "service added",
        service: newService,
      });
    } else {
      throw new AppError(403, "service is already exist");
    }
  } catch (error) {
    console.log(error);
    return next(error);
  }
}

async function UpdateService(req, res, next) {
  try {
    const {
      _id,
      service_name,
      service_type,
      service_description,
      old_service_images,
    } = req.body;
    const serviceImagesFromMulter = req.files;
    if (_id === "") {
      throw new AppError(400, "id can't be empty");
    }
    const serviceMongoId = createFromHexString(_id);
    const service = await services.findById(serviceMongoId);

    console.log("service from update service handler:", service);

    if (service !== null) {
      let serviceImagesFromCloudinary = [];
      if (serviceImagesFromMulter) {
        serviceImagesPromises = serviceImagesFromMulter.map((serviceImage) =>
          uploadImage(serviceImage.buffer),
        );

        serviceImagesFromCloudinary = await Promise.all(serviceImagesPromises);
      }

      const updateService = await services.findByIdAndUpdate(
        { _id: serviceMongoId },
        {
          service_name: service_name.toLowerCase(),
          service_type: service_type.toLowerCase(),
          service_description,
          service_images: [
            ...old_service_images,
            ...serviceImagesFromCloudinary,
          ],
        },
        {
          new: true,
        },
      );

      console.log("updated service service:", updateService);

      res.json({
        success: true,
        message: "service updated",
        service: updateService,
      });
    } else {
      throw new AppError(403, "couldn't find service, check it");
    }
  } catch (error) {
    console.log(error);
    return next(error);
  }
}

async function DeleteService(req, res, next) {
  try {
    const { id } = req.params;
    console.log(id);

    if (id === "") {
      throw new AppError(400, "id can't be empty");
    }
    const serviceMongoId = createFromHexString(id);

    const service = await services.findById(serviceMongoId);

    console.log("service from delete service handler:", service);

    if (service !== null) {
      await services.findByIdAndDelete({ _id: serviceMongoId });

      console.log("deleted service:", service);

      res.json({
        success: true,
        message: "service deleted",
      });
    } else {
      throw new AppError(403, "couldn't find service, check it");
    }
  } catch (error) {
    console.log(error);
    return next(error);
  }
}

module.exports = { GetServices, AddService, UpdateService, DeleteService };
