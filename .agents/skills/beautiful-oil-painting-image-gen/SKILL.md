---
name: beautiful-oil-painting-image-gen
description: Generate or prompt beautiful museum-quality oil-painting images. Use this skill whenever the user asks for an oil painting, classical painting, painterly portrait, landscape, still life, mythological scene, historical scene, Renaissance, Baroque, Romantic, Impressionist, Post-Impressionist, Symbolist, Dutch Golden Age, museum-quality artwork, or a photo transformed into an oil painting. Also use it when the user wants a refined image-generation prompt in an art-historical oil-painting style. Do not use it for logos, UI mockups, diagrams, photorealistic photography, or generic digital illustration unless the user explicitly asks for an oil-painting treatment.
---

# Beautiful Oil Painting Image Generation

Use this skill when the user asks to generate a beautiful oil painting, classical painting, museum-quality artwork, painterly portrait, landscape, still life, historical scene, mythological scene, or emotionally rich visual inspired by famous oil-painting traditions.

The goal is to produce image-generation prompts that feel refined, intentional, and visually beautiful while avoiding direct imitation of living artists. For historical artists, the agent may reference broad stylistic inspiration, but should still synthesize a fresh composition rather than copying a known work.

## When to Use

Use this skill when the user asks for:

* An oil painting
* A classical or museum-quality artwork
* A portrait in a painterly style
* A dramatic landscape or seascape
* A Renaissance, Baroque, Romantic, Impressionist, Post-Impressionist, Symbolist, Realist, or Dutch Golden Age inspired image
* A scene inspired by famous painters or famous art movements
* A beautiful, premium, emotional, cinematic, or timeless painting-like image

Do not use this skill when the user asks for photorealistic photography, vector logos, UI design, diagrams, product mockups, or modern digital illustration unless they explicitly request an oil-painting treatment.

## Core Principle

Create original oil paintings inspired by the visual language of art history, not replicas of famous artworks.

The agent should combine:

* Subject clarity
* Strong composition
* Painterly brushwork
* Rich color harmony
* Atmospheric lighting
* Emotional tone
* Historical art references
* Modern image-prompt precision

## Artist Inspiration Guidelines

### Allowed Historical Inspiration

The agent may reference deceased historical artists and movements as inspiration, such as:

* Leonardo da Vinci: sfumato, gentle transitions, serene faces, balanced composition
* Michelangelo: sculptural anatomy, heroic physicality, monumental forms
* Caravaggio: chiaroscuro, dramatic light, intense realism, theatrical staging
* Rembrandt: warm shadows, expressive portraiture, psychological depth
* Vermeer: quiet interiors, soft window light, domestic intimacy
* Velázquez: elegant realism, subtle brushwork, noble restraint
* Rubens: dynamic movement, rich flesh tones, Baroque drama
* Turner: luminous atmosphere, storms, dissolving light, sublime landscapes
* Monet: broken color, plein-air light, atmospheric impression
* Renoir: soft warmth, luminous skin, joyful color
* Van Gogh: expressive impasto, swirling movement, emotional color
* Cézanne: structured forms, simplified planes, architectural composition
* Degas: unusual cropping, intimate candid moments, movement
* Sargent: confident brushwork, elegant portraiture, luminous fabrics
* Klimt: ornamental richness, gold accents, symbolic elegance
* Goya: psychological darkness, social tension, haunting atmosphere
* Botticelli: graceful figures, flowing lines, mythological elegance
* Titian: rich Venetian color, sensual warmth, painterly depth
* Delacroix: Romantic energy, saturated color, dramatic gesture
* Caspar David Friedrich: solitude, spiritual landscapes, sublime scale
* Whistler: tonal harmony, restrained mood, elegant minimalism

### Avoid Direct Copying

Do not ask the image model to recreate a specific famous painting exactly. Avoid prompts like:

* “Recreate the Mona Lisa but with...”
* “Paint Starry Night with my dog in it”
* “Make the exact composition of The Last Supper”

Instead, transform the request into:

* “A serene Renaissance-inspired portrait with sfumato lighting and balanced composition...”
* “A night landscape with expressive impasto brushwork, swirling sky movement, and emotional color...”
* “A dramatic group scene with Baroque chiaroscuro and theatrical staging...”

### Living Artist Rule

Do not directly imitate the style of living artists. If the user names a living artist, translate the request into broad visual traits.

Example:

User: “Make it like [living artist].”

Agent response/prompt approach:

“Create an original oil painting with expressive brushwork, bold color blocking, surreal symbolic details, and a contemporary gallery-art mood.”

