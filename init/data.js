const sampleListing = [
    {
      "title": "Cozy Cottage",
      "description": "A charming two-bedroom cottage in the countryside.",
      "image": "https://plus.unsplash.com/premium_photo-1683649964203-baf13fa852e4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QSUyMGNoYXJtaW5nJTIwdHdvJTIwYmVkcm9vbSUyMGNvdHRhZ2UlMjBpbiUyMHRoZSUyMGNvdW50cnlzaWRlfGVufDB8fDB8fHww",
      "price": 10065.60,
      "location": "Yorkshire",
      "country": "United Kingdom"
    },
    {
      "title": "Modern Apartment",
      "description": "A sleek and modern studio apartment in the heart of the city.",
      "image": "https://images.unsplash.com/photo-1683629357846-30eacff8f615?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG1vZGVybiUyMHJlc2lkZW50aWFsfGVufDB8MHwwfHx8MA%3D%3D",
      "price": 16776,
      "location": "Manhattan",
      "country": "United States"
    },
    {
      "title": "Beachside Villa",
      "description": "Luxury villa with stunning ocean views and private pool.",
      "image": "https://plus.unsplash.com/premium_photo-1697730288131-6684ca63584b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QmVhY2hzaWRlJTIwVmlsbGF8ZW58MHwwfDB8fHww",
      "price": 41940,
      "location": "Malibu",
      "country": "United States"
    },
    {
      "title": "Rustic Cabin",
      "description": "A cozy cabin nestled in the mountains, perfect for a weekend getaway.",
      "image": "https://plus.unsplash.com/premium_photo-1683891068540-5f4de6b4d452?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "price": 12999,
      "location": "Aspen",
      "country": "United States"
    },
    {
      "title": "Urban Loft",
      "description": "Spacious loft with industrial decor and excellent city views.",
      "image": "https://plus.unsplash.com/premium_photo-1684175656320-5c3f701c082c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bG9mdHxlbnwwfDB8MHx8fDA%3D",
      "price": 25164,
      "location": "Berlin",
      "country": "Germany"
    },
    {
      "title": "Lakefront Bungalow",
      "description": "A serene bungalow by the lake with beautiful sunrise views.",
      "image": "https://images.unsplash.com/photo-1602002418679-43121356bf41?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fExha2Vmcm9udCUyMEJ1bmdhbG93fGVufDB8MHwwfHx8Mg%3D%3D",
      "price": 20970,
      "location": "Lake Tahoe",
      "country": "United States"
    },
    {
      "title": "Countryside Manor",
      "description": "Spacious manor surrounded by lush gardens and open fields.",
      "image": "https://media.istockphoto.com/id/155374658/photo/large-american-detached-home-with-garden-and-blue-sky.webp?a=1&b=1&s=612x612&w=0&k=20&c=Aod5t08Zrj8yRJs8_j9dAfZvJdg4LQU8jEDMbCS3iLY=",
      "price": 50328,
      "location": "Cotswolds",
      "country": "United Kingdom"
    },
    {
      "title": "Tropical Retreat",
      "description": "A private retreat in a tropical paradise with beachfront access.",
      "image": "https://images.unsplash.com/photo-1711114377724-229012aba9fc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8VHJvcGljYWwlMjBSZXRyZWF0fGVufDB8MHwwfHx8Mg%3D%3D",
      "price": 67104,
      "location": "Maharashtra",
      "country": "India"
    },
    {
      "title": "City Penthouse",
      "description": "Luxurious penthouse with a rooftop garden and panoramic city views.",
      "image": "https://media.istockphoto.com/id/1357037904/photo/night-scene-modern-living-room-with-metropolis-view-background-3d-render.webp?a=1&b=1&s=612x612&w=0&k=20&c=q01gdKzuyG0qM873ZqNiEh21Rl5xlQYC-KpyconGYkg=",
      "price": 83880,
      "location": "Dubai",
      "country": "United Arab Emirates"
    },
    {
      "title": "Desert Oasis",
      "description": "A hidden gem in the desert with traditional decor and modern amenities.",
      "image": "https://images.unsplash.com/photo-1633250307378-5604b26a164b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8RGVzZXJ0JTIwT2FzaXN8ZW58MHwwfDB8fHwy",
      "price": 33552,
      "location": "Marrakech",
      "country": "Morocco"
    },
    {
      "title": "Historic Chateau",
      "description": "A historic chateau with antique furnishings and picturesque vineyards.",
      "image": "https://images.unsplash.com/photo-1549224174-8c0e61705985?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8SGlzdG9yaWMlMjBDaGF0ZWF1fGVufDB8MHwwfHx8Mg%3D%3D",
      "price": 59999,
      "location": "Provence",
      "country": "France"
    },
    {
      "title": "Forest Hideaway",
      "description": "A tranquil hideaway surrounded by towering trees and wildlife.",
      "image": "https://media.istockphoto.com/id/1335269094/photo/modern-forest-house.webp?a=1&b=1&s=612x612&w=0&k=20&c=ynT6YdXra22o1hhMHNts8MqVqNQZY4vwrMqABIexweo=",
      "price": 15099,
      "location": "Black Forest",
      "country": "Germany"
    },
    {
      "title": "Secluded Cabin",
      "description": "A small, rustic cabin perfect for escaping the hustle and bustle.",
      "image": "https://plus.unsplash.com/premium_photo-1733864822386-a7f705c7fac5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fFNlY2x1ZGVkJTIwQ2FiaW58ZW58MHwwfDB8fHww",
      "price": 8999,
      "location": "Rocky Mountains",
      "country": "United States"
    },
    {
      "title": "Luxury Yacht Stay",
      "description": "Experience luxury aboard a private yacht with ocean excursions.",
      "image": "https://plus.unsplash.com/premium_photo-1680831748191-d726a2f7b201?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "price": 100699,
      "location": "Monaco",
      "country": "Monaco"
    },
    {
      "title": "Snowy Chalet",
      "description": "A cozy chalet in the mountains with a fireplace and skiing access.",
      "image": "https://images.unsplash.com/photo-1550503736-c1a2c9033c03?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8U25vd3klMjBDaGFsZXR8ZW58MHwwfDB8fHww",
      "price": 29999,
      "location": "Swiss Alps",
      "country": "Switzerland"
    },
    {
      "title": "Cozy Mountain Cabin",
      "description": "A serene escape in the heart of the Rocky Mountains. Perfect for hiking and nature lovers.",
      "image": "https://plus.unsplash.com/premium_photo-1684863505736-c2016528804a?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bW91bnRhaW4lMjBjYWJpbnxlbnwwfHwwfHx8MA%3D%3D",
      "price": 9960,
      "location": "Aspen, Colorado",
      "country": "United States"
  },
  {
      "title": "Modern City Apartment",
      "description": "A stylish and fully equipped apartment in the center of Tokyo, near public transport and attractions.",
      "image": "https://plus.unsplash.com/premium_photo-1661963579906-f146cde83bf4?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dG9reW9fYXBhcnRtZW50fGVufDB8fDB8fHww",
      "price": 12450,
      "location": "Shibuya, Tokyo",
      "country": "Japan"
  },
  {
      "title": "Beachfront Bungalow",
      "description": "Relax in this charming bungalow steps away from a pristine beach in Bali. Stunning ocean views included.",
      "image": "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmVhY2glMjBidW5nYWxvd3xlbnwwfHwwfHx8Mg%3D%3D",
      "price": 16600,
      "location": "Kuta, Bali",
      "country": "Indonesia"
  },
  {
      "title": "Historic French Chateau",
      "description": "Stay in a beautifully restored 18th-century chateau in the Loire Valley. Includes wine tastings.",
      "image": "https://images.unsplash.com/photo-1705591932199-3f7ddd25bb1e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGZyZW5jaCUyMGNoYXRlYXV8ZW58MHwwfDB8fHwy",
      "price": 37350,
      "location": "Loire Valley, France",
      "country": "France"
  },
  {
      "title": "Luxury NYC Loft",
      "description": "An elegant loft in the heart of Manhattan. Close to Broadway, Times Square, and Central Park.",
      "image": "https://images.unsplash.com/photo-1664261421791-c25c5760f577?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bnljJTIwbG9mdHxlbnwwfDB8MHx8fDI%3D",
      "price": 29050,
      "location": "Manhattan, New York City",
      "country": "United States"
  },
  {
      "title": "Rustic Countryside Cottage",
      "description": "Experience the charm of the English countryside in this quaint, cozy cottage with a private garden.",
      "image": "https://images.unsplash.com/photo-1727049405952-80384692c46a?q=80&w=850&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "price": 8300,
      "location": "Cotswolds, England",
      "country": "United Kingdom"
  },
  {
      "title": "Luxury Penthouse with Pool",
      "description": "An opulent penthouse in Dubai with a private infinity pool and breathtaking cityscape views.",
      "image": "https://media.cnn.com/api/v1/images/stellar/prod/231204105923-como-residences-penthouse-1.jpg?c=original",
      "price": 83000,
      "location": "Downtown Dubai",
      "country": "United Arab Emirates"
  },
  {
      "title": "Tropical Treehouse",
      "description": "Stay in a unique treehouse surrounded by lush rainforest in Costa Rica. Great for adventurers!",
      "image": "https://media.istockphoto.com/id/1151789011/photo/scenic-view-of-tree-house-near-the-sea-on-nusa-penida.jpg?s=612x612&w=is&k=20&c=LHBold02gXrXxyvb11SWY07e6sQFSmg2e4tsOG2Dwz8=",
      "price": 14940,
      "location": "Monteverde, Costa Rica",
      "country": "Costa Rica"
  },
  {
      "title": "Scandinavian Lakeside Cabin",
      "description": "A minimalist cabin on the shores of a pristine lake in Sweden. Perfect for relaxation and fishing.",
      "image": "https://images.unsplash.com/photo-1482192505345-5655af888cc4?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bGFrZXNpZGUlMjBjYWJpbnxlbnwwfDB8MHx8fDI%3D",
      "price": 18260,
      "location": "Stockholm Archipelago, Sweden",
      "country": "Sweden"
  },
  {
      "title": "Icelandic Geothermal Retreat",
      "description": "A modern villa with a private geothermal pool. Experience the northern lights in luxury.",
      "image": "https://images.unsplash.com/photo-1711111038475-0dc445eeb97e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGdlb3RoZXJtYWwlMjByZXRyZWF0fGVufDB8MHwwfHx8Mg%3D%3D",
      "price": 41500,
      "location": "Reykjavik, Iceland",
      "country": "Iceland"
  }
  ];

  module.exports = { data: sampleListing};
  