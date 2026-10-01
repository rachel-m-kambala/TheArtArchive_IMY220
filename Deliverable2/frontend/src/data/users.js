import luna from "../assets/images/profile/pro7.jpg";
import oliver from "../assets/images/profile/pro3.jpg";
import han from "../assets/images/profile/pro5.jpg";
import elena from "../assets/images/profile/pro2.jpg";
import chloe from "../assets/images/profile/pro4.jpg";
import kai from "../assets/images/profile/pro6.jpg";
import samira from "../assets/images/profile/pro1.jpg";

const users = [
    {
        id: 1,
        username: "luna_vance",
        name: "Luna Vance",
        pronouns: "she/her",
        role: "Vector & Minimalist Artist",
        bio: "Exploring serene forms, botanical elements, and quiet midnight aesthetics through modern vector art.",
        profileImage: luna,
        followers: 2450,
        following: 310,
        artworks: 58,
        friends: [2, 5]
    },
    {
        id: 2,
        username: "thorne_oliver",
        name: "Oliver Thorne",
        pronouns: "he/him",
        role: "Graphic Designer",
        bio: "Capturing warm tones, feline grace, and earth-inspired graphic silhouettes.",
        profileImage: oliver,
        followers: 1890,
        following: 425,
        artworks: 34,
        friends: [1, 3]
    },
    {
        id: 3,
        username: "han_draws",
        name: "Han Draws",
        pronouns: "she/her",
        role: "Illustrator",
        bio: "Illustrator creating colourful worlds one drawing at a time.",
        profileImage: han,
        followers: 870,
        following: 210,
        artworks: 35,
        friends: [1, 2]
    },
    {
    id: 4,
    username: "elena_rostova",
    name: "Elena Rostova",
    pronouns: "she/her",
    role: "Oil & Impressionist Painter",
    bio: "Chasing golden hour light across Mediterranean seascapes with traditional oils and expressive brushwork.",
    profileImage: elena,
    followers: 3340,
    following: 512,
    artworks: 62,
    friends: [5, 7]
  },
  {
    id: 5,
    username: "the_chloe_bennett",
    name: "Chloe Bennett",
    pronouns: "she/her",
    role: "Fashion & Character Illustrator",
    bio: "Stylized vector silhouettes, chic patterns, and modern runway-inspired digital character design.",
    profileImage: chloe,
    followers: 1560,
    following: 280,
    artworks: 41,
    friends: [1, 4]
  },
  {
    id: 6,
    username: "takahashi_illustrations",
    name: "Kai Takahashi",
    pronouns: "he/him",
    role: "Pixel & Urban Artist",
    bio: "Atmospheric pixel art and twilight cityscapes capturing quiet urban solitude.",
    profileImage: kai,
    followers: 4210,
    following: 165,
    artworks: 73,
    friends: [3, 7]
  },
  {
    id: 7,
    username: "samira_khan",
    name: "Samira Khan",
    pronouns: "she/her",
    role: "Graphic & Digital Painter",
    bio: "Minimalist coastal views, bold color planes, and serene ocean moments under the sun.",
    profileImage: samira,
    followers: 2780,
    following: 340,
    artworks: 50,
    friends: [4, 6]
  }
];

export default users;