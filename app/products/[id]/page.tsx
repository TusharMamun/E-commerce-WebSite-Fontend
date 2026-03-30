import Container from "@/Component/Container";
import CartPriceCal from "@/Component/SheardComponent/CartPriceCal";
import ProductImage from "@/Component/SheardComponent/ProductImage";
import { getData } from "@/Helpers";
import { 
  FaEye, 
  FaBox, 
  FaTruck, 
  FaShieldAlt, 
  FaUndo, 
  FaTag,
  FaWeightHanging,
  FaQrcode,
  FaCalendarAlt,
  FaUser,
  FaEnvelope,
  FaStar,
  FaWallet,
  FaShoppingCart
} from "react-icons/fa";
import { MdStar, MdStarHalf } from "react-icons/md";
import { format } from "date-fns";
import AddToCartBtn from "@/Component/SheardComponent/AddToCartBtn";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const ProductDetails = async ({ params }: Props) => {
  const { id} = await params;
console.log(typeof(id))
 
  const endpoint = `http://localhost:5000/api/v1/products/${id}`;
  const response = await getData(endpoint);
  const productdata = response.data;

  // Helper function for star rating
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return [...Array(5)].map((_, i) => {
      const starNumber = i + 1;
      
      if (starNumber <= fullStars) {
        return <MdStar key={i} className="text-yellow-500 text-xl" />;
      } else if (starNumber === fullStars + 1 && hasHalfStar) {
        return <MdStarHalf key={i} className="text-yellow-500 text-xl" />;
      } else {
        return <MdStar key={i} className="text-gray-300 text-xl" />;
      }
    });
  };

  // Format date
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM dd, yyyy");
  };

  // Calculate savings
  const calculateSavings = () => {
    if (!productdata?.price || !productdata?.discountPercentage) return 0;
    const originalPrice = productdata.price / (1 - productdata.discountPercentage / 100);
    const savings = originalPrice - productdata.price;
    return savings.toFixed(2);
  };

  const savingsAmount = calculateSavings();
  const savingsPercentage = productdata?.discountPercentage?.toFixed(1);

  return (
    <>
      <Container className="py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Product Image Section */}
          <ProductImage productImages={productdata?.images} />
          
          {/* Product Info Section */}
          <div className="flex flex-col gap-4">
            {/* Title and Brand */}
            <div>
              <h1 className="text-3xl font-bold mb-2">{productdata?.title}</h1>
              {productdata?.brand && (
                <span className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  {productdata.brand}
                </span>
              )}
            </div>
            
            {/* Price and Rating */}
            <div className="flex items-start justify-between gap-5 border-b pb-4">
              <div>
                <CartPriceCal 
              product={productdata} 
                />
                
                {/* Savings Display */}
                {savingsPercentage > 0 && (
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1 bg-green-50 px-3 py-1.5 rounded-lg">
                      <FaWallet className="text-green-600 text-sm" />
                      <span className="text-sm font-medium text-green-700">
                        You save ${savingsAmount} Each
                      </span>
                    </div>
                    <span className="text-xs text-green-600 font-medium">
                      ({savingsPercentage}% off)
                    </span>
                  </div>
                )}
              </div>
              
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-1">
                  {renderStars(productdata?.rating || 0)}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">
                    ({productdata?.rating?.toFixed(1)})
                  </span>
                  {productdata?.reviews && (
                    <span className="text-sm text-gray-500">
                      • {productdata.reviews.length} reviews
                    </span>
                  )}
                </div>
              </div>
            </div>
               {productdata?.stock > 0 && (
              <div className="">
        
                <div className="">
                
                  <AddToCartBtn
                    product={productdata} 
                    className="flex-1 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 font-medium shadow-sm hover:shadow-md w-full"
                  />
                </div>
              </div>
            )}
            {/* Stock Status and Add to Cart */}
               {/* Stock Status */}
            {productdata?.availabilityStatus && (
              <div className="flex items-center gap-2">
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  productdata.stock > 0 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {productdata.availabilityStatus}
                </div>
                {productdata.stock > 0 && (
                  <span className="text-sm text-gray-600">
                    ({productdata.stock} units available)
                  </span>
                )}
              </div>
            )}
            {/* Description */}
            {productdata?.description && (
              <div className="mt-2">
                <p className="text-gray-600 leading-relaxed">{productdata.description}</p>
              </div>
            )}
            
            {/* Key Information Grid */}
            <div className="grid grid-cols-2 gap-4 mt-4 p-4 bg-gray-50 rounded-lg">
              {productdata?.sku && (
                <div className="flex items-center gap-2">
                  <FaTag className="text-gray-400 text-sm" />
                  <div>
                    <p className="text-xs text-gray-500">SKU</p>
                    <p className="text-sm font-medium">{productdata.sku}</p>
                  </div>
                </div>
              )}
              
              {productdata?.weight && (
                <div className="flex items-center gap-2">
                  <FaWeightHanging className="text-gray-400 text-sm" />
                  <div>
                    <p className="text-xs text-gray-500">Weight</p>
                    <p className="text-sm font-medium">{productdata.weight} kg</p>
                  </div>
                </div>
              )}
              
              {productdata?.shippingInformation && (
                <div className="flex items-center gap-2">
                  <FaTruck className="text-gray-400 text-sm" />
                  <div>
                    <p className="text-xs text-gray-500">Shipping</p>
                    <p className="text-sm font-medium">{productdata.shippingInformation}</p>
                  </div>
                </div>
              )}
              
              {productdata?.warrantyInformation && (
                <div className="flex items-center gap-2">
                  <FaShieldAlt className="text-gray-400 text-sm" />
                  <div>
                    <p className="text-xs text-gray-500">Warranty</p>
                    <p className="text-sm font-medium">{productdata.warrantyInformation}</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Dimensions */}
            {productdata?.dimensions && (
              <div className="mt-2">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Dimensions</h3>
                <div className="flex gap-4 text-sm text-gray-600">
                  <span>Width: {productdata.dimensions.width} cm</span>
                  <span>Height: {productdata.dimensions.height} cm</span>
                  <span>Depth: {productdata.dimensions.depth} cm</span>
                </div>
              </div>
            )}
            
            {/* Tags */}
            {productdata?.tags && productdata.tags.length > 0 && (
              <div className="mt-2">
                <div className="flex flex-wrap gap-2">
                  {productdata.tags.map((tag: string, index: number) => (
                    <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Return Policy */}
            {productdata?.returnPolicy && (
              <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                <FaUndo className="text-gray-400" />
                <span>{productdata.returnPolicy}</span>
              </div>
            )}
            
            {/* Quantity Selector (Optional Enhancement) */}
         
          </div>
        </div>
        
        {/* Reviews Section */}
        {productdata?.reviews && productdata.reviews.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {productdata.reviews.map((review: any, index: number) => (
                <div key={index} className="bg-gray-50 rounded-lg p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      {renderStars(review.rating)}
                    </div>
                    <span className="text-sm font-medium">{review.rating}.0</span>
                  </div>
                  <p className="text-gray-700 mb-3">{review.comment}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <FaUser className="text-xs" />
                      <span>{review.reviewerName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-xs" />
                      <span>{formatDate(review.date)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Additional Meta Information */}
        {productdata?.meta && (
          <div className="mt-8 pt-8 border-t">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-xs" />
                  <span>Added: {formatDate(productdata.meta.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-xs" />
                  <span>Updated: {formatDate(productdata.meta.updatedAt)}</span>
                </div>
              </div>
              {productdata.meta.qrCode && (
                <a 
                  href={productdata.meta.qrCode} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                >
                  <FaQrcode className="text-sm" />
                  <span>View QR Code</span>
                </a>
              )}
            </div>
          </div>
        )}
      </Container>
    </>
  );
};

export default ProductDetails;