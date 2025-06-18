"use client";

import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Faq } from "../_components/faq";
import { Grid } from "../_components/memories";

export default function TravelGuides() {
  return (
    <section className=" text-gray-800">
      {/* Hero Section */}
      <div className="header">
        <Container className="h-60 flex items-end justify-start">
          <div className="h-20">
            <h1 className="text-4xl font-semibold text-white">Travel Guides</h1>
          </div>
        </Container>
      </div>

      <div className="overflow-hidden w-full relative">
        <Grid size={35} />
        <Container>
          <div className=" mx-auto py-16 ">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-12">
              Top Destinations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Paris, France",
                  image: "/images/paris.jpg",
                  description:
                    "The city of love offers iconic sights, romantic cafes, and a rich history.",
                },
                {
                  name: "Tokyo, Japan",
                  image: "/images/tokyo.jpg",
                  description:
                    "A blend of tradition and technology, with world-renowned cuisine and landmarks.",
                },
                {
                  name: "New York, USA",
                  image: "/images/new-york.jpg",
                  description:
                    "From Times Square to Central Park, experience the energy of the Big Apple.",
                },
              ].map((destination, index) => (
                <Card key={index} className="p-6 shadow-md">
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    width={300}
                    height={200}
                    className="rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-semibold mb-2">
                    {destination.name}
                  </h3>
                  <p className="text-gray-700">{destination.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* Travel Tips Section */}
      <div className=" py-16 bg-gray-50">
        <Container>
          <div className=" mx-auto ">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">
              Travel Tips
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Packing Essentials",
                  content:
                    "Make a checklist, and don’t forget essentials like chargers, travel-sized toiletries, and extra masks.",
                },
                {
                  title: "Best Times to Travel",
                  content:
                    "Avoid peak seasons for cheaper flights and fewer crowds; off-seasons often have mild weather and better deals.",
                },
                {
                  title: "Local Etiquette",
                  content:
                    "Research local customs and etiquette to make a positive impression and have a more immersive experience.",
                },
              ].map((tip, index) => (
                <Card key={index} className="p-6 shadow-md text-center">
                  <h3 className="text-xl font-semibold mb-2">{tip.title}</h3>
                  <p className="text-gray-700">{tip.content}</p>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* Essential Info Section */}
      <Faq />

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-500 py-16">
        <div className="text-center text-white">
          <h2 className="text-2xl font-semibold">
            Ready for Your Next Adventure?
          </h2>
          <p className="max-w-md mx-auto mt-2 mb-8">
            Get inspired and book your next trip with us for an unforgettable
            experience.
          </p>
          <Button className="bg-white text-purple-600 hover:bg-gray-100 px-6 py-3 font-semibold">
            Explore Flights
          </Button>
        </div>
      </div>
      {/* Travel Inspiration Section */}
      <Container className=" py-16">
        <div className=" mx-auto  text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8">
            Travel Inspiration
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Adventure Travel",
                description:
                  "Explore rugged mountains, remote deserts, and thrilling landscapes.",
                image: "/images/adventure.jpg",
              },
              {
                title: "Cultural Immersion",
                description:
                  "Dive deep into local traditions, languages, and festivals.",
                image: "/images/culture.jpg",
              },
              {
                title: "Beach Getaways",
                description:
                  "Relax on beautiful beaches with clear waters and soft sands.",
                image: "/images/beach.jpg",
              },
            ].map((inspiration, index) => (
              <Card key={index} className="p-6 shadow-md">
                <Image
                  src={inspiration.image}
                  alt={inspiration.title}
                  width={300}
                  height={200}
                  className="rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">
                  {inspiration.title}
                </h3>
                <p className="text-gray-700">{inspiration.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
