# CHANGELOG

## [Unreleased]

### Added
- **TypingEffect Component:** Imported from `infolufan` project to create dynamic text animations for H1 and H2 titles.
- **Placeholder Images:** Replaced static gray boxes with random images from `picsum.photos` in Projects, Gallery, and News sections.
- **Image Domain Config:** Updated `next.config.ts` to allow `picsum.photos`.

### Changed
- **Mobile Typography:** Adjusted H1 and H2 font sizes (`text-3xl`, `text-2xl`) to prevent overflow on mobile devices while maintaining large text on desktop.
- **Hero Animation:** Removed conflicting GSAP text reveal in favor of `TypingEffect`.
- **Refactoring:** Updated `page.tsx` to use `next/image` component for optimized image rendering.
