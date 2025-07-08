import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CTAButton from '../CTAButton';

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href, onClick, ...props }: any) => (
    <a href={href} onClick={onClick} {...props}>
      {children}
    </a>
  );
});

// Mock global gtag
const mockGtag = jest.fn();
(global as any).window = {
  gtag: mockGtag,
};

describe('CTAButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with correct variant styles', () => {
    render(
      <CTAButton variant="solid" href="/test">
        Test Button
      </CTAButton>
    );

    const button = screen.getByRole('link');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-primary');
    expect(button).toHaveTextContent('Test Button');
  });

  it('renders outline variant correctly', () => {
    render(
      <CTAButton variant="outline" href="/test">
        Outline Button
      </CTAButton>
    );

    const button = screen.getByRole('link');
    expect(button).toHaveClass('border-2', 'border-secondary');
  });

  it('applies custom className', () => {
    render(
      <CTAButton variant="solid" href="/test" className="custom-class">
        Test Button
      </CTAButton>
    );

    const button = screen.getByRole('link');
    expect(button).toHaveClass('custom-class');
  });

  it('applies custom styles', () => {
    const customStyle = { marginTop: '10px' };
    render(
      <CTAButton variant="solid" href="/test" style={customStyle}>
        Test Button
      </CTAButton>
    );

    const button = screen.getByRole('link');
    expect(button).toHaveStyle('margin-top: 10px');
  });

  it('tracks analytics when clicked with trackingLabel', async () => {
    const user = userEvent.setup();
    
    render(
      <CTAButton 
        variant="solid" 
        href="/test" 
        trackingLabel="test-button"
      >
        Test Button
      </CTAButton>
    );

    const button = screen.getByRole('link');
    await user.click(button);

    expect(mockGtag).toHaveBeenCalledWith('event', 'click', {
      event_category: 'CTA',
      event_label: 'test-button',
    });
  });

  it('does not track analytics when no trackingLabel provided', async () => {
    const user = userEvent.setup();
    
    render(
      <CTAButton variant="solid" href="/test">
        Test Button
      </CTAButton>
    );

    const button = screen.getByRole('link');
    await user.click(button);

    expect(mockGtag).not.toHaveBeenCalled();
  });

  it('starts idle animation after 3 seconds', async () => {
    jest.useFakeTimers();
    
    render(
      <CTAButton variant="solid" href="/test">
        Test Button
      </CTAButton>
    );

    const button = screen.getByRole('link');
    expect(button).not.toHaveClass('animate-pulse-glow');

    // Fast-forward time
    jest.advanceTimersByTime(3000);

    await waitFor(() => {
      expect(button).toHaveClass('animate-pulse-glow');
    });

    jest.useRealTimers();
  });

  it('resets idle animation when clicked', async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    
    render(
      <CTAButton variant="solid" href="/test">
        Test Button
      </CTAButton>
    );

    const button = screen.getByRole('link');
    
    // Start idle animation
    jest.advanceTimersByTime(3000);
    await waitFor(() => {
      expect(button).toHaveClass('animate-pulse-glow');
    });

    // Click button
    await user.click(button);
    expect(button).not.toHaveClass('animate-pulse-glow');

    // Verify timer resets
    jest.advanceTimersByTime(3000);
    await waitFor(() => {
      expect(button).toHaveClass('animate-pulse-glow');
    });

    jest.useRealTimers();
  });

  it('has proper accessibility attributes', () => {
    render(
      <CTAButton variant="solid" href="/test">
        Accessible Button
      </CTAButton>
    );

    const button = screen.getByRole('link');
    expect(button).toHaveAttribute('href', '/test');
    expect(button).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-primary');
  });

  it('contains ripple effect elements', () => {
    render(
      <CTAButton variant="solid" href="/test">
        Test Button
      </CTAButton>
    );

    const rippleContainer = document.querySelector('.cta-ripple');
    const rippleEffect = document.querySelector('.cta-ripple-effect');
    
    expect(rippleContainer).toBeInTheDocument();
    expect(rippleEffect).toBeInTheDocument();
  });

  it('handles keyboard interaction', async () => {
    const user = userEvent.setup();
    
    render(
      <CTAButton variant="solid" href="/test" trackingLabel="keyboard-test">
        Test Button
      </CTAButton>
    );

    const button = screen.getByRole('link');
    
    // Focus the button
    await user.tab();
    expect(button).toHaveFocus();

    // Press Enter
    await user.keyboard('{Enter}');
    expect(mockGtag).toHaveBeenCalledWith('event', 'click', {
      event_category: 'CTA',
      event_label: 'keyboard-test',
    });
  });
});