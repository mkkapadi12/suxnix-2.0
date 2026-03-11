import React from 'react';
import HeroSection from './components/HeroSection';
import { useSelector } from 'react-redux';
import BrandCarousel from './components/BrandCarousel';
import Features from './components/Features';
import ProductHightlight from './components/ProductHightlight';
import Video from './components/Video';
import StateSection from './components/StateSection';
import Ingredients from './components/Ingredients';
import Formula from './components/Formula';
import Packages from './components/Packages';
import Testimonials from './components/Testimonials';
import LatestNews from './components/LatestNews';

const Home = () => {
  const { user, loading } = useSelector((state) => state.user);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <main>
      <HeroSection />
      <BrandCarousel />
      <Features />
      <ProductHightlight />
      <Video />
      <StateSection />
      <Ingredients />
      <Formula />
      <Packages />
      <Testimonials />
      <LatestNews />
    </main>
  );
};

export default Home;
