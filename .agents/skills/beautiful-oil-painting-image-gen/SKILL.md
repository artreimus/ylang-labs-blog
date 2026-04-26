---
name: beautiful-oil-painting-image-gen
description: Generate or prompt beautiful museum-quality oil-painting images. Use this skill whenever the user asks for an oil painting, classical painting, painterly portrait, landscape, still life, mythological scene, historical scene, Renaissance, Baroque, Romantic, Impressionist, Post-Impressionist, Symbolist, Dutch Golden Age, museum-quality artwork, or a photo transformed into an oil painting. Also use it when the user wants a refined image-generation prompt in an art-historical oil-painting style. Do not use it for logos, UI mockups, diagrams, photorealistic photography, or generic digital illustration unless the user explicitly asks for an oil-painting treatment.
---

# Beautiful Oil Painting Image Generation

Use this skill to create original oil-painting images or polished image-generation prompts that feel refined, intentional, and visually beautiful. The result should feel like an original painting that could belong in a museum, gallery, editorial spread, or premium private collection, not a generic AI image with a paint filter.

## Core Approach

Create original paintings inspired by the visual language of art history, not replicas of famous artworks.

Prioritize:

- Clear subject and focal point
- Strong composition
- Atmospheric lighting
- Specific color harmony
- Painterly brushwork and surface texture
- Emotional tone
- Art-historical context without copying
- Negative prompt details that prevent common image-generation artifacts

When the user asks to generate an image directly, generate the image through the available image-generation tool. Keep the response minimal. When the user asks for a prompt, provide the prompt only unless they ask for variations.

## Workflow

1. Identify the subject and intended use.
   - If the user gives a simple subject, enrich it with painterly specificity.
   - If the user provides a reference image, preserve the important likeness, pose, structure, and requested details.

2. Choose one dominant art direction.
   - Pick a recipe from the style recipes below or blend two compatible traditions.
   - Prefer movements and deceased historical artists as influence anchors.
   - For living artists, translate the request into broad traits instead of naming or imitating them.

3. Build the prompt with concrete visual controls.
   - Composition, lighting, color palette, brushwork, mood, setting, symbolic details, and negative prompt terms should all be explicit.

4. Generate or return the result.
   - If the user asked for an image, use the image-generation tool.
   - If the user asked for a prompt, return only a clean copy-ready prompt.
   - If the user asked for options, offer 3 to 5 concise directions.

## Artist And Style Guidelines

Use deceased historical artists and movements as broad inspiration when helpful:

- Renaissance: balanced composition, sfumato, graceful figures, humanist calm
- Baroque: chiaroscuro, theatrical staging, dramatic diagonals, emotional realism
- Dutch Golden Age: quiet interiors, window light, polished material detail
- Romanticism: sublime nature, storms, ruins, solitude, spiritual scale
- Impressionism: plein-air light, broken color, luminous atmosphere
- Post-Impressionism: impasto, rhythmic strokes, emotional color
- Symbolism: allegory, dream logic, mystical light, jewel-toned mystery
- Society portraiture: elegant posture, luminous fabrics, confident brushwork

Avoid asking the image model to recreate a specific famous painting exactly. Transform direct-copy requests into original compositions.

Examples:

- Instead of: `Recreate the Mona Lisa but with my cat`
  Use: `Create an original Renaissance-inspired oil portrait of a cat with serene sfumato lighting, balanced composition, and restrained earth tones.`
- Instead of: `Paint Starry Night over Manila`
  Use: `Create an original nocturne oil painting of Manila with expressive impasto, rhythmic sky movement, saturated blues and golds, and a poetic night atmosphere.`
- Instead of: `Make it like [living artist]`
  Use broad traits: `Create an original contemporary oil painting with bold color blocking, symbolic details, expressive brushwork, and a gallery-art mood.`

## Prompt Template

Use this structure for final prompts:

```text
Create an original museum-quality oil painting of [SUBJECT].

Composition: [framing, perspective, arrangement, focal point].
Lighting: [sfumato, chiaroscuro, golden hour, candlelight, window light, moonlight, storm light, or diffuse overcast].
Color palette: [specific colors, warmth/coolness, contrast].
Brushwork and surface: [impasto, glazing, broken color, fine detail, visible strokes, varnished canvas texture].
Art-historical inspiration: [movement or deceased historical influences, blended without copying a known work].
Mood: [emotion, atmosphere, narrative feeling].
Details: [costume, environment, symbolic objects, textures].
Quality: refined anatomy, cohesive color harmony, rich oil paint texture, elegant composition, gallery-worthy finish.
Avoid: text, watermark, signature, frame, low-resolution, blurry face, distorted hands, extra fingers, plastic skin, glossy digital look, photorealistic camera artifacts, copied famous composition, direct replica of an existing painting.
```

