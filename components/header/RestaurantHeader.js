import Image from "next/image";
import logo from "../../images/logo_r1.webp"; // Updated to .webp

const RestaurantHeader = () => {
  return (
    <header className="bg-[#f8f9fa] text-gray-800 py-8 shadow-lg"
    
    > 
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        {/* Logo & Tagline */}
        <div className="flex flex-col items-center space-y-4">
          <Image src={logo} alt="Gourmet Jobs Logo" width={100} height={100} className="rounded-full" />
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900">TheGoodPizza</h1>
            <p className="text-sm text-gray-600 italic">"Savor the Flavor, One Slice at a Time"</p>
            </div>
        </div>

          {/* Extra Text */}
          <div className="hidden md:block text-center text-gray-600 text-sm mt-4 md:mt-0">
          <p>Bringing the finest, freshest pizzas right to your door!</p>
<p className="italic">Experience pizza perfection with every bite, delivered hot and fast.</p>

        </div>

        {/* Navigation Menu */}
        {/* <nav className="mt-6 md:mt-0">
          <ul className="flex justify-center space-x-6 text-lg font-medium text-gray-700">
            <li><a href="/" className="hover:text-gray-500 transition duration-300">Home</a></li>
            <li><a href="/jobs" className="hover:text-gray-500 transition duration-300">Jobs</a></li>
          </ul>
        </nav> */}

      
      </div>
    </header>
  );
};

export default RestaurantHeader;
