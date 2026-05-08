const AppError = require("../../Middlewares/appError");
const EnquiryCollection = require("../../Models/enquiry");

async function getAllEnquiries(req, res, next) {
  try {
    const { page } = req.query;
    const allEnquiries = await EnquiryCollection.find(
      {},
      {},
      {
        skip: (Number(page) - 1) * 10,
        limit: 10,
      },
    );
    const totalEnquiries = await EnquiryCollection.countDocuments();
    return res.json({
      success: true,
      message: " all enquiries retrieved",
      enquiries: allEnquiries,
      totalEnquiries,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
}

async function updateEnquiry(req, res, next) {
  try {
    const { enquiry_id, status } = req.body;
    const enquiry = await EnquiryCollection.findOne({ enquiry_id });
    if (enquiry === null) {
      throw new AppError(404, "couldn't find enquiry");
    }

    const updatedEnquiry = await EnquiryCollection.findOneAndUpdate(
      {
        enquiry_id,
      },
      {
        status,
      },
      { new: true },
    );

    return res.json({
      message: `enquiry - ${enquiry_id}'s status updated to ${status}`,
      enquiry: updatedEnquiry,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
}

module.exports = { getAllEnquiries, updateEnquiry };