For portraits, add:

```text
Avoid: asymmetrical eyes, distorted mouth, uncanny smile, malformed hands, inaccurate anatomy.
```

For historical scenes, add:

```text
Avoid: anachronistic objects unless requested, costume inaccuracies, modern logos.
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
Avoid: direct copying of any known Renaissance painting, text, watermark, signature.
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

Use for expressive landscapes, portraits, cafes, night scenes, flowers, and emotional color studies.

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

## Subject Enhancement

When the user gives a simple subject, add concrete painting details while preserving the user intent.

Example:

User: `A woman reading by the window.`

Prompt:

```text
Create an original Dutch Golden Age inspired oil painting of a woman reading a letter beside a tall window in a quiet room. She is seated at a wooden table with a folded linen cloth, a small ceramic cup, and a vase of pale flowers. Soft morning light enters from the left, illuminating her face and hands while the room falls into gentle amber shadow. Use warm browns, ivory, muted ultramarine, and deep green. The brushwork should be delicate and realistic, with polished glazing, subtle canvas texture, and careful detail in the wood, fabric, paper, and skin. The mood is quiet, intimate, intelligent, and reflective. Avoid copied famous compositions, photorealistic camera effects, text, watermark, and signature.
```

## Reference Image Handling

If the user asks to turn their own image into an oil painting, preserve the subject's identity and requested details unless they ask for changes.

Use:

```text
Transform the provided image into an original museum-quality oil painting while preserving the subject's identity, facial structure, expression, pose, and overall likeness. Use [chosen style recipe]. Add rich oil-paint texture, elegant lighting, cohesive color harmony, and a refined gallery-worthy finish. Avoid changing the person's identity, distorting the face, altering eye direction, adding text, watermark, or signature.
```

## Quick Controls

Composition options:

- Portrait: bust, half-length, three-quarter, full-length
- Landscape: wide panoramic, vertical sublime scale, low horizon, high horizon
- Scene: single figure, group scene, triangular arrangement, diagonal movement
- Perspective: eye-level, low-angle heroic, elevated view, intimate close-up
- Focal point: face, hands, lantern, horizon, symbolic object, central figure

Lighting options:

- Sfumato: soft, smoky transitions
- Chiaroscuro: dramatic bright-dark contrast
- Tenebrism: extreme darkness with a strong illuminated subject
- Golden hour: warm sunset glow
- Candlelight: intimate warm illumination
- Window light: soft directional indoor light
- Moonlight: cool, mysterious, poetic
- Storm light: dramatic clouds and glowing breaks
- Diffuse overcast: gentle realism and muted mood

Brushwork options:

- Smooth glazing: refined Renaissance or Dutch realism
- Thick impasto: expressive Post-Impressionist energy
- Broken color: Impressionist outdoor light
- Loose confident strokes: elegant portraiture
- Atmospheric blending: Romantic landscapes
- Fine detailing: jewelry, glass, eyes, flowers, fabric
- Scumbled texture: aged, smoky, atmospheric surfaces

Palette options:

- Warm earth: umber, ochre, sienna, ivory, muted gold
- Venetian: crimson, deep blue, warm flesh tones, amber
- Dutch: brown, black, ivory, ultramarine, muted yellow
- Romantic: storm gray, deep blue, moss green, amber light
- Impressionist: lavender shadows, fresh greens, pale yellow, rose, sky blue
- Symbolist: violet, teal, gold, pearl, midnight blue
- Premium portrait: charcoal, ivory, navy, burgundy, warm bronze

## Response Behavior

- Generate the image directly when the user asks for an image.
- Provide only the prompt when the user asks for a prompt.
- Offer 3 to 5 concise options when the user asks for directions or styles.
- Choose a suitable art-historical direction automatically when the user provides only a subject.
- Do not over-explain image outputs; keep any accompanying text short.

## Quality Checklist

Before finalizing a prompt or image request, confirm it includes:

- Clear subject
- Specific composition
- Specific lighting
- Specific color palette
- Specific brushwork
- Mood and emotional direction
- Historical inspiration without copying
- Negative prompt terms
- Originality requirement

