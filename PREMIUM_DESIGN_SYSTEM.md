# MindScoreAI Premium Design System

## Overview
Comprehensive premium UI/UX overhaul implementing glassmorphism, luxury design principles, and smooth animations with full dark/light mode support.

## Color System

### Light Mode (Premium Violet & Cream)
- **Primary**: #7C6AE6 (Calm Violet)
- **Secondary**: #E8E4F7 (Soft Lavender)
- **Accent**: #9F8CFF (Light Purple)
- **Success**: #5FA76F (Balanced Green)
- **Background**: #FAF9FF (Cream White)
- **Surface**: #FFFFFF (Pure White)
- **Text Primary**: #1F1A2E (Deep Navy)
- **Text Secondary**: #7B7587 (Muted Gray)

### Dark Mode (AMOLED Premium)
- **Primary**: #9A8BFF (Bright Violet)
- **Secondary**: #1A1728 (Deep Charcoal)
- **Accent**: #B8ACFF (Light Lavender)
- **Success**: #6BB880 (Emerald)
- **Background**: #000000 (Pure Black AMOLED)
- **Surface**: #0F0D1A (Deep Black)
- **Text Primary**: #F8F6FF (Off-White)
- **Text Secondary**: #C4C0CE (Light Gray)

## Typography
- **Headings**: Bold, 1.2 line-height
- **Body**: Regular, 1.5 line-height (leading-relaxed)
- **Font Stack**: System fonts with fallback

## Spacing & Radius
- **Radius**: 1.25rem (20px) for cards, 9999px (full) for buttons
- **Padding**: Using Tailwind spacing scale (4px, 6px, 8px, 12px, 16px, etc.)
- **Gap**: Using Tailwind gap classes for consistent spacing

## Motion & Animations

### Motion Tokens
- **Press**: 120ms (touch interactions)
- **Transition**: 240ms (hover, active states)
- **Reveal**: 600ms (page load, section reveal)
- **Easing**: cubic-bezier(0.4, 0, 0.2, 1) (material smooth)

### Keyframe Animations
- **fadeInUp**: Slides up with fade for entrance
- **fadeInScale**: Scales up with fade for component reveal
- **shimmer**: Loading state animation

## Visual Effects

### Glassmorphism
- Backdrop blur: 12px
- Background opacity: 0.7 (light), 0.5 (dark)
- Creates premium, floating effect

### Shadows
- **Light Elevation**: `shadow-lg shadow-primary/20`
- **Medium Elevation**: `shadow-xl shadow-primary/15`
- **Heavy Elevation**: `shadow-2xl shadow-primary/25`
- Shadows always use primary color for cohesion

### Gradients
- **Primary to Accent**: `from-primary via-accent to-primary`
- **Muted Background**: `from-primary/5 to-transparent`
- **Button Hover**: Scale to 105% with shadow increase

## Component Enhancements

### Buttons
- Rounded full (pill shape)
- Shadow with primary color
- Scale on hover (105%)
- Smooth transitions
- Support for outlined, ghost variants

### Cards
- Rounded 3xl (48px)
- Border with opacity (50%)
- Hover: border primary color, shadow enhancement
- Gradient overlay on hover (subtle)
- Transition on all properties

### Navigation
- Desktop: Sidebar with gradient logo, active state highlights
- Mobile: Bottom nav with glassmorphic background
- Icons scale on hover
- Active states use gradient backgrounds

### Forms & Inputs
- Rounded 2xl (32px)
- Background color change on focus
- Border animation to primary on focus
- Ring effect with primary/20 opacity
- Smooth transitions

## Pages Enhanced

### Landing Page (`/`)
- **Hero Section**: Animated background elements, gradient text, smooth entrance
- **Features Section**: Cards with hover effects, gradient accents
- **Stats Section**: Animated counters with card background
- **Safety Section**: Animated pulse circles, premium layout
- **Social Proof**: Card-based stats with hover effects
- **CTA Section**: Centered with background gradient
- **Footer**: Multi-column layout with hover states

### Onboarding (`/onboarding`)
- **Step Indicators**: Animated progress bars
- **Content**: Smooth fade transitions between steps
- **Icons**: Large, gradient backgrounds
- **Buttons**: Full-width with rounded pills
- **Background**: Animated floating circles

### Dashboard (`/app`)
- **Header**: Glassmorphic with gradient logo
- **Layout**: Sidebar (desktop) + Bottom nav (mobile)
- **Stats Cards**: Quick overview with colored icons
- **Check-in Form**: Premium textarea with focus states
- **Results**: Gradient card with success styling

### Score Page (`/app/score`)
- **Animated Score**: Circular progress with gradient
- **Result Cards**: Gradient backgrounds with icons
- **CTA Buttons**: Full-width with hover effects
- **Background**: Animated pulse elements

## Accessibility Features
- Semantic HTML structure
- ARIA labels on interactive elements
- Proper color contrast ratios
- Focus states for keyboard navigation
- Safe area insets for mobile notch support
- Reduced motion support (`prefers-reduced-motion`)

## Browser Support
- Modern browsers with CSS Grid, Flexbox, Backdrop Filter
- Fallbacks for older browsers
- Mobile-optimized (iOS Safari, Chrome Mobile)

## Performance Optimizations
- GPU-accelerated animations (transforms, opacity)
- Lazy-loaded background elements
- Efficient CSS with Tailwind
- Icon optimization (Lucide React)
- Smooth scrolling behavior

## Dark Mode Implementation
- Uses `next-themes` for persistence
- System preference detection
- Smooth theme transitions
- All colors automatically adjust
- Icons change color based on theme

## Future Enhancements
- Advanced micro-interactions
- Page transition animations
- Scroll-triggered animations
- Skeleton loading states
- More gradient variations
- Custom cursor effects
