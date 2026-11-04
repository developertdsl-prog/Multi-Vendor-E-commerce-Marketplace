const asyncHandler = require('express-async-handler');
const Vendor = require('../models/Vendor');
const User = require('../models/User');
const { validationResult } = require('express-validator');

const registerVendor = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error(errors.array()[0].msg);
  }

  const {
    storeName,
    storeDescription,
    contactEmail,
    contactPhone,
    address,
  } = req.body;

  const vendorExists = await Vendor.findOne({ user: req.user.id });
  if (vendorExists) {
    res.status(400);
    throw new Error('Vendor profile already exists for this user');
  }

  const user = await User.findById(req.user.id);
  if (!user || user.role !== 'vendor') {
    res.status(403);
    throw new Error('Only users with vendor role can create a vendor profile');
  }

  const vendor = await Vendor.create({
    user: req.user.id,
    storeName,
    storeDescription,
    contactEmail,
    contactPhone,
    address,
    approvalStatus: 'pending',
    isActive: false,
  });

  user.isActive = false;
  await user.save();

  res.status(201).json(vendor);
});

const getVendorProfile = asyncHandler(async (req, res) => {
  const vendor = await Vendor.findOne({ user: req.user.id }).populate(
    'user',
    'name email role'
  );
  if (vendor) {
    res.json(vendor);
  } else {
    res.status(404);
    throw new Error('Vendor profile not found');
  }
});

const updateVendorProfile = asyncHandler(async (req, res) => {
  const vendor = await Vendor.findOne({ user: req.user.id });
  if (!vendor) {
    res.status(404);
    throw new Error('Vendor profile not found');
  }

  const {
    storeName,
    storeDescription,
    contactEmail,
    contactPhone,
    address,
  } = req.body;

  vendor.storeName = storeName || vendor.storeName;
  vendor.storeDescription =
    storeDescription !== undefined ? storeDescription : vendor.storeDescription;
  vendor.contactEmail = contactEmail || vendor.contactEmail;
  vendor.contactPhone = contactPhone || vendor.contactPhone;
  vendor.address = address || vendor.address;

  const updatedVendor = await vendor.save();
  res.json(updatedVendor);
});

const getAllVendors = asyncHandler(async (req, res) => {
  const vendors = await Vendor.find().populate('user', 'name email role isActive');
  res.json(vendors);
});

const approveVendor = asyncHandler(async (req, res) => {
  const { approvalStatus } = req.body;

  if (!['approved', 'rejected'].includes(approvalStatus)) {
    res.status(400);
    throw new Error('Invalid approval status');
  }

  const vendor = await Vendor.findById(req.params.id).populate('user');
  if (!vendor) {
    res.status(404);
    throw new Error('Vendor not found');
  }

  vendor.approvalStatus = approvalStatus;
  vendor.isActive = approvalStatus === 'approved';
  await vendor.save();

  if (vendor.user) {
    vendor.user.isActive = approvalStatus === 'approved';
    await vendor.user.save();
  }

  res.json(vendor);
});

module.exports = {
  registerVendor,
  getVendorProfile,
  updateVendorProfile,
  getAllVendors,
  approveVendor,
};