## Default Prompt Template

Use this structure when creating the final image-generation prompt:

```text
Create an original museum-quality oil painting of [SUBJECT].

Composition: [framing, perspective, arrangement, focal point].
Lighting: [chiaroscuro, golden hour, candlelight, overcast, soft window light, moonlight].
Color palette: [specific palette, warmth/coolness, contrast].
Brushwork and surface: [impasto, glazing, fine detail, visible strokes, varnished canvas texture].
Art-historical inspiration: [movement or deceased artist influences, blended and not copied].
Mood: [emotion, atmosphere, narrative feeling].
Details: [costume, environment, symbolic elements, textures].
Quality: refined anatomy, cohesive color harmony, rich oil paint texture, elegant composition, gallery-worthy finish.
Avoid: photorealistic camera look, plastic skin, harsh digital artifacts, text, watermark, signature, copied famous composition.
```

## Style Recipes

### Renaissance Elegance

Use for serene portraits, mythological scenes, noble figures, and graceful compositions.

```text
Create an original museum-quality oil painting of [SUBJECT], inspired by Renaissance harmony and graceful humanism.
Composition: balanced triangular composition, calm posture, elegant hand placement, soft background depth.
Lighting: gentle sfumato transitions, warm natural light, delicate shadow modeling.
Color palette: muted earth tones, soft creams, deep greens, warm umbers, restrained gold accents.
Brushwork and surface: smooth glazing, subtle canvas texture, refined facial modeling.
Mood: serene, timeless, contemplative, noble.
Avoid: direct copying of any known Renaissance painting, modern clothing unless requested, text, watermark, signature.
```

### Baroque Drama

Use for intense scenes, heroic portraits, emotional narratives, conflict, candlelit interiors, or theatrical compositions.

```text
Create an original museum-quality Baroque-inspired oil painting of [SUBJECT].
Composition: dramatic diagonal movement, strong focal point, theatrical staging, layered depth.
Lighting: intense chiaroscuro, single warm light source, deep shadows, glowing highlights.
Color palette: black-brown shadows, crimson, ochre, warm ivory, burnished gold.
Brushwork and surface: rich glazing, realistic textures, expressive faces, tactile fabric and skin.
Mood: powerful, cinematic, emotional, sacred, tense.
Avoid: copied famous compositions, flat lighting, digital smoothness, text, watermark, signature.
```

### Dutch Golden Age Interior

Use for quiet rooms, domestic moments, studies, libraries, craftspeople, letters, musicians, and intimate portraits.

```text
Create an original Dutch Golden Age inspired oil painting of [SUBJECT].
Composition: quiet interior scene, strong geometry, window light from one side, intimate human scale.
Lighting: soft natural window light, gentle shadows, luminous highlights on fabric, glass, wood, and skin.
Color palette: warm browns, ivory, ultramarine accents, muted yellow, deep green.
Brushwork and surface: delicate realism, polished glazing, subtle texture, careful material detail.
Mood: quiet, intimate, intelligent, reflective, poetic.
Avoid: modern clutter, harsh contrast, copied famous compositions, text, watermark, signature.
```

### Romantic Sublime Landscape

Use for mountains, oceans, storms, ruins, moonlit scenes, wanderers, and awe-inspiring nature.

```text
Create an original Romantic-era inspired oil landscape of [SUBJECT].
Composition: vast scale, small human figure or focal element, layered depth, sweeping horizon.
Lighting: dramatic sky, glowing mist, storm breaks, moonlight, or sunset radiance.
Color palette: deep blues, smoky grays, amber light, moss green, muted earth tones.
Brushwork and surface: atmospheric blending, expressive clouds, textured rocks and water.
Mood: sublime, lonely, spiritual, vast, mysterious.
Avoid: tourist-photo realism, over-sharp digital detail, copied famous landscapes, text, watermark, signature.
```

### Impressionist Light

Use for gardens, city streets, rivers, cafes, daily life, and luminous outdoor scenes.

```text
Create an original Impressionist-inspired oil painting of [SUBJECT].
Composition: natural candid framing, open-air atmosphere, lively but balanced arrangement.
Lighting: bright plein-air light, shifting reflections, soft shadows, luminous atmosphere.
Color palette: broken complementary colors, pastel highlights, fresh greens, lavender shadows, warm sunlight.
Brushwork and surface: visible broken brushstrokes, soft edges, lively paint texture.
Mood: joyful, fleeting, airy, elegant, full of light.
Avoid: overly detailed photorealism, harsh outlines, copied famous compositions, text, watermark, signature.
```

