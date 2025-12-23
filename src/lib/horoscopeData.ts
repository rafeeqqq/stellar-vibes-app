export interface ZodiacSign {
  id: string;
  name: string;
  hindiName: string;
  symbol: string;
  dateRange: string;
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  elementHindi: string;
  color: string;
  rulingPlanet: string;
  rulingPlanetHindi: string;
  planetSymbol: string;
}

export interface HoroscopeData {
  mood: string;
  moodEmoji: string;
  luckyNumber: number;
  luckyTime: string;
  luckyColors: string[];
  lovePercentage: number;
  loveText: string;
  careerPercentage: number;
  careerText: string;
  healthPercentage: number;
  healthText: string;
  generalReading: string;
  dailyAffirmation: string;
  compatibleSign: string;
  avoidSign: string;
  focusArea: string;
  focusEmoji: string;
  nakshatra: string;
  tithi: string;
}

export const zodiacSigns: ZodiacSign[] = [
  { id: 'aries', name: 'Aries', hindiName: 'मेष', symbol: '♈', dateRange: 'Mar 21 - Apr 19', element: 'Fire', elementHindi: 'अग्नि', color: '#FF6B6B', rulingPlanet: 'Mars', rulingPlanetHindi: 'मंगल', planetSymbol: '♂' },
  { id: 'taurus', name: 'Taurus', hindiName: 'वृषभ', symbol: '♉', dateRange: 'Apr 20 - May 20', element: 'Earth', elementHindi: 'पृथ्वी', color: '#4ECDC4', rulingPlanet: 'Venus', rulingPlanetHindi: 'शुक्र', planetSymbol: '♀' },
  { id: 'gemini', name: 'Gemini', hindiName: 'मिथुन', symbol: '♊', dateRange: 'May 21 - Jun 20', element: 'Air', elementHindi: 'वायु', color: '#FFE66D', rulingPlanet: 'Mercury', rulingPlanetHindi: 'बुध', planetSymbol: '☿' },
  { id: 'cancer', name: 'Cancer', hindiName: 'कर्क', symbol: '♋', dateRange: 'Jun 21 - Jul 22', element: 'Water', elementHindi: 'जल', color: '#95E1D3', rulingPlanet: 'Moon', rulingPlanetHindi: 'चंद्र', planetSymbol: '☽' },
  { id: 'leo', name: 'Leo', hindiName: 'सिंह', symbol: '♌', dateRange: 'Jul 23 - Aug 22', element: 'Fire', elementHindi: 'अग्नि', color: '#F9A826', rulingPlanet: 'Sun', rulingPlanetHindi: 'सूर्य', planetSymbol: '☉' },
  { id: 'virgo', name: 'Virgo', hindiName: 'कन्या', symbol: '♍', dateRange: 'Aug 23 - Sep 22', element: 'Earth', elementHindi: 'पृथ्वी', color: '#A8D8EA', rulingPlanet: 'Mercury', rulingPlanetHindi: 'बुध', planetSymbol: '☿' },
  { id: 'libra', name: 'Libra', hindiName: 'तुला', symbol: '♎', dateRange: 'Sep 23 - Oct 22', element: 'Air', elementHindi: 'वायु', color: '#FFB6C1', rulingPlanet: 'Venus', rulingPlanetHindi: 'शुक्र', planetSymbol: '♀' },
  { id: 'scorpio', name: 'Scorpio', hindiName: 'वृश्चिक', symbol: '♏', dateRange: 'Oct 23 - Nov 21', element: 'Water', elementHindi: 'जल', color: '#9B59B6', rulingPlanet: 'Mars', rulingPlanetHindi: 'मंगल', planetSymbol: '♂' },
  { id: 'sagittarius', name: 'Sagittarius', hindiName: 'धनु', symbol: '♐', dateRange: 'Nov 22 - Dec 21', element: 'Fire', elementHindi: 'अग्नि', color: '#E74C3C', rulingPlanet: 'Jupiter', rulingPlanetHindi: 'गुरु', planetSymbol: '♃' },
  { id: 'capricorn', name: 'Capricorn', hindiName: 'मकर', symbol: '♑', dateRange: 'Dec 22 - Jan 19', element: 'Earth', elementHindi: 'पृथ्वी', color: '#7F8C8D', rulingPlanet: 'Saturn', rulingPlanetHindi: 'शनि', planetSymbol: '♄' },
  { id: 'aquarius', name: 'Aquarius', hindiName: 'कुंभ', symbol: '♒', dateRange: 'Jan 20 - Feb 18', element: 'Air', elementHindi: 'वायु', color: '#3498DB', rulingPlanet: 'Saturn', rulingPlanetHindi: 'शनि', planetSymbol: '♄' },
  { id: 'pisces', name: 'Pisces', hindiName: 'मीन', symbol: '♓', dateRange: 'Feb 19 - Mar 20', element: 'Water', elementHindi: 'जल', color: '#9B59B6', rulingPlanet: 'Jupiter', rulingPlanetHindi: 'गुरु', planetSymbol: '♃' },
];

