const Company = require("../models/Company");

// ================= CREATE COMPANY =================
const createCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;

    console.log("Received Body:", req.body);

    // Validation
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Company name is required",
      });
    }

    // Check duplicate company
    const existingCompany = await Company.findOne({ name });

    console.log("Received Name:", name);
    console.log("Existing Company:", existingCompany);

    if (existingCompany) {
      return res.status(400).json({
        success: false,
        message: "Company already exists",
      });
    }

    // Create company
    const company = await Company.create({
      name,
      description,
      website,
      location,
      owner: req.user._id,
    });

    console.log("New Company Created:", company);

    return res.status(201).json({
      success: true,
      message: "Company created successfully",
      company,
    });

  } catch (error) {
    console.log("Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET MY COMPANIES =================
const getMyCompanies = async (req, res) => {
  try {

    const companies = await Company.find({
      owner: req.user._id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: companies.length,
      companies,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const getCompanyById = async (req, res) => {
  try {
   console.log("✅ getCompanyById Called");
console.log("ID:", req.params.id);

    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    return res.status(200).json({
      success: true,
      company,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateCompany = async (req, res) => {
  try {
    console.log("✅ updateCompany Called");
    console.log("ID:", req.params.id);
    console.log("Body:", req.body);

    const { id } = req.params;

    const {
      name,
      description,
      website,
      location,
      logo,
    } = req.body;

    const company = await Company.findById(id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    company.name = name || company.name;
    company.description = description || company.description;
    company.website = website || company.website;
    company.location = location || company.location;
    company.logo = logo || company.logo;

    await company.save();

    console.log("✅ Company Updated:", company);

    return res.status(200).json({
      success: true,
      message: "Company updated successfully",
      company,
    });

  } catch (error) {
    console.log("❌ Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createCompany,
  getMyCompanies,
  getCompanyById,
  updateCompany,
};