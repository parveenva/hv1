
import Banner from "../../website/Banner"
import Carousel from "../../website/Carousel"
import Hero from "../../website/Hero"
import HomeForm from "../../website/HomeForm"
import TestimonialCard from "../../website/TestimonialCard"
import TrendingCards from "../../website/TrendingCards"
import Head from 'next/head'

export default function Home() {
  
  return (
 <>
<Head>
    <title>Home</title>
    <meta
          name="description"
          content="Code91 is an exceptional training institute located in Noida, which is widely regarded as one of the top online learning platforms and job-focused IT training centers in the Delhi NCR region."
          key="desc"
        />
  </Head>
  <div className="flex flex-col gap-5">
      <Hero />
      <HomeForm />
      <Banner />
      <TrendingCards />
      <TestimonialCard />
      <Carousel />
      </div>
 </>
  )
}