const moods = ['Energetic', 'Romantic', 'Creative', 'Peaceful', 'Adventurous', 'Reflective', 'Passionate', 'Balanced', 'Inspired', 'Confident'];
const moodEmojis = ['⚡', '💕', '✨', '🌸', '🌟', '🔮', '🔥', '☯️', '💫', '👑'];
const luckyTimes = ['6:00 AM', '9:30 AM', '12:00 PM', '2:45 PM', '5:15 PM', '7:30 PM', '10:00 PM', '11:11 AM', '3:33 PM', '8:45 AM'];
const luckyColorSets = [
  ['#FF6B6B', '#4ECDC4', '#FFE66D'],
  ['#9B59B6', '#3498DB', '#E74C3C'],
  ['#F9A826', '#95E1D3', '#FFB6C1'],
  ['#A8D8EA', '#AA96DA', '#FCBAD3'],
  ['#FF9A9E', '#FECFEF', '#A18CD1'],
  ['#667eea', '#764ba2', '#f093fb'],
  ['#4facfe', '#00f2fe', '#43e97b'],
  ['#fa709a', '#fee140', '#30cfd0'],
];

const nakshatras = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu',
  'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni', 'Hasta',
  'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha',
  'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada',
  'Uttara Bhadrapada', 'Revati'
];

const tithis = [
  'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami', 'Shashthi', 'Saptami',
  'Ashtami', 'Navami', 'Dashami', 'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi',
  'Purnima', 'Amavasya'
];

const focusAreas = [
  { area: 'Communication', emoji: '💬' },
  { area: 'Self-Care', emoji: '🧘' },
  { area: 'Finances', emoji: '💰' },
  { area: 'Relationships', emoji: '👥' },
  { area: 'Creativity', emoji: '🎨' },
  { area: 'Health', emoji: '💪' },
  { area: 'Learning', emoji: '📚' },
  { area: 'Spirituality', emoji: '🙏' },
];

const affirmations = [
  "I am worthy of all the beautiful things the universe has in store for me.",
  "Today I choose joy, abundance, and positive energy.",
  "I trust the journey and embrace each moment with gratitude.",
  "My inner light shines brightly and attracts wonderful opportunities.",
  "I am aligned with my highest purpose and deepest intentions.",
  "Every challenge is an opportunity for growth and transformation.",
  "I radiate confidence, love, and positive energy wherever I go.",
  "I am open to receiving all the blessings the cosmos offers today.",
  "My intuition guides me towards my greatest good.",
  "I am surrounded by love, support, and cosmic protection.",
  "Today I manifest my dreams with clarity and intention.",
  "I embrace change as a pathway to my highest potential.",
];

const loveTexts = [
  "Venus aligns with your heart chakra today, bringing unexpected romantic energy. Open yourself to new connections.",
  "Your magnetic aura is irresistible today. Express your feelings openly and watch love bloom around you.",
  "Deep emotional bonds are forming. Trust your intuition when it comes to matters of the heart.",
  "A surprise message from someone special could change everything. Stay open to unexpected love.",
  "Your romantic life is about to take an exciting turn. Embrace vulnerability and authentic connection.",
  "The stars favor deep, meaningful conversations with your partner or potential love interest today.",
  "Self-love is your superpower today. Nurture yourself and watch as love naturally gravitates toward you.",
  "A past connection may resurface. Consider what lessons this relationship taught you before moving forward.",
];

const careerTexts = [
  "Jupiter's influence brings major career opportunities. Stay alert for unexpected doors opening.",
  "Your creative solutions will impress colleagues and superiors alike. Don't hold back your innovative ideas.",
  "Financial abundance is flowing your way. Trust your instincts on business decisions today.",
  "A mentor figure may appear in your professional life. Be open to guidance and wisdom from others.",
  "Your hard work is about to be recognized. Prepare for positive feedback and potential advancement.",
  "Collaborative projects are favored today. Team up with others to achieve remarkable results.",
  "Strategic planning today will yield significant rewards in the coming weeks. Think long-term.",
  "Your professional reputation is shining bright. Use this energy to network and expand your influence.",
];

const healthTexts = [
  "Your energy levels are peaking today. Channel this vitality into physical activities you enjoy.",
  "Mind-body balance is essential now. Consider meditation or yoga to align your inner energies.",
  "Pay attention to your rest patterns. Quality sleep will enhance your cosmic receptivity.",
  "Hydration and nourishment are key today. Honor your body with wholesome, energizing foods.",
  "Your intuition about your health is strong. Listen to what your body is telling you.",
  "Physical movement will help release any stagnant energy. Take a walk in nature if possible.",
  "Stress may manifest physically. Practice deep breathing and grounding exercises today.",
  "Your healing energy is amplified. Focus on recovery and gentle self-care practices.",
];

