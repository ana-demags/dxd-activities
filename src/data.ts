export interface WheelItem {
  label: string;
  pillar?: string;
  purpose?: string;
  host?: string;
  hostRole?: string;
}

export const hosts: WheelItem[] = [
  { label: 'Ana' },
  { label: 'Brian' },
  { label: 'Ronan' },
  { label: 'Michelle' },
  { label: 'Daniel' },
  { label: 'Jay' },
  { label: 'Caydie' },
  { label: 'Parker' },
  { label: 'Tousue' },
  { label: 'Nohana' },


];

export const activities: WheelItem[] = [
  {
    label: 'Design remix live',
    pillar: 'Craft',
    purpose: 'Sharpen design instincts through group remixing and critique.',
    hostRole: 'Bring a familiar screen (from our product or a well-known app). Lead the group in brainstorming how we might remix it: what to change, simplify, or exaggerate. Wrap up by surfacing a few principles we uncovered along the way. It’s fast, playful, and full of shared insights about what makes design work.'
  },
  {
    label: 'Small UX treasures',
    pillar: 'Experience',
    purpose: 'Celebrate small moments of design excellence and understand why they work.',
    hostRole: 'Share a micro-interaction, flow, or piece of copy that made you smile. Guide the group in unpacking what makes it sing: Is it the tone, timing, emotion, the craft behind it, or all of the above? Close with one takeaway or quality we want to carry forward in our own work. Over time, these treasures can live in a shared “UX Treasure Chest” for future inspiration.'
  },
  {
    label: 'Future of X lightning session',
    pillar: 'AI & Experience',
    purpose: 'Imagine how our craft might evolve as technology and user expectations shift.',
    hostRole: 'Pick a topic like “The Future of Onboarding,” “The Future of Documentation,” or “The Future of Brand Voice.” Facilitate a 20-minute brainstorm around what might change and what should remain timeless. End by co-writing one sentence that captures the shared vision, like: “The future of onboarding feels like discovery, not instruction.”'
  },
  {
    label: 'AI sidekick roundtable',
    pillar: 'AI & Craft',
    purpose: 'Explore how AI can amplify, not replace, creative work.',
    hostRole: 'Kick off with a simple question: If an AI tool could take over one part of your process, which would you gladly delegate? Guide the discussion toward what feels exciting, what feels risky, and ethical implications and/or values we want to uphold. Wrap by documenting the takeaways.'
  },
  {
    label: 'Experience story hour',
    pillar: 'Experience & Research',
    purpose: 'Deepen empathy through real or observed stories of design impact.',
    hostRole: 'Share a short story (a user moment from our own research or a case study from another company that inspired you). Lead the conversation on what worked emotionally or experientially, and what it teaches us about users’ worlds. It’s about understanding people instead of being about critique.'
  },
  {
    label: 'Design debate lite',
    pillar: 'Craft & Philosophy',
    purpose: 'Playfully challenge assumptions and explore our shared design values.',
    hostRole: 'Open with a spicy take/statement like “Delight is nonsense” or “AI makes everyone mid.” Encourage the group to discuss for twenty minutes and see where the conversation takes us. Close with a quick write-up that captures where we landed.'
  },
  {
    label: 'Mystery product',
    pillar: 'Experience & Interpretation',
    purpose: 'Practice reading design intent and understanding how users perceive interfaces.',
    hostRole: 'Show a mysterious product screenshot, concept video, or AI-generated UI. Ask the group to guess what it does, who it’s for, and what emotion it evokes. Reveal the real intent (or make one up together). Wrap by reflecting on what cues shaped our assumptions, sharpening our intuition for how design communicates.'
  },
  {
    label: 'Research spotlight',
    pillar: 'Research & Experience',
    purpose: 'Keep the team connected to real user insights and learn together.',
    hostRole: 'Share one recent insight from user testing, analytics, or feedback (can be internal or external). Guide a quick discussion on what surprised us and how it might shape upcoming work. Finish with a simple question: “If we could prototype one response to this insight, what would it be?”'
  },
  {
    label: 'Teach us something',
    pillar: 'Craft',
    purpose: 'Build confidence and practice in teaching something clearly and concisely.',
    hostRole: 'A short mini-lesson on anything (work-related or random or something you\'re super interested in). Can be hands-on or conceptual.'
  },
  {
    label: 'Crazy 8s',
    pillar: 'Craft',
    purpose: 'Practice brainstorming without editing yourself. The goal is to push beyond your first idea, frequently the least innovative, and to generate a wide variety of solutions to your challenge.',
    hostRole: 'Based on the Design Sprint Methodology. A fast sketching exercise that challenges people to sketch eight distinct ideas in eight minutes. Pick a problem (can be work-related or random) and share with the group. Everyone needs a piece of paper (8.5x11) folded in eight sections. Start a timer for 8 minutes. Everyone sketches their ideas, one idea for each section. At the end, facilitate a show and tell for their favourite or wild ideas.'
  }
];
