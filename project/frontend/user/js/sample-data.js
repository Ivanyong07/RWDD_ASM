/*
=================================
* Filename : sample-data.js
* Date : 18/10/2026
* Author : (add your name)
* Description : TEMPORARY data for designing the pages. It is used only when
*               USE_SAMPLE_DATA is true (config.js). Delete this file when the backend is ready.
=================================
*/

const SAMPLE_USER = {
    name: "Aiman Rahman",
    picture: ""                         // "" = show the default profile picture
};

// The ladder. "level" matches the level of the user in the database.
const SAMPLE_RANKS = [
    { level: 1, name: "Seed",    min_points: 0 },
    { level: 2, name: "Sprout",  min_points: 100 },
    { level: 3, name: "Sapling", min_points: 250 },
    { level: 4, name: "Tree",    min_points: 500 },
    { level: 5, name: "Forest",  min_points: 1000 }
];

// image = photo path inside images/ (left blank: add it yourselves, for example "challenges/plant-garden.jpeg")
const SAMPLE_CHALLENGES = [
    { id: 1, title: "Recycle 10 Bottles", description: "Sort 10 plastic bottles into the recycling bin and take a photo.", difficulty: "beginner", points: 20, image: "" },
    { id: 2, title: "Plant a Balcony Garden", description: "Grow your own herbs or vegetables on your balcony or window sill.", difficulty: "intermediate", points: 30, image: "" },
    { id: 3, title: "Bring Your Own Bottle", description: "Use a reusable bottle for a whole day instead of buying plastic.", difficulty: "beginner", points: 15, image: "" },
    { id: 4, title: "Campus Clean-up Walk", description: "Pick up litter around campus for 20 minutes.", difficulty: "intermediate", points: 40, image: "" },
    { id: 5, title: "Lights Out Hour", description: "Switch off lights and devices you do not need for one hour.", difficulty: "beginner", points: 10, image: "" },
    { id: 6, title: "Bike to Campus", description: "Cycle or walk to campus instead of driving.", difficulty: "advanced", points: 60, image: "" }
];

// rule decides when the badge unlocks:
//   approved_count = approved challenges, rank_level = rank level reached,
//   redeem_count = rewards redeemed, points_spent = points spent
// image = badge picture (left blank, for example "badges/first-step.jpeg")
const SAMPLE_BADGES = [
    { id: 1, name: "First Step",    description: "Complete 1 challenge",        image: "",    rule: { type: "approved_count", value: 1 } },
    { id: 2, name: "Eco Warrior",   description: "Complete 5 challenges",       image: "",   rule: { type: "approved_count", value: 5 } },
    { id: 3, name: "Bottle Hero",   description: "Complete 10 challenges",      image: "",   rule: { type: "approved_count", value: 10 } },
    { id: 4, name: "Sprout Member", description: "Reach the Sprout rank",       image: "", rule: { type: "rank_level", value: 2 } },
    { id: 5, name: "Tree Member",   description: "Reach the Tree rank",         image: "",   rule: { type: "rank_level", value: 4 } },
    { id: 6, name: "First Reward",  description: "Redeem a reward",             image: "",  rule: { type: "redeem_count", value: 1 } },
    { id: 7, name: "Big Spender",   description: "Spend 200 points in total",   image: "",   rule: { type: "points_spent", value: 200 } }
];

// min_level = lowest rank level that can redeem it
// image = reward photo (left blank, for example "rewards/tote-bag.jpeg")
const SAMPLE_REWARDS = [
    { id: 1, name: "Tote Bag",         description: "A cloth bag to replace plastic bags.",        cost: 40,  min_level: 1, image: "" },
    { id: 2, name: "Reusable Bottle",  description: "A steel bottle for your daily water.",        cost: 60,  min_level: 1, image: "" },
    { id: 3, name: "Bamboo Cutlery",   description: "A bamboo spoon, fork and chopsticks set.",    cost: 80,  min_level: 2, image: "" },
    { id: 4, name: "Cafeteria Voucher",description: "Money off a meal at the campus cafeteria.",   cost: 120, min_level: 2, image: "" },
    { id: 5, name: "Plant a Tree",     description: "We plant a real tree in your name.",          cost: 200, min_level: 3, image: "" },
    { id: 6, name: "Eco Hoodie",       description: "A hoodie made from recycled bottles.",        cost: 400, min_level: 4, image: "" }
];

// Pretend users for the leaderboard (the real list comes from the database).
// picture = path inside images/ (left blank). points = total points earned.
const SAMPLE_LEADERBOARD = [
    { name: "Nur Aisyah",     picture: "", points: 1480 },
    { name: "Chloe Ng",       picture: "", points: 1215 },
    { name: "Arjun Kumar",    picture: "", points: 1090 },
    { name: "Daniel Lim",     picture: "", points: 860 },
    { name: "Siti Nabila",    picture: "", points: 745 },
    { name: "Wei Jie Tan",    picture: "", points: 690 },
    { name: "Hafiz Rahman",   picture: "", points: 610 },
    { name: "Mei Ling Chong", picture: "", points: 540 },
    { name: "Farah Aina",     picture: "", points: 480 },
    { name: "Kevin Ooi",      picture: "", points: 415 },
    { name: "Priya Nair",     picture: "", points: 372 },
    { name: "Amir Hakim",     picture: "", points: 330 },
    { name: "Sophie Lau",     picture: "", points: 288 },
    { name: "Haziq Omar",     picture: "", points: 245 },
    { name: "Jia Hui Goh",    picture: "", points: 210 },
    { name: "Rizal Fadzil",   picture: "", points: 176 },
    { name: "Natalie Wong",   picture: "", points: 150 },
    { name: "Imran Shah",     picture: "", points: 118 },
    { name: "Lina Teoh",      picture: "", points: 95 },
    { name: "Zafri Mansor",   picture: "", points: 70 },
    { name: "Grace Soh",      picture: "", points: 55 },
    { name: "Adam Yusuf",     picture: "", points: 40 }
];