// Compatibility mapping based on elements
const compatibilityMap: Record<string, { compatible: string[], avoid: string[] }> = {
  aries: { compatible: ['leo', 'sagittarius', 'gemini', 'aquarius'], avoid: ['cancer', 'capricorn'] },
  taurus: { compatible: ['virgo', 'capricorn', 'cancer', 'pisces'], avoid: ['leo', 'aquarius'] },
  gemini: { compatible: ['libra', 'aquarius', 'aries', 'leo'], avoid: ['virgo', 'pisces'] },
  cancer: { compatible: ['scorpio', 'pisces', 'taurus', 'virgo'], avoid: ['aries', 'libra'] },
  leo: { compatible: ['aries', 'sagittarius', 'gemini', 'libra'], avoid: ['taurus', 'scorpio'] },
  virgo: { compatible: ['taurus', 'capricorn', 'cancer', 'scorpio'], avoid: ['gemini', 'sagittarius'] },
  libra: { compatible: ['gemini', 'aquarius', 'leo', 'sagittarius'], avoid: ['cancer', 'capricorn'] },
  scorpio: { compatible: ['cancer', 'pisces', 'virgo', 'capricorn'], avoid: ['leo', 'aquarius'] },
  sagittarius: { compatible: ['aries', 'leo', 'libra', 'aquarius'], avoid: ['virgo', 'pisces'] },
  capricorn: { compatible: ['taurus', 'virgo', 'scorpio', 'pisces'], avoid: ['aries', 'libra'] },
  aquarius: { compatible: ['gemini', 'libra', 'aries', 'sagittarius'], avoid: ['taurus', 'scorpio'] },
  pisces: { compatible: ['cancer', 'scorpio', 'taurus', 'capricorn'], avoid: ['gemini', 'sagittarius'] },
};

// Seeded random number generator
function seededRandom(seed: number): () => number {
  return function() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

function getDateSeed(date: Date, signId: string): number {
  const dateStr = date.toISOString().split('T')[0];
  let hash = 0;
  const str = dateStr + signId;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

export function getHoroscopeData(signId: string, dayOffset: number = 0): HoroscopeData {
  const date = new Date();
  date.setDate(date.getDate() + dayOffset);
  
  const seed = getDateSeed(date, signId);
  const random = seededRandom(seed);
  
  const moodIndex = Math.floor(random() * moods.length);
  const timeIndex = Math.floor(random() * luckyTimes.length);
  const colorSetIndex = Math.floor(random() * luckyColorSets.length);
  const loveTextIndex = Math.floor(random() * loveTexts.length);
  const careerTextIndex = Math.floor(random() * careerTexts.length);
  const healthTextIndex = Math.floor(random() * healthTexts.length);
  const affirmationIndex = Math.floor(random() * affirmations.length);
  const focusIndex = Math.floor(random() * focusAreas.length);
  const nakshatraIndex = Math.floor(random() * nakshatras.length);
  const tithiIndex = Math.floor(random() * tithis.length);
  
  const compatibility = compatibilityMap[signId] || { compatible: [], avoid: [] };
  const compatibleIndex = Math.floor(random() * compatibility.compatible.length);
  const avoidIndex = Math.floor(random() * compatibility.avoid.length);
  
  const compatibleSign = zodiacSigns.find(s => s.id === compatibility.compatible[compatibleIndex]);
  const avoidSign = zodiacSigns.find(s => s.id === compatibility.avoid[avoidIndex]);
  
  return {
    mood: moods[moodIndex],
    moodEmoji: moodEmojis[moodIndex],
    luckyNumber: Math.floor(random() * 99) + 1,
    luckyTime: luckyTimes[timeIndex],
    luckyColors: luckyColorSets[colorSetIndex],
    lovePercentage: Math.floor(random() * 40) + 60,
    loveText: loveTexts[loveTextIndex],
    careerPercentage: Math.floor(random() * 40) + 60,
    careerText: careerTexts[careerTextIndex],
    healthPercentage: Math.floor(random() * 40) + 60,
    healthText: healthTexts[healthTextIndex],
    generalReading: `The celestial alignment today brings ${moods[moodIndex].toLowerCase()} energy to your ${zodiacSigns.find(s => s.id === signId)?.element || 'cosmic'} nature.`,
    dailyAffirmation: affirmations[affirmationIndex],
    compatibleSign: compatibleSign?.name || 'Leo',
    avoidSign: avoidSign?.name || 'Capricorn',
    focusArea: focusAreas[focusIndex].area,
    focusEmoji: focusAreas[focusIndex].emoji,
    nakshatra: nakshatras[nakshatraIndex],
    tithi: tithis[tithiIndex],
  };
}