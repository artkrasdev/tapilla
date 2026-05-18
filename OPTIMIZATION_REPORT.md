# Image & Video Performance Optimization Report

## Executive Summary

Current image/video implementation has several optimization opportunities. The site uses a mix of Next.js Image component and regular `<img>` tags, with minimal lazy loading and no modern formats (AVIF). Videos lack loading strategies and compression optimization.

---

## Current State Analysis

### Image Formats Found
| Format | Count | Size Range | Notes |
|--------|-------|------------|-------|
| WebP | 9 | 26KB - 211KB | ✅ Modern format |
| JPG | 2 | 358KB - 650KB | ❌ Should convert to WebP/AVIF |
| PNG | 2 | 3.5KB - 8.8KB | Icons - acceptable |
| SVG | 5 | <2KB | ✅ Perfect for icons |
| MP4 | 3 | 568KB - 1.1MB | Videos - need optimization |
| WebM | 1 | 3.9MB | Large background video |

### Component Usage Patterns

#### ✅ Good Practices Found:
1. **HeroSlider.tsx** - Uses Next.js Image with `priority` for first slide
2. **PackshotsSection.tsx** - Uses Next.js Image with proper `sizes` attribute
3. **PhotoSlider.tsx** - Uses Next.js Image with explicit dimensions

#### ❌ Issues Found:
1. **AgencyTabs.tsx** - Uses regular `<img>` instead of Next.js Image (lines 102-107)
2. **WhatWeDoSection.tsx** - Uses regular `<img>` for SVG icons (lines 139, 159, 203, 226)
3. **LogoMarquee.tsx** - Uses regular `<img>` with `loading="lazy"` but no Next.js optimization
4. **HeroSlider.tsx** - Same image repeated 3 times with different alt text (lines 9-13)

---

## Critical Optimizations Needed

### 1. Convert JPG to WebP/AVIF (HIGH PRIORITY)

**Files to convert:**
- `/public/hero-card.jpg` (650KB)
- `/public/og-image.jpg` (358KB)

**Recommendation:**
```bash
# Use sharp or squoosh for conversion
# Target: hero-card.webp (should be ~80-120KB)
# Target: og-image.webp (should be ~50-80KB)
```

### 2. Fix AgencyTabs Component (HIGH PRIORITY)

**Current issue:** Using regular `<img>` without optimization
**Location:** `components/AgencyTabs.tsx:102-107`

**Recommendation:**
- Convert images to Next.js Image component
- Add lazy loading for non-active tabs
- Implement blur placeholder

### 3. Video Optimization (HIGH PRIORITY)

**Current videos:**
- `/public/theagency.webm` (3.9MB) - Auto-plays on agency page
- `/public/examples-ai/*.mp4` (568KB - 1.1MB each) - Auto-play in grid

**Issues:**
- No poster images for videos
- No lazy loading for below-fold videos
- Large file sizes

**Recommendations:**
1. Compress theagency.webm (target: <1MB)
2. Add poster images to all videos
3. Implement intersection observer for lazy loading
4. Provide fallback formats (MP4 for WebM)

### 4. Next.js Image Configuration (MEDIUM PRIORITY)

**Current next.config.ts:** Empty configuration

**Add image optimization:**
```typescript
const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};
```

### 5. Hero Slider Optimization (MEDIUM PRIORITY)

**Current issue:** Same image loaded 3 times

**Fix:** Use different images or same image with same alt
```typescript
const SLIDE_IMAGES = [
  { src: "/hero-1.webp", alt: "Tapilla portfolio", priority: true },
  { src: "/hero-2.webp", alt: "E-commerce design", priority: false },
  { src: "/hero-3.webp", alt: "Shopify development", priority: false },
];
```

---

## Recommended Implementation Plan

### Phase 1: Critical (Do First)
1. Convert hero-card.jpg and og-image.jpg to WebP
2. Fix AgencyTabs.tsx to use Next.js Image
3. Add video poster images
4. Update next.config.ts with image formats

### Phase 2: Important
1. Implement video lazy loading with Intersection Observer
2. Add blur placeholders to all images
3. Optimize LogoMarquee with Next.js Image
4. Compress theagency.webm

### Phase 3: Polish
1. Implement AVIF format
2. Fine-tune sizes attributes
3. Add preconnect hints for external resources

---

## Expected Performance Gains

| Metric | Current | After Optimization | Improvement |
|--------|---------|-------------------|-------------|
| Total Image Size | ~2.1MB | ~800KB | 62% reduction |
| Largest Contentful Paint | ~2.5s | ~1.2s | 52% faster |
| Video Load Impact | High | Minimal | Lazy loaded |
| Cumulative Layout Shift | Medium | Low | Proper sizing |

---

## Quick Wins (Can Implement Now)

1. **Add sizes to PhotoSlider images:**
   ```tsx
   sizes="(max-width: 640px) 280px, (max-width: 768px) 340px, 416px"
   ```

2. **Enable AVIF in next.config.ts:**
   ```typescript
   formats: ['image/avif', 'image/webp']
   ```

3. **Add loading="lazy" to all below-fold images:**
   Already partially done, extend to all components

4. **Add priority to above-fold images:**
   - HeroSlider first slide ✅
   - Header logo ❌ (needs adding)
   - PackshotsSection ❌ (if above fold)

---

## Implementation Files Priority

1. `next.config.ts` - Add image configuration
2. `components/AgencyTabs.tsx` - Fix image implementation
3. `app/[locale]/agency/page.tsx` - Add video poster
4. `components/VideoCapsulesSection.tsx` - Add lazy loading
5. `components/LogoMarquee.tsx` - Optimize logo loading

---

## Tools for Implementation

- **Image conversion:** `sharp` npm package, Squoosh.app, or `cwebp` CLI
- **Video compression:** HandBrake, FFmpeg
- **Performance testing:** Lighthouse, WebPageTest, Chrome DevTools
- **Format checking:** `file` command, image-size npm package

---

*Report generated: May 18, 2026*
*Next review: After implementing Phase 1*
