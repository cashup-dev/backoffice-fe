"use client";
import React from "react";

interface TransactionCardData {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const TransactionCards: React.FC = () => {
  const cards: TransactionCardData[] = [
    {
      title: "Today's transaction",
      value: "498.310",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 14H40V38C40 39.1046 39.1046 40 38 40H10C8.89543 40 8 39.1046 8 38V14Z" fill="white" fillOpacity="0.3"/>
          <rect x="12" y="10" width="24" height="4" rx="1" fill="white" fillOpacity="0.5"/>
          <path d="M16 22H20V26H16V22Z" fill="white"/>
          <path d="M24 22H28V26H24V22Z" fill="white"/>
          <path d="M32 22H36V26H32V22Z" fill="white"/>
          <path d="M16 30H20V34H16V30Z" fill="white"/>
          <path d="M24 30H28V34H24V30Z" fill="white"/>
          <path d="M32 30H36V34H32V30Z" fill="white"/>
        </svg>
      ),
    },
    {
      title: "Today's transaction amount",
      value: "Rp.50.913.836.591",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 8C24 8 14 12 14 18V28C14 34 24 40 24 40C24 40 34 34 34 28V18C34 12 24 8 24 8Z" fill="white" fillOpacity="0.3"/>
          <circle cx="24" cy="24" r="8" fill="white" fillOpacity="0.5"/>
          <path d="M24 20V28M21 24H27" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-400 to-blue-500 p-6 md:p-8 text-white shadow-lg"
          style={{
            background: "linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)",
          }}
        >
          {/* Decorative background pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="white" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-0.9C87,14.6,81.4,29.2,73.2,42.7C65,56.2,54.2,68.6,40.9,76.1C27.6,83.6,11.8,86.2,-3.3,84.3C-18.4,82.4,-36.8,75.9,-50.4,65.8C-64,55.7,-72.8,41.9,-77.5,27.1C-82.2,12.3,-82.8,-3.5,-78.9,-18.3C-75,-33.1,-66.6,-46.9,-55.3,-56.2C-44,-65.5,-29.8,-70.3,-15.3,-73.8C-0.8,-77.3,14,-79.5,28.5,-77.8C43,-76.1,57.2,-70.5,44.7,-76.4Z" transform="translate(100 100)" />
            </svg>
          </div>

          <div className="relative z-10">
            <div className="mb-4">
              {card.icon}
            </div>
            <h3 className="text-base md:text-lg font-normal mb-2 opacity-90">
              {card.title}
            </h3>
            <p className="text-2xl md:text-4xl font-bold">
              {card.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionCards;