### Post-Impressionist Emotion

Use for expressive landscapes, portraits, cafés, night scenes, flowers, and emotional color studies.

```text
Create an original Post-Impressionist inspired oil painting of [SUBJECT].
Composition: bold shapes, rhythmic movement, expressive perspective, strong silhouette.
Lighting: emotionally heightened light rather than literal realism.
Color palette: saturated blues, yellows, greens, oranges, high emotional contrast.
Brushwork and surface: thick impasto, directional strokes, visible paint ridges, energetic texture.
Mood: intense, poetic, restless, luminous, deeply human.
Avoid: direct copying of any famous painting, exact starry-sky motifs, text, watermark, signature.
```

### Elegant Society Portrait

Use for premium portraits, professional portraits, fashion-like oil paintings, and formal image requests.

```text
Create an original elegant society oil portrait of [SUBJECT].
Composition: three-quarter portrait, confident posture, graceful negative space, refined background.
Lighting: soft directional studio light, luminous skin, subtle rim light, gentle shadow depth.
Color palette: ivory, charcoal, deep navy, burgundy, muted gold, warm skin tones.
Brushwork and surface: confident painterly strokes, refined face detail, loose expressive clothing and background.
Mood: sophisticated, calm, intelligent, premium, timeless.
Avoid: plastic skin, over-smoothed digital look, exaggerated facial features, text, watermark, signature.
```

### Symbolist Dream Painting

Use for myth, fantasy, dreams, allegory, spiritual themes, and poetic surreal imagery.

```text
Create an original Symbolist-inspired oil painting of [SUBJECT].
Composition: poetic arrangement, symbolic objects, graceful silhouette, dreamlike spatial depth.
Lighting: soft mystical glow, moonlight, candlelight, or diffuse ethereal illumination.
Color palette: jewel tones, muted gold, deep violet, blue-green shadows, pearlescent highlights.
Brushwork and surface: smooth glazing mixed with delicate ornamental details and visible canvas texture.
Mood: mysterious, sacred, dreamlike, melancholic, enchanted.
Avoid: literal fantasy-game rendering, cheap digital glow, copied famous compositions, text, watermark, signature.
```

## Subject Enhancement Rules

When the user gives a simple subject, enrich it with painterly specificity.

Example:

User: “A woman reading by the window.”

Enhanced prompt:

```text
Create an original Dutch Golden Age inspired oil painting of a woman reading a letter beside a tall window in a quiet room. She is seated at a wooden table with a folded linen cloth, a small ceramic cup, and a vase of pale flowers. Soft morning light enters from the left, illuminating her face and hands while the room falls into gentle amber shadow. Use warm browns, ivory, muted ultramarine, and deep green. The brushwork should be delicate and realistic, with polished glazing, subtle canvas texture, and careful detail in the wood, fabric, paper, and skin. The mood is quiet, intimate, intelligent, and reflective. Avoid copied famous compositions, photorealistic camera effects, text, watermark, and signature.
```

## Composition Controls

Use these when needed:

* Portrait: bust, half-length, three-quarter, full-length
* Landscape: wide panoramic, vertical sublime scale, low horizon, high horizon
* Scene: single figure, group scene, triangular arrangement, diagonal movement
* Perspective: eye-level, low-angle heroic, elevated view, intimate close-up
* Focal point: face, hands, lantern, horizon, symbolic object, central figure

## Lighting Controls

Choose one dominant lighting style:

* Sfumato: soft, smoky transitions
* Chiaroscuro: dramatic bright-dark contrast
* Tenebrism: extreme darkness with a strong illuminated subject
* Golden hour: warm sunset glow
* Candlelight: intimate warm illumination
* Window light: soft directional indoor light
* Moonlight: cool, mysterious, poetic
* Storm light: dramatic clouds and glowing breaks
* Diffuse overcast: gentle realism and muted mood

## Brushwork Controls

Use brushwork intentionally:

* Smooth glazing: refined Renaissance or Dutch realism
* Thick impasto: expressive Post-Impressionist energy
* Broken color: Impressionist outdoor light
* Loose confident strokes: elegant portraiture
* Atmospheric blending: Romantic landscapes
* Fine detailing: jewelry, glass, eyes, flowers, fabric
* Scumbled texture: aged, smoky, atmospheric surfaces

## Color Palette Controls

Use specific color language:

