// Tervana is a fictional real estate brand. All listings, people and figures are illustrative.

export const brand = {
  name: "tervana",
  year: "©2026",
  blurb: "A real estate advisor can give you a clear, full breakdown of costs, so there are no surprises on the way home.",
  disclaimer:
    "Tervana is a fictional concept brand created for a design showcase. Listings, people, figures and imagery are computer-generated and illustrative only.",
};

export const nav = [
  { id: "top", label: "Home" },
  { id: "listings", label: "Buy & Rent" },
  { id: "services", label: "Sell" },
  { id: "agents", label: "Find an Agent" },
  { id: "showcase", label: "Interiors" },
];

export const sideLinks = [
  { id: "agents", label: "Agents" },
  { id: "listings", label: "Houses" },
  { id: "services", label: "Loans" },
];

export const stats = [
  { v: 1200, suffix: "+", k: "Homes matched" },
  { v: 96, suffix: "%", k: "Client satisfaction" },
  { v: 18, suffix: "", k: "Years of local expertise" },
  { v: 40, suffix: "+", k: "Neighbourhood advisors" },
];

export type Listing = {
  img: string;
  title: string;
  place: string;
  price: string;
  beds: number;
  baths: number;
  area: string;
  tag: "For Sale" | "For Rent";
};

export const listings: Listing[] = [
  { img: "home-1", title: "Coral Bay Villa", place: "Seaside Quarter", price: "$2,450,000", beds: 4, baths: 4, area: "3,800 sq ft", tag: "For Sale" },
  { img: "home-2", title: "Canopy House", place: "Green Ridge", price: "$1,890,000", beds: 3, baths: 3, area: "2,950 sq ft", tag: "For Sale" },
  { img: "home-3", title: "Palm Court Residence", place: "Linden Park", price: "$6,800 / mo", beds: 3, baths: 2, area: "2,200 sq ft", tag: "For Rent" },
  { img: "home-4", title: "The White Terrace", place: "Old Town", price: "$1,250,000", beds: 3, baths: 3, area: "2,100 sq ft", tag: "For Sale" },
  { img: "home-5", title: "Wave Apartments", place: "Marina District", price: "$4,200 / mo", beds: 2, baths: 2, area: "1,350 sq ft", tag: "For Rent" },
  { img: "home-6", title: "Casa Arena", place: "Dune Hills", price: "$2,100,000", beds: 4, baths: 3, area: "3,400 sq ft", tag: "For Sale" },
];

export const services = [
  { n: "01", title: "Buy a home", body: "Curated shortlists, private viewings and a negotiator in your corner from first visit to keys.", img: "home-3" },
  { n: "02", title: "Rent a place", body: "Verified rentals with transparent terms, flexible leases and move-in support.", img: "home-5" },
  { n: "03", title: "Sell your property", body: "Pricing backed by local data, cinematic listings and qualified buyers only.", img: "home-4" },
  { n: "04", title: "Home loans", body: "Compare mortgage options side by side and get pre-approved before you fall in love.", img: "interior-2" },
];

export const reasons = [
  { n: "01", title: "Local, not generic", body: "Every advisor lives in the neighbourhoods they sell. You get street-level insight, not a call centre." },
  { n: "02", title: "Every cost, upfront", body: "Taxes, fees, insurance and upkeep laid out line by line before you make an offer." },
  { n: "03", title: "One advisor, start to keys", body: "The same person from first viewing to handover — no hand-offs, no repeating yourself." },
];

export const amenities = [
  { title: "Infinity pools", meta: "120+ homes", img: "home-1" },
  { title: "Garden living", meta: "Private lawns & patios", img: "home-3" },
  { title: "Rooftop terraces", meta: "City & sea views", img: "home-4" },
  { title: "Resort-style residences", meta: "Concierge buildings", img: "home-5" },
  { title: "Courtyard villas", meta: "Quiet, walled privacy", img: "home-6" },
];

export const agents = [
  { img: "agent-1", name: "Mara Delgado", role: "Senior Advisor · Seaside", deals: 140 },
  { img: "agent-2", name: "Daniel Whitford", role: "Luxury Homes Lead", deals: 210 },
  { img: "agent-3", name: "Priya Raman", role: "Rentals Specialist", deals: 95 },
];

export const reviews = [
  { q: "They found us a home we didn't know we were looking for. Calm, honest and fast.", who: "Elena & Tom" },
  { q: "The cost breakdown alone saved us weeks of stress. No surprises at closing.", who: "Marcus L." },
  { q: "Sold above asking in nine days. The listing photos looked like a magazine.", who: "Aisha K." },
  { q: "Priya made renting in a new city feel easy. Every question answered same day.", who: "Jonas P." },
  { q: "Clear advice, zero pressure. Exactly what first-time buyers need.", who: "Sofia & Ben" },
];
