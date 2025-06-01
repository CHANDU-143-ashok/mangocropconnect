import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Upload, CheckCircle } from 'lucide-react';

const SellerUploadPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    variety: '',
    quantity: '',
    location: '',
    harvestDate: '',
    description: '',
    sellerName: user ? user.name : '',
    sellerPhone: user ? user.phone : '',
    images: [] as File[],
    farmingMethod: '',
    qualityGrade: '',
    priceRangeMin: '',
    priceRangeMax: '',
  });
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const varietyOptions = [
    'Alphonso', 'Banganapalli', 'Kesar', 'Dasheri', 
    'Langra', 'Chaunsa', 'Totapuri', 'Neelam',
    'Mallika', 'Amrapali', 'Himsagar', 'Safeda',
    'Badami', 'Raspuri', 'Other'
  ];

  const qualityGradeOptions = ['A+', 'A', 'B', 'C'];
  const farmingMethodOptions = ['Organic', 'Traditional', 'Mixed'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages = Array.from(files);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages].slice(0, 5), // Limit to 5 images
    }));

    // Create preview URLs for the images
    const newPreviewUrls: string[] = [];
    newImages.forEach(file => {
      const url = URL.createObjectURL(file);
      newPreviewUrls.push(url);
    });
    
    setPreviewUrls(prev => [...prev, ...newPreviewUrls].slice(0, 5));
  };

  const removeImage = (index: number) => {
    setFormData(prev => {
      const newImages = [...prev.images];
      newImages.splice(index, 1);
      return { ...prev, images: newImages };
    });

    setPreviewUrls(prev => {
      const newUrls = [...prev];
      URL.revokeObjectURL(newUrls[index]); // Clean up the URL object
      newUrls.splice(index, 1);
      return newUrls;
    });
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.variety) errors.variety = 'Mango variety is required';
    if (!formData.quantity) errors.quantity = 'Quantity is required';
    else if (isNaN(Number(formData.quantity)) || Number(formData.quantity) <= 0)
      errors.quantity = 'Please enter a valid quantity';
      
    if (!formData.location) errors.location = 'Location is required';
    if (!formData.harvestDate) errors.harvestDate = 'Harvest date is required';
    if (!formData.sellerName) errors.sellerName = 'Your name is required';
    if (!formData.sellerPhone) errors.sellerPhone = 'Contact number is required';
    else if (!/^[0-9]{10}$/.test(formData.sellerPhone))
      errors.sellerPhone = 'Please enter a valid 10-digit mobile number';
      
    if (formData.priceRangeMin && formData.priceRangeMax) {
      if (Number(formData.priceRangeMin) > Number(formData.priceRangeMax)) {
        errors.priceRangeMin = 'Minimum price should be less than maximum price';
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // This would be an actual API call in a real application
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitSuccess(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        navigate('/listings');
      }, 2000);
    } catch (error) {
      console.error('Error submitting listing:', error);
      setFormErrors({
        submit: 'There was an error submitting your listing. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="inline-flex items-center justify-center p-2 bg-green-100 rounded-full mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Listing Submitted Successfully!</h2>
          <p className="text-lg text-gray-600 mb-8">
            Your mango crop listing has been submitted for review. Our team will verify it shortly.
          </p>
          <button
            onClick={() => navigate('/listings')}
            className="btn btn-primary"
          >
            View All Listings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold mb-2">Sell Your Mango Crop</h1>
      <p className="text-gray-600 mb-8">Fill out the form below to list your mango crop for potential buyers</p>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-8">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Mango Variety */}
              <div>
                <label htmlFor="variety" className="block text-sm font-medium text-gray-700 mb-1">
                  Mango Variety*
                </label>
                <select
                  id="variety"
                  name="variety"
                  value={formData.variety}
                  onChange={handleInputChange}
                  className={`input ${formErrors.variety ? 'border-red-500' : ''}`}
                  required
                >
                  <option value="">Select Variety</option>
                  {varietyOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                {formErrors.variety && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.variety}</p>
                )}
              </div>

              {/* Quantity */}
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity (kg)*
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  placeholder="e.g., 500"
                  className={`input ${formErrors.quantity ? 'border-red-500' : ''}`}
                  min="1"
                  required
                />
                {formErrors.quantity && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.quantity}</p>
                )}
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location (Village/Taluk)*
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., Ratnagiri, Maharashtra"
                  className={`input ${formErrors.location ? 'border-red-500' : ''}`}
                  required
                />
                {formErrors.location && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.location}</p>
                )}
              </div>

              {/* Harvest Date */}
              <div>
                <label htmlFor="harvestDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Harvest Date*
                </label>
                <input
                  type="date"
                  id="harvestDate"
                  name="harvestDate"
                  value={formData.harvestDate}
                  onChange={handleInputChange}
                  className={`input ${formErrors.harvestDate ? 'border-red-500' : ''}`}
                  required
                />
                {formErrors.harvestDate && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.harvestDate}</p>
                )}
              </div>

              {/* Seller Name */}
              <div>
                <label htmlFor="sellerName" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name*
                </label>
                <input
                  type="text"
                  id="sellerName"
                  name="sellerName"
                  value={formData.sellerName}
                  onChange={handleInputChange}
                  placeholder="e.g., Rajesh Patel"
                  className={`input ${formErrors.sellerName ? 'border-red-500' : ''}`}
                  required
                />
                {formErrors.sellerName && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.sellerName}</p>
                )}
              </div>

              {/* Seller Phone */}
              <div>
                <label htmlFor="sellerPhone" className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Number*
                </label>
                <input
                  type="tel"
                  id="sellerPhone"
                  name="sellerPhone"
                  value={formData.sellerPhone}
                  onChange={handleInputChange}
                  placeholder="e.g., 9876543210"
                  className={`input ${formErrors.sellerPhone ? 'border-red-500' : ''}`}
                  required
                />
                {formErrors.sellerPhone && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.sellerPhone}</p>
                )}
              </div>

              {/* Quality Grade */}
              <div>
                <label htmlFor="qualityGrade" className="block text-sm font-medium text-gray-700 mb-1">
                  Quality Grade
                </label>
                <select
                  id="qualityGrade"
                  name="qualityGrade"
                  value={formData.qualityGrade}
                  onChange={handleInputChange}
                  className="input"
                >
                  <option value="">Select Grade</option>
                  {qualityGradeOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              {/* Farming Method */}
              <div>
                <label htmlFor="farmingMethod" className="block text-sm font-medium text-gray-700 mb-1">
                  Farming Method
                </label>
                <select
                  id="farmingMethod"
                  name="farmingMethod"
                  value={formData.farmingMethod}
                  onChange={handleInputChange}
                  className="input"
                >
                  <option value="">Select Method</option>
                  {farmingMethodOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price Range (₹ per kg)
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="number"
                      id="priceRangeMin"
                      name="priceRangeMin"
                      value={formData.priceRangeMin}
                      onChange={handleInputChange}
                      placeholder="Min"
                      className={`input ${formErrors.priceRangeMin ? 'border-red-500' : ''}`}
                      min="0"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      id="priceRangeMax"
                      name="priceRangeMax"
                      value={formData.priceRangeMax}
                      onChange={handleInputChange}
                      placeholder="Max"
                      className="input"
                      min="0"
                    />
                  </div>
                </div>
                {formErrors.priceRangeMin && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.priceRangeMin}</p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                placeholder="Describe your mango crop, including any special qualities or characteristics..."
                className="input"
              ></textarea>
            </div>

            {/* Image Upload */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Images (up to 5)
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="images"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-orange-500 hover:text-orange-600 focus-within:outline-none"
                    >
                      <span>Upload images</span>
                      <input
                        id="images"
                        name="images"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        disabled={formData.images.length >= 5}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5 MB each</p>
                </div>
              </div>

              {/* Image Previews */}
              {previewUrls.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {previewUrls.map((url, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={url}
                        alt={`Preview ${index + 1}`}
                        className="h-24 w-full object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Error */}
            {formErrors.submit && (
              <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
                {formErrors.submit}
              </div>
            )}

            {/* Terms and Conditions */}
            <div className="mb-6">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    className="focus:ring-orange-500 h-4 w-4 text-orange-600 border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-medium text-gray-700">
                    I agree to the <a href="#" className="text-orange-500 hover:text-orange-600">Terms and Conditions</a>
                  </label>
                  <p className="text-gray-500">
                    Your listing will be reviewed by our team before it appears on the platform.
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className={`btn btn-primary px-8 py-3 flex items-center ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Submit Listing'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellerUploadPage;