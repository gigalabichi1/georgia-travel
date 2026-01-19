import { Mountain, Clock, Heart, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-md p-8 md:p-12 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Georgia</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Georgia is a country at the intersection of Europe and Asia, nestled in the Caucasus
            region. With a history spanning thousands of years, Georgia offers visitors a unique
            blend of ancient culture, stunning natural landscapes, and warm hospitality.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <Mountain className="w-6 h-6 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Natural Beauty</h2>
            <p className="text-gray-600">
              From the snow-capped peaks of the Caucasus Mountains to the subtropical Black Sea
              coast, Georgia's diverse landscapes offer endless opportunities for adventure and
              exploration. Discover pristine valleys, ancient forests, and dramatic mountain passes.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Rich History</h2>
            <p className="text-gray-600">
              Georgia is one of the world's oldest wine-producing regions, with an 8,000-year
              tradition. Explore medieval churches, ancient fortresses, and UNESCO World Heritage
              sites that tell the story of this fascinating country's past.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Legendary Hospitality</h2>
            <p className="text-gray-600">
              Georgian hospitality is legendary. Visitors are treated as honored guests, welcomed
              with open arms and generous feasts. Experience the warmth of Georgian culture through
              traditional supra dinners and heartfelt toasts.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <Award className="w-6 h-6 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Unique Culture</h2>
            <p className="text-gray-600">
              Georgia has its own unique alphabet, language, and polyphonic singing tradition.
              Experience vibrant folk dances, taste incredible cuisine, and discover a culture
              that has maintained its identity through centuries of history.
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-6">Why Choose Georgia Travel?</h2>
          <div className="space-y-6 text-gray-600 leading-relaxed">
            <p>
              At Georgia Travel, we are passionate about sharing the beauty and culture of our
              country with visitors from around the world. Our team of experienced guides and
              travel professionals are dedicated to creating unforgettable experiences that go
              beyond typical tourist attractions.
            </p>
            <p>
              We specialize in carefully curated tours that showcase the best of Georgia - from
              the vibrant capital of Tbilisi to remote mountain villages, from ancient wine regions
              to pristine national parks. Each of our tours is designed to provide authentic
              cultural experiences while ensuring comfort and safety.
            </p>
            <p>
              Whether you're interested in hiking in the Caucasus Mountains, exploring medieval
              architecture, tasting world-class wines, or simply soaking in the natural beauty and
              warm hospitality of Georgia, we have the perfect tour for you.
            </p>
            <p>
              Our commitment is to provide exceptional service, knowledgeable guides, and
              experiences that create lasting memories. We believe that travel is not just about
              seeing new places, but about connecting with people, cultures, and yourself.
            </p>
          </div>

          <div className="mt-8 pt-8 border-t">
            <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-2 text-gray-600">
              <p>Have questions about our tours or want to plan a custom itinerary?</p>
              <p>Email: <a href="mailto:info@georgiatravel.com" className="text-indigo-600 hover:underline">info@georgiatravel.com</a></p>
              <p>Phone: <span className="text-indigo-600">+995 XXX XXX XXX</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
