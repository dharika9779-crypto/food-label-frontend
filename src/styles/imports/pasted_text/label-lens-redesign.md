Redesign the LabelLens frontend with a STUNNING, award-worthy visual design.
Keep all functionality exactly the same but make it look like a premium 
health-tech product — something you'd see on Awwwards or Dribbble.

## VISUAL DIRECTION
Think: Futuristic medical lab meets premium consumer app
- NOT generic dark mode — this should feel ALIVE and expensive
- Glassmorphism cards with subtle blur and transparency
- Animated gradient mesh background (purple → teal → dark navy, slowly moving)
- Micro-animations on every interaction
- Everything feels tactile and responsive to hover/click

## COLOR PALETTE
- Background: Deep space black #080B14 with animated gradient mesh
- Cards: rgba(255,255,255,0.04) with backdrop-filter: blur(20px)
- Primary accent: Bright lime #AAFF45 — glowing, neon feel
- Secondary: Cyan #00E5FF
- Danger: Hot coral #FF3D5A
- Warning: Amber #FFB800
- Safe: Emerald #00E676
- Borders: rgba(255,255,255,0.08) — barely visible, elegant
- Text: Pure white #FFFFFF for headings, #8B95A8 for secondary

## TYPOGRAPHY
- Headings: "Space Grotesk" — bold, geometric, modern
- Body/labels: "JetBrains Mono" — technical, precise
- Import both from Google Fonts

## BACKGROUND
Animated gradient mesh that slowly shifts:
- Use CSS @keyframes with multiple radial gradients
- Colors: deep purple, dark teal, midnight blue blending together
- Very subtle movement — elegant, not distracting
- Add CSS noise texture overlay at 3% opacity for depth

## HEADER
- LabelLens logo with ⬡ hexagon icon in lime green
- Hexagon has a subtle glow/pulse animation
- Tagline in monospace: "Decode what's really in your food."
- Thin gradient line separator below header

## CARDS (all 3 steps)
- Glassmorphism: background rgba(255,255,255,0.03), blur(24px)
- Border: 1px solid rgba(255,255,255,0.07)
- Top border: 2px gradient line (lime to cyan) — premium feel
- Soft box shadow: 0 8px 32px rgba(0,0,0,0.4)
- Hover: card lifts slightly (translateY -2px), border brightens
- Step badges: small pill with gradient background

## UPLOAD ZONE (Step 1)
- Large dashed border zone with rounded corners
- Center: stacked layout — big camera icon, instruction text
- On hover: border glows lime, background gets slightly lighter
- Drag over state: animated pulsing lime border
- After image selected: smooth crossfade to image preview
- Image preview: rounded corners, subtle inner shadow
- "Extract Text" button:
  Full width, lime background, dark text
  On hover: glows, lifts, shadow spreads
  Loading state: shimmer animation inside button

## EXTRACTED TEXT BOX
- Dark glass textarea with monospace font
- Subtle inner glow on focus
- Character count in bottom right corner
- Smooth slide-down animation when it appears

## HEALTH PROFILE (Step 2)
- Diabetic toggle: custom pill toggle
  OFF: dark gray | ON: glowing lime with smooth slide
- Allergy pills: 
  Default: glass pill with subtle border
  Selected: gradient fill (lime to cyan), glowing border
  Hover: scale up slightly
- Section slides in from bottom with staggered animation

## SCORE RING (Step 3) — MAKE THIS SPECTACULAR
- Large SVG ring (180px) with animated stroke drawing
- Ring color changes based on score:
  80-100: bright emerald green with green glow
  60-79: cyan with cyan glow  
  40-59: amber with amber glow
  0-39: coral red with red glow
- Score number counts up from 0 to final value (counting animation)
- Grade letter appears with a pop/bounce animation
- Outer ring has subtle rotating gradient shimmer
- Verdict text fades in below

## COUNT CHIPS (4 boxes)
- Grid layout, glass cards
- Each has colored top border and matching icon
- Numbers animate counting up when results load
- Safe: emerald glow | Moderate: amber | Harmful: coral | Unknown: gray

## INGREDIENT CHIPS
- Pill shaped, glass background
- Color-coded with matching subtle glow
- Staggered fade-in animation (each chip appears 50ms after previous)
- Hover: lifts, glow intensifies, shows tooltip with category
- Safe: emerald | Moderate: amber | Harmful: coral/red | Unknown: muted

## WARNING CARDS
- Left border 3px gradient colored by type
- Glass background with very subtle tinted background
- Emoji icon prominent on left
- Allergy: red tint | Diabetic: amber tint | Harmful: deep red tint
- Each card slides in with slight delay

## GENERAL ADVICE BOX
- Gradient border (full outline, not just left)
- Icon + text layout
- Background tinted to match advice severity

## LOADING STATES
- Full screen overlay with animated background
- Center: spinning ring in lime color
- Pulsing status text below
- Backdrop blur on content behind

## BUTTONS
- Primary: lime background, dark text, full width
  Hover: glow effect, slight scale, shadow
  Active: slight press down
  Disabled: 30% opacity, no interactions
- Ghost/Reset: transparent, subtle border
  Hover: border glows, text turns lime

## ANIMATIONS SUMMARY
- Page load: staggered fade-up for header + cards
- Step transitions: smooth slide + fade
- Score ring: stroke draws in over 1.5 seconds
- Numbers: count up animation
- Ingredient chips: staggered cascade appearance  
- Warnings: slide in from left
- All hover states: 200ms ease transitions

## COMPONENTS (keep same structure)
1. ImageUploader.jsx
2. HealthProfile.jsx  
3. ScoreRing.jsx — with counting animation + glow
4. IngredientChip.jsx — with stagger prop
5. WarningCard.jsx
6. ResultsPanel.jsx
7. App.jsx

## API INTEGRATION (unchanged)
src/api.js:

async function uploadImage(file):
  POST http://127.0.0.1:8000/upload-image
  multipart/form-data, field: "file"
  returns: { success, text, used_fallback, error }

async function fullScan(rawText, isDiabetic, allergies):
  POST http://127.0.0.1:8000/full-scan
  JSON body: { raw_text, is_diabetic, allergies }
  returns: { classified, counts, health_score, personalisation }

## FINAL FEEL
When someone opens this app they should think:
"This looks like it cost $50,000 to build"
Every pixel intentional. Every animation purposeful.
Premium health-tech. Not a student project.