* Warm earth palette: umber, ochre, sienna, ivory, muted gold
* Venetian palette: crimson, deep blue, warm flesh tones, amber
* Dutch palette: brown, black, ivory, ultramarine, muted yellow
* Romantic palette: storm gray, deep blue, moss green, amber light
* Impressionist palette: lavender shadows, fresh greens, pale yellow, rose, sky blue
* Symbolist palette: violet, teal, gold, pearl, midnight blue
* Premium portrait palette: charcoal, ivory, navy, burgundy, warm bronze

## Negative Prompt Additions

Always include relevant avoidance terms when generating prompts:

```text
Avoid: text, watermark, signature, frame, low-resolution, blurry face, extra fingers, distorted hands, plastic skin, glossy digital look, photorealistic camera artifacts, copied famous composition, direct replica of an existing painting.
```

For portraits, add:

```text
Avoid: asymmetrical eyes, distorted mouth, uncanny smile, malformed hands, inaccurate anatomy.
```

For historical scenes, add:

```text
Avoid: anachronistic objects unless requested, costume inaccuracies, modern logos.
```

## User Image Handling

If the user asks to turn their own photo into an oil painting, use the current image as the visual reference and preserve the person’s identity, facial structure, pose, and key features unless they ask for changes.

Prompt pattern:

```text
Transform the provided image into an original museum-quality oil painting while preserving the subject’s identity, facial structure, expression, pose, and overall likeness. Use [chosen style recipe]. Add rich oil-paint texture, elegant lighting, cohesive color harmony, and a refined gallery-worthy finish. Avoid changing the person’s identity, distorting the face, altering eye direction, adding text, watermark, or signature.
```

## Response Behavior

When the user asks to generate an image directly, generate the image. Do not over-explain.

When the user asks for a prompt, provide only the prompt unless they ask for variations.

When the user asks for style options, offer 3 to 5 concise options.

When the user provides only a subject, choose a suitable art-historical direction automatically.

## Example Outputs

### Example 1: Mythic Portrait

```text
Create an original museum-quality oil painting of a young oracle standing in a marble temple at dusk, holding a shallow bronze bowl filled with glowing water. The composition uses a graceful triangular arrangement, with the oracle centered and columns receding into mist behind her. Lighting is soft and mystical, with warm candlelight on her face and cool violet twilight in the background. The color palette combines ivory, muted gold, deep violet, blue-green shadows, and pearlescent highlights. The brushwork blends smooth glazing for the face and hands with visible painterly texture in the robes, stone, and mist. Inspired by Renaissance harmony, Symbolist mystery, and Venetian color, while remaining an original composition. The mood is sacred, dreamlike, calm, and prophetic. Avoid text, watermark, signature, copied famous composition, plastic skin, distorted hands, and digital glow.
```

### Example 2: Storm Landscape

```text
Create an original Romantic-era inspired oil painting of a lone traveler standing on a cliff above a stormy sea. The composition emphasizes vast scale, with the small figure in the foreground and enormous waves crashing below. A break in the storm clouds releases amber sunlight across the water, while the sky remains deep blue-gray and turbulent. Use atmospheric blending, textured rocks, expressive clouds, and luminous mist. The color palette includes storm gray, deep Prussian blue, moss green, burnt umber, and radiant gold light. The mood is sublime, lonely, spiritual, and awe-inspiring. Avoid tourist-photo realism, copied famous landscapes, text, watermark, signature, and over-sharp digital detail.
```

### Example 3: Premium Professional Portrait

```text
Create an original elegant society oil portrait of a confident AI engineer seated beside a dark wooden desk, with a subtle abstract diagram glowing faintly in the background like a painted motif rather than a screen. Use a three-quarter portrait composition, calm posture, refined negative space, and a softly textured studio backdrop. Lighting is soft and directional, with luminous skin, gentle shadow depth, and a subtle rim light. The color palette includes charcoal, ivory, deep navy, burgundy, muted gold, and warm bronze. Brushwork should be confident and painterly, with refined face detail and looser expressive strokes in the clothing and background. The mood is sophisticated, intelligent, premium, and timeless. Avoid plastic skin, exaggerated facial features, copied famous compositions, text, watermark, signature, and digital UI elements.
```

## Quality Checklist

Before finalizing the prompt, confirm it includes:

* Clear subject
* Specific composition
* Specific lighting
* Specific color palette
* Specific brushwork
* Mood and emotional direction
* Historical inspiration without copying
* Negative prompt terms
* Originality requirement

## Final Instruction

Always aim for beauty, taste, and restraint. The output should feel like an original painting that could belong in a museum or premium private collection, not a generic AI image with a paint filter.
