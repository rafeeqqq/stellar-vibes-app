export interface ZodiacSign {
  id: string;
  name: string;
  symbol: string;
  dateRange: string;
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  color: string;
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
  generalReading: string;
}

export const zodiacSigns: ZodiacSign[] = [
  { id: 'aries', name: 'Aries', symbol: '♈', dateRange: 'Mar 21 - Apr 19', element: 'Fire', color: '#FF6B6B' },
  { id: 'taurus', name: 'Taurus', symbol: '♉', dateRange: 'Apr 20 - May 20', element: 'Earth', color: '#4ECDC4' },
  { id: 'gemini', name: 'Gemini', symbol: '♊', dateRange: 'May 21 - Jun 20', element: 'Air', color: '#FFE66D' },
  { id: 'cancer', name: 'Cancer', symbol: '♋', dateRange: 'Jun 21 - Jul 22', element: 'Water', color: '#95E1D3' },
  { id: 'leo', name: 'Leo', symbol: '♌', dateRange: 'Jul 23 - Aug 22', element: 'Fire', color: '#F9A826' },
  { id: 'virgo', name: 'Virgo', symbol: '♍', dateRange: 'Aug 23 - Sep 22', element: 'Earth', color: '#A8D8EA' },
  { id: 'libra', name: 'Libra', symbol: '♎', dateRange: 'Sep 23 - Oct 22', element: 'Air', color: '#FFB6C1' },
  { id: 'scorpio', name: 'Scorpio', symbol: '♏', dateRange: 'Oct 23 - Nov 21', element: 'Water', color: '#9B59B6' },
  { id: 'sagittarius', name: 'Sagittarius', symbol: '♐', dateRange: 'Nov 22 - Dec 21', element: 'Fire', color: '#E74C3C' },
  { id: 'capricorn', name: 'Capricorn', symbol: '♑', dateRange: 'Dec 22 - Jan 19', element: 'Earth', color: '#7F8C8D' },
  { id: 'aquarius', name: 'Aquarius', symbol: '♒', dateRange: 'Jan 20 - Feb 18', element: 'Air', color: '#3498DB' },
  { id: 'pisces', name: 'Pisces', symbol: '♓', dateRange: 'Feb 19 - Mar 20', element: 'Water', color: '#9B59B6' },
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
    generalReading: `The celestial alignment today brings ${moods[moodIndex].toLowerCase()} energy to your ${zodiacSigns.find(s => s.id === signId)?.element || 'cosmic'} nature.`,
  };
}