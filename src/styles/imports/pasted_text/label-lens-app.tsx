Build a complete, professional React + Tailwind CSS frontend for an 
"AI Ingredient Transparency System" web app called LabelLens.

## DESIGN STYLE
- Dark theme (dark navy/charcoal background)
- Neon green (#b8ff57) as primary accent color
- Electric blue (#57c8ff) as secondary accent
- Monospace font for labels and data, bold display font for headings
- Clean, modern, card-based layout
- Smooth animations on results appearance

## APP FLOW (3 Steps)
The app has 3 sections that appear one by one:

### STEP 1 — Upload Food Label
- Large drag-and-drop image upload zone with camera emoji
- Shows image preview after selection
- "Extract Text" button (disabled until image selected)
- After OCR: shows extracted text in an editable textarea
- Small warning notice if OCR failed (fallback demo text used)

### STEP 2 — Health Profile
- Toggle switch: "I am diabetic"
- Pill-style checkboxes for allergies:
  Gluten, Dairy, Tree Nuts, Peanuts, Soy, Eggs, Shellfish, Fish, Sesame, Sulfites
- "Analyse Ingredients" button

### STEP 3 — Results
- Animated circular score ring (0-100) with grade letter (A/B/C/D/F) in center
- Verdict text below ring
- 4 count chips: Safe (green), Moderate (yellow), Harmful (red), Unknown (gray)
- Ingredient chips — color coded:
    Green chip = safe
    Yellow chip = moderate  
    Red chip = harmful
    Gray chip = unknown
- Personalised warnings section:
    Red border cards = allergy alerts
    Yellow border cards = diabetic warnings
    Dark red border cards = harmful ingredient warnings
- General advice box at bottom
- "Scan Another Product" reset button

## BACKEND API (FastAPI running on http://127.0.0.1:8000)

### API 1 — OCR (called in Step 1)
POST http://127.0.0.1:8000/upload-image
- Request: multipart/form-data with field "file" (image file)
- Response:
{
  "success": true,
  "text": "INGREDIENTS: sugar, water, ...",
  "error": null,
  "used_fallback": false
}

### API 2 — Full Analysis (called in Step 2)
POST http://127.0.0.1:8000/full-scan
- Request (JSON):
{
  "raw_text": "INGREDIENTS: sugar, water...",
  "is_diabetic": true,
  "allergies": ["gluten", "dairy"]
}
- Response:
{
  "ingredients_list": ["sugar", "water", ...],
  "classified": [
    {"name": "sugar", "category": "safe"},
    {"name": "high fructose corn syrup", "category": "harmful"}
  ],
  "counts": {
    "safe": 5,
    "moderate": 3,
    "harmful": 2,
    "unknown": 1
  },
  "health_score": {
    "normalised": 72,
    "grade": "B",
    "verdict": "Good – a few things to watch"
  },
  "personalisation": {
    "diabetic_warnings": ["⚠️ Sugar may raise blood sugar levels..."],
    "allergy_warnings": ["🚨 ALLERGY ALERT (GLUTEN): Contains Wheat Flour..."],
    "harmful_warnings": ["☠️ High Fructose Corn Syrup is classified as harmful..."],
    "general_advice": "🟡 This product is acceptable but has some ingredients to watch."
  }
}

## COMPONENTS TO BUILD
Create these separate components:
1. ImageUploader.jsx — drag drop + preview + extract text button
2. HealthProfile.jsx — diabetic toggle + allergy pills
3. ScoreRing.jsx — animated SVG circle with score + grade
4. IngredientChip.jsx — single colored chip
5. WarningCard.jsx — single warning with colored border
6. ResultsPanel.jsx — assembles score + chips + warnings + advice
7. App.jsx — main file, manages all state, calls both APIs

## STATE MANAGEMENT (in App.jsx)
- selectedFile — uploaded image file
- extractedText — OCR result text
- isDiabetic — boolean
- allergies — array of strings
- analysisResult — full /full-scan response
- loading — boolean for loader spinner
- currentStep — 1, 2, or 3

## API INTEGRATION
- Use axios for all API calls
- Create src/api.js with two functions:
  1. uploadImage(file) — calls /upload-image
  2. fullScan(text, isDiabetic, allergies) — calls /full-scan
- Show loading spinner during API calls
- Show error messages if API fails

## EXTRA DETAILS
- App name: LabelLens with a hexagon icon ⬡
- Tagline: "Decode what's really in your food."
- Step badges: 01, 02, 03
- Reset button clears everything and goes back to Step 1
- Mobile responsive
- No backend changes needed — only frontend