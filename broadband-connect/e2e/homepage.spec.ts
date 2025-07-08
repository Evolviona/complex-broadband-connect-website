import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load and display hero section', async ({ page }) => {
    // Check hero section loads
    await expect(page.locator('section[aria-label="Hero section"]')).toBeVisible();
    
    // Check main headline
    await expect(page.locator('h1')).toContainText('Powering the Next Generation');
    await expect(page.locator('h1')).toContainText('of Technicians');
    
    // Check subheadline
    await expect(page.locator('p')).toContainText('Accredited Telecommunications Training');
  });

  test('should have accessible navigation', async ({ page }) => {
    // Check skip link
    const skipLink = page.locator('.skip-link');
    await expect(skipLink).toBeHidden();
    
    // Focus skip link with keyboard
    await page.keyboard.press('Tab');
    await expect(skipLink).toBeVisible();
    
    // Check navigation landmark
    await expect(page.locator('nav[role="navigation"]')).toBeVisible();
  });

  test('should display CTA buttons', async ({ page }) => {
    // Check primary CTA
    const primaryCTA = page.locator('text="View Courses"');
    await expect(primaryCTA).toBeVisible();
    await expect(primaryCTA).toHaveAttribute('href', '/courses');
    
    // Check secondary CTA
    const secondaryCTA = page.locator('text="Get in Touch"');
    await expect(secondaryCTA).toBeVisible();
    await expect(secondaryCTA).toHaveAttribute('href', '/contact');
  });

  test('should show trust badges', async ({ page }) => {
    // Wait for dynamic content to load
    await page.waitForSelector('[role="list"][aria-label="Credentials and certifications"]');
    
    // Check trust badges are visible
    await expect(page.locator('text="AQF"')).toBeVisible();
    await expect(page.locator('text="NRT"')).toBeVisible();
    await expect(page.locator('text="Skills Assure"')).toBeVisible();
    await expect(page.locator('text="ACMA"')).toBeVisible();
  });

  test('should have proper SEO metadata', async ({ page }) => {
    // Check title
    await expect(page).toHaveTitle(/Broadband Connect.*Telecommunications Training/);
    
    // Check meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /telecommunications training.*accredited/i);
    
    // Check Open Graph tags
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /Broadband Connect/);
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check hero content is still visible
    await expect(page.locator('h1')).toBeVisible();
    
    // Check mobile menu button appears
    const mobileMenuButton = page.locator('button[aria-controls="mobile-menu"]');
    await expect(mobileMenuButton).toBeVisible();
    
    // Test mobile menu functionality
    await mobileMenuButton.click();
    await expect(page.locator('#mobile-menu')).toBeVisible();
    
    // Check mobile menu items
    await expect(page.locator('#mobile-menu a[href="/"]')).toContainText('Home');
    await expect(page.locator('#mobile-menu a[href="/courses"]')).toContainText('Courses');
  });

  test('should handle keyboard navigation', async ({ page }) => {
    // Start keyboard navigation
    await page.keyboard.press('Tab'); // Skip link
    await page.keyboard.press('Tab'); // Logo
    await page.keyboard.press('Tab'); // First nav item
    
    // Check focus is on navigation
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toHaveAttribute('href', '/');
    
    // Continue tabbing through navigation
    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toHaveAttribute('href', '/courses');
  });

  test('should support reduced motion preferences', async ({ page }) => {
    // Set reduced motion preference
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.reload();
    
    // Check that animations are disabled or minimal
    const heroSection = page.locator('section[aria-label="Hero section"]');
    await expect(heroSection).toBeVisible();
    
    // Verify particle background is not rendered with reduced motion
    const particleCanvas = page.locator('canvas');
    const canvasCount = await particleCanvas.count();
    expect(canvasCount).toBe(0); // Should not render particles
  });

  test('should load efficiently', async ({ page }) => {
    // Measure performance
    const startTime = Date.now();
    await page.goto('/');
    await page.locator('h1').waitFor();
    const loadTime = Date.now() - startTime;
    
    // Check load time is reasonable (less than 3 seconds)
    expect(loadTime).toBeLessThan(3000);
    
    // Check no console errors
    const messages = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        messages.push(msg.text());
      }
    });
    
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    expect(messages).toHaveLength(0);
  });

  test('should track analytics events', async ({ page }) => {
    // Mock gtag function
    await page.addInitScript(() => {
      (window as any).gtag = function(...args: any[]) {
        (window as any).__gtag_calls = (window as any).__gtag_calls || [];
        (window as any).__gtag_calls.push(args);
      };
    });
    
    // Click CTA button
    await page.locator('text="View Courses"').click();
    
    // Check analytics tracking
    const gtagCalls = await page.evaluate(() => (window as any).__gtag_calls);
    expect(gtagCalls).toBeDefined();
    expect(gtagCalls.length).toBeGreaterThan(0);
  });
});